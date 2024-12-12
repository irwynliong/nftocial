import axios, {AxiosRequestConfig} from 'axios';
const dotenv = require('dotenv');

dotenv.config();

const BLOCKBERRY_API = process.env.BLOCKBERRY_API;

export async function fetchNFTsForWallet(walletAddress: string): Promise<any> {
  if (!walletAddress) {
    throw new Error('Wallet address is required.');
  }

  const apiUrl = `https://api.blockberry.one/sui/v1/nfts/wallet/${walletAddress}?page=0&size=20&orderBy=DESC&sortBy=AGE`;

  const options = {
    method: 'GET',
    url: apiUrl,
    headers: {
      accept: '*/*',
      'x-api-key': BLOCKBERRY_API,
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

export default fetchNFTsForWallet;