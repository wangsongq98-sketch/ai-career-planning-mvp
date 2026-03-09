# AI职业规划一体机 MVP - 外部访问指南

## 🌐 当前访问状态

**局域网访问链接**：http://10.98.249.74:3000/

**当前状态**：✅ 局域网内可访问（同一 Wi-Fi 下）

---

## 🚀 外部访问方案

### 方案一：使用 Ngrok（推荐）

Ngrok 是最简单、最快速的内网穿透工具，免费版即可满足需求。

#### 步骤 1：下载 Ngrok
访问 https://ngrok.com/download 下载 Windows 版本

#### 步骤 2：安装 Ngrok
1. 解压下载的 ngrok.zip 文件
2. 将 ngrok.exe 放到任意目录（例如：C:\ngrok\）

#### 步骤 3：注册 Ngrok 账号
1. 访问 https://dashboard.ngrok.com/signup
2. 使用邮箱注册账号（免费）
3. 登录后获取 Authtoken

#### 步骤 4：配置 Ngrok
在命令行中运行：
```bash
ngrok config add-authtoken YOUR_AUTHTOKEN
```
将 `YOUR_AUTHTOKEN` 替换为您在 Ngrok 网站上获取的 token

#### 步骤 5：启动 Ngrok
在命令行中运行：
```bash
ngrok http 3000
```

#### 步骤 6：获取公网链接
Ngrok 会显示类似以下内容：
```
Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://xxxx-xxxx-xxxx.ngrok-free.app -> http://localhost:3000
```

**您的公网访问链接就是**：https://xxxx-xxxx-xxxx.ngrok-free.app

#### 步骤 7：分享链接
将公网链接分享给外部开发人员，他们可以通过这个链接访问您的项目。

---

### 方案二：使用 Cloudflare Tunnel（更稳定）

Cloudflare Tunnel 提供更稳定的免费服务，适合长期使用。

#### 步骤 1：安装 Cloudflare CLI
```bash
winget install --id Cloudflare.Cloudflare -e
```

#### 步骤 2：配置 Tunnel
```bash
cloudflared tunnel login
cloudflared tunnel create ai-career-mvp
cloudflared tunnel route dns ai-career-mvp ai-career-mvp.your-domain.com
```

#### 步骤 3：启动 Tunnel
```bash
cloudflared tunnel run ai-career-mvp
```

---

### 方案三：使用花生壳（国内访问快）

如果外部开发人员主要在国内，可以使用花生壳：

#### 步骤 1：下载花生壳
访问 https://hsk.oray.com/download/ 下载 Windows 版本

#### 步骤 2：注册账号
免费版即可满足需求

#### 步骤 3：配置端口映射
1. 打开花生壳
2. 添加端口映射
3. 本地端口：3000
4. 类型：HTTP
5. 保存并启动

#### 步骤 4：获取访问链接
花生壳会提供一个域名，例如：http://yourname.orayddns.com

---

## 📋 当前项目结构

### 总入口页面
**http://10.98.249.74:3000/admin/entry**

这个页面包含：
- 学生端入口按钮
- 管理平台入口按钮
- 项目介绍和功能卡片

### 学生端访问
- **本地**：http://10.98.249.74:3000/
- **登录页**：http://10.98.249.74:3000/student/login
- **首页**：http://10.98.249.74:3000/student

### 管理端访问
- **入口页**：http://10.98.249.74:3000/admin/entry
- **登录页**：http://10.98.249.74:3000/admin/login
- **仪表盘**：http://10.98.249.74:3000/admin/dashboard

---

## 🔧 当前开发服务器状态

**运行命令**：
```bash
npm run dev -- --host
```

**服务器信息**：
- 本地地址：http://localhost:3000/
- 局域网地址：http://10.98.249.74:3000/
- 网络接口：0.0.0.0（允许外部访问）

---

## 💡 使用建议

### 临时演示（1-2天）
使用 **Ngrok**，5 分钟即可配置完成

### 长期使用（1周以上）
使用 **Cloudflare Tunnel**，更稳定且免费

### 国内访问优化
使用 **花生壳**，国内访问速度更快

---

## 📞 技术支持

如果遇到问题，请检查：
1. 防火墙是否允许 Vite 服务器访问
2. 路由器是否启用了端口转发（如果使用花生壳）
3. Ngrok/Cloudflare 是否正确配置了 Authtoken

---

## 🎯 快速开始（Ngrok）

```bash
# 1. 下载并安装 Ngrok
# 2. 注册账号并获取 Authtoken
# 3. 配置 Authtoken
ngrok config add-authtoken YOUR_TOKEN

# 4. 启动隧道
ngrok http 3000

# 5. 复制公网链接分享给外部人员
```

完成！外部开发人员就可以通过公网链接访问您的项目了。
