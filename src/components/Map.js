import React, { useState } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import countries from '../assets/world_countries.json';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Button from './Button';
import InputRange from './InputRange';
import styles from './Map.module.scss';
import colors from '../assets/colors'
import casesNames from '../assets/cases_names'

const getMapData = gql`
	{
		results(countries: [], date: { eq: "5/07/2020" }) {
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
const mapHeight = '500';
const mapWidth = '850';

function MyResponsiveChoropleth() {

	const [selectedCasesType, setCasesType] = useState('confirmed');
	const [maxDomainValue, setMaxDomainValue] = useState(250000);
	const { data, loading, error } = useQuery(getMapData);
	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;
	// console.log(data);

	const mapData = data.results.map((d) => {
		return { value: d[selectedCasesType], id: d.country.name };
	});

	const handleDomainValueChange = (e) => {
		setMaxDomainValue(e.target.value);
	};
	const handleTypeChange = (e) => {
		setCasesType(e.target.value);
		setMaxDomainValue(e.target.value === 'deaths' ? 100000 : 250000);
	};

	return (
		<section className={styles.section_map} id='map'>
			<div className={styles.flex_buttons}>
				{casesNames.map((el) => (
					<Button
						className={styles.button}
						handleClick={(e) => handleTypeChange(e)}
						value={el.value}
						name={el.displayName}
					/>
				))}
				<p className={styles.max_domain_value}>{maxDomainValue}</p>
				<InputRange value={maxDomainValue} onChange={handleDomainValueChange} />
			</div>
			<p className={styles.section_title}>{`${selectedCasesType} cases`}</p>
			<div className={styles.map_wrapper}>
				<ResponsiveChoropleth
					data={mapData}
					features={countries.features}
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					colors={colors[selectedCasesType]}
					domain={[0, maxDomainValue]}
					unknownColor='#e9e9e9'
					valueFormat=',.0f'
					projectionType='naturalEarth1'
					projectionTranslation={[0.5, 0.5]}
					projectionRotation={[0, 0, 0]}
					projectionScale={200}
					graticuleLineColor='#dddddd'
					borderWidth={0.2}
					borderColor='#455A64'
				/>
			</div>
		</section>
	);
}

export default MyResponsiveChoropleth;
