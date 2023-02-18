import React from 'react';
import { Linking } from 'react-native';
import { WebView } from 'react-native-webview';

const InternalNewsLetter = () => {
  const internalNewsLetterLink = 'https://izumilogi.wixsite.com/newsletter/top';

  return (
    <WebView
      source={{ uri: internalNewsLetterLink }}
      onShouldStartLoadWithRequest={request => {
        if (request.url !== internalNewsLetterLink) {
          Linking.openURL(request.url);
          return false;
        }

        return true;
      }}
    />
  );
};

export default InternalNewsLetter;
