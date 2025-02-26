import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to recursively find files with merge conflicts
function findFilesWithConflicts(dir) {
  const results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'dist') {
      results.push(...findFilesWithConflicts(filePath));
    } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes('<<<<<<<') || content.includes('>>>>>>>')) {
        results.push(filePath);
      }
    }
  }

  return results;
}

// Function to fix a specific type of merge conflict
function fixMergeConflict(content) {
  // Remove merge conflict markers and keep the most recent changes
  const lines = content.split('\n');
  const result = [];
  let inConflict = false;
  let keepingChanges = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('<<<<<<<')) {
      inConflict = true;
      keepingChanges = false;
      continue;
    }

    if (line.startsWith('=======')) {
      keepingChanges = true;
      continue;
    }

    if (line.startsWith('>>>>>>>')) {
      inConflict = false;
      keepingChanges = false;
      continue;
    }

    if (!inConflict || keepingChanges) {
      result.push(line);
    }
  }

  return result.join('\n');
}

// Main function
function main() {
  const srcDir = path.join(__dirname, '../src');
  const conflictFiles = findFilesWithConflicts(srcDir);

  console.log(`Found ${conflictFiles.length} files with merge conflicts`);

  for (const file of conflictFiles) {
    console.log(`Fixing conflicts in ${file}`);
    const content = fs.readFileSync(file, 'utf8');
    const fixed = fixMergeConflict(content);
    fs.writeFileSync(file, fixed);
  }

  console.log('All conflicts fixed. Running prettier...');
  
  try {
    execSync('npm run format', { stdio: 'inherit' });
    console.log('Code formatting complete.');
  } catch (error) {
    console.error('Error running prettier:', error);
  }
}

main(); 