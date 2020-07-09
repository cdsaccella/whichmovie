var Jimp = require('jimp');
const DEFAULT_CONFIG = {
  PIXEL: 4,
  COLOR: 32
}
const DEFAULT_URL_IMAGE = 'https://picsum.photos/200/300';

exports.handler = function (event, context, callback) {

  const pixelParam = Number(event["queryStringParameters"]["pixel"]);
  const colorParam = Number(event["queryStringParameters"]["color"]);
  const urlParam = event["queryStringParameters"]["url"];

  const pixelFactor = pixelParam ? pixelParam : DEFAULT_CONFIG.PIXEL;
  const colorFactor = colorParam ? colorParam : DEFAULT_CONFIG.COLOR;
  const url = urlParam ? urlParam : DEFAULT_URL_IMAGE;

  Jimp.read(url)
    .then(image => {
      image.pixelate(pixelFactor);

      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
        // x, y is the position of this pixel on the image
        // idx is the position start position of this rgba tuple in the bitmap Buffer
        // this is the image
        var red = this.bitmap.data[idx + 0];
        var green = this.bitmap.data[idx + 1];
        var blue = this.bitmap.data[idx + 2];

        this.bitmap.data[idx + 0] = red - red % colorFactor
        this.bitmap.data[idx + 1] = green - green % colorFactor
        this.bitmap.data[idx + 2] = blue - blue % colorFactor
      });

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
          callback(null, {
            statusCode: 500,
            body: "Error parsing image.",
          })
        });

    })
    .catch(err => {
      // Handle an exception.
      callback(null, {
        statusCode: 500,
        body: "Error executing task.",
      })
    });


};