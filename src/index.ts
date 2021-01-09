import './index.scss';
import { $$, __ } from 'lib/util';

// @ts-ignore
import registerServiceWorker from '@henderea/static-site-builder/registerServiceWorker';

if(process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

$$.onReady(() => {
  let urlInput: HTMLInputElement = $$('#urlInput');
  urlInput.addEventListener('keydown', (e: KeyboardEvent) => {
    if(e.code === 'Enter') {
      let url: string = urlInput.value;
      if(url == 'dbg' || url == 'debug') {
        window.location.reload();
        return;
      }
      window.open(url);
    }
  });
  let urlTarget: HTMLAnchorElement = $$('#urlTarget');
  let urlTargetContainer: HTMLDivElement = $$('#urlTargetContainer');
  let debugContainer: HTMLDivElement = $$('#debugContainer');
  urlInput.addEventListener('input', () => {
    let url: string = urlInput.value;
    if(url == 'dbg' || url == 'debug') {
      debugContainer.style.display = 'block';
      urlTargetContainer.style.display = 'none';
    } else {
      urlTargetContainer.style.display = 'block';
      debugContainer.style.display = 'none';
    }
    urlTarget.innerText = url;
    urlTarget.href = url;
  });
  let debugData: HTMLDivElement = $$('#debugData');
  debugData.innerText = `Deploy Key: ${__.deployKey}`;
  let debugReload: HTMLAnchorElement = $$('#debugReload');
  debugReload.addEventListener('click', (e: MouseEvent) => {
    e.preventDefault();
    window.location.reload();
  });
});