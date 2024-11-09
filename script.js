'use strict';

// Closest January 1st to my birth date to have the timer reset on New Year
const initialPoint = new Date('2003-01-01');
const minimumLifetime = 100;
const fractionDigits = 6;

const numberFormatter = new Intl.NumberFormat(undefined, {
  style: 'percent',
  minimumFractionDigits: fractionDigits,
});

let isDoingDomUpdate = false;
const main = document.querySelector('main');
const verticalFilled = main.querySelector('.vertical-filled');
const horizontalFilled = main.querySelector('.horizontal-filled');
const counter = main.querySelector('h1');
main.style.setProperty('--minimum-lifetime', String(minimumLifetime));

/*
 * The progress number will visibly change every
 * 365*86400/10^fractionDigits seconds (31 seconds in case of 6 fraction
 * digits). We keep it simple and re-compute every 10 seconds.
 */
updateProgress();
const progressInterval = setInterval(updateProgress, 1000 * 1);

function updateProgress() {
  const [percentageYearsPassed, percentageYearProgress] = computeProgress();
  const numericProgress = percentageYearsPassed + percentageYearProgress / 100;

  isDoingDomUpdate = true;
  verticalFilled.style.height = `${percentageYearsPassed * 100}%`;
  horizontalFilled.style.width = `${percentageYearProgress * 100}%`;
  counter.textContent = numberFormatter.format(numericProgress);
}

function computeProgress() {
  const now = new Date();

  const thisYearStart = new Date(now.getUTCFullYear(), 0);
  const yearsPassed = now.getUTCFullYear() - initialPoint.getUTCFullYear();
  const percentageYearsPassed = yearsPassed / minimumLifetime;
  const nextYearStart = new Date(now.getUTCFullYear() + 1, 0);
  const oneYear = nextYearStart.getTime() - thisYearStart.getTime();
  const fullYear = now.getTime() - thisYearStart.getTime();
  const percentageYearProgress = fullYear / oneYear;

  return [percentageYearsPassed, percentageYearProgress];
}

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
  main.remove();
  document.body.innerHTML = `<textarea class="default-content" autofocus></textarea>`;
  textarea = document.querySelector('textarea');
  document.body.removeEventListener('dblclick', getTextarea);
  clearInterval(progressInterval);
  return textarea;
}
let textarea = undefined;

document.body.addEventListener('dblclick', getTextarea);

const observer = new MutationObserver(([mutation]) => {
  // Don't trigger mutation observer for self-initiated changes
  if (isDoingDomUpdate) {
    isDoingDomUpdate = false;
    return;
  }
  const node = mutation.addedNodes?.[0];
  if (node?.textContent.trim() === '' && node.outerHTML === undefined) return;

  observer.disconnect();
  document.body.classList.remove('default-content');
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
