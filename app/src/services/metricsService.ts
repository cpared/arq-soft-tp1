const StatsD = require('node-statsd');

export const sendMetrics = (metricName: string, value: number) => {
  if (!isNaN(value)) {
    dogstatsd.timing(`metrics.${metricName}`, value);
  }
};

const dogstatsd = new StatsD({
  host: 'graphite',
  port: 8125
});
