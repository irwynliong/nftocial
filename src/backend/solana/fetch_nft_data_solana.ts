import axios, {AxiosRequestConfig} from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const SIMPLEHASH_API = process.env.SIMPLEHASH_API;

export async function fetchNFTsData(walletAddress: string): Promise<any> {
    if (!walletAddress) {
        throw new Error('Wallet address is required.');
    }
    const apiUrl = `https://api.simplehash.com/api/v0/nfts/owners_v2?chains=solana&wallet_addresses=${walletAddress}`;

    const options = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: apiUrl,
        headers: {
            'x-api-key': SIMPLEHASH_API,
            'Accept': 'application/json',
        },
    };
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        throw error;
    }
};

export default fetchNFTsData;