import React from 'react';
import mobileAds, { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-3138057547675144/3214389918';

export const initializeAds = () => {
  mobileAds()
    .initialize()
    .then(adapterStatuses => {
      console.log('Ads SDK initialized', adapterStatuses);
    })
    .catch(error => {
      console.error('Ads SDK initialization failed', error);
    });
};

export const AppBannerAd = () => {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.LARGE_ANCHORED_ADAPTIVE_BANNER}
      requestOptions={{
        requestNonPersonalizedAdsOnly: true,
      }}
    />
  );
};
