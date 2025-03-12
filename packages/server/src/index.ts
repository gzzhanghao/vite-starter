import http from 'node:http';
import { createRequire } from 'node:module';
import { type AddressInfo } from 'node:net';
import path from 'node:path';

import Router from '@koa/router';
import { name } from '@vite-starter/lib';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import koaConnect from 'koa-connect';
import KoaLogger from 'koa-logger';
import { createServer } from 'vite';

const require = createRequire(import.meta.url);

async function run() {
  const app = new Koa();
  const router = new Router();

  const server = http.createServer(app.callback());

  app.use(KoaLogger());
  app.use(bodyParser());

  router.get('/api/hello', (ctx) => {
    ctx.body = `Hello, ${name}`;
  });

  app.use(router.routes()).use(router.allowedMethods());

  const vite = await createServer({
    root: path.dirname(require.resolve('@vite-starter/client/vite.config.ts')),
    server: {
      middlewareMode: true,
      hmr: { server },
    },
    appType: 'spa',
  });

  app.use(koaConnect(vite.middlewares));

  import.meta.hot?.accept(() => {
    server.close();
    console.log('Server closed due to hot reload');
  });
  server.listen(6857).on('listening', () => {
    const addr = server.address() as AddressInfo;
    console.log(`Server listening at http://127.0.0.1:${addr.port}/`);
  });
}

run();
