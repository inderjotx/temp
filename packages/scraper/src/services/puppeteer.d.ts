declare function initialize(): Promise<void>;
declare function teardown(): Promise<void>;
interface EvaluatePageParams {
    url?: string;
    html?: string;
    scriptTag?: {
        url?: string;
        content?: string;
    };
    evaluate: (page: any) => Promise<any> | any;
}
declare function evaluatePage({ url, html, scriptTag, evaluate }: EvaluatePageParams): Promise<any>;
export { initialize, evaluatePage, teardown, };
