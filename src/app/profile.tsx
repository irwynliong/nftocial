import { Image, Avatar, Tooltip } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { ConnectButton, defaultTokens } from "thirdweb/react";
import { client } from "../lib/client";
import ProfileCard from "./card";
import fetchStickers from "./fetch_stickers";
import Login from "./login";
import { px } from "framer-motion";


export default function Profile() {
    return (
        <main className="pt-20 h-[80vh] flex items-center justify-center container max-w-screen-lg mx-auto">
            <ProfilePage />
            <DisplayStickers />
        </main>
    );
}

function ProfilePage(){
    const socialLinks = [
        { platform: 'instagram', username: "yusiangzzz" },
        { platform: 'linkedin', username: 'educator69'}
    ];

    const connections = [
        { name: "Irwyn Liong", location: "New York City", date: "Dec 9 2024" },
        { name: "Marcus Yeo", location: "San Francisco", date: "Dec 8 2024" },
    ];
    return (
        <div
            style={{
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
          padding: "20px",
          display: "flex", // Use flexbox
          flexDirection: "column", // Stack children vertically
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
          backdropFilter: "blur(10px)", // Glass effect
          backgroundColor: "rgba(255, 255, 255, 0.5)", // Semi-transparent background
          borderRadius: "10px", // Rounded corners
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow
          zIndex: 1, // Ensure it stays on top
            }}
        >
        <Avatar className="w-40 h-40" src="/thirdweb.svg" alt="Profile Avatar"/>
        <div style={{ marginTop: "20px" }}>
          {socialLinks.map((link, index) => (
            <div key={index} style={{ backgroundColor: "#F6F6F9", padding: "10px", margin: "5px", borderRadius: "4px" }}>
              <strong>{link.platform}</strong> {link.username}
            </div>
          ))}
        </div>
        <h3 style={{ marginTop: "20px", textDecoration: "underline" }}>connections</h3>
        <div style={{ marginTop: "10px", width: "400px" }}>
          {connections.map((connection, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#F6F6F9",
                padding: "10px",
                margin: "5px",
                borderRadius: "4px",
              }}
            >
              <span>{connection.name}</span>
              <span>{connection.location}</span>
              <span>{connection.date}</span>
            </div>
          ))}
        </div>
      </div>
    );
}

function DisplayStickers(){
  const [stickers, setStickers] = useState<string[]>([]);
  useEffect(() => {
    const fetchAndSetStickers = async () => {
      const data = await fetchStickers();
      setStickers(data);
    };
    fetchAndSetStickers();
  }, []);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {stickers.map((sticker, index) => (
        <HoveringSticker key={index} src={sticker} />
      ))}
    </div>
  );
}

function HoveringSticker({ src }: { src: string }) {
  const [scale, setScale] = useState(Math.random() * 0.5 + 0.75); // Random start size between 0.75 and 1.25
  const [position] = useState({ 
    x: Math.random() * 90, // Ensure it doesn't go out of viewport horizontally
    y: Math.random() * 90  // Ensure it doesn't go out of viewport vertically
  });
  const pulseRate = useState(Math.random() * 2000 + 1000)[0]; // Random pulse rate between 1s and 3s

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prevScale) => (prevScale === 1 ? 1.1 : 1));
    }, pulseRate); // Pulse at random rate

    return () => clearInterval(interval);
  }, [pulseRate]);

  return (
    <div
      style={{
      position: "absolute",
      top: `${position.y}vh`,
      left: `${position.x}vw`,
      transform: `scale(${scale})`,
      transition: `transform ${pulseRate / 1000}s ease-in-out`,
      }}
    >
      <Tooltip content={`${Math.random().toFixed(2)} ETH`} placement="top">
      <Image 
        src={src.replace(/^public\//, '')} 
        width={150} 
        height={"auto"} 
        alt="Sticker" 
      />
      </Tooltip>
    </div>
  );
}
