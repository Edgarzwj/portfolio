import { useEffect, useRef } from 'react';
import { useScene } from '../context/SceneContext';

/**
 * useDocumentMeta — Dynamic Meta Tags & Virtual Routing (History API)
 * 
 * Updates the browser URL, page title, and meta description
 * whenever the user enters/exits a 3D room. Also handles the
 * browser back/forward buttons for seamless navigation.
 */

const ROOM_META = {
    null: {
        path: '/',
        title: 'Edgar（张万江）| 3D 交互式作品集',
        description: 'Edgar（张万江）的交互式 3D 开发者作品集：独立游戏开发、全栈工程与开源工具，基于 React Three Fiber / Three.js / GSAP 打造的手绘风格画廊。',
    },
    about: {
        path: '/about',
        title: '关于我 — Edgar 作品集',
        description: '认识 Edgar（张万江）：独立游戏 & 全栈开发者，专注算法、机器学习与交互式 Web 体验。',
    },
    gallery: {
        path: '/gallery',
        title: '作品画廊 — Edgar 作品集',
        description: '浏览 Edgar 的交互式 3D 作品画廊：一太刀、deaify、novel-to-script 等真实开源项目。',
    },
    studio: {
        path: '/studio',
        title: '工作室 — Edgar 作品集',
        description: '探索 Edgar 的内容工作室：开发日志、文章与短视频，呈现在沉浸式 3D 空间中。',
    },
    contact: {
        path: '/contact',
        title: '联系 — Edgar 作品集',
        description: '联系 Edgar（张万江）。在交互式 3D 联系房间中找到 GitHub、邮箱与社交链接。',
    },
};

// Map URL paths back to room IDs for deep linking
const PATH_TO_ROOM = {
    '/': null,
    '/about': 'about',
    '/gallery': 'gallery',
    '/studio': 'studio',
    '/contact': 'contact',
};

/**
 * Returns the room ID that the initial URL points to (for deep linking).
 * Call this once at app startup to determine if we need to auto-teleport.
 */
export function getInitialRoomFromUrl() {
    const hash = window.location.hash.replace(/^#/, '').replace(/\/+$/, '') || '/';
    return PATH_TO_ROOM[hash] !== undefined ? PATH_TO_ROOM[hash] : null;
}

export function useDocumentMeta() {
    const { currentRoom, teleportTo, hasEntered } = useScene();
    const isHandlingPopState = useRef(false);
    const lastPushedRoom = useRef(undefined); // Track what we last pushed to avoid duplicates

    // Update document meta and URL when room changes
    useEffect(() => {
        const roomKey = currentRoom === null ? 'null' : currentRoom;
        const meta = ROOM_META[roomKey] || ROOM_META['null'];

        // Update the page title
        document.title = meta.title;

        // Update meta description
        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) {
            descTag.setAttribute('content', meta.description);
        }

        // Update OG meta tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', meta.title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', meta.description);

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', `https://edgarzwj.github.io/portfolio${meta.path}`);

        // Update canonical link to ensure virtual routes are correctly indexable as separate pages
        const canonicalTag = document.querySelector('link[rel="canonical"]');
        if (canonicalTag) {
            canonicalTag.setAttribute('href', `https://edgarzwj.github.io/portfolio${meta.path}`);
        }

        // Push to browser history (only if not handling a popstate event and room actually changed)
        if (!isHandlingPopState.current && lastPushedRoom.current !== currentRoom) {
            // Use replaceState for the very first load, pushState for subsequent navigations
            if (lastPushedRoom.current === undefined) {
                window.history.replaceState({ room: currentRoom }, '', '#' + meta.path);
            } else {
                window.history.pushState({ room: currentRoom }, '', '#' + meta.path);
            }
            lastPushedRoom.current = currentRoom;
        }

        isHandlingPopState.current = false;
    }, [currentRoom]);

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event) => {
            isHandlingPopState.current = true;
            const targetRoom = event.state?.room ?? null;
            lastPushedRoom.current = targetRoom;

            if (targetRoom === null) {
                // Going back to corridor — we don't teleport, just need to trigger exit
                // The SceneContext requestExit will handle the animation
                // For now, we update meta immediately
                const meta = ROOM_META['null'];
                document.title = meta.title;
            } else if (hasEntered) {
                // Teleport to the target room
                teleportTo(targetRoom);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [teleportTo, hasEntered]);
}
