# HDS Starter kit

Get started fast with the HDS starter kit!

 * [Setup](#setup)
 * [Base kits](#base-kits)
   + [Static HTML](#static-html)
   + [React](#react)
   + [Handlebars](#handlebars)
     - [Quick get started for handlebars](#quick-get-started-for-handlebars)
       * [Menu](#menu)
   + [Define content in json](#define-content-in-json)

## Setup

    git clone https://github.com/healthgovau/health-design-system-starter-kit PROJECTNAME
    cd PROJECTNAME
    npm install

## Base kits

If you prefer to use a plain static html site you can use the `npm start` command and have that compile scss and publish the html to the dist folder.

If you want to develop in react or handlebars you need to run webpack (`npm run react`) and the scss compiler (`npm run cssonly`) separately.

Keep in mind that `npm start`, `npm run react` and `npm run handlebars` all write to the same html file so they will overwrite each other.

### Static HTML
    
To compile scss and copy htm on change run: `npm run html`

### React
The react files are located in the ./react folder

To run a local server run and :  `npm run react`
To build react run:        ` npm run react:build`

### Handlebars

The handlebars templates are located in handlebars/src

The page skeleton can be foudn here handlebars/src/partials/layouts/base.hbs there is usually no need to change this file.
The file o change for a single page application is handlebars/src/index.hbs

handlebars is compiled by running `npm run handlebars`

#### Quick get started for handlebars

Objects that are added inside a {#* }} elemnet are displayed at the corresponding position on the page

    {{#*inline "nav-block"}}
        <div>I'm inside the nav block!</div>
    {{/inline}}

To use a predifined template from the includes folder refer to a partial

    {{> includes/card}}

Partials can be referred to with or without parameters

##### Menu

To customize the main nav menu use data.json

### Define content in json

To utilise a json source rather than adding multiple similar items to the templateuse data.json
See the example in index.hbs where include/cards outputs multiple cards from a json source.

    

    
