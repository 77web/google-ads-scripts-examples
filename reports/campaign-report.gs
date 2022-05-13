function main() {
  let rows = AdsApp.search('SELECT ' +
      'campaign.name,' +
      'metrics.impressions,' +
      'metrics.cost_micros,' +
      'metrics.conversions' +
      'FROM campaign' +
      'WHERE segments.date DURING YESTERDAY'
  );

  let data = [];
  data.push(['キャンペーン名', 'IMP', 'COST', 'CV']);
  while (rows.hasNext()) {
    let row = rows.next();

    data.push([
      row.campaign.name,
      row.metrics.impressions,
      row.metrics.cost_micros / 1000000,
      row.metrics.conversions,
    ]);
  }

  const d = new Date();
  const timestamp = d.getFullYear() + '_' + (d.getMonth() + 1) + '_' + d.getDay() + '_' + d.getHours() + '_' + d.getMinutes();
  const sheet = SpreadsheetApp.create('キャンペーン別前日の配信状況' + timestamp);
  for (let dataRow in data) {
    sheet.appendRow(data[dataRow]);
  }

}
