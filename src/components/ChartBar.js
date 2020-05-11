import React, { useState } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import 'moment/locale/pl';


const getMapData = gql`
	{
		results(countries: [ "Poland" ], date: { gt: "3/20/2020" }) {
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

function ChartBar() {
  const { data, loading, error } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  // console.log(data);


  const chartData = data.results.map( (d, index) =>  {
     if(index > 0) {
       d.newConfirmed = data.results[index].confirmed - data.results[index-1].confirmed
       d.newDeaths = data.results[index].deaths - data.results[index-1].deaths
      }
    return d
  })
  

  return(
    <ResponsiveBar
        data={data.results}
        width={1000}
				height={500}
        keys={[ 'newConfirmed', 'newDeaths' ]}
        indexBy="date"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'category10' }}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', '1.6' ] ] }}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={15}
        labelSkipHeight={15}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={115}
        motionDamping={15}
    />  
  )
}
export default ChartBar;