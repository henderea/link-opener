function __<T>(handler: (resolve: (param: T) => void, reject: (param: any) => void) => void): Promise<T> {
  return new Promise(handler);
}

const deploymentId: string = process.env.VERCEL_URL ? process.env.VERCEL_URL.replace(/^.*-([a-zA-Z0-9]+)(-[^-]+)?\.vercel\.app.*$/, '$1') : 'N/A';
Object.defineProperty(__, 'deployKey', {
  get: () => deploymentId
});

__.isBlank = (value: string | null | undefined): value is null | undefined | '' => !value || value.trim() == '';

__.isNotBlank = (value: string | null | undefined): value is Exclude<string, ''> => (!!value) && value.trim() != '';

__.subs = (text: string, ...subs: any[]): string => {
  let rv: string = '';
  let pattern: RegExp = /(\\?){(\d*)}/g;
  if(pattern.test(text)) {
    pattern.lastIndex = 0;
    let lastIndex: number = 0;
    let defaultIndex: number = 0;
    let m: RegExpExecArray | null;
    while((m = pattern.exec(text)) !== null) {
      let start: number = m.index;
      if(start > lastIndex) { rv += text.slice(lastIndex, start); }
      if(__.isNotBlank(m[1])) {
        rv += m[0].slice(1);
      } else {
        let index: number = __.isBlank(m[2]) ? -1 : parseInt(m[2]);
        if(index < 0) { index = defaultIndex++; }
        rv += index < subs.length ? String(subs[index]) : m[0];
      }
      lastIndex = pattern.lastIndex;
    }
    if(lastIndex < text.length) { rv += text.slice(lastIndex); }
  } else {
    rv += text;
  }
  return rv;
};

__.matchAll = (s: string, p: RegExp): RegExpMatchArray[] => {
  if(!s) { return []; }
  p.lastIndex = 0;
  return Array.from(s.matchAll(p));
};

function $$<T extends HTMLElement>(selector: string): T {
  return document.querySelector(selector) as T;
}

$$.ready = function(): Promise<void> {
  return __((resolve) => {
    document.addEventListener('DOMContentLoaded', () => resolve());
  });
};

$$.onReady = function(func: () => void): void {
  $$.ready().then(func);
};

let ___: typeof __ & { deployKey: string } = __ as typeof __ & { deployKey: string };

export {
  $$,
  ___ as __
};