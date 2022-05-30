function main() {
    const todayDate = new Date();
    let month = (todayDate.getMonth() + 1);
    if (month < 10) {
        month = '0' + month;
    }
    const today = todayDate.getFullYear() + '-' + month + '-' + todayDate.getDate();
    const campaigns = AdsApp.campaigns()
        .withCondition('campaign.status = "PAUSED"')
        .withCondition('campaign.start_date = "'+today+'"')
        .get()
    ;

    while (campaigns.hasNext()) {
        let campaign = campaigns.next();
        campaign.enable();
    }
}
