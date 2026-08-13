import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

const PROJECT_ID = 'YOUR_PROJECT_ID'; // 未配置 Sanity：Gallery/About/Studio 自动回退本地 FALLBACK 数据

export const isSanityConfigured = PROJECT_ID !== 'YOUR_PROJECT_ID';

// 仅在配置了合法 projectId 时才真正创建 client，避免 @sanity/client 校验非法 id 报错
export const sanityClient = isSanityConfigured
    ? createClient({
        projectId: PROJECT_ID,
        dataset: 'production',
        useCdn: true, // `false` dla środowiska dev, `true` dla produkcji żeby było szybciej
        apiVersion: '2024-03-01', // aktualna data API
    })
    : null;

const builder = sanityClient ? createImageUrlBuilder(sanityClient) : null;

// Funkcja pomocnicza do generowania adresów URL obrazków z Sanity
export const urlFor = (source) => (builder ? builder.image(source) : null);

// Funkcja pomocnicza do zamiany domeny Sanity na proxy w Cloudflare
export const getProxyUrl = (imageBuilder) => {
    if (!imageBuilder) return null;
    const url = imageBuilder.url();
    if (url && typeof window !== 'undefined') {
        // Dev: route through the local Vite proxy (/sanity-cdn -> cdn.sanity.io).
        // Prod: no proxy exists, so hit the Sanity CDN directly.
        if (import.meta.env.PROD) return url;
        return url.replace('https://cdn.sanity.io', '/sanity-cdn');
    }
    return url;
};
