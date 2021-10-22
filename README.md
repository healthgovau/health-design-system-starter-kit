# HDS Starter kit

Get started fast with the HDS starter kit!


## Base kits

If you prefer to use a plain static html site you can use the npm start command and have that compile scss and publish the html to the dist folder.

If you want to develop in react you need to run webpack(npm run react) and the scss compiler(npm run cssonly) separately.

Keep in mind that npm start and npm run react writes to the same html file so they will overwrite each other.

### SCSS/CSS
        
    To watch and compile for css only run: npm run cssonly

### Static HTML
    
    To compile scss and copy htm on change run: npm start

### React
    The react files are located in the ./react folder

    To run a local server run:  npm run react
    To build react run:         npm run react:build