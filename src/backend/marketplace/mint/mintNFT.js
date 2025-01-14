var dotenv = require('dotenv');
dotenv.config();
var apiKey = process.env.CROSSMINT_API;
console.log(apiKey);
if (!apiKey) {
    throw new Error("CROSSMINT_API is not defined");
}
var chain = "solana"; // or "polygon-amoy", "ethereum-sepolia", ...
var env = "staging"; // or "www"
var recipientEmail = "irwynliong01@gmail.com";
var recipientAddress = "email:".concat(recipientEmail, ":").concat(chain);
var url = "https://".concat(env, ".crossmint.com/api/2022-06-09/collections/default/nfts");
var options = {
    method: "POST",
    headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-key": apiKey,
    },
    body: JSON.stringify({
        recipient: recipientAddress,
        metadata: {
            name: "Crossmint Test NFT",
            image: "https://picsum.photos/400",
            description: "My first NFT using Crossmint",
        },
    }),
};
fetch(url, options)
    .then(function (res) { return res.json(); })
    .then(function (json) { return console.log(json); })
    .catch(function (err) { return console.error("error:" + err); });
