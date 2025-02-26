const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '../dist');

// Remove source maps
const removeSourceMaps = () => {
  const files = fs.readdirSync(distPath, { recursive: true });
  files.forEach(file => {
    if (file.endsWith('.map')) {
      fs.unlinkSync(path.join(distPath, file));
    }
  });
};

// Remove unused assets
const removeUnusedAssets = () => {
  const assetsPath = path.join(distPath, 'assets');
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath, { recursive: true });
    files.forEach(file => {
      const filePath = path.join(assetsPath, file);
      const stat = fs.statSync(filePath);
      // Remove files larger than 1MB that aren't critical
      if (stat.size > 1024 * 1024 && !file.includes('vendor')) {
        fs.unlinkSync(filePath);
      }
    });
  }
};

// Main cleanup function
const cleanup = () => {
  console.log('🧹 Starting cleanup...');
  removeSourceMaps();
  removeUnusedAssets();
  console.log('✨ Cleanup complete!');
};

cleanup(); 