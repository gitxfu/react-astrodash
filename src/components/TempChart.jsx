import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Label } from "recharts";

const TempChart = ({fetchedData}) => {
   
    // Reading data from local storage
    // const fetchedData = JSON.parse(localStorage.getItem('fetchedData'));
    // if (fetchedData != null) {
    //      console.log(fetchedData.days);
    // }

    return (
        <div>
            {fetchedData ? (
                <div>
                    <br></br>
                    <h2>{fetchedData.days.length}-Day Temparature Forcast </h2>
                    <p> The temperature data gives us a sneak peek into the future, 
                        letting us know if we'll need a cozy sweater or a cool tank top</p>

                    <LineChart
                        width={800}
                        height={400}
                        data={fetchedData.days}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 20,
                            bottom: 30,
                        }}
                    >
                        <Line
                            type="monotone"
                            dataKey="temp"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                        />
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="datetime" interval={2} angle={0} dx={20}>
                            <Label value="Date" offset={-10} position="insideBottom" />
                        </XAxis>

                        <YAxis
                            label={{
                                value: "Temperature (°F)",
                                angle: -90,
                                position: "insideLeft",
                                textAnchor: "middle",
                            }}
                        />
                        <Tooltip />
                    </LineChart>
                </div>


            ) : null}
        </div>
    );


};

export default TempChart;