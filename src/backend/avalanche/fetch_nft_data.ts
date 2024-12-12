import { AvaCloudSDK } from "@avalabs/avacloud-sdk";
const dotenv = require('dotenv');

dotenv.config();
const AVACLOUD_API = process.env.AVACLOUD_API;

const avaCloudSDK = new AvaCloudSDK({
    apiKey: AVACLOUD_API,
    chainId: "43114",
    network: "mainnet",
  });

export async function fetchNFTsData(walletAddress: string): Promise<any> {
    const result = await avaCloudSDK.data.evm.balances.listCollectibleBalances({
        address: walletAddress,
    });

    return result.result;
};

export default fetchNFTsData;
