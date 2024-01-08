import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import TempChart from './components/TempChart';
import PhaseChart from './components/PhaseChart';
const API_KEY = import.meta.env.VITE_APP_API_KEY;


function App() {
  const moonPhaseIcons = ['🌑', '🌒', '🌓', '🌕', '🌕', '🌕', '🌗', '🌘', '🌚'];
  const [fetchedData, setFetchedData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [filteredDataMinTemp, setFilteredDataMinTemp] = useState(0);
  const [filteredDataMaxTemp, setFilteredDataMaxTemp] = useState(0);
  const [filteredDataMeanTemp, setFilteredDataMeanTemp] = useState(0);

  const [searchDate, setSearchDate] = useState('');
  const [searchMoonPhase, setSearchMoonPhase] = useState(1);
  const [searchLowerTemp, setSearchLowerTemp] = useState(-100);
  const [searchHigherTemp, setSearchHigherTemp] = useState(100);

  const [chartType, setChartType] = useState("temp");

  useEffect(() => {
    fetchAllData().catch(console.error);
  }, []);

  useEffect(() => {
    getTempStatistics(filteredData);
  }, [filteredData]);

  const fetchAllData = async () => {
    let location = 'Chicago, IL';
    let elements = 'id,temp,feelslikemin,tempmin,datetime,moonphase,sunrise,sunset,moonrise,moonset,description,visibility,conditions';
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?include=days&elements=${elements}&key=${API_KEY}`
    );
    const json = await response.json();
    setFetchedData(json);
    setFilteredData(json);
  };

  const getMoonPhaseIcon = (moonPhase) => {
    return moonPhaseIcons[Math.floor(moonPhase * (moonPhaseIcons.length - 1))];
  }

  const handleSearch = () => {
    let newDays = null;
    if (searchDate.trim() === '') {
      newDays = fetchedData.days;
    } else {
      newDays = fetchedData.days.filter(day => day.datetime === searchDate);
    }
    newDays = newDays.filter(day => day.moonphase <= searchMoonPhase);
    newDays = newDays.filter(day => day.feelslikemin >= searchLowerTemp && day.feelslikemin <= searchHigherTemp);

    setFilteredData(prevState => ({
      ...prevState,
      days: newDays
    }));
  }

  const getTempStatistics = (filteredData) => {
    // get mean, min, max of feelslikemin
    if (filteredData == null || filteredData.days.length === 0) {
      setFilteredDataMinTemp(0);
      setFilteredDataMaxTemp(0);
      setFilteredDataMeanTemp(0);
      return;
    }
    let minTemp = +Infinity;
    let maxTemp = -Infinity;
    let sumTemp = 0;
    let meanTemp = 0;
    for (let day of filteredData.days) {
      if (day.feelslikemin < minTemp) { minTemp = day.feelslikemin; }
      if (maxTemp < day.feelslikemin) { maxTemp = day.feelslikemin; }
      sumTemp += day.feelslikemin;
    }
    meanTemp = (sumTemp / filteredData.days.length).toFixed(2);
    setFilteredDataMinTemp(minTemp);
    setFilteredDataMaxTemp(maxTemp);
    setFilteredDataMeanTemp(meanTemp);
  }
  // When App fetches the data, it saves it to local storage. DetailView can then read from local storage.
  localStorage.setItem('fetchedData', JSON.stringify(fetchedData));

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  }

  return (
    <div className="App">
      <div className="App-page">
        <div className="App-row">
          <div className="Card">
            <h2 className="number">Found {filteredData && filteredData.days.length} days</h2>
            <h3>{filteredData && filteredData.resolvedAddress}</h3>
          </div>
          <div className="Card">
            <h2 className="number">{filteredData && filteredDataMeanTemp} °F</h2>
            <h3>Mean Temp</h3>
          </div>
          <div className="Card">
            <h2 className="number">{filteredData && `${filteredDataMinTemp} to ${filteredDataMaxTemp}`} °F</h2>
            <h3>Temp Range</h3>
          </div>
        </div>

        <div className="App-row">
          <div className="List">

            <div className="filters">
              <div className="dateFilter">
                <label>Date: </label>
                <input onChange={(e) => setSearchDate(e.target.value)} name="date" type="text" placeholder="Enter Date" />
              </div>
              <div className="phaseFilter">
                <label>Phase: {searchMoonPhase}</label>
                <input onChange={(e) => setSearchMoonPhase(e.target.value)} type="range" name="moonphase" min="0.0" max="1.0" step="0.1" />
              </div>
              <div className="tempFilter">
                <label>Lower Temp:</label>
                <input type="number" min="-100" max="100" onChange={(e) => setSearchLowerTemp(e.target.value)} value={searchLowerTemp} required></input>
                <br />
                <label>Higher Temp:</label>
                <input type="number" min="-100" max="100" onChange={(e) => setSearchHigherTemp(e.target.value)} value={searchHigherTemp} required></input>
              </div>
              <button onClick={handleSearch} name="search" className="btn" type="submit">Search</button>
            </div>

            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Temperature (°F)</th>
                    <th>Moonrise Time</th>
                    <th>Phase</th>
                    <th>Detail</th>
                  </tr>
                </thead>
                <tbody>

                  {filteredData && filteredData.days.length > 0 ? filteredData.days.map((day) => (
                    <tr key={day.datetime}>
                      <td>{day.datetime}</td>
                      <td>{day.feelslikemin}</td>
                      <td>{day.moonrise}</td>
                      <td>{day.moonphase} {getMoonPhaseIcon(day.moonphase)}</td>
                      {/* <td> <Link to={`date/${day.datetime}`} state={day} 
                        key={day.datetime}> 🔗 </Link> </td> */}
                      <td>
                        <Link to={`date/${day.datetime}`} key={day.datetime} style={{ textAlign: "center", display: "block" }}>🔗</Link>
                      </td>
                    </tr>
                  )) :
                    (<tr>
                      <td>No Data</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    )
                  }

                </tbody>
              </table>
            </div>

            {/* Graph*/}
            <br />
            <div className="graph-panel">
              <label>
                <input type="radio" value="temp" checked={chartType === "temp"} onChange={handleChartTypeChange} />
                Temperature Chart
              </label>

              <label>
                <input type="radio" value="phase" checked={chartType === "phase"} onChange={handleChartTypeChange} />
                Moon Phase Chart
              </label>

              {chartType === "temp" ?
                <TempChart fetchedData={fetchedData} />
                : <PhaseChart fetchedData={fetchedData} />
              }

            </div>




          </div>
        </div>
      </div>
    </div >
  )
}

export default App
