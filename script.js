const imgDir = 'imgs/';
const imgCount = 12;
const imgExt = '.png';

const imgIndex = Math.floor(Math.random() * imgCount) + 1;
const imgSrc = `${imgDir}${imgIndex}${imgExt}`;

const img = document.getElementById('img');
img.setAttribute('src', imgSrc);

const controller = new AbortController();

let textarea = undefined;
Object.defineProperty(window, 'textarea', {
  get: () => textarea ?? makeEditable(),
  set: (value) => (textarea = value),
});

const alias = (object, alias, canonical) =>
  Object.defineProperty(object, alias, {
    get: () => object[canonical],
    set: (value) => (object[canonical] = value),
  });
alias(window, 't', 'textarea');

img.addEventListener('dblclick', makeEditable, {
  abort: controller.signal,
  once: true,
});
function makeEditable() {
  document.body.innerHTML += `<textarea class="textarea" autofocus></textarea>`;
  textarea = document.querySelector('textarea');
  alias(textarea, 'v', 'value');

  controller.abort();
  return textarea;
}

const observer = new MutationObserver(([mutation]) => {
  const node = mutation.addedNodes?.[0];
  if (node?.textContent.trim() === '' && node.outerHTML === undefined) return;

  observer.disconnect();
  controller.abort();
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
