var cluster = require('cluster');
var os = require('os');


var cpus = os.cpus();


if (cluster.isMaster) {
  console.log('thread master');

  cpus.forEach(function () {
    cluster.fork();
  });



} else {
  console.log('thread slave');
  require('./index.js');
}
