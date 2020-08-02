const { getNewRiddle } = require('./services/riddleService');
global.fetch = require("node-fetch");

const DEFAULT_MODE = 'normal';
const DEFAULT_LANGUAGE = 'en';

exports.handler = function (event, context, callback) {
  const queryParams = event["queryStringParameters"];
  const paramLanguage = queryParams["lang"];
  const paramMode = queryParams["mode"];
  const language = paramLanguage ? paramLanguage : DEFAULT_LANGUAGE;
  const mode = paramMode ? paramMode : DEFAULT_MODE;
  const riddle = getNewRiddle(language, mode).then(riddle => {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: 'success', data: riddle }),
    });
  }).catch(err => {
    console.log(err);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ status: 'failed', data: [] }),
    })
  });
};