// For storing config exclusive to this spreadsheet
var documentProperties = PropertiesService.getDocumentProperties();

// Register datahub menu
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Datahub')
      .addItem('Publish latest version of data', 'exportJson')
      .addSubMenu(ui.createMenu('Configuration')
          .addItem('Set Configuration', 'setConfig')
          .addItem('View Configuration', 'viewConfig'))
      .addToUi();
}

// Walk user through the process of setting config
function setConfig() {
  var ui = SpreadsheetApp.getUi();
  var result1 = ui.prompt(
      'Step 1 of 4',
      'AWS Access Key:',
      ui.ButtonSet.OK_CANCEL);

  var button1 = result1.getSelectedButton();
  var text1 = result1.getResponseText();

  if (button1 == ui.Button.OK && text1 !== "") {
    documentProperties.setProperty('AWS_ACCESS_KEY', text1);
  } else {
    incompleteSetup();
  }

  var result2 = ui.prompt(
      'Step 2 of 4',
      'AWS Secret Key:',
      ui.ButtonSet.OK_CANCEL);

  var button2 = result2.getSelectedButton();
  var text2 = result2.getResponseText();

  if (button2 == ui.Button.OK && text2 !== "") {
    documentProperties.setProperty('AWS_SECRET_KEY', text2);
  } else {
    incompleteSetup();
  }

  var result3 = ui.prompt(
      'Step 3 of 4',
      'AWS Bucket:',
      ui.ButtonSet.OK_CANCEL);

  var button3 = result3.getSelectedButton();
  var text3 = result3.getResponseText();

  if (button3 == ui.Button.OK && text3 !== "") {
    documentProperties.setProperty('AWS_BUCKET', text3);
  } else {
    incompleteSetup();
  }

  var result4 = ui.prompt(
      'Step 4 of 4',
      'Project path:',
      ui.ButtonSet.OK_CANCEL);

  var button4 = result4.getSelectedButton();
  var text4 = result4.getResponseText();

  if (button4 == ui.Button.OK && text4 !== "") {
    documentProperties.setProperty('PROJECT_PATH', text4);
  } else {
    incompleteSetup();
  }

}

// view configutation
function viewConfig() {
  var ui = SpreadsheetApp.getUi();
  ui.alert("AWS Access Key: " + documentProperties.getProperty('AWS_ACCESS_KEY') + "\n"
      + "AWS Secret Key: " + documentProperties.getProperty('AWS_SECRET_KEY') + "\n"
      + "AWS Bucket: " + documentProperties.getProperty('AWS_BUCKET') + "\n"
      + "Project Path: " + documentProperties.getProperty('PROJECT_PATH')
  );
}

// debug configuration fields
function incompleteSetup() {
  var ui = SpreadsheetApp.getUi();
  ui.alert('Configuration is incomplete, please restart the process. \n'
      + "AWS Access Key: " + documentProperties.getProperty('AWS_ACCESS_KEY') + "\n"
      + "AWS Secret Key: " + documentProperties.getProperty('AWS_SECRET_KEY') + "\n"
      + "AWS Bucket: " + documentProperties.getProperty('AWS_BUCKET') + "\n"
      + "Project Path: " + documentProperties.getProperty('PROJECT_PATH')
  );
}

function exportJson() {

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  var sheet = SpreadsheetApp.getActiveSheet();
  var rows = sheet.getDataRange();
  var numRows = rows.getNumRows();
  var numCols = rows.getNumColumns();
  var values = rows.getValues();

  var output = [];
  var id = 1;

  var header = values[0];
  
  var success = true;
  
  for (var i = 1; i < numRows; i++) {
    var row = values[i];
    var tempObj = {};
    tempObj.id = id;
    id++;
    for (var j = 0;j<numCols;j++) {
      if (row[j]) {
        var val = row[j];
        
        if (header[j] === 'lat' || header[j] === 'lng') {
          val = parseFloat(row[j]);
        
        // normalize yes to true    
        } else if (val.toUpperCase() === "YES") {
          val = true;

        //normalize no to false
        } else if (val.toUpperCase() === "NO") {
          val = false;
          
        // clean up url
        } else if (header[j] === "websiteUrl") {
          val = val.replace("http://","").replace("https://","").replace("www.","");

          if (endsWith(val,"/")) {
            val = val.slice(0, -1);
          }

        // capitalize type
        } else if (header[j] === "type") {
          val = val.charAt(0).toUpperCase() + val.slice(1);
          
        // build open hours object
        } else if (header[j] === "taproomHours" && val !== "") {
          try {
            tempObj.open = isOpen(val);
          } catch(e) {
            success = false;
            SpreadsheetApp.getUi().alert('Error parsing: ' + val);
            SpreadsheetApp.getUi().alert('Error: ' + e);
          }
          
        }
        
        tempObj[header[j]] = val;
      }
    }
    //Logger.log(tempObj.id);
    output.push(tempObj);
  }

  var ts = new Date().toString();

  var final = {
    data: output,
    timestamp: ts
  };

  var finalJSON = JSON.stringify(final);
  
  if (success) {
    //Logger.log(finalJSON);
    saveToS3(finalJSON);
  } else {
    SpreadsheetApp.getUi().alert('The spreadsheet was not published due to an error. Double check all values recently added. See the app script logs for more details');
  }

  //createVersion();

}

