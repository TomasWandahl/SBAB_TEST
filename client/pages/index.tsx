import TraficLines from "@/common/components/TraficLines";
import LoadIndicator from "@/common/components/LoadIndicator";
import Header from "@/common/components/Header";
import { useEffect, useState } from "react";

const LoadIndicatorMessages = {
  LOADING: 'Laddar data från TrafikLab',
  LOAD_ERROR: 'Ett fel uppstod när datan hämtades från servern'
}


const Home = () => {
  const [data, setData] = useState({statuscode: 0, lines: []})
  const [isLoading, setLoading] = useState(false);
  const [loadMessage, setLoadMessage] = useState(LoadIndicatorMessages.LOADING)

  useEffect(() => {
      setLoading(true);

      fetch('http://localhost:1337/api/trafik')
      .then((res) => {
        if(!res.ok) {
          throw new Error(`${res.status} ${res.statusText}`, {cause: res});
        }
        else {
          return res.json();
        }
      })
      .then((json_data) => {
          setData(json_data.lines)
          setLoading(false)
      }).catch(function(err) {
        console.log(err);
        setLoadMessage(LoadIndicatorMessages.LOAD_ERROR);
    });  
  }, []);
  

  return (
    <div className="app">
      <Header></Header>
      <div className="MainContent">
        {isLoading ? 
        <LoadIndicator message={loadMessage}/> 
        : <TraficLines traficLines={data}></TraficLines>}
      </div>
    </div>
  )
}

export default Home;
