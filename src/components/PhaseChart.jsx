import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Label } from "recharts";

const PhaseChart = ({fetchedData}) => {

    return (
        <div>
            {fetchedData ? (
                <div>
                    <br></br>
                    <h2>{fetchedData.days.length}-Day Moon Phase Forcast </h2>
                    <p> The moon phase data tells us how much of the moon we'll see in the sky each night. 
                        A larger value means we'll see more of the moon, 
                        moving from a crescent shape to a full, bright circle!</p>

                    <BarChart
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
                        <Tooltip />
                        <Bar
                            dataKey="moonphase"
                            fill="#8884d8"

                        />
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis dataKey="datetime" interval={2} angle={0} dx={20}>
                            <Label value="Date" offset={-10} position="insideBottom" />
                        </XAxis>

                        <YAxis
                            label={{
                                value: "Moon Phase",
                                angle: -90,
                                position: "insideLeft",
                                textAnchor: "middle",
                            }}
                        />
                    </BarChart>

                </div>


            ) : null}
        </div>
    );


};

export default PhaseChart;