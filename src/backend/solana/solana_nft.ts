import {fetchNFTsData} from './fetch_nft_data_solana';

(async () => {
    try {
      const walletAddress = '9L36X5wpRgFHavH6NT5Rwo5Lwv9E6WkmiFKJNv6jvBdZ';
      const nfts = await fetchNFTsData(walletAddress);
      console.log('Wallet address NFTs:', nfts);
    } catch (error) {
      console.error('Failed to fetch NFTs:', error);
    }
  })();