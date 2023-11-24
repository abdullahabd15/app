/* eslint-disable no-console */
import hapi from '@hapi/hapi';
import consts from '../consts.js';
import routes from '../routes.js';

const { host, port } = consts;

const init = async () => {
  const server = hapi.server({ port, host });
  server.route(routes);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
