const http = require('http')

const args = require('minimist')(process.argv.slice(2))

const express = require('express');

const app = express()


args['port'];

const port = args.port || process.env.PORT || 3000



function coinFlip() {
    let number = Math.random();
    let output = number > .5 ? "heads" : "tails"
    return output
  
  }

function coinFlips(flips) {
  let result = []
  for (let i = 0; i < flips; i++){
      result[i] = coinFlip()
  }
  return result
}

function countFlips(array) {
  let output = {}
  if (array.length == 1 && array[0] == 'heads'){
    output = {
      heads: 1
    };

  }
  else if (array.length == 1 && array[0] == 'tails'){
    output = {
      tails: 1
    };
  }
  else{
    output = {
      tails: 0,
      heads: 0
    };
    for (let i = 0; i < array.length; i++){
      array[i] == 'heads' ? output.heads += 1 : output.tails += 1
    }
  }

  return output;

}

function flipACoin(call) {
  let flip = coinFlip()
  let result = {
    call: call,
    flip: flip,
    result: ""
  }
  this.flip == this.call ? this.result = "win" : this.result = "lose"

}

app.get('/app/', (req, res) => {
    // Respond with status 200
        res.statusCode = 200;
    // Respond with status message "OK"
        res.statusMessage = 'OK';
        res.writeHead( res.statusCode, { 'Content-Type' : 'text/plain' });
        res.end(res.statusCode+ ' ' +res.statusMessage)
    })


app.get('/app/flip/', (req, res) => {
    res.status(200).json({'flip': coinFlip()})
});

app.get('/app/flips/:number', (req, res) => {
	const flips = coinflips(req.params.number)
    res.status(200).json({'raw': flips, 'summary': countFlips(flips)})
});

app.get('/app/flip/call/heads', (req, res) => {
	const flip = flipACoin('heads')
    res.status(200).json({'call': flip.call, 'flip': flip.flip, 'result': flip.result})
});

app.get('/app/flip/call/tails', (req, res) => {
	const flip = flipACoin('tails')
    res.status(200).json({'call': flip.call, 'flip': flip.flip, 'result': flip.result})
});

const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',port))
});

app.use(function(req, res){
    res.status(404).send('404 NOT FOUND')
});