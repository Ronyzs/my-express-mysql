# My Express MySQL API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-blue.svg)](https://www.mysql.com/)

A RESTful API boilerplate built with **Express.js** and **MySQL**. This project uses **Docker Compose** for easy setup and is structured to be clean, modular, and scalable for real-world applications.

---

## ✨ Features

- 🔧 Express.js web server
- 🗄️ MySQL database integration
- 🐳 Docker and Docker Compose support
- ♻️ MVC folder structure
- 📦 dotenv support for environment configuration
- 📁 Auto-create DB tables on startup (optional)

---

## 🚀 Getting Started

### 🔧 Requirements

- [Node.js](https://nodejs.org/) v14+
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 📦 Clone & Setup

```bash
git clone https://github.com/Ronyzs/my-express-mysql.git
cd my-express-mysql
cp .your.env .env
```
**Edit .env file to configure DB credentials and app port.**

### 🐳 Run with Docker
```bash
docker-compose up --build
```
**The app will be running at: http://localhost:5002 (adjust the port you use)<br>MySQL exposed at `localhost:3306`**

