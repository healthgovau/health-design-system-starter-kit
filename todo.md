# HDS Starter Kit to do list

- Fix SVG pipeline (currently Webpack won't copy SVGs to /dist on build)
- Be able to register Handlebars helpers (currently helpers.js is not found by Handlebars in Webpack)
- Support HTML in data.json
- Support markdown for content delivery (separate from templates)
- Be able to pass the name of a partial as a property. This will allow fully-nested components, such as band > layout > component:

```
{{> includes/band
    band-title="This band has a title"
    band-class="health-band--primary"
    band-content={{> includes/grid}}
}}
```

The `band-content` property passes this as a string literal, not a partial.

This is not possible OOTB and probably requires a helper.

Without it, pages need contain all wrapper HTML for components (e.g, bands, layouts, grids, callouts, etc).

Ref: https://handlebarsjs.com/guide/partials.html#dynamic-partials
