/**
 * Studio Content Data
 * 
 * This file contains all content items for the Studio monitor tower.
 * Each item will be displayed on a monitor in the tower.
 * 
 * Platforms: 'youtube', 'blog', 'tiktok'
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: 'YouTube',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Blog',
        shape: 'monitor', // Thin desktop monitor
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '🎵',
        label: 'TikTok',
        shape: 'phone', // Vertical phone
    },
    instagram: {
        color: '#E1306C',
        accentColor: '#C13584',
        icon: '📷',
        label: 'Instagram',
        shape: 'phone',
    },
    x: {
        color: '#000000',
        accentColor: '#14171A',
        icon: '𝕏',
        label: 'X (Twitter)',
        shape: 'monitor',
    },
    linkedin: {
        color: '#0077B5',
        accentColor: '#005E93',
        icon: 'in',
        label: 'LinkedIn',
        shape: 'monitor',
    },
    codrops: {
        color: '#0099FF',
        accentColor: '#0077CC',
        icon: '💧',
        label: 'Codrops',
        shape: 'monitor',
    },
};

// TODO: 替换为你的真实内容（开发日志 / 文章 / 短视频）。当前为占位，围绕你的已知项目。
const RAW_CONTENT_DATA = [
    // ============ YouTube / Dev Logs ============
    {
        id: 'yt-001',
        platform: 'youtube',
        title: '一太刀开发日志 #1 · 像素水墨武士',
        description: '从零搭一个移动端浏览器武士游戏，记录像素水墨风格的取舍。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj',
        date: '2026-07-20',
        views: '—',
        duration: '12:30',
    },
    {
        id: 'yt-002',
        platform: 'youtube',
        title: 'DEAIFY：让 AI 代码去 AI 化',
        description: '演示如何用 deaify 技能把 AI 生成的算法代码改得像人写的。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj/deaify',
        date: '2026-06-15',
        views: '—',
        duration: '08:12',
    },
    {
        id: 'yt-003',
        platform: 'youtube',
        title: 'NOVEL>SCRIPT 小说转剧本演示',
        description: '把一章小说自动拆成镜头脚本，开源工具实操。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj/novel-to-script',
        date: '2026-05-28',
        views: '—',
        duration: '10:05',
    },
    {
        id: 'yt-004',
        platform: 'youtube',
        title: '数据池管理界面巡览',
        description: '前端规则库（design-rules / rules-index / design-systems）怎么用。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj',
        date: '2026-04-10',
        views: '—',
        duration: '06:48',
    },

    // ============ Blog / Articles ============
    {
        id: 'blog-001',
        platform: 'blog',
        title: '为什么我要做一太刀',
        description: '关于像素水墨武士游戏的初衷与最小可行玩法。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj',
        date: '2026-07-01',
        readTime: '5 min',
    },
    {
        id: 'blog-002',
        platform: 'blog',
        title: 'DEAIFY 设计思路',
        description: '去 AI 化不是润色，而是还原工程师的表达习惯。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj/deaify',
        date: '2026-06-02',
        readTime: '8 min',
    },
    {
        id: 'blog-003',
        platform: 'blog',
        title: 'AI 小说转剧本工作流',
        description: '从文本解析到镜头分镜的可复用管线。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj/novel-to-script',
        date: '2026-05-12',
        readTime: '6 min',
    },
    {
        id: 'blog-004',
        platform: 'blog',
        title: '前端规则库怎么用',
        description: '用现成设计规则仓库自动加载，而不是手写提示词。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj',
        date: '2026-04-20',
        readTime: '7 min',
    },

    // ============ TikTok / Reels ============
    {
        id: 'tt-001',
        platform: 'tiktok',
        title: '像素武士一刀特效 ✨',
        description: '浏览器里的水墨斩击，纯前端实现。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj',
        date: '2026-07-18',
        views: '—',
        likes: '—',
    },
    {
        id: 'tt-002',
        platform: 'tiktok',
        title: '浏览器游戏开发日常',
        description: '移动端适配的那些坑。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj',
        date: '2026-06-30',
        views: '—',
        likes: '—',
    },
    {
        id: 'tt-003',
        platform: 'tiktok',
        title: '去 AI 化代码演示',
        description: '一眼看出 AI 味？看怎么消掉。',
        thumbnail: null,
        url: 'https://github.com/Edgarzwj/deaify',
        date: '2026-05-22',
        views: '—',
        likes: '—',
    },
];

const ytTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego.webp', '/textures/studio/tvfront_filmikedytowaniezdjec.webp'];
const ytPaintedTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp', '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp'];
const blogTextures = ['/textures/studio/monitorfront_postnafbdoublewinner.webp'];
const blogPaintedTextures = ['/textures/studio/monitorfront_postnafbdoublewinner_painted.webp'];
const ttTextures = ['/textures/studio/phonefront_followmeontiktok.webp'];
const ttPaintedTextures = ['/textures/studio/phonefront_followmeontiktok_painted.webp'];

let ytIdx = 0, blogIdx = 0, ttIdx = 0;
let ytPIdx = 0, blogPIdx = 0, ttPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            item.platform === 'youtube' ? ytTextures[ytIdx++ % ytTextures.length] :
                item.platform === 'blog' ? blogTextures[blogIdx++ % blogTextures.length] :
                    ttTextures[ttIdx++ % ttTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            item.platform === 'youtube' ? ytPaintedTextures[ytPIdx++ % ytPaintedTextures.length] :
                item.platform === 'blog' ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length] :
                    ttPaintedTextures[ttPIdx++ % ttPaintedTextures.length]
        )
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
