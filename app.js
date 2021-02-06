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




// Listen for a slash command invocation
app.command('/ttv', async ({ command, ack, say, client, body }) => {
  // Acknowledge the command request
  await ack();

  console.log(command);
  console.log(command.text);

  // Parsitaan käyttäjän antamasta komennosta vain ensimmäinen parametri
  const parameters = command.text;
  const firstParm = parameters.split(' ')[0];
  
  // Aloitetaan tutkimalla, onko komennon jälkeen annettu ensimmäinen parametri sana
  if (isNaN(firstParm)){
    switch (firstParm) {
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
      // Mapataan osastojen mahdollisia nimiä sivuihin  
      case 'etusivu':
        
        break;
      case 'nhl':
        await say('nhl');
        break;
      case 'kotimaa':
        await say('kotimaa');
        break;
      default:
        await say('Väärä komento');
    };
  } else {
      const pageNumber = parseInt(firstParm, 10);
      await say({
        text: `https://external.api.yle.fi/v1/teletext/images/${pageNumber}/1.png?app_id=ed81168f&app_key=08204b5d92f0245e5e595fea17fe0875`,
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


