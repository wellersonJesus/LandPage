import dotenv from "dotenv";
dotenv.config();

export const ZeroSheetsConfig = {
  url: process.env.ZEROSHEETS_URL,
  token: process.env.ZEROSHEETS_TOKEN
};
