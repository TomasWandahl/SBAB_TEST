import { useEffect, useState } from "react";
import TraficLine from "./TraficLine";

interface PropType {
    lines: Array<Line>,
    statuscode: number
}

const TraficLines = (props: PropType) => {
    const [lines, setLines] = useState<Array<Line>>([])

    useEffect(() => {
        setLines(props.data.lines);
    }, [])

    return (
        <div className="TraficLines">
            {lines.map((line) => {
                return <TraficLine line={line}></TraficLine>
            })}
        </div>
    )
};

export default TraficLines;