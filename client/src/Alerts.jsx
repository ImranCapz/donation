import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Alerts() {
  const [type, setType] = useState("donation");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const getAccessToken = () => {
    window.open("/server/donation/auth", "_blank");
  };

  const sendAlert = async () => {
    try {
      const accessToken = "x5fRtjYEbeisH70P1tLUgSLXWoizsCW07vDeYmiG";
      const name = "Test";
      const message = "Test message";
      const amount = 100;
      const currency = "USD";
      const response = await axios.post("/server/donation/sendalert", {
        accessToken,
        name,
        message,
        amount,
        currency,
      });

      if (response.data.success) {
        setResult("Alert sent successfully: " + JSON.stringify(response.data));
      } else {
        setResult(
          "Failed to send alert: " +
            (response.data.error
              ? response.data.error.message
              : "Unknown error")
        );
      }
    } catch (error) {
      setResult("Error: " + error.message);
    }
  };

  return (
    <div className="App">
      <h1>Send Streamlabs Alert</h1>
      <button onClick={getAccessToken}>Get Access Token</button>
      <button onClick={sendAlert}>Send Alert</button>
      <p>{result}</p>
    </div>
  );
}

export default Alerts;
