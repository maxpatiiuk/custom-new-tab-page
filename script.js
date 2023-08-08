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
