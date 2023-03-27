import { task } from 'hardhat/config';
import { LensHub__factory, CollectNFT__factory } from '../typechain-types';
import { getAddrs, initEnv, waitForTx } from './helpers/utils';

task('collect', 'collects a post').setAction(async ({}, hre) => {
    const [, , user] = await initEnv(hre);
    const addrs = getAddrs();
    const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user);

    await waitForTx(lensHub.collect(1, 1, []));

    const collectNFTAddr = await lensHub.getCollectNFT(1, 1);
    const collectNFT = CollectNFT__factory.connect(collectNFTAddr, user);

    const publicationContentURI = await lensHub.getContentURI(1, 1);
    const totalSupply = await collectNFT.totalSupply();
    const ownerOf = await collectNFT.ownerOf(1);
    const collectNFTURI = await collectNFT.tokenURI(1);

    console.log(`Collect NFT total supply (should be 1): ${totalSupply}`);
    console.log(
        `Collect NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user.address}`
    );
    console.log(
        `Collect NFT URI: ${collectNFTURI}, publication content URI (should be the same): ${publicationContentURI}`
    );
    
    // Follow NFT total supply (should be 1): 1
    // Follow NFT owner of ID 1: 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2, user address (should be the same): 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2
    // kevin@kevindeMacBook-Pro core % hardhat --network localhost collect
    // Collect NFT total supply (should be 1): 1
    // Collect NFT owner of ID 1: 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2, user address (should be the same): 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2
    // Collect NFT URI: https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz, publication content URI (should be the same): https://ipfs.io/ipfs/Qmby8QocUU2sPZL46rZeMctAuF5nrCc7eR1PPkooCztWPz
});
