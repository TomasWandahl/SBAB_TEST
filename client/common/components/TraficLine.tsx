import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus, faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import TraficStop from '@/common/components/TraficStop'

const TraficLine = ({line}:Line) => {
    const [showStops, setShowStops] = useState(false);

    const handleClick = () => {
        setShowStops(!showStops);  
    }

    return (
        <div className='TraficLine'>
            <div className="TraficLineHeader" onClick={handleClick}>
                <div>
                    <h4><FontAwesomeIcon className="fa_icon" icon={faBus} />Linje {line.line}</h4>
                    {line.numberOfStops} hållplatser 
                </div>
                <div className="CollapseToggle"><FontAwesomeIcon icon={showStops ? faChevronUp : faChevronDown} /></div>
            </div>
            {showStops && <ul className="TraficStops">
                {line.stops.map((stop) => <TraficStop stop={stop}></TraficStop>)}
            </ul>
            }
        </div>
    )
}

export default TraficLine;