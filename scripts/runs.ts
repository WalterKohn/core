import {ethers} from "hardhat";
import {LensHub__factory} from "../typechain-types";
import {CreateProfileDataStruct} from "../typechain-types/LensHub";
import {ZERO_ADDRESS} from "../tasks/helpers/utils";

// https://docs.lens.xyz/docs/deployed-contract-addresses
const addrs = require("./deployments/mumbai_deployments.json")

async function main() {

    const user = (await ethers.getSigners())[0];

    const lensHub = LensHub__factory.connect(addrs['LensHubProxy'], user);

    const inputStruct: CreateProfileDataStruct = {
        to: user.address,
        handle: 'k03271',
        imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
        followModule: ZERO_ADDRESS,
        followModuleInitData: [],
        followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
    };
    
    let tx = await lensHub.connect(user).createProfile(inputStruct);
    console.log("tx:", tx.hash);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
