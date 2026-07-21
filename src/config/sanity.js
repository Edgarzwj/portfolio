import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
    projectId: 'kv5wjjmj', // Zostanie uzupełnione po utworzeniu projektu w Sanity
    dataset: 'production',
    useCdn: true, // `false` dla środowiska dev, `true` dla produkcji żeby było szybciej
    apiVersion: '2024-03-01', // aktualna data API
});

const builder = createImageUrlBuilder(sanityClient);

// Funkcja pomocnicza do generowania adresów URL obrazków z Sanity
export const urlFor = (source) => {
    if (!source) return null;
    const urlBuilder = builder.image(source);
    
    // Nadpisujemy metodę url(), aby przekierować żądania przez lokalne proxy /sanity-cdn
    const originalUrl = urlBuilder.url.bind(urlBuilder);
    urlBuilder.url = () => {
        const url = originalUrl();
        if (url && typeof window !== 'undefined') {
            return url.replace('https://cdn.sanity.io', '/sanity-cdn');
        }
        return url;
    };
    
    return urlBuilder;
};
