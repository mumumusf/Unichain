const { ethers } = require('ethers');
const readline = require('readline');
const fs = require('fs');
const banner = require('./banner');

// 显示banner
console.log(banner);

// Unichain网络配置
const networkConfig = {
    name: 'Unichain',
    rpcUrl: 'https://mainnet.unichain.org',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
    }
};

// 目标地址
const TARGET_ADDRESS = '0xA3EB2b5d7A550a838000e498a31329be295113ca';

// 创建provider
const provider = new ethers.JsonRpcProvider(networkConfig.rpcUrl);

// 创建readline接口
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 创建新钱包
function createWallet() {
    const wallet = ethers.Wallet.createRandom();
    return wallet;
}

// 保存钱包信息到文件
function saveWalletToFile(walletInfo) {
    const timestamp = new Date().toISOString();
    const content = `=== 钱包 ${walletInfo.index + 1} ===\n` +
                   `时间: ${timestamp}\n` +
                   `地址: ${walletInfo.address}\n` +
                   `私钥: ${walletInfo.privateKey}\n` +
                   `转入交易哈希: ${walletInfo.fundTxHash}\n` +
                   `发送交易哈希: ${walletInfo.txHash}\n` +
                   `------------------------\n\n`;
    
    fs.appendFileSync('wallets.txt', content);
    console.log(`钱包 ${walletInfo.index + 1} 信息已安全保存到 wallets.txt`);
}

// 发送ETH到新钱包
async function sendETHToWallet(fromWallet, toAddress, amount) {
    try {
        const tx = {
            to: toAddress,
            value: ethers.parseEther(amount.toString())
        };

        const transaction = await fromWallet.sendTransaction(tx);
        console.log(`已向新钱包转入 ${amount} ETH，交易哈希: ${transaction.hash}`);
        return transaction;
    } catch (error) {
        console.error(`转入ETH失败: ${error.message}`);
        throw error;
    }
}

// 发送0 ETH交易
async function sendZeroTransaction(wallet) {
    try {
        const tx = {
            to: TARGET_ADDRESS,
            value: 0,
            gasLimit: 21000  // 设置固定的gasLimit
        };

        const transaction = await wallet.sendTransaction(tx);
        console.log(`交易已发送，交易哈希: ${transaction.hash}`);
        return transaction;
    } catch (error) {
        console.error(`发送交易失败: ${error.message}`);
        throw error;
    }
}

// 检查wallets.txt文件是否存在，如果不存在则创建
function checkWalletsFile() {
    if (!fs.existsSync('wallets.txt')) {
        fs.writeFileSync('wallets.txt', '=== Unichain钱包信息 ===\n此文件包含敏感信息，请妥善保管\n\n');
        console.log('已创建新的wallets.txt文件');
    } else {
        console.log('使用现有的wallets.txt文件');
    }
}

// 主函数
async function main() {
    try {
        // 检查wallets.txt文件
        checkWalletsFile();
        
        // 获取用户输入
        const sourceWalletPrivateKey = await new Promise(resolve => {
            rl.question('请输入有余额的钱包私钥: ', resolve);
        });

        const walletCount = await new Promise(resolve => {
            rl.question('请输入要生成的钱包数量: ', resolve);
        });

        // 创建源钱包
        const sourceWallet = new ethers.Wallet(sourceWalletPrivateKey, provider);
        console.log(`源钱包地址: ${sourceWallet.address}`);
        console.log(`\n开始生成钱包并执行交易，所有私钥将安全保存在 wallets.txt 文件中\n`);

        // 生成指定数量的钱包并发送交易
        for (let i = 0; i < walletCount; i++) {
            console.log(`\n处理第 ${i + 1} 个钱包:`);
            
            // 创建新钱包
            const newWallet = createWallet();
            console.log(`新钱包地址: ${newWallet.address}`);

            // 连接到provider
            const connectedNewWallet = newWallet.connect(provider);
            
            // 发送0.000001 ETH到新钱包
            const fundTx = await sendETHToWallet(sourceWallet, newWallet.address, '0.000001');
            
            // 等待交易确认
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            // 发送0 ETH交易
            const zeroTx = await sendZeroTransaction(connectedNewWallet);
            
            // 保存钱包信息到文件
            saveWalletToFile({
                index: i,
                address: newWallet.address,
                privateKey: newWallet.privateKey,
                fundTxHash: fundTx.hash,
                txHash: zeroTx.hash
            });
            
            // 等待交易确认
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
        
        console.log('\n所有操作完成!');
        console.log('所有钱包信息和私钥已安全保存到 wallets.txt 文件中');
        console.log('请妥善保管 wallets.txt 文件，切勿泄露文件内容');
        
    } catch (error) {
        console.error(`程序执行出错: ${error.message}`);
    } finally {
        rl.close();
    }
}

// 运行程序
main(); 