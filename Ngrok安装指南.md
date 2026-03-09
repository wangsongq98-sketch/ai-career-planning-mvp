# Ngrok 安装和启动指南

## 📥 下载 Ngrok

### 方法 1：直接下载（推荐）
1. 打开浏览器
2. 访问：https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip
3. 下载 ngrok-v3-stable-windows-amd64.zip 文件

### 方法 2：从官网下载
1. 打开浏览器
2. 访问：https://ngrok.com/download
3. 选择 Windows 版本下载

---

## 📦 安装 Ngrok

### 步骤 1：解压文件
1. 找到下载的 ngrok-v3-stable-windows-amd64.zip 文件
2. 右键点击 → 解压到当前文件夹
3. 解压后会得到 ngrok.exe 文件

### 步骤 2：移动到固定目录（推荐）
1. 创建文件夹：`C:\ngrok\`
2. 将 ngrok.exe 复制到 `C:\ngrok\` 目录

---

## 🔑 配置 Ngrok

### 步骤 1：注册 Ngrok 账号
1. 打开浏览器访问：https://dashboard.ngrok.com/signup
2. 使用邮箱注册账号（免费版即可）
3. 登录账号

### 步骤 2：获取 Authtoken
1. 登录后，在左侧菜单找到 **Authtoken**
2. 复制您的 Authtoken（格式类似：`2xxxxxxxxxxxxxxxxxxxxxxx`）

### 步骤 3：配置 Authtoken
1. 打开命令提示符（CMD）或 PowerShell
2. 运行以下命令：
```bash
cd C:\ngrok
ngrok config add-authtoken YOUR_TOKEN
```
将 `YOUR_TOKEN` 替换为您复制的 token

---

## 🚀 启动 Ngrok

### 步骤 1：确保开发服务器正在运行
在项目目录中运行：
```bash
npm run dev -- --host
```

### 步骤 2：启动 Ngrok 隧道
在命令提示符或 PowerShell 中运行：
```bash
cd C:\ngrok
ngrok http 3000
```

### 步骤 3：获取公网链接
Ngrok 会显示类似以下内容：
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxx-xxxx-xxxx.ngrok-free.app -> http://localhost:3000
```

**您的公网链接就是**：`https://xxxx-xxxx-xxxx.ngrok-free.app`

---

## 🌐 访问项目

将公网链接分享给外部开发人员，他们可以通过以下路径访问：

- **总入口**：`https://xxxx-xxxx-xxxx.ngrok-free.app/admin/entry`
- **学生端**：`https://xxxx-xxxx-xxxx.ngrok-free.app/`
- **管理端**：`https://xxxx-xxxx-xxxx.ngrok-free.app/admin/login`

---

## ⚠️ 常见问题

### 1. ngrok 不是内部或外部命令
**解决**：将 ngrok.exe 所在目录添加到系统 PATH 环境变量

### 2. 无法连接到 Ngrok
**解决**：检查防火墙设置，确保允许 ngrok.exe 通过防火墙

### 3. 端口 3000 已被占用
**解决**：确保开发服务器正在运行，或者修改端口
```bash
ngrok http 3000 --host-header=localhost:3000
```

---

## 💡 提示

- Ngrok 运行后会占用当前命令行窗口，不要关闭
- 公网链接会定期变化（免费版），如需固定链接需要付费
- 建议将公网链接保存到文档中，方便分享

---

## 📞 需要帮助？

如果遇到问题，请检查：
1. Ngrok 是否正确安装
2. Authtoken 是否正确配置
3. 开发服务器是否正在运行
4. 防火墙是否允许访问
