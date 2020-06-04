import { ResponsiveLine } from '@nivo/line'
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styles from './LineChart.module.scss'

function LineChart() {
    const [selectedCountry, setCountry] = useState("Spain")
	const getLineChartData = gql`
    {
        country(name: "${selectedCountry}") {
          name
          results {
            date
            confirmed
            deaths
          }
        }
      }
    `;
    
	const { data, loading, error } = useQuery(getLineChartData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

    const lineData = [] 
    const arrayForLineData = data.country.results.map( d => ({x : d.date, y : d.confirmed}));
    lineData.push({id: data.country.name, data: arrayForLineData})

    function handleClick(e) {
        setCountry(e.target.value)
    }
return (
    <>
    <div className={styles.wrapper} >
        <div className={styles.button_container}>
        <button onClick={handleClick} value='Germany'>Germany</button>
        <button onClick={handleClick} value='Spain'>Spain</button>
         </div>
    <div className={styles.chart_container} >
        <ResponsiveLine
            data={lineData}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            curve="catmullRom"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                renderTick: (tick)=> {
                if (tick.tickIndex % 3) {
                return ''
                } else {
                return (
                <g transform={`translate(${tick.x},${tick.y + 50}) rotate(${tick.rotate})`}>
                <text style={{fontSize: 12}}>
                    {tick.value}
                </text>
            </g>)
                }
            },
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
    </div>
    </div>
    </>
)
}
export default LineChart;