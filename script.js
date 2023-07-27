const imgDir = 'imgs/';
const imgCount = 30;
const imgExt = '.jpg';

const imgIndex = Math.floor(Math.random() * imgCount) + 1;
const imgSrc = `${imgDir}${imgIndex}${imgExt}`;

const img = document.getElementById('img');
img.setAttribute('src', imgSrc);

const controller = new AbortController();

img.addEventListener(
  'dblclick',
  () => {
    document.body.innerHTML += `<textarea class="textarea" autofocus></textarea>`;
  },
  { abort: controller.signal },
);