// push to S3 bucket
function saveToS3(blob) {
  // see S3 script imported a library
  // https://script.google.com/macros/d/1qFTTCLzjrDqYYUNRIvjZ4LmlySSGr6v0SGlDIajy1wvQPaNvjm5hkMEk/edit
  var awsAccessKey = documentProperties.getProperty('AWS_ACCESS_KEY');
  var awsSecretKey = documentProperties.getProperty('AWS_SECRET_KEY');
  var bucket = documentProperties.getProperty('AWS_BUCKET');
  var projectPath = documentProperties.getProperty('PROJECT_PATH') + '/beer-near-test.json';

  var s3 = S3.getInstance(awsAccessKey, awsSecretKey);
  s3.putObject(bucket, projectPath, blob, {logRequests:false});
}

// takes a snapshot of the current sheet and saves it as another sheet
function createVersion() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  var name = "Published: " + timeStamp();

  var old = ss.getSheetByName(name);
  if (old) {
    ss.deleteSheet(old);
  }

  var sheet = ss.getActiveSheet().copyTo(ss);
  SpreadsheetApp.flush();
  sheet.setName(name);

}
// limits the number of snapshots to save
function limitSheets() {
  var maxSheetCount = 5;
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();

  if (sheets.length > maxSheetCount) {
    for(var i = maxSheetCount; i < sheets.length; i++){
      if (i !== 0) {
        ss.deleteSheet(sheets[i]);
      }
    }
  }
}
// returns timestamp in human read-able format
function timeStamp() {
  var now = new Date();
  var date = [ now.getMonth() + 1, now.getDate() ];
  var time = [ now.getHours(), now.getMinutes()];
  var suffix = ( time[0] < 12 ) ? "am" : "pm";
  time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
  time[0] = time[0] || 12;
  for ( var i = 1; i < 2; i++ ) {
    if ( time[i] < 10 ) {
      time[i] = "0" + time[i];
    }
  }
  return date.join("/") + " at " + time.join(":") + " " + suffix;
}
// creates the object used to determine if the brewery is open
function isOpen(openString) {
  var openPeriods = {
        "Monday": "Closed",
        "Tuesday": "Closed",
        "Wednesday": "Closed",
        "Thursday": "Closed",
        "Friday": "Closed",
        "Saturday": "Closed",
        "Sunday": "Closed"
  };
  if (typeof openString !== 'undefined' && openString !== "") {  
    var daysOfTheWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var shiftWeek = function(startOfWeek) {
        var tmp = daysOfTheWeek.slice(0);
        var shift = tmp.indexOf(startOfWeek) - 1;
        for(var i = 0; i <= shift; i++){
            tmp.push(tmp.shift());
        }
        return tmp;
    }
    var cleanArray = function(arr) {
        var result = [];
        arr = arr.filter(Boolean);
        for (var i = 0; i < arr.length; i++) {
            result.push(arr[i].trim());
        }
        return result;
    }
    var milTime = function(hour,nextDayCheck) {
      if (typeof hour !== 'undefined') {
        if (hour.indexOf(":") > -1) {
            var min = (parseInt(hour.substring((hour.indexOf(":")+1),(hour.indexOf(":")+3)),10) / 60);
        } else {
            var min = 0;
        }
        if (hour.indexOf("p.m.") > -1) {
            var hr = parseInt(hour,10) + 12;
        } else if (nextDayCheck) {
            var hr = parseInt(hour,10) + 24;
        } else {
            var hr = parseInt(hour,10);
        }
        return (hr + min);
      } else {
        return 0;
      }
    }
    var normalizedOpenString = openString.replace(/midnight/ig,'12 a.m.').replace(/noon/ig,'12 p.m.').replace(/open/ig,'-12 a.m.');
    var dayStrings = normalizedOpenString.split(";");
    for (var i = 0; i < dayStrings.length; i++) {
        var dayString = dayStrings[i];
        var days = dayString.split("=")[0];
        var dayRange = cleanArray(days.split("-"));
        var hours = dayString.split("=")[1];
        var hourRange = cleanArray(hours.split("-"));
        var times = [milTime(hourRange[0], false),milTime(hourRange[1], true)];

        if (dayRange.length === 1) {
            openPeriods[dayRange[0]] = times;
        } else {
            var week = shiftWeek(dayRange[0]);
            var endDay = week.indexOf(dayRange[1]);
            for (var j = 0; j <= endDay; j++) {
                openPeriods[week[j]] = times;
            }
        }
    }
  }
  return openPeriods;
}
