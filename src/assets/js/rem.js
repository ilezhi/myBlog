;(function(doc, win) {
    const docEl = doc.documentElement;
    const resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
    let recalc = function() {
        const clientWidth = docEl.clientWidth;
        const clientHeight = docEl.clientHeight;
        if (!clientWidth) return;
        if (clientWidth >= 1280) {
            docEl.style.fontSize = 100 * (1280 / 1280) + 'px';
        }

        if (clientWidth < 1280 && clientWidth > 320) {
            docEl.style.fontSize = 100 * (clientWidth / 1280) + 'px';
        }

        if (clientWidth <= 320) {
            docEl.style.fontSize = 100 * (320 / 1280) + 'px';
        }
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);