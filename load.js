
Web3 = require('web3');
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8101"));
solc = require('solc');
compiledCode = solc.compile(fs.readFileSync('rc.sol').toString());
abiDefinition = JSON.parse(compiledCode.contracts[':RC'].interface);
//abi = JSON.stringify(abiDefinition);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractAddress = '0xB91d9f7032B1B51Eb407644A82979eEf86b10c00';
contractInstance = new web3.eth.Contract(abiDefinition, contractAddress);

var account = '0xf86dF96aCC3B97278DFdeeDC12C8B1D8B5c605Cf';

contractInstance.methods.new_delivery('0x8aca9664752dbae36135fd0956c956fc4a370feeac67485b49bcd4b99608ae41','0xf86dF96aCC3B97278DFdeeDC12C8B1D8B5c605Cf').send({from: account, value: web3.utils.toWei('500','ether')}).then(function(receipt) {console.log(receipt)});

contractInstance.methods.choose_delivery('0x8aca9664752dbae36135fd0956c956fc4a370feeac67485b49bcd4b99608ae41','0x0ef215cecb88926b7586edc7c9daed1bd51a6899445df28f28e6f53c8027ad6f').send({from: account}).then(function(receipt) {console.log(receipt)});

contractInstance.methods.confirm_pickup('0x8aca9664752dbae36135fd0956c956fc4a370feeac67485b49bcd4b99608ae41','hola2','0x59c80419d74cf496eb78081e4555ad64ddb8877071cdcf113ab289ab1aace1fe').send({from: account}).then(function(receipt) {console.log(receipt)});

contractInstance.methods.confirm_drop('0x8aca9664752dbae36135fd0956c956fc4a370feeac67485b49bcd4b99608ae41','hola3','hola').send({from: account}).then(function(receipt) {console.log(receipt)});


