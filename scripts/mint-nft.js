require("dotenv").config();
const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/R_ARgxNZ0FwlDTAh-gdm9CkyafsIRb0U";

const PUBLIC_KEY = "0x8446d2Bf4744892ccF77fA827a51aA44cef6E065";
 const RINKEBY_PRIVATE_KEY ="44b260f00d55e09688f514a3d44ed91a99835040ef79f3ef2c40580b2c07e429";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

//console.log(JSON.stringify(contract.abi));

const contractAddress = "0x61e12C9bB099195Be5A4CADb7552EA66E7B071eD";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);


async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce
  
    const tx = {
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
      };
    
      const signPromise = web3.eth.accounts.signTransaction(tx, RINKEBY_PRIVATE_KEY);
  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}
mintNFT(
     "https://gateway.pinata.cloud/ipfs/QmdgKoaWfsnp1Wpgtt3nyGvi8csCmwMUZQBbYEfSY3rDXA",
  
);
