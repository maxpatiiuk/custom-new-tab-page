const imgDir = 'imgs/';
const imgCount = 12;
const imgExt = '.png';

const imgIndex = Math.floor(Math.random() * imgCount) + 1;
const imgSrc = `${imgDir}${imgIndex}${imgExt}`;

const img = document.getElementById('img');
img.setAttribute('src', imgSrc);

Object.defineProperty(window, 'j', {
  get: () => JSON.parse(getTextarea().value),
  set: (value) => {
    getTextarea().value = JSON.stringify(value, null, 2);
  },
});
Object.defineProperty(window, 'v', {
  get: () => getTextarea().value,
  set: (value) => {
    getTextarea().value = value;
  },
});

function getTextarea() {
  if (textarea) return textarea;
  document.body.innerHTML += `<textarea class="textarea" autofocus></textarea>`;
  textarea = document.querySelector('textarea');
  img.removeEventListener('dblclick', getTextarea);
  return textarea;
}
let textarea = undefined;

img.addEventListener('dblclick', getTextarea);

const observer = new MutationObserver(([mutation]) => {
  const node = mutation.addedNodes?.[0];
  if (node?.textContent.trim() === '' && node.outerHTML === undefined) return;

  observer.disconnect();
  document.title = 'Scratch Page';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" fill="#faf"></circle>
    </svg>`;
  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('link');
  link.type = 'image/svg+xml';
  link.rel = 'shortcut icon';
  link.href = url;
  document.head.appendChild(link);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
});
