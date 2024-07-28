import axios from "axios";


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
  const accessToken = process.env.ACCESS_TOKEN;
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
