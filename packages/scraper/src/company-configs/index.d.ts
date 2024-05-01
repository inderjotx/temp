interface CompanyConfig {
    name: string;
    url: string;
}
export declare function loadAllConfigs(): Promise<Record<string, CompanyConfig>>;
export {};
