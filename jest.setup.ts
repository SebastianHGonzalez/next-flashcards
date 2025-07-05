import '@testing-library/jest-dom'

// Mock next-intl
jest.mock('next-intl', () => ({
    useTranslations: () => (key: string) => key,
    useFormatter: () => ({
        format: (value: any) => value,
    }),
}))
