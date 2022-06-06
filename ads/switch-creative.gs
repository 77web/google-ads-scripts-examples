function main() {
  let adsToPause = AdsApp.ads().withIds(AD_IDS_TO_PAUSE).get();
  while (adsToPause.hasNext()) {
    let ad = adsToPause.next();
    ad.pause();
    console.log('Paused ad' + ad.getId());
  }
  
  let adsToEnable = AdsApp.ads().withIds(AD_IDS_TO_ENABLE).get();
  while (adsToEnable.hasNext()) {
    let ad = adsToEnable.next();
    ad.enable();
    console.log('Enabled ad' + ad.getId());
  }
}
