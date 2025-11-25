import { useEffect, useState } from "react";

interface Props {
  theme: string;
}

/*** Microservice #4 Request via HTTP ***/
const FactDisplay = ({ theme }: Props) => {
  const [fact, setFact] = useState("");

  useEffect(() => {
    async function fetchFact() {
      const response = await fetch(`http://127.0.0.1:8003/fact/${theme}`);
      const studyFact = await response.text();
      setFact(studyFact);
    }

    fetchFact();
  }, [theme]); // re-run when theme changes

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0.75rem",
        backgroundColor: "rgba(255,255,255,0.9)",
        borderRadius: "16px",
        padding: "1rem 1.25rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        maxWidth: "520px",
        margin: "0 auto",
        border: "1px solid #eee",
      }}
    >
      {/* Lightbulb Icon */}
      <i
        className="bi bi-lightbulb"
        style={{
          fontSize: "1.6rem",
          color: "#ffca2c",
          flexShrink: 0,
          marginTop: "2px",
        }}
      ></i>

      {/* Text */}
      <div>
        <div
          style={{
            fontWeight: 600,
            marginBottom: "0.25rem",
            color: "#4a4458",
          }}
        >
          Did you know?
        </div>

        <em style={{ color: "#6c6680", fontSize: "0.95rem" }}>{fact}</em>
      </div>
    </div>
  );
};

export default FactDisplay;
