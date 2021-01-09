declare function __<T>(handler: (resolve: (param: T) => void, reject: (param: any) => void) => void): Promise<T>;
declare namespace __ {
    var isBlank: (value: Optional<string>) => value is "" | null | undefined;
    var isNotBlank: (value: Optional<string>) => value is string;
    var subs: (text: string, ...subs: any[]) => string;
    var matchAll: (s: string, p: RegExp) => RegExpMatchArray[];
}
declare function $$<T extends HTMLElement>(selector: string): T;
declare namespace $$ {
    var ready: () => Promise<void>;
    var onReady: (func: () => void) => void;
}
declare let ___: typeof __ & {
    deployKey: string;
};
export { $$, ___ as __ };
