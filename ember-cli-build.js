'use strict';

const { ProvidePlugin } = require('webpack');
const { Webpack } = require('@embroider/webpack');
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {});

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  //return app.toTree();
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true, // See https://github.com/emberjs/ember-test-helpers/issues/1220
    // splitAtRoutes: ['route.name'], // can also be a RegExp
    packagerOptions: {
      webpackConfig: {
        node: {
          global: true,
        },
        plugins: [
          new ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
            //process: ['process', 'process'],
            process: 'process',
          }),
        ],
        resolve: {
          alias: {
            // assert: "assert/",
            buffer: require.resolve('buffer/'),
            // console: "console-browserify",
            // constants: "constants-browserify",
            // crypto: "crypto-browserify",
            // domain: "domain-browser",
            // events: "events/",
            // http: "stream-http",
            // https: "https-browserify",
            // os: "os-browserify/browser",
            // path: "path-browserify",
            // punycode: "punycode/",
            process: require.resolve('process/browser'),
            // querystring: "querystring-es3",
            stream: require.resolve('stream-browserify'),
            // stream: "stream-browserify",
            // _stream_duplex: "readable-stream/duplex",
            // _stream_passthrough: "readable-stream/passthrough",
            // _stream_readable: "readable-stream/readable",
            // _stream_transform: "readable-stream/transform",
            // _stream_writable: "readable-stream/writable",
            // string_decoder: "string_decoder/",
            // sys: "util/",
            // timers: "timers-browserify",
            // tty: "tty-browserify",
            // url: "url/",
            // util: "util/",
            // vm: "vm-browserify",
            // zlib: "browserify-zlib",
          },
        },
      },
    },
  });
};
