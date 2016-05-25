var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'ipn-evento-jornadas'
    },
    port: process.env.PORT || 3013,
    db: 'mongodb://localhost/ipn-evento-jornadas'
  },

  test: {
    root: rootPath,
    app: {
      name: 'ipn-evento-jornadas'
    },
    port: process.env.PORT || 3013,
    db: 'mongodb://localhost/ipn-evento-jornadas'
  },

  production: {
    root: rootPath,
    app: {
      name: 'ipn-evento-jornadas'
    },
    port: process.env.PORT || 3013,
    db: 'mongodb://localhost/ipn-evento-jornadas'
  }
};

module.exports = config[env];
