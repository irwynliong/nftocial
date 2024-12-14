const dev_API_URL = "http://localhost:8000/test_acquire_wallet_nfts"; 
const prod_API_URL = "https://api.nft-sticker-generator.com/acquire_wallet_nfts";

type NFT = {
    id: number;
    address: string;
    tokenId: number;
    description: string;
    name: string;
}

async function acquire_wallet_nfts(wallet_address: string): Promise<Array<NFT>> {
    try {
        const formData = new FormData();
        formData.append("wallet_address", wallet_address);
        let response = await fetch(dev_API_URL, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to acquire wallet NFTs");
        }
        const data = await response.json();
        const output: Array<NFT> = [];
        data.map((nft:any, index: number) => {
            output.push(
                {
                    id: index,
                    address: nft.address,
                    tokenId: nft.tokenId,
                    description: nft.description,
                    name: nft.name,
                }
            )
        }
        );  
        return output;
    }
    catch (error) {
            console.error("Error acquiring wallet NFTs:", error);
            throw error;
        }
    }

export default acquire_wallet_nfts;