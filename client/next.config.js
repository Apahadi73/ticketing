// loads automatically when the next js loads up
// watches file change after every 300ms
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions.poll = 300;
    return config;
  },
};
