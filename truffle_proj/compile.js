const path = require("path");
const fs = require("fs");
const solc = require("solc");

const contractPath = path.resolve(__dirname, "contracts", "Calcu.sol");
const source = fs.readFileSync(contractPath, "utf8");

const input = {
    language: "Solidity",
    sources: {
      "Calcu.sol": {
        content: source,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
   },
      evmVersion: "london" 
    },
  };
  

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts["Calcu.sol"]["Calcu"];

fs.writeFileSync(
  path.resolve(__dirname, "build", "Calcu.json"),
  JSON.stringify(contract)
);
