function main() {
  const CAMPAIGN_ID = 1111; // replace 1111 to actual your campaign id
  const COST_LIMIT = 10000;
  
  let campaigns = AdsApp.campaigns()
  .withIds([CAMPAIGN_ID])
  .withCondition('metrics.cost_micros >= ' + (COST_LIMIT * 1000000))
  .get();
  
  while (campaigns.hasNext()) {
    let campaign = campaigns.next();
    campaign.paused();
    console.log('Paused campaign' + campaign.getName());
  }
}
