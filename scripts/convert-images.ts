import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ASSETS_DIR = path.join(process.cwd(), 'src', 'assets');

async function convertImages(dir: string) {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            await convertImages(fullPath);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.png', '.jpg', '.jpeg'].includes(ext)) {
                const targetPath = fullPath.replace(ext, '.webp');

                try {
                    // Check if webp already exists to avoid re-converting if not needed, 
                    // or maybe we want to overwrite. Let's start with checking.
                    // Actually, let's just convert and overwrite/create.

                    console.log(`Converting ${entry.name} to WebP...`);
                    await sharp(fullPath)
                        .webp({ quality: 80 })
                        .toFile(targetPath);

                    console.log(`✅ Converted: ${targetPath}`);
                } catch (error) {
                    console.error(`❌ Failed to convert ${entry.name}:`, error);
                }
            }
        }
    }
}

console.log('Starting image conversion...');
convertImages(ASSETS_DIR)
    .then(() => console.log('All done!'))
    .catch(err => console.error('Script failed:', err));
