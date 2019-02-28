import EXIF from "exif-js";
import piexif from 'piexifjs';

/**
 * Pulls exif data from jpegs
 * @param image
 * @returns {Promise}
 */
export const getMetaDataFromImage = (image) => {
    return new Promise((resolve)=> {
        image.exifdata = null;
        EXIF.getData(image, function () { //Fat arrow does not work here
            const exif = EXIF.getAllTags(this);

            resolve({
                ...exif,
                width: image.naturalWidth,
                height: image.naturalHeight,
                pageOrientation: image.naturalWidth > image.naturalHeight
                    ? 'landscape'
                    : 'portrait'
            });
        });
    });
};

/**
 * Corrects image orientation on base64 jpegs with orientation data, and sets exif data back on corrected image
 * @param src
 * @returns {Promise}
 */
export const correctImageOrientation = (src) =>{
    return new Promise((resolve)=> {
        const image = new Image();
        image.onload = function () {
            const exif = piexif.load(src),
                orientation = exif["0th"][piexif.ImageIFD.Orientation],
                canvas = document.createElement("canvas"),
                ctx = canvas.getContext("2d");
            let x = 0,
                y = 0;
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.save();
            if (orientation == 2) {
                x = -canvas.width;
                ctx.scale(-1, 1);
            } else if (orientation == 3) {
                x = -canvas.width;
                y = -canvas.height;
                ctx.scale(-1, -1);
            } else if (orientation == 3) {
                x = -canvas.width;
                y = -canvas.height;
                ctx.scale(-1, -1);
            } else if (orientation == 4) {
                y = -canvas.height;
                ctx.scale(1, -1);
            } else if (orientation == 5) {
                canvas.width = image.height;
                canvas.height = image.width;
                ctx.translate(canvas.width, canvas.height / canvas.width);
                ctx.rotate(Math.PI / 2);
                y = -canvas.width;
                ctx.scale(1, -1);
            } else if (orientation == 6) {
                canvas.width = image.height;
                canvas.height = image.width;
                ctx.translate(canvas.width, canvas.height / canvas.width);
                ctx.rotate(Math.PI / 2);
            } else if (orientation == 7) {
                canvas.width = image.height;
                canvas.height = image.width;
                ctx.translate(canvas.width, canvas.height / canvas.width);
                ctx.rotate(Math.PI / 2);
                x = -canvas.height;
                ctx.scale(-1, 1);
            } else if (orientation == 8) {
                canvas.width = image.height;
                canvas.height = image.width;
                ctx.translate(canvas.width, canvas.height / canvas.width);
                ctx.rotate(Math.PI / 2);
                x = -canvas.height;
                y = -canvas.width;
                ctx.scale(-1, -1);
            }
            ctx.drawImage(image, x, y);
            ctx.restore();
            exif["0th"][piexif.ImageIFD.Orientation] = 1; //reset orientation to 1 now that image has been corrected

            const dataURL = canvas.toDataURL("image/jpeg", 1.0),
                exifbytes = piexif.dump(exif),
                newImage = piexif.insert(exifbytes, dataURL);

            resolve(newImage);
        };
        image.src = src;
    });
};