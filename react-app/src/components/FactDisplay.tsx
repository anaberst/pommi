interface Props {
  fact: string;
}

const FactDisplay = ({ fact }: Props) => {
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
        margin: "50px auto",
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
