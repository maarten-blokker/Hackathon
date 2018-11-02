const fs = require('fs');
const path = require('path');
const dialogflow = require('dialogflow').v2beta1;

// Audio settings
const FFplay = require("ffplay");
const outputPath = './output.wav';

// Dialogflow settings
const projectId = 'acme-221110';
const sessionId = 'acme-prototype-session';
const languageCode = 'en-US';

// Define session path
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

function playAudio(responses) {
    const audioFile = responses[0].outputAudio;
    const outputFile = path.resolve(outputPath);

    console.log('writing file to: ' + outputFile);

    fs.writeFile(outputFile, audioFile, 'binary', err => {
        if (err) {
            console.error('ERROR:', err);
            return;
        }

        console.log('Playing audio')
        
        var player = new FFplay(outputFile);
        player.resume()
    });
}

function createTextRequest(textQuery) {
    return {
        session: sessionPath,
        queryInput: {
            text: {
                text: textQuery,
                languageCode: languageCode,
            },
        },
        outputAudioConfig: {
            audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
        },
    };
}

function executeTextQuery(textQuery, fn) {
    sessionClient
        .detectIntent(createTextRequest(textQuery))
        .then(responses => {
            console.log('Detected intent');
            if (!result.intent) {
                fn(null, 'no intent matched')
            }

            console.log(`Matched intent: ${result.intent.displayName}`);
            
            const response = handleResponse(responses);

            fn(handleResponse(responses));
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

function handleResponse(responses) {
    const result = responses[0].queryResult;
    const intent = result.intent.displayName;

    playAudio(responses);

    if (!intent) {
        return null;
    }

    const params = {};
    const fields = result.parameters.fields;
    for (var key in fields) {
        params[key] = fields[key].stringValue
    }

    return {
        'intent': intent,
        'params': params
    };
}

module.exports = {
    executeTextQuery
}