var Jimp = require('jimp');

var urlImage = 'https://picsum.photos/200/300';

exports.handler = function (event, context, callback) {
  Jimp.default.read(urlImage)
    .then(image => {
      // Do stuff with the image.
      image.resize(256, 256) // resize
      // console.log('I read the i')
      image.getBufferAsync('image/png').then(image => {
        callback(null, {
          statusCode: 200,
          headers:
          {
            "Content-Type": "image/png"
          },
          body: image.toString('base64'),
          isBase64Encoded: true
        });
      })
        .catch(err => {
          // Handle an exception.
        });

    })
    .catch(err => {
      // Handle an exception.
    });


};