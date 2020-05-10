import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
 
const getData = (data) => {
  return gql`
  {
    results(countries: [], date: { eq: "${data}" }) {
      country {
        name
      }
      confirmed
      date
      deaths
      recovered
      growthRate
    }
  }
  `;
}

const SummaryTable = () => {
  let dataToRender = [];
  const lastDayData = useQuery(getData('5/08/2020'));
  const prevDayData = useQuery(getData('5/07/2020'));

  const prepareDataToRender = (lastData, compareData) => {
    lastData.forEach((el, index)=>{
      el.newConfirmed = el.confirmed - compareData[index].confirmed;
      el.newDeaths = el.deaths - compareData[index].deaths;
      el.active = el.confirmed - el.deaths - el.recovered;
      const padding = 10;
      el.deathRate = Math.round((el.deaths / el.confirmed) * 100 * padding) / padding;
    });
    return lastData;
  }
  
  if (lastDayData.data && prevDayData.data) {
    dataToRender = prepareDataToRender(lastDayData.data.results, prevDayData.data.results);
  }
  
  if (lastDayData.loading) return <p>Loading...</p>;
  if (lastDayData.error) return <p>Error</p>;
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Confirmed</th>
          <th>New Confirmed</th>
          <th>Deaths</th>
          <th>New Deaths</th>
          <th>Recovered</th>
          <th>Active</th>
          <th>Death Rate</th>
        </tr>
      </thead>
      <tbody>
        {dataToRender.map((el, index)=>{
          return <tr key={index}>
                    <td>{el.country.name}</td>
                    <td>{el.confirmed || ''}</td>
                    <td>{el.newConfirmed ? '+' + el.newConfirmed : ''}</td>
                    <td>{el.deaths || ''}</td>
                    <td>{el.newDeaths ? '+' + el.newDeaths : ''}</td>
                    <td>{el.recovered || ''}</td>
                    <td>{el.active || ''}</td>
                    <td>{el.deathRate ? el.deathRate + '%' : ''}</td>
                  </tr>
        })}
      </tbody>
    </table>
  );
}

export default SummaryTable;