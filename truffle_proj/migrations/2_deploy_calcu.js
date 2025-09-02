const Calcu = artifacts.require("Calcu");

module.exports = function (deployer) {
  deployer.deploy(Calcu);
};