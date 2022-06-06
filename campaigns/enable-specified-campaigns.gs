function main() {
  const CAMPAIGN_IDs = [1111, 2222, 3333]; // replace 1111,222,3333 to your actual campaign id
  if (CAMPAIGN_IDs.length === 0) {
    console.log('No campaign ids are specified.');
    return;
  }
  
  const campaigns = AdsApp.campaigns()
    .withCondition('campaign.status = "PAUSED"')
    .withCondition('campaign.id IN (' + CAMPAIGN_IDs.join(',') + ')')
    .get()
  ;

    while (campaigns.hasNext()) {
        let campaign = campaigns.next();
        campaign.enable();
    }
}
