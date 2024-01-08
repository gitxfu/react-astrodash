const About = () => {
    return (
      <div className="about-page">
        <h1>About This App</h1>
        
        <h2>What is this App?</h2>
        <p>
          This is a weather data app that provides daily weather forecasts and moon phases. 
          Users can search for weather data based on date, moon phase, and temperature ranges.
        </p>
  
        <h2>How to Use This App?</h2>
        <p>
          The app offers various filters to search for weather data:
          <ul>
            <li><strong>Date:</strong> You can filter data by entering a specific date.</li>
            <li><strong>Phase:</strong> Use the slider to set the moon phase.</li>
            <li><strong>Temperature:</strong> You can set a lower and upper temperature limit to narrow down the search.</li>
          </ul>
          Once the filters are set, click the "Search" button to view the filtered data.
        </p>
  
        <h2>Features</h2>
        <p>
          <ul>
            <li>Weather Data: Displays the date, feels-like temperature, and moonrise time.</li>
            <li>Moon Phase: Depicts the current moon phase along with a corresponding icon.</li>
            <li>Charts: Toggle between temperature and moon phase charts to visualize the data.</li>
          </ul>
        </p>
        
        <h2>Why Use This App?</h2>
        <p>
          Whether you're planning an outdoor activity, a romantic night under the moon, or are just curious about the weather and lunar phases, this app has you covered!
        </p>
  
      </div>
    );
  };

export default About;