const file = artifacts.require("file");

module.exports = function(deployer) {
  deployer.deploy(file);
};
