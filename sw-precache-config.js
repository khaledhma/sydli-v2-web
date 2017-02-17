module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'public',
  root: 'public/',
  staticFileGlobs: [
    'public/index.html',
    'public/**.js',
    'public/**.css',
    'public/**/**.css',
    'public/**/**.js',
    'public/**/**.png',
    'public/**/**.json'
  ]
};
