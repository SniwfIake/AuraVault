const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const args = process.argv.slice(2);
let PORT = 6070;
let ROOT_DIR = process.cwd();

for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' && args[i + 1]) {
        PORT = parseInt(args[i + 1], 10);
        i++;
    } else if (args[i] === '--path' && args[i + 1]) {
        ROOT_DIR = args[i + 1];
        i++;
    }
}

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

function isSafePath(targetPath) {
    const resolvedPath = path.resolve(ROOT_DIR, targetPath);
    return resolvedPath.startsWith(ROOT_DIR);
}

app.get('/api/files', async (req, res) => {
    try {
        const relativePath = req.query.path || '';
        const currentPath = path.join(ROOT_DIR, relativePath);

        if (!isSafePath(relativePath)) {
            return res.status(403).json({ error: 'Access denied' });
        }

        const items = await fs.readdir(currentPath, { withFileTypes: true });
        
        const fileList = await Promise.all(items.map(async (item) => {
            const itemPath = path.join(currentPath, item.name);
            const stats = await fs.stat(itemPath);
            
            return {
                name: item.name,
                isDirectory: item.isDirectory(),
                size: stats.size,
                modified: stats.mtime,
                path: path.join(relativePath, item.name)
            };
        }));

        fileList.sort((a, b) => {
            if (a.isDirectory === b.isDirectory) {
                return a.name.localeCompare(b.name);
            }
            return a.isDirectory ? -1 : 1;
        });

        res.json({ 
            currentPath: relativePath, 
            files: fileList,
            rootDir: ROOT_DIR
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to list files' });
    }
});

app.get('/api/download', (req, res) => {
    const relativePath = req.query.path;
    if (!relativePath || !isSafePath(relativePath)) {
        return res.status(403).send('Access denied');
    }

    const filePath = path.join(ROOT_DIR, relativePath);
    res.download(filePath);
});

app.get('/api/status', (req, res) => {
    res.json({ 
        port: PORT, 
        rootDir: ROOT_DIR,
        currentDir: path.basename(ROOT_DIR)
    });
});

app.listen(PORT, () => {
    console.log(`AuraVault running at http://localhost:${PORT}`);
    console.log(`Serving directory: ${ROOT_DIR}`);
});
