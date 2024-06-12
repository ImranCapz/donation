import { useState } from "react";
import axios from "axios";

function Alerts() {
  const [message, setMessage] = useState("Received from");
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");

  const getAccessToken = () => {
    window.open("/server/donation/auth", "_blank");
  };

  const sendAlert = async () => {
    try {
      const response = await axios.post("/server/donation/sendalert", {
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
    <div className="flex flex-col w-60 mx-auto ">
      <h1>Send Streamlabs Alert</h1>
      <button onClick={getAccessToken}>Get Access Token</button>
      <div className="flex flex-col">
        <label className="text-sm font-semibold text-main">Name:</label>
        <input
          type="text"
          value={name}
          className="input border-2 p-2 rounded-lg  focus:ring-0 md:w-60"
          onChange={(e) => setName(e.target.value)}
        />
        <label className="text-sm font-semibold text-main">Message:</label>
        <input
          type="text"
          value={message}
          className="input border-2 p-2 rounded-lg  focus:ring-0 md:w-60"
          onChange={(e) => setMessage(e.target.value)}
        />
        <label className="text-sm font-semibold text-main">Amount</label>
        <input
          type="number"
          value={amount}
          className="border-2 p-2 rounded-lg  focus:ring-0 md:w-60"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button
        className="p-3 bg-sky-200  btn-color rounded-lg mt-16 font-semibold rounded=lg uppercase hover:opacity-95 disabled:opacity-60 transition ease-in-out duration-300"
        onClick={sendAlert}
      >
        Send Alert
      </button>
      <p>{result}</p>
    </div>
  );
}

export default Alerts;
