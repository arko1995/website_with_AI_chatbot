import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { databaseConnected } from './db.js';
import { SiteContent } from './models.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.resolve(here, '../data/content.json');

async function readFileContent() {
  return JSON.parse(await fs.readFile(DATA_FILE, 'utf8'));
}

async function writeFileContent(content) {
  await fs.writeFile(DATA_FILE, `${JSON.stringify(content, null, 2)}\n`, 'utf8');
  return content;
}

function injectRuntimeSettings(content) {
  return {
    ...content,
    settings: {
      ...content.settings,
      whatsappNumber: process.env.WHATSAPP_NUMBER || content.settings?.whatsappNumber || ''
    }
  };
}

export async function getContent() {
  if (!databaseConnected()) return injectRuntimeSettings(await readFileContent());

  let doc = await SiteContent.findById('primary').lean();
  if (!doc) {
    const seed = await readFileContent();
    doc = await SiteContent.create({ _id: 'primary', ...seed });
    doc = doc.toObject();
  }
  const { _id, updatedAt, ...content } = doc;
  return injectRuntimeSettings(content);
}

export async function saveContent(content) {
  const clean = {
    settings: content.settings,
    services: content.services,
    projects: content.projects,
    posts: content.posts
  };

  if (!databaseConnected()) return writeFileContent(clean);

  await SiteContent.findByIdAndUpdate(
    'primary',
    { ...clean, updatedAt: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  return clean;
}
