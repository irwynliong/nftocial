import { Image, Avatar } from "@nextui-org/react";
import { ConnectButton, defaultTokens } from "thirdweb/react";
import { client } from "./client";
import ProfileCard from "./card";

export default function Profile() {
    return (
        <main className="pt-20 h-[80vh] flex items-center justify-center container max-w-screen-lg mx-auto">
            <ProfileCard />
            <ProfilePage />
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
                height: "100vh", // Take full viewport height for vertical centering
                width: "100vw", // Take full viewport width for horizontal centering
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