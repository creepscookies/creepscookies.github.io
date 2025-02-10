document.addEventListener("DOMContentLoaded", () => {
    let cursor = document.querySelector('.cursor');
        let cursorInner = document.querySelector('.cursor-inner');
        let iCP = { x: 0, y: 0 };
        let tP = { x: 0, y: 0 };
        let tE = false;
        let sT = null;

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            cursorInner.style.left = `${e.clientX}px`;
            cursorInner.style.top = `${e.clientY}px`;
            tP.x = e.clientX;
            tP.y = e.clientY;
        });

        document.addEventListener('mousedown', () => {
            cursor.classList.add('clicked');
            cursorInner.classList.add('clicked');
        });

        document.addEventListener('mouseup', () => {
            cursor.classList.remove('clicked');
            cursorInner.classList.remove('clicked');
        });

        document.addEventListener('wheel', () => {
            if (!tE) {
                cursor.classList.add('scroll');
                cursorInner.classList.add('scroll');
                clearTimeout(sT);
                sT = setTimeout(() => {
                    cursor.classList.remove('scroll');
                    cursorInner.classList.remove('scroll');
                }, 150);
            }
        });

        document.addEventListener('mouseleave', () => {
            cursor.classList.remove('clicked');
            cursorInner.classList.remove('clicked');
        });

        window.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                iCP.y += 2;
            } else {
                iCP.y -= 2;
            }
        });

        async function updateInnerCursor() {
            const dx = (tP.x - iCP.x) * 0.2;
            const dy = (tP.y - iCP.y) * 0.2;
            iCP.x += dx;
            iCP.y += dy;
            cursorInner.style.left = `${iCP.x}px`;
            cursorInner.style.top = `${iCP.y}px`;
            requestAnimationFrame(updateInnerCursor);
        }
        requestAnimationFrame(updateInnerCursor);

        function showTooltip(t) {
            cursor.classList.add('tooltip');
            cursor.innerHTML = t;
            tE = true;
        }

        function hideTooltip() {
            cursor.classList.remove('tooltip');
            cursor.innerHTML = '';
            tE = false;
            iCP = { x: tP.x, y: tP.y };
            cursor.style.left = `${tP.x}px`;
            cursor.style.top = `${tP.y}px`;
        }

        function updateTooltip(t) {
            cursor.innerHTML = t;
        }

});
