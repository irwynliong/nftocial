import { fetchNFTsData } from './fetch_nft_data';
import { insert_row } from '../database/supabase';

interface NFT {
  nft_id: string;
  contract_address: string;
}

// (async () => {
//   try {
//     const walletAddress = '0x3d9fd60AEC344C20Fc0ef161f59225181730f47B';
//     const nfts = await fetchNFTsData(walletAddress);
//     console.log('NFTs:', nfts);
//     // const walletAddressWithToken: Collectible[] = nfts.collectibleBalances.map((nft: any) => ({
//     //   address: nft.address,
//     //   tokenUri: nft.tokenUri,
//     // }));

//     // console.log('Wallet Address with Token URIs:', walletAddressWithToken);
//   } catch (error) {
//     console.error('Failed to fetch NFTs:', error);
//   }
// })();

async function insert_NFTsData(walletAddress: string) {
  const network = 'avalanche';
  try{
    const data = await fetchNFTsData(walletAddress);
    console.log('NFTs:', data);
    const result = data.collectibleBalances.map((nft: any) => ({
      nft_id: nft.tokenId,
      contract_address: nft.address
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

export {insert_NFTsData};

insert_NFTsData('0x3d9fd60AEC344C20Fc0ef161f59225181730f47B');