<img width="1536" height="1024" alt="ChatGPT Image Feb 21, 2026, 10_53_02 AM" src="https://github.com/user-attachments/assets/96b6d2b2-e1c1-4ebd-a602-9739e12d1fd7" />

AuraVault: Your Modern Web File Access Hub

AuraVault is a cutting-edge web application designed to transform any local project directory into a visually stunning and highly functional web-based file browser. Built with Node.js, Express, and a sleek glassmorphism-inspired frontend, AuraVault provides an intuitive way to browse, manage, and share your project files and development artifacts.

## ✨ Features

- **Modern Glassmorphism User Interface**: Experience a beautiful, responsive, and animated UI with frosted glass effects, vibrant gradients, and smooth transitions
- **Intuitive File Browsing**: Easily navigate through your project's directory structure directly within your web browser
- **Direct File Downloads**: Download any file with a single click, perfect for sharing builds, documentation, or assets
- **Flexible Port Configuration**: Run the server on any available port, defaulting to 6070
- **Custom Directory**: Serve any directory by running the command from that location or using the --path argument
- **Cross-Platform Accessibility**: Access your files from any device with a web browser
- **Secure Path Resolution**: Includes basic path traversal protection to ensure files are served only from within your designated project root

## 🚀 Installation

1. Install the dependencies:
```bash
npm install
```

## 💡 Usage

### Starting the Server

Navigate to your desired directory and run:

```bash
node server.js
```

This will serve the current directory on port 6070.

### Custom Port

To specify a different port:
```bash
node server.js --port 8080
```

### Custom Directory and Port

To serve a specific directory on a custom port:
```bash
node server.js --port 9000 --path /path/to/directory
```

### Running Without Arguments

When run without arguments, the server will:
- Use port **6070** by default
- Serve the **current working directory**

## 🌐 Accessing the Web Interface

After starting the server, open your web browser:

- `http://localhost:6070/` (default port)
- `http://localhost:8080/` (custom port)

Replace `localhost` with your server's IP address if accessing remotely.

## 🔌 API Endpoints

- `GET /api/files?path=<dir>` - List files in a directory
- `GET /api/download?path=<file>` - Download a file
- `GET /api/status` - Get server status (port, directory)

## 🛑 Stopping the Server

To stop the running AuraVault server:
```bash
pkill -f "server.js"
```

Or find and kill the process:
```bash
ps aux | grep "server.js"
kill <PID>
```

## 📦 Building

To create a distribution zip:
```bash
zip -r AuraVault.zip . -x "node_modules/*"
```

## License

MIT License

