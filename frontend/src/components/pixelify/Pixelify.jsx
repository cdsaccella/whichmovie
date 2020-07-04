/*
  a little modify of https://github.com/nikoferro/react-pixelify
  @author https://github.com/nikoferro
*/

import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function Pixelify({
  src,
  width,
  height,
  pixelSize,
  centered,
  fillTransparencyColor,
}) {
  const canvasRef = useRef();

  useEffect(() => {
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
            ctx.fillStyle =
              rgba[3] === 0
                ? fillTransparencyColor
                : `rgba(${rgba[0]},${rgba[1]},${rgba[2]},${rgba[3]})`;

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
  }, [src, width, height, pixelSize, centered, fillTransparencyColor]);

  return <canvas ref={canvasRef} />;
}

Pixelify.propTypes = {
  src: PropTypes.string.isRequired,
  pixelSize: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  centered: PropTypes.bool,
  fillTransparencyColor: PropTypes.string,
};

Pixelify.defaultProps = {
  centered: false,
  fillTransparencyColor: "white",
};

export default Pixelify;
