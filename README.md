Gulp Project Setup
=============================

A starter setup for a gulp project including:
+ JS (lint, minify, and concat)
+ SASS (compile)
+ CSS (minify)
+ Autoprefixer (Vendor Prefixes)
+ Images (image compression)
+ BrowserSync (css injection)
+ HTML Validation (Run through W3C)

## Requirements

To use this you'll need the following installed:

+ [NodeJS](http://nodejs.org) - use the installer
+ [GulpJS](https://github.com/gulpjs/gulp) - `$ npm install -g gulp`

## Setup

1. `$ git clone git@github.com:kjbrum/Gulp-Project-Starter-Setup.git` or download it into a directory of your choice.
2. Then run `$ npm install` inside that directory. (This should install all the plugins needed)

## Usage

1. To start the browser syncing and file watching, just run `$ gulp` in the project directory.
2. Folders and file paths can be changed in gulpfile.js

**Note:** For WordPress projects, install Gulp into the theme directory