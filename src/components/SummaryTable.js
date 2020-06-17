import React, { useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import moment from 'moment';
import styles from './SummaryTable.module.scss'
 
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
  const lastDay = moment().subtract(2, 'day').format('M/DD/YYYY');
  const prevDay = moment().subtract(3, 'day').format('M/DD/YYYY');
  const lastDayData = useQuery(getData(lastDay));
  const prevDayData = useQuery(getData(prevDay));
  
  const [ dataToRender, setData ] = useState([]);
  const [ casesDetails ] = useState([
    { displayName: 'Country', value: ['country', 'name'], type: 'string', asc: null },
    { displayName: 'Confirmed', value: ['confirmed'], type: 'number', asc: null },
    { displayName: 'New Confirmed', value: ['newConfirmed'], type: 'number', asc: null },
    { displayName: 'Deaths', value: ['deaths'], type: 'number', asc: null },
    { displayName: 'New Deaths', value: ['newDeaths'], type: 'number', asc: null },
    { displayName: 'Recovered', value: ['recovered'], type: 'number', asc: null },
    { displayName: 'Active', value: ['active'], type: 'number', asc: null },
    { displayName: 'Death Rate', value: ['deathRate'], type: 'number', asc: null }
  ]);

  const prepareDataToRender = (lastData, compareData) => {
    const assignIfPositive = (newData) => {
      return newData > 0 ? newData : null;
    }
    const data = [...lastData];
    lastData.forEach((el, index)=>{
      el.newConfirmed = assignIfPositive(el.confirmed - compareData[index].confirmed);
      el.newDeaths = assignIfPositive(el.deaths - compareData[index].deaths);
      el.active = assignIfPositive(el.confirmed - el.deaths - el.recovered);
      el.deathRate = assignIfPositive(+((el.deaths / el.confirmed) * 100).toFixed(1));
    });
    sortData(data, casesDetails[1]);
    return data;
  }

  const sortData = (array, column) => {
    const keys = column.value;
    const columnType = column.type;
    const ascSort = column.asc;
    
    array.sort((a,b) => {
      const firstKey = keys[0];
      const secondKey = keys[1] || null;
      const firstEl = secondKey ? a[firstKey][secondKey] : a[firstKey];
      const secondEl = secondKey ? b[firstKey][secondKey] : b[firstKey];
      
      if (columnType === 'string') {
        if (firstEl.toLowerCase() > secondEl.toLowerCase()) {
          return ascSort ? -1 : 1;
        } else if (secondEl.toLowerCase() > firstEl.toLowerCase()) {
          return ascSort ? 1 : -1;
        } else {
          return 0;
        }
      } else if (columnType === 'number') {
        return ascSort ? firstEl - secondEl : secondEl - firstEl;
      }
    });
    for (let el of casesDetails) {
      el.asc = el.displayName === column.displayName ? !el.asc : null;
    }
    setData([...array]);
  }

  useEffect(() => {
    if (lastDayData.data && prevDayData.data) {
      const newData = prepareDataToRender(lastDayData.data.results, prevDayData.data.results);    
      setData(newData);
    }
  }, [lastDayData.data, prevDayData.data]);
  
  const sortOnClick = (column) => {
    sortData(dataToRender, column);
  }

  return (
    <section className={styles.section_table} id="summaryTable">
      <p className={styles.section_title}>all cases</p>
      <div className={styles.table_container}>
      {dataToRender.length > 0 &&
      <table>
        <thead>
          <tr>
            {casesDetails.map((el, index)=>{
              return <th key={index} onClick={()=>sortOnClick(el)} className={styles.cursor_pointer}>
                      {el.displayName}
                      <button className={styles.btn_icon}>
                        {el.asc && <span>&#x25BE;</span>}
                        {el.asc === false && <span>&#x25B4;</span>}
                      </button>
                    </th>
            })}
          </tr>
        </thead>
        <tbody>
          {dataToRender.map((element, index)=>{
            return <tr key={index}>
              {casesDetails.map((el, index)=>{
                const firstKey = el.value[0];
                const secondKey = el.value[1];
                return <td key={index+firstKey}>
                        {el.displayName.toLowerCase().includes('new') && element[firstKey] > 0 &&  <span>+</span>}
                        {(secondKey ? element[firstKey][secondKey] : element[firstKey]) || ''}
                        {el.displayName.toLowerCase().includes('rate') && element[firstKey] > 0 && <span>%</span>}
                      </td>
              })}        
            </tr>
          })}
        </tbody>
      </table>     
     }
     </div>
    </section>
  );
}

export default SummaryTable;