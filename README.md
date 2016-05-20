Pierup Website
========
#Note: our websit add cache for user loading, the file app/pier.mainfest is our cache file. If someone need to release a version, you must modify #version on file pier.mainfest. ---Cong
##Dependencies Installation

The front-end package is using following tools to manage dependencies, automatic file processing and building:

* [bower.io](http://bower.io) : A package manager for the web
* [gulp](http://gulpjs.com) : A streaming build system based on [npm - Node Packaged Modules](https://www.npmjs.org)

Before install dependencies of the package, please verify **node.js** has been already installed. If not, please go to [nodejs.org](http://nodejs.org) to download and install it.

Make sure that **node** and **bower** are all well installed.

```bash
node -v && npm -v && bower -v
```

Use bower to install front-end dependencies:

```bash
bower install
```
See more info about bower here: [bower.io](http://bower.io)

Install all development dependanted gulp packages by npm: 

```bash
npm install
```
See more info about npm here: [npm](https://www.npmjs.org)

##Local Server & Test
Under project folder and type:

```bash
gulp
```
Then open brower and go to `localhost:8686`