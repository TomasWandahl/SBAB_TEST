import { useEffect, useState } from "react";
import TraficLine from "./TraficLine";

interface TraficLinesProp {
    lines: Line[]
}

const TraficLines = ({traficLines}: TraficLinesProp) => {
    const [lines, setLines] = useState<Line[]>([])

    useEffect(() => {
        setLines(traficLines);
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