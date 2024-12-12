import { fetchNFTsData } from './fetch_nft_data';

type Collectible = {
  address: string;
  tokenUri: string;
};

(async () => {
  try {
    const walletAddress = '0x3d9fd60AEC344C20Fc0ef161f59225181730f47B';
    const nfts = await fetchNFTsData(walletAddress);
    // console.log('NFTs:', nfts);
    const walletAddressWithToken: Collectible[] = nfts.collectibleBalances.map((nft: any) => ({
      address: nft.address,
      tokenUri: nft.tokenUri,
    }));

    console.log('Wallet Address with Token URIs:', walletAddressWithToken);
  } catch (error) {
    console.error('Failed to fetch NFTs:', error);
  }
})();
