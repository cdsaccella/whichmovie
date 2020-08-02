const { checkOption } = require('./services/riddleService');

exports.handler = function (event, context, callback) {
  const method = event["httpMethod"];

  if (method !== 'POST') {
    callback(null, {
      statusCode: 405,
      body: JSON.stringify({ status: 'method not allowed', data: [] }),
    });
    return;
  }

  const body = event["body"];

  if (!body) {
    callback(null, {
      statusCode: 400,
      body: JSON.stringify({ status: 'failed', data: [] }),
    })
    return;
  }

  const { riddle, option } = JSON.parse(body);

  if (!riddle || !option) {
    callback(null, {
      statusCode: 422,
      body: JSON.stringify({ status: 'failed', data: { message: "Riddle and option are required" } }),
    });
    return;
  }

  const result = checkOption(riddle, option);
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ status: 'success', data: { result: result } }),
  });

};