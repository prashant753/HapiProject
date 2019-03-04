const Hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/painting');
const schema = require('./graphql/schema')
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
//mongoose.connect('mongodb://<prashantpersie>:<luckkadon007>@ds015574.mlab.com:15574/hapigraphql',{ useNewUrlParser: true })
const server = Hapi.Server({
	port: 8097,
	host: 'localhost'
});
var mongodbUri = 'mongodb://@ds015574.mlab.com:15574/hapigraphql';
mongoose.connect(mongodbUri, {
	useNewUrlParser: true,
	auth: {
		user: 'prashantpersie',
		password: 'luckkadon007'
	}
})
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', () => {
	console.log('connected to database')
});

const init = async () => {


	await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: {
				info: {
					title: 'Paintings API Documentation',
					version: Pack.version
				}
			}
		}
	]);

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

	await server.register({
		plugin: graphqlHapi,
		options: {
			path: '/graphql',
			graphqlOptions: {
				schema
			},
			route: {
				cors: true
			}
		}
	});


	server.route([
		{
			method: 'GET',
			path: '/api/v1/paintings',
			config: {
				description: 'Get all the paintings',
				tags: ['api', 'v1', 'painting']
			},
			handler: (req, reply) => {
				return Painting.find();
			}
		},
		{
			method: 'POST',
			path: '/api/v1/paintings',
			config: {
				description: 'Get a specific painting by ID.',
				tags: ['api', 'v1', 'painting']
			},
			handler: (req, reply) => {
				const { name, url, technique } = req.payload;
				const painting = new Painting({
					name,
					url,
					technique
				});

				return painting.save();
			}
		}
	]);
	await server.start();
	console.log(`Server started on port ${server.info.uri}`);
};
init();
