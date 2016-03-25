var express =require( 'express' ),
    http =require( 'http' ),
    path =require( 'path' ),
    mongoose =require( 'mongoose' ),
    bodyParser =require( 'body-parser' ),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),

    session = require('express-session'),
    app = express();
    port = process.env.PORT  || 3000;

//connect to db
// var localDB = 'mongodb://127.0.0.1/gradeViewingSystem';
mongoose.connect('mongodb://127.0.0.1/gradeViewingSystem');//local
// mongoose.connect('mongodb://heroku_p22ncl5v:8hcm87dr83dij1tb1jheuk3f97@ds021299.mlab.com:21299/heroku_p22ncl5v'); //online

//database list
var dbUsers = mongoose.model('dbUsers', require('./app/models/dbUsers.js'));


//middleware
app.use( express.static( path.join( __dirname,'/build' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended :true } ) );
app.use(session({
    secret: 'This is the secret',
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// authenticate the user login
passport.use(new localStrategy(function(username, password, done){
        dbUsers.findOne({username: username, password: password}, function(err, user){
            if(user){
                return done(null, user);
            }
            return done(null, {loginErr: 'wrong username or password'});
        });
    }

));
passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user, done){
    done(null, user);
});

app.post('/login', passport.authenticate('local'), function(req, res){
    res.json(req.user);
});

//url
var home = require('./app/routes/home.js');

app.use('/', home);

app.get('/db-users', function(req, res){
    dbUsers.find({}, function(err, data){
        if(err){
            return err;
        }
        res.json(data);
    });
});

//generate admin
router.get('/create-admin', function(req, res){
    var newUser = new dbUsers({
        userId: 'admin-110694',
        name: 'administrator',
        email: 'admin@gmail.com',
        username: 'admin',
        password: 'admin',
        type: 'administrator'
    }).save(function(err, data){
        if(err){
            return err;
        }   
        res.json(data);
    });
});

http.createServer( app ).listen( port, function(){
    console.log( 'the server now listen at port 3000' );
});