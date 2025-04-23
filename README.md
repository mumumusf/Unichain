# Unichain 自动化工具

这是一个用于 Unichain 网络的自动化工具，可以批量创建钱包并执行特定操作。

## 🚀 功能特点

- 自动创建新钱包
- 向指定地址发送 0 ETH 交易
- 安全保存钱包信息
- 支持批量操作

## 📋 环境要求

- Node.js v22 或更高版本
- npm 10.9.2 或更高版本

## 🔧 安装步骤

### 1. 安装 NVM (Node Version Manager)

#### Windows 用户:
1. 下载 [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. 运行安装程序
3. 重启终端

#### Linux/Mac 用户:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc   # 如果使用 bash
source ~/.zshrc    # 如果使用 zsh
```

### 2. 安装 Node.js

```bash
# 安装 Node.js 22
nvm install 22

# 查看已安装的版本
nvm list

# 使用 Node.js 22
nvm use 22

# 设置默认版本
nvm alias default 22
```

### 3. 验证安装

```bash
# 检查 Node.js 版本
node -v   # 预期输出: v22.13.1
nvm current # 预期输出: v22.13.1

# 检查 npm 版本
npm -v    # 预期输出: 10.9.2
```

## 💻 使用方法

1. 克隆项目
```bash
git clone https://github.com/mumumusf/Unichain.git
cd Unichain
```

2. 安装依赖
```bash
npm install
```

3. 运行脚本
```bash
npm start
```

4. 按照提示输入：
   - 有余额的钱包私钥
   - 要生成的钱包数量

5. 等待程序执行完成，所有钱包信息将保存在 `wallets.txt` 文件中

## ⚠️ 注意事项

1. 请确保您有足够的 ETH 支付 gas 费用
2. 每个新钱包会收到 0.000001 ETH 作为 gas 费用
3. 所有私钥信息会保存在 `wallets.txt` 文件中，请妥善保管
4. 建议在安全的环境下运行脚本

## 📞 联系方式

如有任何问题或建议，欢迎通过以下方式联系作者:

- Twitter：[@YOYOMYOYOA](https://x.com/YOYOMYOYOA)
- Telegram：[@YOYOZKS](https://t.me/YOYOZKS)

## ⚖️ 免责声明

1. 本程序仅供学习交流使用
2. 禁止用于商业用途
3. 使用本程序产生的任何后果由用户自行承担

---
Made with ❤️ by [@YOYOMYOYOA](https://x.com/YOYOMYOYOA) 