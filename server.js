var express =require( 'express' ),
    http =require( 'http' ),
    path =require( 'path' ),

    app = express();
    port = process.env.PORT  || 3000;

//middleware
app.use( express.static( path.join( __dirname,'/build' ) ) );

//url
var home = require('./app/routes/home.js');

app.use('/', home);


http.createServer( app ).listen( port, function(){
	console.log( 'the server now listen at port 3000' );
});