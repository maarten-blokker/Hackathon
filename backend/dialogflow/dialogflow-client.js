const fs = require('fs');
const path = require('path');
const dialogflow = require('dialogflow').v2beta1;

// Audio settings
const FFplay = require("ffplay");
const outputPath = './output.wav';

// Dialogflow settings
const projectId = 'acme-221110'; 
const sessionId = 'acme-prototype-session';
const query = 'give me shoes';
const languageCode = 'en-US';

// Define session path
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

console.log("setting up request")

// The audio query request.
const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
    outputAudioConfig: {
      audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
    },
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;

    playAudio(responses);

    console.log(JSON.stringify(result))
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });



function playAudio(responses) {
    const audioFile = responses[0].outputAudio;
    const outputFile = path.resolve(outputPath);

    console.log('writing file to: '+outputFile);

    fs.writeFile(outputFile, audioFile, 'binary', err => {
        if (err) {
          console.error('ERROR:', err);
          return;
        }

        var player = new FFplay(outputFile);
        player.resume()
    });

    setTimeout(function(){console.log('bla')}, 1000);
}