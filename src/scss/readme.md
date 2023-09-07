# A good SCSS setup

In the HDS SK you can do whatever you like. However, the following approach allows us to develop using the HDS and GovCMS theme components.

Here are some scenarios and approaches:

## Developing for the HDS

The HDS is imported to `/assets/hds`. The style guide is removed on import.

### SCSS references

Adding or modifying themes or components here allows the effect to the viewed within the HDS SK either as HDS-only components or with the ASKii layer enabled (see [main.scss](src/scss/main.scss)).

The whole `/assets/hds/sass` folder can be copied to the HDS.

## Developing for the ASKii theme

The ASKii health theme has been added to `/assets/akkii` (note that this is not an NPM import but has been manually added and committed, so the `/base` and `/components` should be updated when embarking on new work`).

If updates are for GovCMS sites only, change can be made to this folder. The `/base` and `/components` folders can be copied to the ASKii health theme.

### SCSS references

The SCSS should be built using both HDS and ASKii includes (see [main.scss](src/scss/main.scss)).

## Developing for a new site

Typically the HDS SK is used to POC new site developments (i.e. theming, components, layouts, etc).

A `/src/scss/site-theme` folder exists to permit site-level development. This mirrors the structure of the ASKii sub-theme so that components (overrides and new) and theming (via `/variables/_colours.scss` and `/variables/_colours-map.scss`) can be developed/tested here and then easily copied to the new site's sub-theme.

### SCSS references

The SCSS should be built using both HDS, ASKii includes and local site theme references (see [main.scss](src/scss/main.scss)).
