import 'moment/locale/pl';
import moment from 'moment';

const now = moment();
const fromJanuary = '2020-01-01';
const pandemicStart = '2020-03-11';
const lastMonth = now.clone().subtract(1, 'month').format('YYYY-MM-DD');

const timeRange = [
  { displayTime: 'from 1 January', value: fromJanuary },
  { displayTime: 'from 11 March', value: pandemicStart },
  { displayTime: 'last month', value: lastMonth },
];

export { timeRange, pandemicStart };
