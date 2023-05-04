import TraficLines from "@/common/components/TraficLines";
import LoadIndicator from "@/common/components/LoadIndicator";
import Header from "@/common/components/Header";
import { useEffect, useState } from "react";


const Home = () => {
  const [data, setData] = useState({statuscode: 0, lines: []})
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:1337/api/trafik')
    .then((res) => res.json())
    .then((json_data) => {
      setData(json_data.lines)
      setLoading(false)
    })
  }, [])

  return (
    <div className="app">
      <Header></Header>
      <div className="MainContent">
        {isLoading ? <LoadIndicator /> : <TraficLines traficLines={data}></TraficLines>}
      </div>
    </div>
  )
}

export default Home;
