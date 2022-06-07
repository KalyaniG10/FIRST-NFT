/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-ethers")

 const ALCHEMY_API_KEY ="R_ARgxNZ0FwlDTAh-gdm9CkyafsIRb0U";
 const RINKEBY_PRIVATE_KEY ="44b260f00d55e09688f514a3d44ed91a99835040ef79f3ef2c40580b2c07e429";
 module.exports = {
   solidity: "0.8.9",
 
   networks:{
   rinkeby:{
     url:`https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
     accounts:[`${RINKEBY_PRIVATE_KEY}`],
   }
 
   }
 };