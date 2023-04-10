import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";
import code from "./compile.js";

import dotenv from "dotenv";
dotenv.config();

const Interface = code.interface;
const bytecode = code.bytecode;

const provider = new HDWalletProvider(process.env.wallet, process.env.key);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(Interface))
    .deploy({ data: bytecode, arguments: ["Hi there!"] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("contract deployed to ", result.options.address);
  provider.engine.stop();
};

deploy();

// 0xcC59e758CEa28ce78F39B97dFAe488aebb672d34
