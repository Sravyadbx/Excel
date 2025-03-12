import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [status, setStatus] = useState("Idle");
  const [requestId, setRequestId] = useState(null);

  // Function to start long-polling
  const startLongPolling = async () => {
    const newRequestId = `req-${Date.now()}`; // Generate a unique request ID
    setRequestId(newRequestId);

    try {
      setStatus("Checking status...");

      const response = await axios.post(
        "http://localhost:8080/check-status", // Backend endpoint
        { reportId: "your-report-id", requestId: newRequestId } // Payload
      );
      console.log(response?.data);
      setStatus(`Status: ${response.data.status}`);
    } catch (error) {
      if (error.response && error.response.status === 499) {
        setStatus("Request aborted by user.");
      } else {
        setStatus(`Error: ${error.message}`);
      }
    } finally {
      setRequestId(null); // Reset the request ID
    }
  };

  // Function to abort long-polling
  const abortLongPolling = async () => {
    if (requestId) {
      try {
        await axios.post("http://localhost:8080/abort-request", { requestId });
        setStatus("Request aborted.");
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    }
  };

  // Inline styles
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      marginTop: "50px",
    },
    title: {
      fontSize: "24px",
      color: "#333",
    },
    status: {
      fontSize: "18px",
      color: "#555",
      margin: "20px 0",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      margin: "10px",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "#007bff",
      color: "#fff",
      transition: "background-color 0.3s ease",
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
    buttonAbort: {
      backgroundColor: "#dc3545",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Long Polling Example</h1>
      <p style={styles.status}>{status}</p>
      <button
        onClick={startLongPolling}
        style={{
          ...styles.button,
          ...(requestId !== null ? styles.buttonDisabled : {}),
        }}
        disabled={requestId !== null}
      >
        Start Long Polling
      </button>
      <button
        onClick={abortLongPolling}
        style={{
          ...styles.button,
          ...styles.buttonAbort,
          ...(requestId === null ? styles.buttonDisabled : {}),
        }}
        disabled={requestId === null}
      >
        Abort Long Polling
      </button>
    </div>
  );
};

export default App;
