const { ethers } = require('ethers');

// Daftar private key dan alamat pengirim
const senders = [
    { privateKey: 'YOUR PRIVATE KEY', address: '0x...your address wallet...' },
    { privateKey: 'YOUR PRIIVATE KEY', address: '0x...your address wallet...' }
];

// Alamat penerima
const recipientAddress = 'INPUT YOUR Recipient Address here';

// Alamat kontrak token USDC
const usdcContractAddress = '0x22F2D35C812Ad4Fe5B8AA3658a5E3Fc1c3D7bA27';

// ABI kontrak ERC-20
const erc20Abi = [
    'function transfer(address to, uint amount) public returns (bool)',
];

// Buat instance provider ke jaringan Ethereum menggunakan URL RPC dari Alchemy
const provider = new ethers.providers.JsonRpcProvider('https://base-sepolia.g.alchemy.com/v2/CHANGE TO YOUR OWN API');//<--------- DON'T FORGET TO CHANGE THIIS

async function sendToken(senders, recipient, tokenContractAddress) {
    for (const sender of senders) {
        try {
            // Buat instance wallet untuk setiap pengirim
            const wallet = new ethers.Wallet(sender.privateKey, provider);

            // Buat instance kontrak token USDC
            const tokenContract = new ethers.Contract(tokenContractAddress, erc20Abi, wallet);

            // Tentukan jumlah token yang akan dikirim (ex. 500 USDC)
            const amountInTokens = ethers.utils.parseUnits('500.0', 6); // USDC memiliki 6 desimal

            // Kirim transaksi token
            const txResponse = await tokenContract.transfer(recipient, amountInTokens);
            console.log(`Transaksi dari ${sender.address} berhasil dikirim: ${txResponse.hash}`);

            // Tunggu sampai transaksi masuk ke dalam blok
            await txResponse.wait();
            console.log(`Transaksi dari ${sender.address} telah dikonfirmasi dalam blok.`);
        } catch (error) {
            console.error(`Transaksi dari ${sender.address} gagal:`, error);
        }
    }
}

sendToken(senders, recipientAddress, usdcContractAddress);
