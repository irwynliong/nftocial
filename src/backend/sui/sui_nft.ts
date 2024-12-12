import {fetchNFTsForWallet} from './fetch_nft_data_by_wallet_address';

(async () => {
    try {
      const walletAddress = '0x61953ea72709eed72f4441dd944eec49a11b4acabfc8e04015e89c63be81b6ab';
      const nfts = await fetchNFTsForWallet(walletAddress);
      console.log('Wallet address NFTs:', nfts);
    } catch (error) {
      console.error('Failed to fetch NFTs:', error);
    }
  })();