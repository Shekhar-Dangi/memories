import {
  OAuth2Client
} from 'google-auth-library';
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'postmessage',
);
console.log(process.env.CLIENT_ID);

export const tokenHandler = async (req, res) => {
  const t = await oAuth2Client.getToken(req.body.code);
  console.log(t?.tokens);

  res.json(t?.tokens);
}