document.addEventListener('DOMContentLoaded', function() {
    const now = new Date();
    const currentMonth = String(now.getMonth() + 1).padStart(2, '0');
    const currentDay = String(now.getDate()).padStart(2, '0');
    const currentHour = String(now.getHours()).padStart(2, '0');
    const currentMinute = String(now.getMinutes()).padStart(2, '0');

    const dateStrToNumber = (dateStr) => {
        const [month, day, hour, minute] = dateStr.split('/').map(Number);
        return month * 1000000 + day * 10000 + hour * 100 + minute;
    };

    const nowDateStr = `${currentMonth}/${currentDay}/${currentHour}/${currentMinute}`;
    const nowDateNumber = dateStrToNumber(nowDateStr);

    fetch('../day/holidays.json') // 确保路径正确
        .then(response => {
            if (!response.ok) throw new Error('网络响应异常');
            return response.json();
        })
        .then(specialDays => {
            const currentSpecialDay = specialDays.find(day => {
                const startNum = dateStrToNumber(day.startDate);
                const endNum = dateStrToNumber(day.endDate);
                return nowDateNumber >= startNum && nowDateNumber <= endNum;
            });

            console.log("当前日期时间:", nowDateStr);
            console.log("匹配到的特殊日期:", currentSpecialDay);

            if (currentSpecialDay) {
                const overlay = document.createElement('div');
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.8);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                `;

                const isMobile = window.innerWidth < 768;
                const img = document.createElement('img');
                img.src = isMobile ? currentSpecialDay.mobileImage : currentSpecialDay.desktopImage;
                img.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 10000;
                `;

                const text = document.createElement('div');
                text.textContent = currentSpecialDay.text;
                text.style.cssText = `
                    color: white;
                    font-weight: bold;
                    font-size: 36px;
                    text-align: center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
                    z-index: 10001;
                `;

                overlay.appendChild(img);
                overlay.appendChild(text);
                document.body.appendChild(overlay);

                setTimeout(() => {
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 1s';
                    setTimeout(() => overlay.remove(), 1000);
                }, 2000);  // 1.5秒后淡出
            }
        })
        .catch(error => console.error('加载节日信息失败:', error));
});