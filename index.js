
// 1. Declare global variable to store the web3 instance
let MemberContract;

// 2. Set contract address and ABI
const Member_Contract_Address = "0xc663e48592E6dE1a37843410777886D2255Cc15c";
const Member_Contract_ABI = [];

// 3. Prompt user to sign in with MetaMask
const provider = new ethers.providers.Web3Provider(window.ethereum, "goerli");
    
    provider.send("eth_requestAccounts", []).then(() => {
        provider.listAccounts().then((accounts) => {
            const signer = provider.getSigner(accounts[0]);

            /* 3.1 Create instance of pet smart contract */
            MemberContract = new ethers.Contract(
                Member_Contract_Address,
                Member_Contract_ABI,
                signer
            );
        });
    });


    // 4. Creating variables for reusable dom elements
const memberFormSection = document.querySelector(".pet-form-section");   // selects these elements by their class name, and assigns it to a variable
const showMemberFormBtn = document.querySelector(".show-pet-form-button");
const memberSection = document.querySelector(".member-detail-section");
const setMemberButton = document.querySelector("#set-new-member");
const refreshBtn = document.querySelector(".refresh-pet-details-btn");



// 5. Function to set member details