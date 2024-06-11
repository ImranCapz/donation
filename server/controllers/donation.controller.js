import axios from "axios";

export const getauth = async (req, res) => {
  const authUrl =
    "https://www.streamlabs.com/api/v1.0/authorize?client_id=7ZL9RJRixjdyM7TZE6PmbM4Om8yP6n4M5r41qL1R&redirect_uri=http://localhost:5000/callback&response_type=code&scope=donations.read+donations.create";
  res.redirect(authUrl);
};

export const callback = async (req, res) => {
  const code = req.query.code;
  console.log(`Received code: ${code}`);
  try {
    const response = await axios.post("https://streamlabs.com/api/v1.0/token", {
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
    });
    const accessToken = response.data.access_token;
    console.log(`Received access token: ${accessToken}`);
    res.json({ accessToken });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.response ? error.response.data : error.message });
  }
};

export const sendalert = async (req, res) => {
  const { name, message, amount, currency } = req.body;
  const accessToken = req.body.accessToken;
  const alertData = {
    message: message,
    name: name,
    identifier: "donation",
    amount: amount,
    currency: currency,
  };

  try {
    const response = await axios.post(
      "https://streamlabs.com/api/v1.0/donations",
      alertData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    res.json({ success: true, data: response.data });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.response ? error.response.data : error.message,
    });
  }
};
