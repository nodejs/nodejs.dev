const fs = require( "fs" );
const buffer = Buffer.alloc( 1024 );

fs.open( "./myFile.txt", "r", ( err, fdr ) => {

  if ( err  ) {
    return console.log( "LOG_ERROR :: ", err.message );
  }

  fs.read( fdr, buffer, 0, 50, 0, ( er, bytesRead, buffer ) => {

    if ( er ) {
      return console.log( "LOG_ERROR :: ", err.message );
    }

    
    fs.open( "./newFile.txt", "w", ( err, fdw ) => {

      if ( err  ) {
        return console.log( "LOG_ERROR :: ", err.message );
      }

      fs.write( fdw, buffer, 0, bytesRead, ( err, writtenBytes ) => {

        if ( err  ) {
          return console.log( "LOG_ERROR :: ", err.message );
        }

        console.log( " Written bytes :: ", writtenBytes );
      } );
    } );
  } );
} );