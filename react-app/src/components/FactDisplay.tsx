interface Props {
  fact: string;
}

const FactDisplay = ({ fact }: Props) => {
  return (
    <div
      className="fact-card"
    >
      {/* Lightbulb Icon */}
      <i
        className="bi bi-lightbulb fact-icon" />

      {/* Text */}
      <div>
        <div
          className="fact-title"
        >
          Did you know?
        </div>

        <em className="fact-text">{fact}</em>
      </div>
    </div>
  );
};

export default FactDisplay;
