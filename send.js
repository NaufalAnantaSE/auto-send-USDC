const { ethers } = require('ethers');

// Daftar private key dan alamat pengirim
const senders = [
    { privateKey: '540fe02f00fa142e07ac4e95cc8c1f415b9395cb9ed610ec85f3f97d87827179', address: '0xbEc419e7A9ee41c75f2C90640bd757EC83c37068' },
    { privateKey: 'ae02042a69fa5fffde15b0d9c6ed16cf9bcb609ee3dd1bc4607fd23cf5dfb0cd', address: '0x58827B4082673b482b7D4aBABf43648b0AEDdE85' },
    { privateKey: 'e58d42e51f08b56388b34bdd7a18593447214578cca88b6b4d98a2f041ed5a78', address: '0xe81E11bF1A4FCd393309a258911232ac246d9518' },
    { privateKey: '814c0c003719dbc9369926f279d83c960b23ebc0c92d76a17ae532a5643366e3', address: '0x1beB5A1A884408A3C9AB56a2BEdD86983823CfB3' },
    { privateKey: '24f0a74296eb5e18aa1fb625746748251f864e704570c13ada6a0e89210931fc', address: '0xcEf512Bcfe04f20c8eB5804f230c0AcCE2d37d5F' },
    { privateKey: '3be0e6e00d95c9ceb777d9890d683130a477c72899127c9084f673d6331e6156', address: '0x8E9CA5E19af1d57eDcd3CFF7BcBEb92886351aaD' },
    { privateKey: '352de3910cdc6c54b8abd44a4a1df4a14c2c6b86553887d579a23e4556506525', address: '0x2035402A496427a9620568753C04bC6b783A1C0D' },
    { privateKey: 'aabd7bcf50e64f6e7e14be36827ffc4a5a532d036397ee206ef1b027cdab2446', address: '0x0ed08a81bfA8286c0B553575FCcc86B1373BAfEE' },
    { privateKey: '9033a0aba4a87f12e23d82bb1fb4d99fbd59966dde6fb72dc6de60db2b57fb8d', address: '0xb3f0711a3F00155EDACD13b577fe61f87B6607c9' },
    { privateKey: '035120299b01a1d93cc231d97c0706b283d3fecbd88f18fdc27fc7c2601bc39f', address: '0xb0F8A3C117728B4A8137af56B8d663cCa1e9A119' },
    { privateKey: 'cb0262831c9bb7e29fc319eb97d42af27cfbbb03b2fc23369e761eae269d4868', address: '0x5941A01445af3a2b4981421a534291c1CE6E7492' },
    { privateKey: '5d32f470bb8b67bd291d7be9de77db0e94e0bf06f0893c741ea2975ebdcb5127', address: '0x89BEA3cE18426cfc81a0385A0AAEC406aC38f462' },
    { privateKey: '9c37ec52fb5ebacd168a831c74a0a4df4c50ef6c72e254077c04a2d59d3ad1ba', address: '0x86319EC03D51efF1D4dfe492dd0b72d02c178127' },
    { privateKey: '8089267423dae1a13e2f36b4fac92615b9a6b6ab861a37b007ab43ffc1e10f21', address: '0xC36e887b85234edE9EfeD0F8b0218c50283fd8Ca' },
    { privateKey: '56b71d4ead805e13ac2c10a2c912f890dc468cd380ad907a77540e641e110ac0', address: '0xC7bc2D5e48f00804c0EEF9D69e054767fdB10D9d' },
    { privateKey: '4b6d360a247c0ee3283ec11c44f85efbc4f2282828ed2bda1ac796f1b9e38a51', address: '0x5b210B6D834e9b99F53b789229303aB8D1dAd099' },
    { privateKey: '56a9a57ffa9193bb64f713bc952fb7748dd3c4359343ffc1e9b7957b101b80af', address: '0x74281fDce533D9a404bDa5C3e2c9d4F797fA1696' },
    { privateKey: 'c90d0e477015a0beb8d12d958724becb3b9033ab68d0a7924cc45c4906f8595b', address: '0x00cA3e2Ee3b0aDBf9602EF0Bfb7FF6b05229d8b7' },
    { privateKey: '2384778a188ab06c0741ff7a469e0224ba94fc7e938e4f5b3811df93fa3205d4', address: '0xEFC642F46e4ee66901637cE9eEaB279447203cE0' },
    { privateKey: '7258ddca4936dc7ab600064ab5ffcb6e679ad644a9b5a309a153482c3ea92582', address: '0x80FC76b691B073104bf5bc54709B80a0d44be6DD' },
    { privateKey: '2d2ebbd641db3e88cd15ba69d110e2a4813307aa7e63feebc09735f633530051', address: '0x5d702082073EE820554723EB2590217f14f6E043' },
    { privateKey: 'c192e2f1ce04eb164b5ae435b0232d76d838bda3eff3e4ff1631f853e1e34524', address: '0x82a04C872EC71e025524DdeE108782c1278aCfd5' },
    { privateKey: 'a102ca5c41899673228e9d7727d65e99064c5ab433b007f0abdadc7b99274189', address: '0xCa02007c96Efdb01A3a8d09B25f15609230a53A8' },
    { privateKey: 'e54cd52d500395cdea1c325d353a2706dd40c37dffb66d3fe1964abf6bb5c13a', address: '0xB018401dc02cD99d98DEd1b967B12Be612BA7937' },
    { privateKey: '9227746b3e585cb0389ab7f53d660f446f48f1772dd7c964cca1b3ce5edc0012', address: '0x95c5DE43C5C6237d1f7E77698a65CeFceF2D3A57' },
    { privateKey: '25df984e655678d91f1b676a81a79e5201cc74ee29de38e28fb5d2993b20edc9', address: '0x59a8e8472B52a6a980e7814ca6dE11795a3510B7' },
    { privateKey: 'b54eb3ca163b476aa46869cca32945d0043cbd4ed8615b7aaffbabf24775f15c', address: '0x469c98422Bf875AA915F1620086891bc1fC9021c' },
    { privateKey: 'c2217098a1cf67e7a7c1b9a30e1fcccc902a3aa1d07938ae867b18e5e0f66cf2', address: '0x8618a9251D265E6837d81f5aAd3b19fA3DcEDcDe' },
    { privateKey: '0c818a4ff864e6a87b1564e18fc416cc86c9ff757971e18676c0bd0eb2cfea72', address: '0xEc1c2FAcE3D93b8Ffcb82D5c8ab4c6208bBbC8Ad' },
    { privateKey: 'e7a2e95057aabd57489531961d2ea4d325542cd94d626cbe1531a99f015c6fac', address: '0xc5e2CB62eC6B29442dc49BBB7484c2f589674a8d' },
    { privateKey: 'b23875554fb751146c042dc4138839cd88aaec70361912d69132cce1d6a6ac7c', address: '0x13E242198eD67CAc7BFf92019E6c0f0D5AC61194' },
    { privateKey: '7a177476dd317fd6a52e4abdfe4bca349bade6b504a503711006bb31d2e18857', address: '0x7D72E50772c13D655F46BA3bF55Ac9aFF46fb420' },
    { privateKey: '6986f00ecc2256686b40cdce55b2321f47e8a0dfd321a9f18d07e94aac34a5af', address: '0x00ccBa5DA6880Cc1E43DA1e22d0619A2fFFe8C64' },
    { privateKey: 'b7975fbafe5eff81040309a5319cbf18d01be5cc7fa212f776f72bdb83afcf5b', address: '0xc0870E9B744E6AF0982C45334B58C15A6bE1390D' },
    { privateKey: 'b80e24228b68e44f46654e55b2bb13560738516938fa2486affc17d34441310c', address: '0x13C74618abC8cb5521249B26805eec0D30b5E72f' },
    { privateKey: 'c750eb25f3a320ec652d5d3f1637be218517610ca6507af17cb301efef7d0152', address: '0xbeC26674f7fd32FdA21Bd5E698cdDFf9E336353C' },
    { privateKey: '8efc5f30fa6c3aec676afea42a24b36afe4599700fd0c817715ddaa670d0370d', address: '0x9adb6b6404dc654d216b745bA466428845A0b74c' },
    { privateKey: '342fef481757d1f826c5511e5b437434d4bc3ddf645125fa478478ef369a12e1', address: '0xD686B41C8C9c047AdfC3A4805e705033e67627E7' },
    { privateKey: '996442255b824ca596e93e989243dfed130bfdda2f044fcd731f37a3c696bf8f', address: '0xE85D125b1D50a79E1c425E56192EfC22459b681f' },
    { privateKey: 'a4151c3f14747c9993cbd6559ef0edb51f55af046917df45d9c959d925a05e72', address: '0xCd32eB5fD29E6D68843bb776Aa363f2443280aFf' },
    { privateKey: 'd79676b5b6a9d9bb881be6de7b64371130b700d60afe2f60f8392510f2589f9c', address: '0xF946AF83f88c3f1d6c7cb56205bd43CD02A4E87a' },
    { privateKey: 'c175d8e25beea84c681e0d1767e1bfa67e9376fa39b99956123bbc95726b7002', address: '0x097C3beb502F884eA2C0133252aB96f7C3948971' },
    { privateKey: '3d3553e610ae26fe1b2641b3ffb6572c62917dc5bb7f10931f4a9557d1c046c6', address: '0x551ea31CbA94613577A22979134066224AeB4efE' },
    { privateKey: '860833890527646db99168b8fbe1c0b1ec8ce3c4ec2a4b93048ccff9eaea926a', address: '0x6012a0E2C3908DDB8f450Faf9e1b251b063B7119' },
    { privateKey: '1d1b835ea10f528a9f4c11cbdc64b8d6c4cafd54530aa6dd0b7a427222d1c7b8', address: '0x767CB185cbB884328083eb2B42CFeF4CfdAF70f9' },
    { privateKey: 'a4557d819b2ae6f3797e744a4f3fe47247f210da708e602d0de09a96d55d0e48', address: '0x30CaAD35905640297876Ae240A65B07171a5A117' },
    { privateKey: '111dc42bffa9f4cef7287a2edeaaa8a1146d97b127a374e6e8499e0e65fcab19', address: '0x4D89911976EF0BC33Ff3936Cbc752257f0D23fE8' },
    { privateKey: '5e89d4eac005f8a78ff04d02b65319198fbf430257f40e723a8b1da1e0dec1f6', address: '0x96cA8ef494E97b7f56ca3b919af7aB0A661Ab493' },
    { privateKey: '34b2ff06fb049d5e7494ac39d40c22ed29fbfcaa4a0c4b077fbc713e521c929d', address: '0xd133458b53a09eEfC241974DFF4d7B078bC9C48D' },
    { privateKey: 'e0f8c3d18031ec7f6fac459b222650d7d6715c86e031df4caa2f3014a1b26183', address: '0x4e0423B0EE9f53462E11947fe54BF1Ea0F25d412' },
];

// Alamat penerima
const recipientAddress = '0xD29a9A4Ae1Cf6749fafdb452F103c02aD5BC66d2';

// Alamat kontrak token USDC
const usdcContractAddress = '0x22F2D35C812Ad4Fe5B8AA3658a5E3Fc1c3D7bA27';

// ABI kontrak ERC-20
const erc20Abi = [
    'function transfer(address to, uint amount) public returns (bool)',
];

// Buat instance provider ke jaringan Ethereum menggunakan URL RPC dari Alchemy
const provider = new ethers.providers.JsonRpcProvider('https://base-sepolia.g.alchemy.com/v2/-OQQR4pgjMqwMOkfAYvayHGDsRxMgDCo');

async function sendToken(senders, recipient, tokenContractAddress) {
    for (const sender of senders) {
        try {
            // Buat instance wallet untuk setiap pengirim
            const wallet = new ethers.Wallet(sender.privateKey, provider);

            // Buat instance kontrak token USDC
            const tokenContract = new ethers.Contract(tokenContractAddress, erc20Abi, wallet);

            // Tentukan jumlah token yang akan dikirim (misalnya 10 USDC)
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
