import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';

task('create-profile', 'creates a profile').setAction(async ({}, hre) => {
    const [governance, , user] = await initEnv(hre);
    const addrs = getAddrs();
    const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
    await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

    const inputStruct: CreateProfileDataStruct = {
        to: user.address,
        handle: 'zer0dot',
        imageURI: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
        followModule: ZERO_ADDRESS,
        followModuleInitData: [],
        followNFTURI: 'https://ipfs.io/ipfs/QmTFLSXdEQ6qsSzaXaCSNtiv6wA56qq87ytXJ182dXDQJS',
    };

    await waitForTx(lensHub.connect(user).createProfile(inputStruct));

    console.log(`Total supply (should be 1): ${await lensHub.totalSupply()}`);
    console.log(
        `Profile owner: ${await lensHub.ownerOf(1)}, user address (should be the same): ${user.address}`
    );
    console.log(
        `Profile ID by handle: ${await lensHub.getProfileIdByHandle(
            'zer0dot'
        )}, user address (should be the same): ${user.address}`
    );
    
    // Total supply (should be 1): 1
    // Profile owner: 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2, user address (should be the same): 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2
    // Profile ID by handle: 1, user address (should be the same): 0x92561F28Ec438Ee9831D00D1D59fbDC981b762b2
});


