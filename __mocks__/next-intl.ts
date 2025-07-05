export const useTranslations = jest.fn((namespace?: string) => (key: string) => namespace ? namespace + "." + key : key)
export const useFormatter = jest.fn(() => ({
    format: (value: any) => value,
}));
