interface Props {
  illustration: string;
}

const IllustrationDisplay = ({ illustration }: Props) => {
  return <div className="text-center">{<img src={illustration} />}</div>;
};

export default IllustrationDisplay;
