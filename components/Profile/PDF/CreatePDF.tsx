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
        <meta name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
        <link rel="stylesheet" href="profile.css">
    </head>
    <body style="text-align: center; font-family: ApfelGrotezk, Helvetica, monospace; background-color: #FFF3E9">
        <h1 style="font-size: 50px; font-family: ApfelGrotezk, Helvetica, monospace; font-weight: bold; color: #15006D">
            Connect the Dots
        </h1>
        <div style="height: 100vh;  align-items: center!important;  justify-content: center!important; display: flex!important;">
            <div style="width: 380px;
                        border-radius: 15px;
                        padding: 8px;
                        background-color: #fff;
                        position: relative;
                        height: 370px;
                        display: flex;
                        flex-direction: column;
                        min-width: 0;
                        word-wrap: break-word;
                        background-clip: border-box;
                        border: 1px
                        solid rgba(0,0,0,.125);"
            >
                <div style="height: 100px;">
                    <img src="https://i.imgur.com/Qtrsrk5.jpg" style="max-width: 100%; vertical-align: middle; height: 80px; width: 100%; margin-top: 2px; border-radius: 5px">
                </div>
                <div style="position: relative;  text-align: center!important;">
                    <div style="position: absolute;
                                top: -50px;
                                left: 38%;
                                height: 90px;
                                width: 90px;
                                border: 3px
                                solid #fff;
                                border-radius: 50%;"
                    >
                        <img src="https://i.imgur.com/JgYD2nQ.jpg"
                             style="border-radius: 50%!important;" width="80">
                    </div>
                </div>
                <div style="margin-top: 3rem !important; text-align: center!important;">
                    <h4 style="margin-bottom: 0!important; font-size: 1.5rem;">User Name</h4>
                    <span style="color: #6c757d!important; display: block!important; margin-bottom: 0.5rem !important; font-size: 1.5rem;">User mail</span>
                    <div style="display: flex!important; justify-content: space-between!important; align-items: center!important; margin-top: 1.5rem !important; padding-right: 1.5rem !important; padding-left: 1.5rem !important;">
                        <div style="font-weight: 300;
                                    word-wrap: break-word;
                                    text-align: center!important;
                                    box-sizing: border-box;
                                    font-size: 1.5rem;
                                    line-height: 1.5;
                                    color: #212529;
                                    -webkit-text-size-adjust: 100%;
                                    -webkit-tap-highlight-color: transparent;"
                        >
                            <h6 style="margin-bottom: 0!important;">Followers</h6> <span>8,797</span>
                        </div>
                        <div style="font-weight: 300;
                                    word-wrap: break-word;
                                    text-align: center!important;
                                    box-sizing: border-box;
                                    font-size: 1.5rem;
                                    line-height: 1.5;
                                    color: #212529;
                                    -webkit-text-size-adjust: 100%;
                                    -webkit-tap-highlight-color: transparent;"
                        >
                            <h6 style="margin-bottom: 0!important;">Projects</h6> <span>142</span>
                        </div>
                        <div style="font-weight: 300;
                                    word-wrap: break-word;
                                    text-align: center!important;
                                    box-sizing: border-box;
                                    font-size: 1.5rem;
                                    line-height: 1.5;
                                    color: #212529;
                                    -webkit-text-size-adjust: 100%;
                                    -webkit-tap-highlight-color: transparent;"
                        >
                            <h6 style="margin-bottom: 0!important;">Ranks</h6> <span>129</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
`
};
