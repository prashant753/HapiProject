const Hapi = require('hapi');
const server = Hapi.Server({
  port: 3000,
  host: 'localhost'
});

const init = async () => {
  await server.start();
  console.log(`Server started on port ${server.info.uri}`);
};
init();
