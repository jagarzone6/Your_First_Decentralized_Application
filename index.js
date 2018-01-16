/*
Web3 = require('web3');
*/
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[ { "constant": false, "inputs": [ { "name": "candidate", "type": "bytes32" } ], "name": "totalVotesFor", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x2f265cf7" }, { "constant": false, "inputs": [ { "name": "candidate", "type": "bytes32" } ], "name": "validCandidate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0x392e6678" }, { "constant": true, "inputs": [ { "name": "", "type": "bytes32" } ], "name": "votesReceived", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0x7021939f" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "candidateList", "outputs": [ { "name": "", "type": "bytes32" } ], "payable": false, "stateMutability": "view", "type": "function", "signature": "0xb13c744b" }, { "constant": false, "inputs": [ { "name": "candidate", "type": "bytes32" } ], "name": "voteForCandidate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function", "signature": "0xcc9ab267" }, { "inputs": [ { "name": "candidateNames", "type": "bytes32[]" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor", "signature": "constructor" } ] ');
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractAddress = '0x84572a574ce1cfE122DDe9bF774E2F6023B28f3f';
contractInstance = new web3.eth.Contract(abi, contractAddress);

candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"};

var accounts;
var account;
web3.eth.getAccounts().then(function(result){
this.accounts = result;
this.account = accounts[0];
});



function voteForCandidate() {
  candidateName = $("#candidate").val();
  contractInstance.methods.voteForCandidate(web3.utils.fromAscii(candidateName)).send({from: account}).then(function(receipt) {

  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];

    contractInstance.methods.totalVotesFor(web3.utils.fromAscii(name)).call().then(function(result){
                      let val = result;
                       $("#" + candidates[name]).html(val);
                                                             });

  }

   });

}

$(document).ready(function() {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];

    contractInstance.methods.totalVotesFor(web3.utils.fromAscii(name)).call().then(function(result){
                      let val = result;
                       $("#" + candidates[name]).html(val);
                                                             });

  }
});