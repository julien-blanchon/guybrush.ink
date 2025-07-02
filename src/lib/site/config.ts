export const siteConfig = {
    /** The canonical production URL of the site */
    url: 'https://guybrush.ink',

    /**
     * Helper to get a fully-qualified URL regardless of environment.
     * Falls back to http://localhost:5173 in dev.
     */
    absolute(path = '') {
        const base = process.env.ORIGIN ?? this.url ?? 'http://localhost:5173';
        return new URL(path, base).href;
    }
} as const;
