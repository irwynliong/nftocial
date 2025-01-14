import {fetchNFTsData} from './fetch_nft_data_solana';
import { insert_row, insert_user } from '../database/supabase';

interface NFT {
  nft_id: string;
  contract_address: string;
}

async function insert_NFTsData(walletAddress: string) {
  const network = 'solana';
  try{
    const data = await fetchNFTsData(walletAddress);
    const result = data.nfts.map((nft: any) => ({
      nft_id: nft.nft_id,
      contract_address: nft.contract_address
    }));
    result.forEach((nft: NFT) => {
      const token_id = nft.nft_id;
      const token_address = nft.contract_address;
      insert_row(token_address, network, token_id);
    });
    console.log('NFTs inserted successfully');
  } catch (error) {
    console.error('Failed to insert NFTs:', error);
  }
}

async function insert_user_solana(username: string, wallet_address: string) {
  const network = 'solana';
  insert_user(username, wallet_address, network);
};

export {insert_NFTsData, insert_user_solana};

// insert_user_solana("unique_name", "9L36X5wpRgFHavH6NT5Rwo5Lwv9E6WkmiFKJNv6jvBdZ");
// insert_NFTsData('9L36X5wpRgFHavH6NT5Rwo5Lwv9E6WkmiFKJNv6jvBdZ');