const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 6070;
const ROOT_DIR = path.resolve(__dirname, '..');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Helper to check if path is safe
function isSafePath(targetPath) {
    const resolvedPath = path.resolve(ROOT_DIR, targetPath);
    return resolvedPath.startsWith(ROOT_DIR);
}

// API to list files
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

        // Sort: Directories first, then files
        fileList.sort((a, b) => {
            if (a.isDirectory === b.isDirectory) {
                return a.name.localeCompare(b.name);
            }
            return a.isDirectory ? -1 : 1;
        });

        res.json({ 
            currentPath: relativePath, 
            files: fileList 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to list files' });
    }
});

// API to download files
app.get('/api/download', (req, res) => {
    const relativePath = req.query.path;
    if (!relativePath || !isSafePath(relativePath)) {
        return res.status(403).send('Access denied');
    }

    const filePath = path.join(ROOT_DIR, relativePath);
    res.download(filePath); // Set disposition and send it.
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
