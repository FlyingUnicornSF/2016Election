This is a browser based application that generates a histogram of campaign contributions to each presidential candidate during 2015-2016 from committees (not individuals).

Client side of this project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Folder Structure

After creation, your project should look like this:

```
Project Folder
|-- Data (json files containing shaped data generated from files in scripts folder.)
|    |-- scripts 	(original data in txt files from https://classic.fec.gov/finance/disclosure/ftpdet.shtml#a2015_2016 and scripts to create json files.)
|
|-- client
|    |-- node_modules
|    |-- Public
|    |  |--index.html
|    |  |--manifext.json
|    |
|    |-- src
|    |  |--components
|    |  |   |--Histogram.js
|    |  |   |-- components.css
|    |  |
|    |  |-- App.css
|    |  |-- App.js
|    |  |-- index.css
|    |  |-- index.js
|    |
|    |-- package.json
|    |-- yarn.lock
|    |-- README.md
|
|-- server
|    |-- package.json
|    |-- routes.js
|    |-- server.js
|
|-- package.json
|-- package-lock.json
|-- README.md
|
|--node_modules

```

* `client/public/index.html` is the page template;
* `client/src/index.js` is the JavaScript entry point.

## Install project dependency

Run npm instal command from client folder, Data folder, and the root project folder.
```sh
npm install
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
npm start will pen [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

It also runs app at the same time<br>
Open [http://localhost:3030/dashboard](http://localhost:3030/candidates) to view it in the browser.
