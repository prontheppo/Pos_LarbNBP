/**
 * =================================================================
 * FILE: appInit.js
 * DESCRIPTION: สคริปต์กลางกำหนดโครงสร้างหน้าจอ ป้องกันการซูม
 *              และควบคุมการเลื่อน (Scroll) สำหรับทุกหน้าเว็บ
 * =================================================================
 */

(function () {
    // 1. สร้างและฉีด Meta Tag ป้องกันการซูม (Meta Viewport)
    let metaViewport = document.querySelector('meta[name="viewport"]');
    if (!metaViewport) {
        metaViewport = document.createElement('meta');
        metaViewport.name = 'viewport';
        document.head.appendChild(metaViewport);
    }
    metaViewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, shrink-to-fit=no';

    // 2. สร้างและฉีด CSS ล็อกหัว-ล็อกท้าย ป้องกันทั้งหน้าจอเลื่อน
    const globalStyle = document.createElement('style');
    globalStyle.textContent = `
        /* ล็อกทั้งหน้าเว็บ ห้ามเลื่อน ป้องกันหน้าจอกระโดด/เพี้ยนบนมือถือ */
        html, body {
            width: 100vw !important;
            height: 100vh !important;
            overflow: hidden !important;
            margin: 0 !important;
            padding: 0 !important;
            touch-action: pan-y;
            -webkit-text-size-adjust: 100%;
            user-select: none;
            -webkit-user-select: none;
        }

        /* กล่องหรือส่วนที่ยอมให้เลื่อนได้ ให้ใส่คลาสนี้ */
        .scrollable-content, .popup-scrollbar {
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
        }

        /* ปรับแต่งแถบ Scrollbar ให้มีขนาดเล็กและสวยงาม */
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

    // 3. บล็อกการ Double-Tap และ Pinch-to-Zoom บนมือถืออย่างสมบูรณ์
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
})();
