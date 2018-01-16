# Your_First_Decentralized_Application
This is the UPDATED code for "A Guide to Building Your First Decentralized Application" by Siraj Raval on Youtube


## Overview

This is the UPDATED code for [this](https://youtu.be/gSQXq2_j-mw) video on Youtube by Siraj Raval. It's a guide on how to build your first decentralized application. 

## Dependencies

* "ethereumjs-testrpc": "^6.0.3"
* "solc": "^0.4.19"
* "web3": "^1.0.0-beta.27"
    
Install missing dependencies with [npm](https://www.npmjs.com/). 

```
> git clone git@github.com:jagarzone6/Your_First_Decentralized_Application.git
> cd Your_First_Decentralized_Application
> npm install 
```

## Usage

After all dependancies are installed, run the `testrpc` service with:
```
node_modules/ethereumjs-testrpc/build/cli.node.js
```

Run the following commands to open the node console then deploy your contract to the test chain

```
$ node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
> code = fs.readFileSync('voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> var accounts;
>  var account;
>  web3.eth.getAccounts().then(function(result){  this.accounts = result;  this.account = accounts[0];  });

> voteContract = new web3.eth.Contract(abiDefinition, { from: account });

> voteContract.deploy({data: byteCode, arguments: [[web3.utils.fromAscii('Rama'),web3.utils.fromAscii('Nick'),web3.utils.fromAscii('Jose')]]}).send({ from: account, gas: 1500000}).on('error', function(error){ console.log(error) }).then(function(newContractInstance){ console.log(newContractInstance.options.address) });
```


## Credits

The credits for this code go to [maheshmurthy](https://gist.github.com/maheshmurthy). I've merely created a wrapper to get people started. 
