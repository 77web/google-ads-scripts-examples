const SLACK_URL = 'INSERT_WEBHOOK_URL_HERE';
const SLACK_CHANNEL = 'SLACK_CHANNEL_NAME_HERE';

function main() {
    const videoAdSelector = AdsApp
        .videoAds()
        .withCondition('ad_group_ad.status = ENABLED')
        .forDateRange('YESTERDAY"')
    ;

    const videoAdIterator = videoAdSelector.get();
    const disapprovals = [];
    while (videoAdIterator.hasNext()) {
        let videoAd = videoAdIterator.next();
        if (videoAd.getPolicyApprovalStatus() === 'DISAPPROVED') {
            disapprovals.push(videoAd.getName());
        }
    }

    if (disapprovals.length > 0) {
        const accountName = AdsApp.currentAccount().getName();
        const slackMessage = {
            text: accountName + 'に審査に落ちている動画広告が' + disapprovals.length + '件あります。',
            channel: SLACK_CHANNEL,
        };
        const options = {
            method: 'POST',
            contentType: 'application/json',
            payload: JSON.stringify(slackMessage)
        };
        UrlFetchApp.fetch(SLACK_URL, options);
    }
}

