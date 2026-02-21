<img width="1536" height="1024" alt="ChatGPT Image Feb 21, 2026, 10_53_02 AM" src="https://github.com/user-attachments/assets/96b6d2b2-e1c1-4ebd-a602-9739e12d1fd7" />

AuraVault: Your Modern Web File Access Hub


  AuraVault is a cutting-edge web application designed to transform any local project directory into a visually stunning
  and highly functional web-based file browser. Built with Node.js, Express, and a sleek glassmorphism-inspired frontend,
  AuraVault provides an intuitive way to browse, manage, and share your project files and development artifacts.


  ✨ Features


   * Modern Glassmorphism User Interface: Experience a beautiful, responsive, and animated UI with frosted glass effects,
     vibrant gradients, and smooth transitions, providing a premium feel for your file browsing.
   * Intuitive File Browsing: Easily navigate through your project's directory structure directly within your web browser.
   * Direct File Downloads: Download any file with a single click, perfect for sharing builds, documentation, or assets.
   * CLI (Command-Line Interface) Support: Seamlessly install and manage AuraVault as a global command-line tool.
   * Flexible Port Configuration: Run the server on any available port, defaulting to 6070 for convenience.
   * Cross-Platform Accessibility: Access your files from any device with a web browser, whether it's another computer,
     tablet, or phone on your network.
   * Secure Path Resolution: Includes basic path traversal protection to ensure files are served only from within your
     designated project root.

  🚀 Installation

  To install AuraVault globally on your system and enable the web-access command, run the following script from the root
  directory of the AuraVault project:

   1 sudo ./install.sh


  This script will perform the following actions:
   1. Install all necessary Node.js dependencies locally for the application.
   2. Copy the AuraVault application files to /usr/local/lib/web-access-app.
   3. Create an executable symlink (web-access) in /usr/local/bin, making the application accessible from any terminal
      location.

  💡 Usage

  Once installed, you can start the AuraVault server using the web-access command.

  Starting with the Default Port (6070)


  To launch AuraVault on its default port, simply run:

   1 web-access

  Starting with a Custom Port

  To specify a different port (e.g., 8080), use the --port argument:

   1 web-access --port 8080


  Accessing the Web Interface

  After starting the server, open your web browser and navigate to:
   * http://localhost:6070/ (if using the default port)
   * http://localhost:8080/ (if you specified port 8080)


  (If you are running AuraVault on a remote server, replace `localhost` with the server's IP address.)

  🛑 Stopping the Server

  To stop the running AuraVault server, you will need to terminate the Node.js process. You can do this by using pkill:


   1 pkill -f "web-access"
  Or, if you prefer to be more specific, you can find the process ID (PID) and kill it:
   1 ps aux | grep "node server.js"
   2 kill <PID>
