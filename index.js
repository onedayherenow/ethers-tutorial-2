
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

            /* 3.1 Create instance of member smart contract */
            MemberContract = new ethers.Contract(
                Member_Contract_Address,
                Member_Contract_ABI,
                signer
            );
        });
    });


    // 4. Creating variables for reusable dom elements
const memberFormSection = document.querySelector(".member-form-section");   // selects these elements by their class name, and assigns it to a variable
const showMemberFormBtn = document.querySelector(".show-member-form-button");
const memberSection = document.querySelector(".member-detail-section");
const setMemberButton = document.querySelector("#set-new-member");
const refreshBtn = document.querySelector(".refresh-member-details-btn");



// 5. Function to set member details
const setNewPet = () => {
    //update button value
    setMemberButton.value = "Setting Member...";

    /* 5.1 Get inputs from pet form */
    const memberNameInput = document.querySelector("#member-name");
    const memberDistrictInput = document.querySelector("#member-district")
    const memberAgeInput = document.querySelector("#member-age");

    /* 5.2 Getting values from the inputs  */
    memberName = memberNameInput.value;
    memberDistrict = memberDistrictInput.value;
    memberAge = memberAgeInput.value;

    /* 5.3. Set member details in smart contract according to those values we recieved from the inputs to our form */
    MemberContract.setMember(memberName, memberDistrict, memberAge)
    .then(() => {
        // update button value after we've set contract member details
        setMemberButton.value = "Member Set...";

        /* 5.4 Reset form after we've set contract member details*/
        memberNameInput.value = "";
        memberDistrictInput.value = "";
        memberAgeInput.value = "";

        // update button value
        setMemberButton.value = "Set Member";

        /* 5.5 Get current set member details from smart contract */
        getCurrentMember();
    })
    .catch((err) => {
        // If error occurs, display error message
        setMemberButton.value = "Set Member";
        alert("Error setting member details" + err.message);
    }); 
};

/* Function to set pet details on click of button */
setMemberButton.addEventListener("click", setNewMember);