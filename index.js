const Hapi = require('hapi');
const mongoose = require('mongoose')
//mongoose.connect('mongodb://<prashantpersie>:<luckkadon007>@ds015574.mlab.com:15574/hapigraphql',{ useNewUrlParser: true })
const server = Hapi.Server({
  port: 3000,
  host: 'localhost'
});
var mongodbUri ='mongodb://@ds015574.mlab.com:15574/hapigraphql';
mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  auth: {
    user: 'prashantpersie',
    password: 'luckkadon007'
  }
})
var conn = mongoose.connection;    
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', () =>{
 console.log('connected to database')                       
});

const init = async () => {
  server.route({
    method : 'GET',
    path : '/',
    handler : (req,res)=>{
      return 'Welcome to my Hapi Project Demo'
    }
  })
  await server.start();
  console.log(`Server started on port ${server.info.uri}`);
};
init();
