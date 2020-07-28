import React, { useState, useContext } from 'react';
import { ResponsiveChoropleth as ResponsiveMap } from '@nivo/geo';
import { useHistory } from 'react-router-dom';
import { CountryContext } from '../../context/country_context';
import countries from '../../assets/countries.json';
import InputRange from '../inputs/range/input_range';
import styles from './map.module.scss';
import colors from '../../assets/colors'
import InputCases from '../inputs/radio/input_cases'
import { totalCases, totalCasesLabels } from '../../assets/cases_names';

function Map({ data, width }) {
	const history = useHistory();
	const countryContext = useContext(CountryContext);
	const [selectedCaseType, setCaseType] = useState('confirmed');
	const [maxDomainValue, setMaxDomainValue] = useState(250000);

	const mapData = data.countries.map((d) => {
		return { value: d.mostRecent[selectedCaseType], id: d.name };
	});
	const handleDomainValueChange = (e) => {
		setMaxDomainValue(e.target.value);
	};
	const onMapClick = (country) => {
		countryContext.setInputCountry(country);
		history.push('/countryPage');
	}
	function onChangeCaseType(selectedCaseType) {
		setCaseType(selectedCaseType);
		setMaxDomainValue(selectedCaseType === 'deaths' ? 100000 : 250000);
	}

	return (
		<section className={styles.section_map} id='map'>
				<p className={styles.section_title}>world map - {selectedCaseType} cases</p>
				<InputCases 
					onChangeCaseType={onChangeCaseType}
					cases={totalCases}
					casesLabels={totalCasesLabels}
				/>
			<div className={styles.chart_container}>
				<ResponsiveMap
					data={mapData}
					features={countries.features}
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					colors={colors[selectedCaseType]}
					domain={[0, maxDomainValue]}
					projectionScale={width < 900 ? 90 : 170}
					unknownColor='#e9e9e9'
					valueFormat=',.0f'
					projectionType='naturalEarth1'
					projectionTranslation={[0.5, 0.5]}
					projectionRotation={[0, 0, 0]}
					graticuleLineColor='#dddddd'
					borderWidth={0.2}
					borderColor='#455A64'
					onClick={(data) => onMapClick(data.id)} 
				/>
			</div>
				<InputRange 
					value={maxDomainValue} 
					onChange={handleDomainValueChange}
					maxDomainValue={maxDomainValue} />
		</section>
	);
}
export default Map;
