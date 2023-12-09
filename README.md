# custom-new-tab-page

Simple Google Chrome extension for replacing New Tab page with a
gallery

## Configuration

Put your images into `./imgs/` directory. They must have a `jpg`
extension and be named like `$.jpg` where `$` is a number larger
than 1

After uploading the images, change the value of the `imgCount` constant
in `script.js`. You can also edit the file to change the image's
extension or location.

## Installation
 * Open `chrome://extensions` in your Google Chrome.
 * Press the `Load Unpacked` button in the upper right corner of the
   screen
 * Select this folder when promoted
 * Enjoy!

## Special features

Double click anywhere on the page to bring up a simpler text editor for super quick notes

You can change the value of the editor by typing `t.v = 'some value'` in
the DevTools' console. Similarly, you can store a JSON value: `t.j = {"a": 1}`.