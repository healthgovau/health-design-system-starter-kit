# HDS Starter kit

Get started fast with the HDS starter kit!

- [HDS Starter kit](#hds-starter-kit)
  - [Setup](#setup)
  - [Base kits](#base-kits)
    - [Static HTML](#static-html)
    - [React](#react)
    - [Handlebars](#handlebars)
      - [SCSS](#scss)
      - [JavaScript](#javascript)
      - [Images](#images)
    - [Guide to using Handlebars](#guide-to-using-handlebars)
      - [Templates](#templates)
      - [Menu](#menu)
      - [Define content in json](#define-content-in-json)
      - [SCSS](#scss-1)
      - [JavaScript](#javascript-1)
      - [Images](#images-1)
      - [Export files](#export-files)
      - [Handlebar references](#handlebar-references)

---

## Setup

    git clone https://github.com/healthgovau/health-design-system-starter-kit PROJECTNAME
    cd PROJECTNAME
    npm install
    npx hdssetup

    If you get stuck on npm install, downgrade npm to version six by running npm install -g npm@6

## Base kits

    Keep in mind that npm run html, npm run react and npm run handlebars writes to the same html file so they will overwrite each other.

### Static HTML

To compile scss and copy html on change run: `npm run html`

### React

The react files are located in the ./react folder

To run a local server run and : `npm run react`
To build react run: `npm run react:build`

### Handlebars

The handlebars templates are located in `handlebars/src`

The page skeleton can be found here `handlebars/src/partials/layouts/base.hbs` there is usually no need to change this file.

The file to change for a single page application is `handlebars/src/index.hbs`.

To have multiple pages add a new handlebars file to `handlebars/src/pages` it can be accessed by going to `filename.html` at the same address as the main page.

Handlebars is compiled by running `npm run handlebars`

This command will compile the handlebars templates to save to `/dist`. It will also copy/minify artefacts from the following locations:

#### SCSS

- `/src/scss` --> `/dist/css`

#### JavaScript

- `/src/js` --> `/dist/js`
- `/assets/hds/js` --> `/dist/js` (this picks-up the HDS JS)

#### Images

- `/src/img` --> `/dist/img`

### Guide to using Handlebars

#### Templates

Objects that are added inside a {#\* }} element are displayed at the corresponding position on the page

    {{#*inline "nav-block"}}
        <div>I'm inside the nav block!</div>
    {{/inline}}

To use a predifined template from the includes folder refer to a partial

    {{> includes/card}}

Partials can be referred to with or without parameters

#### Menu

To customize the main nav menu use data.json

#### Define content in json

To utilise a json source rather than adding multiple similar items to the templateuse `data.json`

See the example in ` index.hbs`` where  `include/cards` outputs multiple cards from a json source.

#### SCSS

The root SCSS file is setup as `/src/scss/main.scss` as defined in `webpack-sass.config.js`. This references other SCSS files as required (such as the HDS via `@import "../../assets/hds/sass/all.scss";`).a1

Addition custom SCSS files can be added to `/src/scss/parts/*.scss`.

#### JavaScript

The project includes JS files as referenced in `/handlebars/src/partials/includes/head.hbs`. For example:

```
<script src="js/health.tooltip.js"></script>
<script src="js/health.video.js"></script>
<script src="js/scripts.js"></script>
<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>
```

These can be customised according to needs.

**Note** The references are to the compiled JS folder in `/dist/js`.

The root SCSS file is setup as `/src/scss/main.scss`. T

#### Images

Place images in `/src/img` and reference directly. For example:

```
<img src="img/file.png"
```

**Note:** Webpack (used for compilation) does not handle SVG images.

#### Export files

To use the generated page as a standalone static page. Copy the files from the `dist` folder.

#### Handlebar references

- https://www.reddit.com/r/node/comments/9hd442/how_do_i_pass_data_to_a_handlebars_partial/
- https://zordius.github.io/HandlebarsCookbook/
