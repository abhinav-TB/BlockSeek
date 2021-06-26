const Blockseek = artifacts.require("Blockseek");

module.exports = function(deployer) {
  deployer.deploy(Blockseek);
};