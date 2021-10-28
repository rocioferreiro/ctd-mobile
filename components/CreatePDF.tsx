import * as React from 'react';
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export const createPDF = async (html) => {
  try {
    const {uri} = await Print.printToFileAsync({html});
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error(error);
  }
};

export const PROFILE_HTML = (content: string[]) => {
  return `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Hello Expo!
    </h1>
    ${content.map(s => {
      return(
        `<p>${s}</p>`
      );
  })}
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;"  alt="image"/>
  </body>
</html>
`
};
