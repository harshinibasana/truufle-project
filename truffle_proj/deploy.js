const Web3 = require("web3").default;
const fs = require("fs");
const contractData = require("./build/contracts/Calcu.json");

const web3 = new Web3("http://127.0.0.1:7545"); // Ganache

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Deploying from", accounts[0]);

  const contract = new web3.eth.Contract(contractData.abi);

  const result = await contract
    .deploy({ data: contractData.bytecode})
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to:", result.options.address);

  fs.writeFileSync("contractAddress.txt", result.options.address);
};
console.log("Available keys in contractData:", Object.keys(contractData));

deploy();


