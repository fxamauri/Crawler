const Nightmare = require('nightmare')
// const nightmare = Nightmare({ show: false })

module.exports = function (app) {


  app.get('/netflix', function (req,res) {

    var pesadelo = new Nightmare({ show: false });
    pesadelo
      .goto('https://help.netflix.com/pt/is-netflix-down')
        .wait('.down-notification-content')
      // .evaluate(() => document.querySelector('.down-notification-content h2').innerText)
      .evaluate(function () {
        var mensagem = document.querySelector('.down-notification-content h2').innerText;
        return mensagem;
      })
      .end()
      .then(function (data) {
        console.log(data);
        res.json(data);

        // return;
      })
      .catch(error => {
        console.error('Search failed:', error)
      })


  });

  app.get('/psn',function (req,res) {
    var pesadelo = new Nightmare({ show: false });
    pesadelo
      .goto('https://status.playstation.com/pt-BR/')
      .wait('.summaryTitleOK')
      // .evaluate(() => document.querySelector('.summaryTitleOK').innerText)
      .evaluate(function () {
        var mensagem = document.querySelector('.summaryTitleOK').innerText;

      })
      .end()
      .then(function (data) {
        console.log(data);
        res.json(data);
        // return;
      })
      .catch(error => {
        console.error('Search failed:', error)
      })
  });
}
