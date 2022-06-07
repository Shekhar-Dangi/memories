import axios from "axios";

const getData = async (code) => {
  const tokens = await axios.post('http://localhost:5000/auth/google', {
    code,
  });
  const userInfo = await axios.get(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    { headers: { Authorization: `Bearer ${tokens.data.access_token}` } },
  );
  return { userInfo, tokens };
}
export default getData;