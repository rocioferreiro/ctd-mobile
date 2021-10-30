import * as React from 'react';
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export type Content = {
  username: string,
  email: string,
  connected: number,
  level: number,
  verifiedChallenges: number,
  sdg: number[],
  challenges: ChallengeSnack[]
}

export type ChallengeSnack = {
  title: string,
  completionDate: string,
  sdg: number[]
}

export const createPDF = async (html) => {
  try {
    const {uri} = await Print.printToFileAsync({html});
    await Sharing.shareAsync(uri);
  } catch (error) {
    console.error(error);
  }
};

const getSdgIcon = (number: number) => {
  return 'https://www.un.org/sites/un2.un.org/files/sdg' + number + '-en.png'
}

export const PROFILE_HTML = (content: Content) => {
  return `
<html>
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
    <link rel="stylesheet" href="profile.css">
    <title>Connect the Dots - Participation Certificate</title>
</head>
<body style="text-align: center; font-family: ApfelGrotezk, Helvetica, monospace; background-color: #FFF3E9">
<style> 
   @page { margin: 20px; } 
</style>
<h1 style="font-size: 50px; margin: 10px; font-family: ApfelGrotezk, Helvetica, monospace; font-weight: bold; color: #15006D">
    Connect the Dots
</h1>
<h3 style="font-size: 30px; margin: 5px; font-family: ApfelGrotezk, Helvetica, monospace; font-weight: bold; color: #6c759f">
    Participation Certificate
</h3>
<div style="align-items: center; justify-content: center; display: flex; flex-direction: column">
    <div style="display: flex; flex-direction: row; width: 100%; padding: 10px; align-items: center; justify-content: space-evenly;">
        <div style="width: 50%;
                    border-radius: 15px;
                    padding: 8px;
                    background-color: #fff;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    min-width: 0;
                    word-wrap: break-word;
                    background-clip: border-box;
                    border: 1px
                    solid rgba(0,0,0,.125);">
            <div style="height: 100px;">
                <h4 style="color: #15006D; text-align: left; width: 80%; margin: 5px">
                    Date of issue: ${new Date().toDateString()}
                </h4>
            </div>
            <div style="position: relative; text-align: center;">
                <div style="position: absolute;
                            top: -50px;
                            left: 38%;
                            height: 90px;
                            width: 90px;
                            border: 3px
                            solid #fff;
                            border-radius: 50%;">
                    <img src="https://i.imgur.com/JgYD2nQ.jpg"
                         style="border-radius: 50%;" width="80" alt="profile-pic">
                </div>
            </div>
            <div style="margin-top: 2rem; text-align: center;
            display: flex; align-items: center; flex-direction: column">
                <h4 style="margin-bottom: 0; font-size: 1.5rem;color: #15006D;">
                    ${content.username}
                </h4>
                <span style="color: #6c759f; display: block; margin-bottom: 0.5rem; font-size: 1.5rem;">
                    ${content.email}
                </span>
                <div style="display: flex; flex-direction: row; margin-top: 15px; width: 80%; justify-content: space-evenly; align-items: center">
                    <img src="${getSdgIcon(content.sdg[0])}"
                         style="border-radius: 50%;" height="35" alt="challenge-icon">
                    <img src="${getSdgIcon(content.sdg[1])}"
                         style="border-radius: 50%;" height="35" alt="challenge-icon">
                    <img src="${getSdgIcon(content.sdg[2])}"
                         style="border-radius: 50%;" height="35" alt="challenge-icon">
                </div>
                <div style="display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding-right: 1.5rem;
                            padding-left: 1.5rem;
                            width: 85%;
                            margin-bottom: 20px">
                    <div style="font-weight: 300;
                                word-wrap: break-word;
                                text-align: center;
                                box-sizing: border-box;
                                font-size: 1.5rem;
                                line-height: 1.5;
                                color: #212529;
                                -webkit-text-size-adjust: 100%;
                                -webkit-tap-highlight-color: transparent;"
                    >
                        <h6 style="margin-bottom: 0;color: #15006D;">Connected</h6> <span
                            style="color: #15006D;">${content.connected}</span>
                    </div>
                    <div style="font-weight: 300;
                                word-wrap: break-word;
                                text-align: center;
                                box-sizing: border-box;
                                font-size: 1.5rem;
                                line-height: 1.5;
                                color: #212529;
                                -webkit-text-size-adjust: 100%;
                                -webkit-tap-highlight-color: transparent;"
                    >
                        <h6 style="margin-bottom: 0;color: #15006D;">Level</h6>
                        <span style="color: #15006D;">${content.level}</span>
                    </div>
                    <div style="font-weight: 300;
                                word-wrap: break-word;
                                text-align: center;
                                box-sizing: border-box;
                                font-size: 1.5rem;
                                line-height: 1.5;
                                color: #212529;
                                -webkit-text-size-adjust: 100%;
                                -webkit-tap-highlight-color: transparent;"
                    >
                        <h6 style="margin-bottom: 0;color: #15006D;">Challenges</h6> <span
                            style="color: #15006D;">${content.verifiedChallenges}</span>
                    </div>
                </div>
            </div>
        </div>
        <div style="display: flex; break-inside: avoid; flex-direction: column; justify-content: center; align-items: center; width: 50%;">
            <p style="text-align: justify;
                      color: #15006D;
                      line-height: 1.5;
                      font-size: 18px;
                      padding: 10px;
                      margin: 0;
                      font-family: 'DM Sans', sans-serif;">
                Connect the Dots is an instrument to make World building NOW. It is a way of connecting people
                distributed around the world, in pursuit of shared values and convergent interests. The goal is to raise
                awareness of the importance of taking action in your street corner.</p>
            <p style="text-align: justify;
                      color: #15006D;
                      line-height: 1.5;
                      font-size: 18px;
                      margin: 0;
                      padding: 10px;
                      font-family: 'DM Sans', sans-serif;">
                An individual's message becomes the
                inspiration for the cause of a large group. Connect the dots identifies these "specials" and helps them
                bond with others to cause a high-impact movement. By visualizing the emerging narrative, which a person
                shares from his corner in the world, they manage to amplify the call to be part of a globally connected
                coalition.
            </p>
        </div>
    </div>
    <div style="width: 100%; padding: 10px; margin: 5px; display: flex; flex-direction: column; align-items: center">
        ${content.challenges.map(ch => {
            if (!ch.sdg || ch.sdg.length <= 0) return ``
            else return `<div style="
                            width: 80%;
                            break-inside: avoid;
                            max-height: 300px;
                            border-radius: 15px;
                            padding: 8px;
                            background-color: #fff;
                            position: relative;
                            display: flex;
                            flex-direction: row;
                            word-wrap: break-word;
                            background-clip: border-box;
                            justify-content: space-evenly;
                            border: 1px
                            solid rgba(0,0,0,.125);">
                                <div style="
                                display: flex;
                                text-align: center;
                                justify-content: space-evenly;
                                align-items: center;
                                width: 70%;
                                flex-direction: row;">
                                  <p style="
                                  margin: 0;
                                  font-weight: 400;
                                  word-wrap: break-word;
                                  text-align: center;
                                  color: #15006D;
                                  min-width: 120px;
                                  font-size: 1.2rem;
                                  -webkit-text-size-adjust: 100%;
                                  -webkit-tap-highlight-color: transparent;">
                                    ${ch.completionDate}
                                  </p>
                                  <h6 style="
                                                      margin: 0;
                                                      font-weight: 300;
                                                      word-wrap: break-word;
                                                      text-align: justify;
                                                      color: #15006D;
                                                      padding: 10px;
                                                      font-size: 1.2rem;
                                                      line-height: 1.5;
                                                      -webkit-text-size-adjust: 100%;
                                                      -webkit-tap-highlight-color: transparent;">
                                    ${ch.title}
                                  </h6>
                              </div>
                                <div style="display: flex; flex-direction: row; width: 30%; justify-content: space-evenly; align-items: center">
                                  <img src="${getSdgIcon(ch.sdg[0])}"
                                       style="border-radius: 50%;" height="35" alt="challenge-icon">
                                  <img src="${getSdgIcon(ch.sdg[1])}"
                                       style="border-radius: 50%;" height="35" alt="challenge-icon">
                                  <img src="${getSdgIcon(ch.sdg[2])}"
                                       style="border-radius: 50%;" height="35" alt="challenge-icon">
                                </div>
                              </div>`
          })}
    </div>
</div>
</body>
</html>
`
};
