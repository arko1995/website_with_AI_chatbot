import crypto from 'crypto';
import { AdminUser } from './models.js';
import { databaseConnected } from './db.js';

const SESSION_COOKIE = 'skyline_admin_session';
const SESSION_SECONDS = 60 * 60 * 8;

function sessionSecret() {
  const secret = process.env.SESSION_SECRET || '';
  if (secret.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters.');
  }
  return secret;
}

export function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, expectedHex] = String(stored || '').split(':');
  if (!salt || !expectedHex) return false;
  const actual = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(expectedHex, 'hex');
  return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
}

function signPayload(payload) {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', sessionSecret()).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

function verifyToken(token) {
  const [encoded, suppliedSignature] = String(token || '').split('.');
  if (!encoded || !suppliedSignature) return null;

  const expectedSignature = crypto.createHmac('sha256', sessionSecret()).update(encoded).digest();
  const supplied = Buffer.from(suppliedSignature, 'base64url');
  if (supplied.length !== expectedSignature.length || !crypto.timingSafeEqual(supplied, expectedSignature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

function cookieValue(req, name) {
  const raw = req.headers.cookie || '';
  for (const part of raw.split(';')) {
    const [key, ...value] = part.trim().split('=');
    if (key === name) return decodeURIComponent(value.join('='));
  }
  return '';
}

export function createAdminSession(user) {
  return signPayload({
    sub: String(user._id),
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS
  });
}

export function setAdminSessionCookie(res, token) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${SESSION_SECONDS}${secure}`);
}

export function clearAdminSessionCookie(res) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
}

export function requireAdmin(req, res, next) {
  try {
    const payload = verifyToken(cookieValue(req, SESSION_COOKIE));
    if (!payload) return res.status(401).json({ error: 'Authentication required.' });
    req.admin = payload;
    next();
  } catch (error) {
    next(error);
  }
}

export async function authenticateAdmin(email, password) {
  if (!databaseConnected()) throw new Error('Admin login requires MongoDB.');
  const normalized = String(email || '').trim().toLowerCase();
  const user = await AdminUser.findOne({ email: normalized });
  if (!user || !verifyPassword(String(password || ''), user.passwordHash)) return null;
  return user;
}

export async function ensureInitialAdmin() {
  if (!databaseConnected()) return;

  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || '');
  if (!email || !password) {
    console.warn('[auth] ADMIN_EMAIL/ADMIN_PASSWORD not configured; no initial admin can be created.');
    return;
  }

  const existing = await AdminUser.findOne({ email });
  if (existing) return;

  await AdminUser.create({
    email,
    passwordHash: hashPassword(password),
    role: 'admin'
  });
  console.log(`[auth] Initial admin created for ${email}.`);
}
