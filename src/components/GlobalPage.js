import React from 'react';
import Map from './Map';
import SummaryTable from './SummaryTable';
import ChartBar from './ChartBar';
import TextValues from './TextValues'

export default function GlobalPage() {
	return (
		<div >
			<h1 id='globalPage' >COVID-19</h1>
			<p>
				Coronaviruses (CoV) are a large family of viruses that cause illness
				ranging from the common cold to more severe diseases. A novel
				coronavirus (nCoV) was identified on 7 January 2020 and was temporarily
				named “2019-nCoV”. It was subsequently named the “COVID-19 virus”. WHO
				announced COVID-19 outbreak as a pandemic on 11 March 2020.
			</p>
      <TextValues name='confirmed'/>
      <TextValues name='deaths'/>
      <TextValues name='recovered'/>
			<Map />
			<SummaryTable />
			<ChartBar />
		</div>
	);
}
