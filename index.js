const Hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/painting');
const schema = require('./graphql/schema')
const {graphqlHapi,graphiqlHapi} = require('apollo-server-hapi')
//mongoose.connect('mongodb://<prashantpersie>:<luckkadon007>@ds015574.mlab.com:15574/hapigraphql',{ useNewUrlParser: true })
const server = Hapi.Server({
  port: 8097,
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


	// await server.register([
	// 	Inert,
	// 	Vision,
	// 	{
	// 		plugin: HapiSwagger,
	// 		options: {
	// 			info: {
	// 				title: 'Paintings API Documentation',
	// 				version: Pack.version
	// 			}
	// 		}
	// 	}
	// ]);

	await server.register({
		plugin: graphiqlHapi,
		options: {
			path: '/graphiql',
			graphiqlOptions: {
				endpointURL: '/graphql'
			},
			route: {
				cors: true
			}
		}
	});

	// await server.register({
	// 	plugin: graphqlHapi,
	// 	options: {
	// 		path: '/graphql',
	// 		graphqlOptions: {
	// 			schema
	// 		},
	// 		route: {
	// 			cors: true
	// 		}
	// 	}
	// });

  server.route([
    {
      method : 'GET',
      path : '/',
      handler : (req,res)=>{
        return 'Welcome to my Hapi Project Demo'
      }
    },
    {
      method : 'POST',
      path : '/paintings',
      handler : (req,res)=>{
        const {name,url,technique} = req.payload;
        const painting = new Painting({
          name,
          url,
          technique
        })
        return painting.save();
      }
    },
    {
      method : 'GET',
      path : '/paintings',
      handler : (req,res)=>{
        return Painting.find();
    }
  }
  ])
  await server.start();
  console.log(`Server started on port ${server.info.uri}`);
};
init();
