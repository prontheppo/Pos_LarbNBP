/**
 * =================================================================
 * FILE: appInit.js
 * DESCRIPTION: สคริปต์กลางกำหนดโครงสร้างหน้าจอ ป้องกันการซูม
 *              และควบคุมการเลื่อน (Scroll) สำหรับทุกหน้าเว็บ
 *
 *   ✅ หน้าหลัก (top window)  → ล็อก height 100vh + overflow hidden
 *   ✅ iframe (หน้าลูก)        → ปลดล็อก ให้ scroll ได้ตามธรรมชาติ
 * =================================================================
 */

(function() {
    'use strict';
    
    /* -------------------------------------------------------------
       1. META VIEWPORT — ป้องกันการซูม
       ------------------------------------------------------------- */
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
        metaViewport = document.createElement('meta');
        metaViewport.name = 'viewport';
        document.head.appendChild(metaViewport);
    }
    metaViewport.content =
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, ' +
        'minimum-scale=1.0, user-scalable=no, shrink-to-fit=no';
    
    /* -------------------------------------------------------------
       2. GLOBAL STYLE
          - หน้าหลัก: ล็อกความสูง + ซ่อน overflow
          - iframe : ปลดล็อกความสูง + เปิด overflow-y
       ------------------------------------------------------------- */
    const isIframe = (window.self !== window.top);
    const globalStyle = document.createElement('style');
    
    const lockStyle = isIframe ? '' : `
        html, body {
            width: 100vw !important;
            height: 100vh !important;
            overflow: hidden !important;
        }
    `;
    
    const unlockStyle = isIframe ? `
        html, body {
            width: 100% !important;
            height: auto !important;
            min-height: 100% !important;
            max-height: none !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            -webkit-overflow-scrolling: touch;
        }
    ` : '';
    
    globalStyle.textContent = `
        /* --- พื้นฐานทุกหน้า --- */
        html, body {
            margin: 0 !important;
            padding: 0 !important;
            touch-action: pan-y;
            -webkit-text-size-adjust: 100%;
            user-select: none;
            -webkit-user-select: none;
        }

        /* --- ล็อกเฉพาะหน้าหลัก --- */
        ${lockStyle}

        /* --- ปลดล็อก iframe --- */
        ${unlockStyle}

        /* --- กล่องที่อนุญาตให้ scroll ภายใน --- */
        .scrollable-content,
        .popup-scrollbar {
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
        }

        /* --- Scrollbar สวยงาม --- */
        ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 99px;
        }
    `;
    document.head.appendChild(globalStyle);
    
    /* -------------------------------------------------------------
       3. บล็อก Double-Tap และ Pinch-to-Zoom บนมือถือ
       ------------------------------------------------------------- */
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, { passive: false });
    
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
    }, { passive: false });
    
    /* -------------------------------------------------------------
       4. Debug Log
       ------------------------------------------------------------- */
    console.log(
        `[appInit] mode = ${isIframe ? 'IFRAME (scrollable)' : 'TOP (locked)'}`
    );
})();