const fs = require('fs');
const path = require('path');
const dialogflow = require('dialogflow').v2beta1;

// Audio settings
const FFplay = require("ffplay");
const outputPath = './output.wav';
const inputPath = './input.wav';

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

function createTextQuery(textQuery) {
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

function createBlobQuery(blob) {
    return {
        session: sessionPath,
        queryInput: {
          audioConfig: {
            audioEncoding: 'mp3',
            sampleRateHertz: 44100,
            languageCode: languageCode,
          },
        },
        inputAudio: blob,
        outputAudioConfig: {
            audioEncoding: `OUTPUT_AUDIO_ENCODING_LINEAR_16`,
        }
    }
}

function executeQuery(query, fn) {
    sessionClient
        .detectIntent(query)
        .then(responses => {
            fn(handleResponse(responses));
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
}

function handleResponse(responses) {
    const result = responses[0].queryResult;
    var intent = null;

    if (result && result.intent) {
        intent = result.intent.displayName;
    }

    if (!intent) {
        return null;
    }

    playAudio(responses);

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
    executeQuery,
    createTextQuery,
    createBlobQuery
}