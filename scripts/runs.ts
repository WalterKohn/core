import {ethers} from "hardhat";
import {LensHub__factory, ProfileCreationProxy__factory} from "../typechain-types";
import {CreateProfileDataStruct, PostDataStruct} from "../typechain-types/LensHub";
import {waitForTx, ZERO_ADDRESS} from "../tasks/helpers/utils";
import {defaultAbiCoder} from "ethers/lib/utils";

// https://docs.lens.xyz/docs/deployed-contract-addresses
const addrs = require("./deployments/mumbai_deployments.json")

async function main() {

    const user0 = (await ethers.getSigners())[0];
    const user1 = (await ethers.getSigners())[1];

    const profileProxy = ProfileCreationProxy__factory.connect(addrs['MockProfileCreationProxy'], user0);
    const lensHub = LensHub__factory.connect(addrs['LensHubProxy'], user0);
    const freeCollectModule = LensHub__factory.connect(addrs['FreeCollectModule'], user0);

    // ========================= Create Profile ================================
    // const inputStruct: CreateProfileDataStruct = {
    //     to: user.address,
    //     handle: 'sd0328',
    //     imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
    //     followModule: ZERO_ADDRESS,
    //     followModuleInitData: [],
    //     followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
    // };
    // let tx = await profileProxy.proxyCreateProfile(inputStruct);
    // console.log("tx:", tx.hash);

    // ========================= Post ================================
    const inputStruct: PostDataStruct = {
        profileId: 29757,
        contentURI: 'ipfs://bafkreicelzjw3qjzsspkeo22ifbt6jvtzgb33uzrdu4ptveefae6bntl34',
        collectModule: freeCollectModule.address,
        collectModuleInitData: defaultAbiCoder.encode(['bool'], [false]), // followerOnly
        referenceModule: ZERO_ADDRESS,
        referenceModuleInitData: [],
    };
    // const inputStruct: PostDataStruct = {
    //     profileId: 29757,
    //     contentURI: 'https://raw.githubusercontent.com/WalterKohn/assets/master/slide2.json',
    //     collectModule: freeCollectModule.address,
    //     collectModuleInitData: defaultAbiCoder.encode(['bool'], [false]),
    //     referenceModule: ZERO_ADDRESS,
    //     referenceModuleInitData: [],
    // };
    // q:how to get nonce using ethers?
    let nonce = await ethers.provider.getTransactionCount(user0.address);
    console.log("nonce:", nonce);
    let transaction = await lensHub.post(inputStruct, {nonce: nonce, gasLimit: 500000});
    console.log("tx:", transaction.hash);


    // ========================= Collect ================================
    // await lensHub.collect(29757, 1, []); // self collect
    // await lensHub.connect(user1).follow([29757], [[]]); // follow once
    // await lensHub.connect(user1).collect(29757, 2, []); // collect by others

    // Follow & Collect can be done without Holding Profiles

    // ========================= Mirror ================================
    // const inputStruct: CreateProfileDataStruct = { 
    //     to: user1.address,
    //     handle: 'sd.user1',
    //     imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
    //     followModule: ZERO_ADDRESS,
    //     followModuleInitData: [],
    //     followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
    // };
    // await profileProxy.connect(user1).proxyCreateProfile(inputStruct);  // 29762

    // const mirrorStruct = {
    //     profileId: 29762,
    //     profileIdPointed: 29757,
    //     pubIdPointed: 1,
    //     referenceModuleData: [],
    //     referenceModule: ZERO_ADDRESS,
    //     referenceModuleInitData: []
    // }
    // await lensHub.connect(user1).mirror(mirrorStruct);

    // const mirrorStruct = {
    //     profileId: 29757,
    //     profileIdPointed: 29757,
    //     pubIdPointed: 1,
    //     referenceModuleData: [],
    //     referenceModule: ZERO_ADDRESS,
    //     referenceModuleInitData: []
    // }
    // await lensHub.mirror(mirrorStruct);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
