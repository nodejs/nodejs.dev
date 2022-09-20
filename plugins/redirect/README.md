This plugin is a replacement for the unmaintained `gatsby-plugin-meta-redirect`. The major change I made was removing the fs-extra module from it and using the built-in fs module instead. 

The problem we were running into was the fs-extra module was throwing on an invalid character in our path for windows users. 
