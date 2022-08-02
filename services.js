const SERVICES = {
  // ============
  // Static Sites
  // ============
  'design.clarityhub.app': [{
    port: '8100',
    service: 'design',
  }],

  'app.clarityhub.app': [{
    service: 'webapp',
  }],

  'developers.clarityhub.app': [{
    service: 'developers',
  }],

  'widgets.clarityhub.app': [{
    service: 'preact-widgets',
    location: '/scripts',
  }],

  'www.clarityhub.app': [{
    service: 'website',
    port: '4000',
  }],

  // ============
  // Integrations
  // ============
  'integrations.clarityhub.app': [{
    location: '/suggestions',
    service: 'integration-claire-bot',
  }, {
    location: '/website-chat',
    service: 'integration-website-chat',
  }],

  // ========
  // Services
  // ========
  'api.clarityhub.app': [{
    location: '/auth',
    service: 'service-auth',
  }, {
    location: '/billing',
    service: 'service-billing',
  }, {
    location: '/chats',
    service: 'service-chat',
  }, {
    location: '/suggestions',
    service: 'service-suggestions',
  }, {
    location: '/analytics',
    service: 'service-analytics',
  }, {
    location: '/integrations',
    service: 'service-integrations',
  }, {
    location: '/accounts',
    service: 'service-users',
  }, {
    location: '/rtc',
    service: 'service-rtc',
  }],
};

module.exports = SERVICES;
