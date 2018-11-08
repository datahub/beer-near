# Beer Near

Beer Near: A guide to Wisconsin breweries

Codepen mock-up: http://codepen.io/ecaughey/pen/4165b399334c6de2604f7493ef045af2


## Set up

Install the Node.js dependencies.

```
npm install
```

When you're developing you can have it kick off a development server that watches to changes, rebuilds stuff and reloads your browser.

```
npm start
```

When you're done developing, you create a production build of the files.
```
npm run build
```

This will put the built version of the files in the `dist` folder. This folder will
have four elements: `index.html`, `index.js` and `index.css`. It will also copy over the `data` and the `media` folders from `src`. 

You won't see image for breweries when developing. The `media` folder isn't saved in this repo. If you want to view these when developing, copy over the `media` folder from the projects server into the `src` folder here.