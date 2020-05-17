import { ResponsiveLine } from '@nivo/line'
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

function LineChart() {
    const [selectedCountry, setCountry] = useState("Spain")
	const getMapData = gql`
		{
			results(countries: [ "${selectedCountry}" ], date: { gt: "3/20/2020" }) {
				country {
					name
				}
				date
				confirmed
				deaths
				recovered
				growthRate
			}
		}
	`;
    const country = {"id":{selectedCountry}, data:[]}
	const { data, loading, error } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
    
    const dataForLineChart = [];
    data.results.map( d => {
        dataForLineChart.push({ x : d.date, y : d.confirmed })
        return country.data = dataForLineChart
	});

    function handleClick(e) {
        setCountry(e.target.value)
    }
return (
    <>
    <button onClick={handleClick} value='Germany'>Germany</button>
    <button onClick={handleClick} value='Spain'>Spain</button>
    <ResponsiveLine
        data={[country]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="catmullRom"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        colors={{ scheme: 'nivo' }}
        pointSize={2}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
    />
    </>
)
}
export default LineChart;