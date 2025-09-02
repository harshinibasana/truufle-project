const express = require("express");
const app = express();
const path = require("path");
const Web3 = require("web3").default; 
const fs = require("fs");

const contractData = require("./build/Calcu.json");
const contractAddress = fs.readFileSync("contractAddress.txt", "utf8");

const web3 = new Web3("http://127.0.0.1:7545");
const contract = new web3.eth.Contract(contractData.abi, contractAddress);

app.use(express.static("public"));
app.use(express.json());

const owner = async () => (await web3.eth.getAccounts())[0];
app.post("/operate", async (req, res) => {
    const { op, val1, val2 } = req.body;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    try {
      let tx;
      switch(op) {
        case "add":
          tx = await contract.methods.addTwo(val1, val2).send({ from: account, gas: 100000 });
          break;
        case "sub":
          tx = await contract.methods.subTwo(val1, val2).send({ from: account, gas: 100000 });
          break;
        case "multi":
          tx = await contract.methods.multiTwo(val1, val2).send({ from: account, gas: 100000 });
          break;
        case "divi":
          tx = await contract.methods.diviTwo(val1, val2).send({ from: account, gas: 100000 });
          break;
        case "reset":
          tx = await contract.methods.reset().send({ from: account, gas: 100000 });
          break;
        default:
          return res.status(400).send({ error: "Invalid operation" });
      }
  
      // After transaction mined, get updated result
      const currentResult = await contract.methods.getRes().call();
      res.send({ result: parseInt(currentResult) });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
app.listen(3000, () => console.log("Running on http://localhost:3000"));
