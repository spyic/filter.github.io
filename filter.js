var canvas = document.getElementById("canvas"),
    originalImage = null,
    imageGray = null,
    imageRed = null,
    imageRainbow = null;

function upload() {
    var fileInput = document.getElementById("fileInput");
    originalImage = new SimpleImage(fileInput);
    imageGray = new SimpleImage(fileInput);
    imageRed = new SimpleImage(fileInput);
    imageRainbow = new SimpleImage(fileInput);

    originalImage.drawTo(canvas);
}

function filterGray() {

    // Reset Image
    for (var pixel of imageGray.values()) {
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
        imageGray.setPixel(pixel.getX(), pixel.getY(), originalPixel)
    }


    // Gray Filter
    for (var pixel of imageGray.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        pixel.setRed(avg);
        pixel.setGreen(avg);
        pixel.setBlue(avg);
    }
    imageGray.drawTo(canvas);
}

function printOriginal(img) {
    img.drawTo(canvas);
}

function makeRed() {
    // Reset Image
    for (var pixel of imageRed.values()) {
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
        imageRed.setPixel(pixel.getX(), pixel.getY(), originalPixel)
    }

    // Red Filter 	
    for (var pixel of imageRed.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
        if (avg < 128) {
            pixel.setRed(avg * 2 - 255);
            pixel.setBlue(avg * 2 - 255);
        } else {
            pixel.setRed(255);
            pixel.setGreen(avg * 2 - 255);
            pixel.setBlue(avg * 2 - 255);
        }
    }
    imageRed.drawTo(canvas);
}


function makeRainbow() {
    // Reset Image
    for (var pixel of imageRainbow.values()) {
        var originalPixel = originalImage.getPixel(pixel.getX(), pixel.getY());
        imageRainbow.setPixel(pixel.getX(), pixel.getY(), originalPixel)
    }

    // Rainbow Filter
    for (var pixel of imageRainbow.values()) {
        var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;

        /*---Red Rainbow Strip---*/
        if (pixel.getY() <= imageRainbow.getHeight() * (1 / 7)) {
            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(avg * 2 - 255);
                pixel.setBlue(avg * 2 - 255);
            }
        }

        /*---Orange Rainbow Strip---*/
        if (pixel.getY() > imageRainbow.getHeight() * (1 / 7) && pixel.getY() <= imageRainbow.getHeight() * (2 / 7)) {
            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(0.8 * avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(1.2 * avg - 51);
                pixel.setBlue(avg * 2 - 255);
            }
        }

        /*---Yellow Rainbow Strip---*/
        if (pixel.getY() > imageRainbow.getHeight() * (2 / 7) && pixel.getY() <= imageRainbow.getHeight() * (3 / 7)) {
            if (avg < 128) {
                pixel.setRed(2 * avg);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(255);
                pixel.setGreen(255);
                pixel.setBlue(avg * 2 - 255);
            }
        }

        /*---Green Rainbow Strip---*/
        if (pixel.getY() > imageRainbow.getHeight() * (3 / 7) && pixel.getY() <= imageRainbow.getHeight() * (4 / 7)) {
            if (avg < 128) {
                pixel.setRed(0);
                pixel.setGreen(2 * avg);
                pixel.setBlue(0);
            } else {
                pixel.setRed(avg * 2 - 255);
                pixel.setGreen(255);
                pixel.setBlue(avg * 2 - 255);
            }
        }

        /*---Blue Rainbow Strip---*/
        if (pixel.getY() > imageRainbow.getHeight() * (4 / 7) && pixel.getY() <= imageRainbow.getHeight() * (5 / 7)) {
            if (avg < 128) {
                pixel.setRed(0);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            } else {
                pixel.setRed(avg * 2 - 255);
                pixel.setGreen(avg * 2 - 255);
                pixel.setBlue(255);
            }
        }

        /*---Indigo Rainbow Strip---*/
        if (pixel.getY() > imageRainbow.getHeight() * (5 / 7) && pixel.getY() <= imageRainbow.getHeight() * (6 / 7)) {
            if (avg < 128) {
                pixel.setRed(0.8 * avg);
                pixel.setGreen(0);
                pixel.setBlue(2 * avg);
            } else {
                pixel.setRed(1.2 * avg - 51);
                pixel.setGreen(avg * 2 - 255);
                pixel.setBlue(255);
            }
        }

        /*---Violet Rainbow Strip---*/
        if (pixel.getY() > imageRainbow.getHeight() * (6 / 7) && pixel.getY() <= imageRainbow.getHeight() * (7 / 7)) {
            if (avg < 128) {
                pixel.setRed(1.6 * avg);
                pixel.setGreen(0);
                pixel.setBlue(1.6 * avg);
            } else {
                pixel.setRed(0.4 * avg + 153);
                pixel.setGreen(avg * 2 - 255);
                pixel.setBlue(0.4 * avg + 153);
            }
        }

    }
    imageRainbow.drawTo(canvas);
}


function makeGray() {
    if (imageGray != null) {
        filterGray();
    }
}

function resetImage() {
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    printOriginal(originalImage);
}