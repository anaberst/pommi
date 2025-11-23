import { useEffect, useState } from "react";

interface Props {
    theme: string;
}

const IllustrationDisplay = ({ theme }: Props) => {
    const [imgPath, setImgPath] = useState("");

    useEffect(() => {
        async function fetchIllustrationPath() {
            const response = await fetch(`http://127.0.0.1:8000/illustration/${theme}`)
            const data = await response.json();
            setImgPath('./' + data.illustrationFile);
        }

        fetchIllustrationPath();
    }, [theme]); // re-run when theme changes

    return (
        <div className ="text-center">
            {imgPath && <img src={imgPath} alt={theme} />}
        </div>
        );
    };

export default IllustrationDisplay;