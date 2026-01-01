interface Props {
  illustration: string;
}

const IllustrationDisplay = ({ illustration }: Props) => {
  return (
    <div className="text-center illustration-wrapper">
      {
        <img
          src={illustration}
          alt="Study Supplies Illustration"
          className="img-fluid"
        />
      }
    </div>
  );
};

export default IllustrationDisplay;
