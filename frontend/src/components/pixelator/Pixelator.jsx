import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function Pixelator({
  src,
  width,
  height,
  pixelSize,
  color,
  centered,
  fillTransparencyColor,
}) {
  const canvasRef = useRef();

  useEffect(() => {
    console.log("refreshing image");

    const intPixelSize = parseInt(pixelSize, 10);
    // create img that will be later painted into the canvas
    let img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    // once image is loaded..
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      img.width = width ? width : img.width;
      img.height = height ? height : img.height;
      canvas.width = img.width;
      canvas.height = img.height;
      // we paint the image into the canvas
      // this is needed to get RGBA info out of each pixel
      ctx.drawImage(img, 0, 0, img.width, img.height);

      if (!isNaN(intPixelSize) && intPixelSize > 0) {
        for (let x = 0; x < img.width + intPixelSize; x += intPixelSize) {
          for (let y = 0; y < img.height + intPixelSize; y += intPixelSize) {
            let xColorPick = x;
            let yColorPick = y;

            if (x >= img.width) {
              xColorPick =
                x - (intPixelSize - (img.width % intPixelSize) / 2) + 1;
            }
            if (y >= img.height) {
              yColorPick =
                y - (intPixelSize - (img.height % intPixelSize) / 2) + 1;
            }

            const rgba = ctx.getImageData(xColorPick, yColorPick, 1, 1).data;
            // TODO: add support for png transparent background
            // need to create another canvas and duplicate process?
            // one canvas to get the data from
            // one to paint pixels into
            const red = rgba[0] - (rgba[0] % color);
            const green = rgba[1] - (rgba[1] % color);
            const blue = rgba[2] - (rgba[2] % color);
            ctx.fillStyle =
              rgba[3] === 0
                ? fillTransparencyColor
                : `rgba(${red},${green},${blue},${rgba[3]})`;

            if (centered) {
              ctx.fillRect(
                parseInt(
                  x - (intPixelSize - (img.width % intPixelSize) / 2),
                  10
                ),
                parseInt(
                  y - (intPixelSize - (img.height % intPixelSize) / 2),
                  10
                ),
                intPixelSize,
                intPixelSize
              );
            } else {
              ctx.fillRect(x, y, intPixelSize, intPixelSize);
            }
          }
        }
      }

      img = null;
    };
  }, [src, color, width, height, pixelSize, centered, fillTransparencyColor]);

  return <canvas ref={canvasRef} />;
}

Pixelator.propTypes = {
  src: PropTypes.string.isRequired,
  pixelSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.number,
  centered: PropTypes.bool,
  fillTransparencyColor: PropTypes.string,
};

Pixelator.defaultProps = {
  centered: false,
  fillTransparencyColor: "white",
};

export default Pixelator;
