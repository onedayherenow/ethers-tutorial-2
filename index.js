
// 1. Declare global variable to store the web3 instance
let PetContract;

// 2. Set contract address and ABI
const Pet_Contract_Address = "";
const Pet_Contract_ABI = [];

// 3. Prompt user to sign in with MetaMask
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
    
    provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then((accounts) => {
            const signer = provider.getSigner(accounts[0]);

            /* 3.1 Create instance of pet smart contract */
            PetContract = new ethers.Contract(
                Pet_Contract_Address,
                Pet_Contract_ABI,
                signer
            );
        });
    });