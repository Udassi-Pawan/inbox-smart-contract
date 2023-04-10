import ganache from "ganache-cli";
import assert from "assert";
import Web3 from "web3";
import code from "../compile.js";

const web3 = new Web3(ganache.provider());

const { bytecode } = code;
const Interface = code.interface;

let accounts, inbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(Interface))
    .deploy({ data: bytecode, arguments: ["Hi there"] })
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("deployment ok hai?", () => {
    assert.ok(inbox.options.address);
  });

  it("initialization hui gaba?", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "Hi there");
  });

  it("change ho ria na?", async () => {
    await inbox.methods
      .setMessage("mkc")
      .send({ from: accounts[0], gas: "1000000" });

    const message = await inbox.methods.message().call();
    assert.equal(message, "mkc");
  });
});
