import {ethers} from "hardhat";
import {CollectNFT__factory, LensHub__factory} from "../typechain-types";

const addrs = require("./deployments/mumbai_deployments.json")

async function main() {

    const user0 = (await ethers.getSigners())[0];

    const lensHub = LensHub__factory.connect(addrs['LensHubProxy'], user0);

    // ========================= Profile ID ================================
    // console.log(`Total supply: ${await lensHub.totalSupply()}`);
    // console.log(`Profile by owner: ${await lensHub.tokenOfOwnerByIndex(user.address, 0)}`); // 29757
    // console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle("sd0328.test")}`);

    // ========================= Profile Data ================================
    let profile = await lensHub.getProfile(29757);
    // let profile = await lensHub.getProfile(29762);
    // console.log(`pubCount: ${profile.pubCount}`);
    // console.log(`followModule: ${profile.followModule}`);
    // console.log(`followNFT: ${profile.followNFT}`);
    // console.log(`handle: ${profile.handle}`);
    // console.log(`imageURI: ${profile.imageURI}`);
    // console.log(`followNFTURI: ${profile.followNFTURI}`);
    
    // pubCount: 2
    // followModule: 0x0000000000000000000000000000000000000000
    // followNFT: 0x1Bc396aC9b3Dd3D3c73e301B9a54cB6E71c1e206
    // handle: sd0328.test
    // imageURI: https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX
    // followNFTURI: https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS

    // ========================= Pub Data ================================
    let pub = await lensHub.getPub(29757, 20);
    // let pub = await lensHub.getPub(29762, 2);
    console.log(`profileIdPointed: ${pub.profileIdPointed}`); // original profile id
    console.log(`pubIdPointed: ${pub.pubIdPointed}`); // original publication id
    console.log(`contentURI: ${pub.contentURI}`);
    console.log(`referenceModule: ${pub.referenceModule}`);
    console.log(`collectModule: ${pub.collectModule}`);
    console.log(`collectNFT: ${pub.collectNFT}`);
    //
    // profileIdPointed: 0
    // pubIdPointed: 0
    // contentURI: https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz
    // referenceModule: 0x0000000000000000000000000000000000000000
    // collectModule: 0x0BE6bD7092ee83D44a6eC1D949626FeE48caB30c
    // collectNFT: 0x0000000000000000000000000000000000000000

    // ========================= Collect NFT ================================
    // const collectNFTAddr = await lensHub.getCollectNFT(29757, 1);
    // const collectNFT = CollectNFT__factory.connect(collectNFTAddr, user0);
    //
    // const publicationContentURI = await lensHub.getContentURI(29757, 1);
    // const totalSupply = await collectNFT.totalSupply();
    // const ownerOf = await collectNFT.ownerOf(1);
    // const collectNFTURI = await collectNFT.tokenURI(1);
    // const ownerOf2 = await collectNFT.ownerOf(2);
    //
    // console.log(`Collect NFT total supply: ${totalSupply}`);
    // console.log(`Collect NFT owner of ID 1: ${ownerOf}`);
    // console.log(`Collect NFT owner of ID 2: ${ownerOf2}`);
    // console.log(`Collect NFT URI: ${collectNFTURI}, publication content URI (should be the same): ${publicationContentURI}`);
    
    // Collect NFT total supply: 2
    // Collect NFT owner of ID 1: 0x1fD0A4b25D83461fF6963a718aE631C96453DF55
    // Collect NFT owner of ID 2: 0x1A4dCDb6DcB984a337a30937507548F68A8e734B
    // Collect NFT URI: https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz, 
    // publication content URI (should be the same): https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
