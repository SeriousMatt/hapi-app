

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.route({
  method: 'GET',
  path: '/',
  handler(request, reply) {
    reply('Hello, world!');
  },
});

server.route({
  method: 'GET',
  path: '/hello/{name}',
  handler(request, reply) {
    reply(`Hello, ${encodeURIComponent(request.params.name)}!`);
  },
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/projects',
    handler(request, reply) {
      reply.file('./public/projects.html');
    },
  });
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/hello',
    handler(request, reply) {
      reply.file('./public/hello.html');
    },
  });
});

server.register(require('inert'), (err) => {
  if (err) {
    throw err;
  }
  server.route({
    method: 'GET',
    path: '/project_page.png',
    handler(request, reply) {
      reply.file('./public/project_page.png');
    },
  });
});

server.register({
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*',
        }],
      }, {
        module: 'good-console',
      }, 'stdout'],
    },
  },
}, (err) => {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(() => {
    if (err) {
      throw err;
    }
    server.log('info', `Server running at: ${server.info.uri}`);
  });
});