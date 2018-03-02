const Nightmare = require('nightmare')
// const nightmare = Nightmare({ show: false })

module.exports = function (app) {

  let   dados = {};
  app.get('/consulta', function (req,res) {


    netflix(dados)
    .then(psn(dados))
    .then(xboxLive(dados))
    .then(function () {
      res.json(dados);
    });


  });

  app.get('/live', function(req,res) {
    xboxLive(dados)
    .then(function () {
      res.json(dados);
    });
  });

  // Promessas de consulta do nightmare

  function netflix (dados) {
    var pesadelo = new Nightmare({ show: false });

    var promessa = new Promise(
      function (resolve,reject) {
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
            dados.netflix = data;
            resolve(dados.netflix)
          })
          .catch(error => {
            console.error('Search failed:', error)
            reject(error);
          })
      }

    );

      return promessa;
  }


  function psn (dados) {
    var pesadelo = new Nightmare({ show: false });

    var promessa = new Promise(

      function (resolve,reject) {
      pesadelo
        .goto('https://status.playstation.com/pt-BR/')
        .wait('.summaryTitleOK')
        // .evaluate(() => document.querySelector('.summaryTitleOK').innerText)
        .evaluate(function () {
          var mensagem = document.querySelector('.summaryTitleOK').innerText;
          return mensagem;
        })
        .end()
        .then(function (data) {
          console.log(data);
          dados.psn = data;
          resolve(dados.psn);
        })
        .catch(error => {
          console.error('Search failed:', error)
          reject(error);
        })

      }
    );
    return promessa;
  }


  function xboxLive (dados) {
    var pesadelo = new Nightmare({ show: false });

    var promessa = new Promise(

      function (resolve,reject) {
      pesadelo
        .goto('https://support.xbox.com/pt-BR/xbox-live-status')
         // .wait('#ServiosprincipaisdoXboxLive h3')
        // .evaluate(() => document.querySelector('.summaryTitleOK').innerText)
        .evaluate(function () {
          var mensagem = document.querySelector('#ServiosprincipaisdoXboxLive h3').text;
          return mensagem;
        })
        .end()
        .then(function (data) {
          console.log(data);
          dados.xboxlive = data;
          resolve(dados.xboxlive);
        })
        .catch(error => {
          console.error('Search failed:', error)
          reject(error);
        })

      }
    );
    return promessa;
  }
}
