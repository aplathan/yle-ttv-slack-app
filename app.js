// TTV-appi

const { App, ExpressReceiver } = require('@slack/bolt');
const awsServerlessExpress = require('aws-serverless-express');

// Exposataan custom http routerin parserit (json...)
// https://github.com/slackapi/bolt-js/issues/516
const express = require('express')


// Initialize your custom receiver
const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  // The `processBeforeResponse` option is required for all FaaS environments.
  // It allows Bolt methods (e.g. `app.message`) to handle a Slack request
  // before the Bolt framework responds to the request (e.g. `ack()`). This is
  // important because FaaS immediately terminate handlers after the response.
  processBeforeResponse: true
});

// Initializes your app with your bot token and the AWS Lambda ready receiver
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver
});

// Initialize your AWSServerlessExpress server using Bolt's ExpressReceiver
const server = awsServerlessExpress.createServer(expressReceiver.app);


// Luodaan dictionary sivujen hakusanoista ja niiden mäppäylsistä TTV-sivunmeroihin
var pageDict = {
  "etusivu": 100, 
  "hakemistot": 199,
  "kotimaa": 102,
  "ulkomaat": 130,
  "talous": 160,
  "sää": 400,
  "liikenne": 400,
  "urheilu": 201,
  "nhl": 235,
  "änäri": 235,
  "eurojalkapallo": 600,
  "jalkapallo": 600,
  "fudis": 600,
  "veikkaus": 470,
  "tv-ohjelmat": 300,
  "tv": 300,
  "ohjelmat": 300,
  "ohjelmaopas": 350,
  "opas": 350,
  "alueuutiset": 500,
  "news": 190,
  "english": 190,
  "newsinenglish": 190,
  "svenska": 700,
  "påsvenska": 700,
  "viikkomakasiini": 800,
  "viikko": 800,
  "makasiini": 800
};



app.command('/ttv', async ({ command, ack, say, client, body }) => {
  await ack();

  console.log(command);
  console.log(command.text);

  // Parsitaan käyttäjän antamasta komennosta vain ensimmäinen parametri
  const requestedPage = (command.text).split(' ')[0];
  console.log(requestedPage);
  var ttvPage = 100;

  // Aloitetaan tutkimalla, onko komennon jälkeen annettu ensimmäinen parametri sana
  if (isNaN(ttvPage)){
    switch (ttvPage) {
      // Vastataan help-komentoon
      case 'help':
        await say(
          {
            "response_type": "ephemeral",
            "text": "Näin käytät /ttv -komentoa:",
            "attachments":[
                {
                    "text":"Anna sivun numero `/ttv 100` tai osaston nimi `/ttv kotimaa` avataksesi Teksti-TV:n.\nOsastojen nimet ovat `etusivu`, `hakemistot`, `kotimaa`, `ulkomaat`, `talous`, `sää`, `liikenne`, `urheilu`, `nhl`, `eurojalkapallo`, `veikkaus`, `tv-ohjelmat`, `ohjelmaopas`, `alueuutiset`, `news`, `svenska`, `viikkomakasiini`.\n"
                }
            ]
          }
        );
        break;
      default:
        await say('Väärä komento');
    };
  } else {
      const pageNumber = parseInt(requestedPage, 10);
      await say({
        text: `https://external.api.yle.fi/v1/teletext/images/${pageNumber}/1.png?${process.env.TTV_API_KEY}`,
        replace_original: false,
        response_type: `ephemeral`,
        unfurl_links: true,
        unfurl_media: true
      });
    }


});  
















// Listening get requests from external sources, mainly for testing
expressReceiver.router.get('/test', (req, res) => {
  // You're working with an express req and res now.
  res.send('yay, get!');
});


// Handle the Lambda function event
module.exports.handler = (event, context) => {
  console.log('⚡️ Bolt app is running!');
  awsServerlessExpress.proxy(server, event, context);
};


