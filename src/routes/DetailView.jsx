import { useParams } from "react-router-dom";

const DetailView = () => {
    let params = useParams();
    const showedDate = params.symbol;

    // If a user directly accesses the DetailView route (e.g., by typing it into the browser's address bar), 
    // the state will be undefined since no state was passed with the navigation. 

    // let location = useLocation();
    // let day = location.state.day;
    // console.log(location);

    // Reading data from local storage
    const fetchedData = JSON.parse(localStorage.getItem('fetchedData'));
    const showedData = fetchedData.days.filter(day => day.datetime === showedDate);

    return (
        <div className="detail-view">
            <h2> {showedDate} </h2>
            <h3> Moon phase: {showedData[0].moonphase} </h3>
            <h3> Moon rise: {showedData[0].moonrise} </h3>
            <h3> Moon set: {showedData[0].moonset} </h3>
            <h3> Sun rise: {showedData[0].sunrise} </h3>
            <h3> Sun set: {showedData[0].sunset} </h3>
            <h3> Temparature: {showedData[0].temp}  °F </h3>
            <h3> Visibility: {showedData[0].visibility} %</h3>
            <h3> Description: {showedData[0].description} </h3>
        </div>
    );
};

export default DetailView;