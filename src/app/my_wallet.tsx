import Image from "next/image";
import { act, useState, useEffect } from "react";
import { ConnectButton, defaultTokens, useActiveAccount } from "thirdweb/react";
import { ThirdwebNftMedia, useContract, useNFT,  MediaRenderer } from "@thirdweb-dev/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client } from "../lib/client";
import { Button, Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { desc, img } from "framer-motion/client";
import generateSticker from "./generate_sticker";
import acquire_wallet_nfts from "./query_wallet_nfts";

export default function MyWallet() {
    const active_account = useActiveAccount();
    return (
        <main className="pt-20 pb-10 flex items-center justify-center container max-w-screen-lg mx-auto over">
            {active_account ? (
                <div className="flex flex-col items-center justify-center">
                    <p className="text-center text-gray-500">Your wallet address: {active_account.address}</p>
                    <MyNFTs />
                </div>
            ) : (
                <p className="text-center text-gray-500">Please connect your wallet to view your NFTs.</p>
            )}
        </main>
    );
}

type NFT = {
    id: number;
    address: string;
    tokenId: number;
    name: string;
    value: number;
    differential: boolean;
    sticker_created: boolean;
}

type NFTList = {
    nfts: NFT[];
}

function MyNFTs(){
    const [nfts, setNFTs] = useState<NFT[]>([]);
    const totalValue = nfts.reduce((acc, nft) => acc + nft.value, 0).toFixed(2);
    const handleGenerate = async (nft: NFT, img_src: string) => {
        try {
            setNFTs(nfts.map(nftItem => nftItem.id === nft.id ? {...nftItem, sticker_created: true} : nftItem));
            generateSticker(nft.name, img_src);
        }
        catch (error) {
            console.error(error);
        }
    }
    const handleRefreshNFTs = async (wallet_address: string) => {
        try {
            const nfts = await acquire_wallet_nfts(wallet_address);
            setNFTs(nfts.map(nft => ({
                id: nft.id,
                address: nft.address,
                tokenId: nft.tokenId,
                name: nft.name,
                value: parseFloat(Math.random().toFixed(2)),
                differential: true,
                sticker_created: false
            })));
            console.log(nfts);
        }
        catch (error) {
            console.error(error);
        }
    }
    const active_account = useActiveAccount();
    return (
        <div className="text-center">
            <div className="pt-4 pb-4" style={{ marginTop: "10px", margin:"auto", minWidth:"500px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", backgroundColor: "black", color:"white", padding: "10px", margin: "5px", borderRadius: "4px" }}
                onMouseEnter={(e) => {
                    e.currentTarget.querySelectorAll('span')[0].textContent = "Refresh";
                    e.currentTarget.querySelectorAll('span')[1].textContent = "";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.querySelectorAll('span')[0].textContent = "Total Value";
                    e.currentTarget.querySelectorAll('span')[1].textContent = totalValue;
                }}
                onClick={() => active_account?.address && handleRefreshNFTs(active_account.address)}
            >
                <span>Total Value</span>
                <span>{totalValue}</span>
            </div>
            </div>
            <div className="grid grid-cols-4 gap-6 m-4">
                {nfts.map((nft, index) => (
                    <ImportedNFT key={index} nft={nft} handleGenerate={(nft, nftData) => handleGenerate(nft, nftData)} />
                ))}
            </div>
        </div>
    );
}

function ImportedNFT({ nft, handleGenerate }: { nft: NFT; handleGenerate: (nft: NFT, nftData: any) => void; }) {
    const { contract } = useContract(nft.address);
    const { data: nftData, isLoading, error } = useNFT(contract, nft.tokenId);
    if (isLoading) {
        return (
            <div 
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: '#f0f0f0', 
                    borderRadius: '8px', 
                }} 
            />
        );
    }
    if (error) {
        return <p>NFT not found</p>;
    }

    return nftData?.metadata ? (    
        <div style={{ position: 'relative' }}>
            <ThirdwebNftMedia 
                metadata={nftData.metadata} 
                controls={true}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} 
            />
            {!nft.sticker_created && (
                <Button
                    className="absolute border-white/20 border-1 overflow-hidden bottom-2 text-tiny text-white bg-black/50 flex justify-center"
                    color="default"
                    radius="lg"
                    size="sm"
                    variant="flat"
                    style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)' }}
                    onClick={() => handleGenerate(nft, nftData.metadata.image?.toString())}
                >
                    Generate Sticker
                </Button>
            )}
        </div>
    ) : (
        <p>NFT metadata not available</p>
    );
}
