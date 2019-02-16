import EXIF from "exif-js";

export const getMetaDataFromImage = (image) => {
    return new Promise((resolve)=> {
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