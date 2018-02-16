let config = {
  development: {
    api: {
      url: 'http://api.mycoin.store/graphql',
      //url: 'http://localhost:5000/graphql',
    }
  },
  production: {
    api: {
      url: 'http://api.mycoin.store/graphql',
    }
  }
};

module.exports = config;