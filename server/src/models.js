import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema({
  _id: { type: String, default: 'primary' },
  settings: { type: mongoose.Schema.Types.Mixed, required: true },
  services: { type: [mongoose.Schema.Types.Mixed], default: [] },
  projects: { type: [mongoose.Schema.Types.Mixed], default: [] },
  posts: { type: [mongoose.Schema.Types.Mixed], default: [] },
  updatedAt: { type: Date, default: Date.now }
}, { strict: false, versionKey: false });

const leadSchema = new mongoose.Schema({
  projectType: String,
  location: String,
  service: String,
  source: String,
  metadata: mongoose.Schema.Types.Mixed,
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

const adminUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

export const SiteContent = mongoose.models.SiteContent || mongoose.model('SiteContent', siteContentSchema);
export const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
export const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);
