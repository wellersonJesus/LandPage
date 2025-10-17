require('dotenv').config();

const SHEET_URL = process.env.SHEET_URL || '';
const API_KEY = process.env.API_KEY || '';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
const USER_EMAIL = process.env.USER_EMAIL || '';
const USER_PASSWORD = process.env.USER_PASSWORD || '';

module.exports = {
  SHEET_URL,
  API_KEY,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  USER_EMAIL,
  USER_PASSWORD
};
