// 获取滚动文本容器
const scrollText = document.getElementById('scrollText');
// 设置滚动文本的初始位置
let scrollPosition = 0;
const scrollInterval = 10; // 每1秒滚动一次
const scrollStep = 1; // 每次滚动1像素

// 定义滚动函数
function scrollTextFunc() {
    // 更新滚动位置
    scrollPosition -= scrollStep;
    // 如果滚动到文本末尾，重置位置
    if (scrollPosition < -scrollText.scrollWidth) {
        scrollPosition = window.innerWidth; // 重置到屏幕宽度的位置
    }
    // 设置滚动位置
    scrollText.style.transform = `translateX(${scrollPosition}px)`;
}

// 设置定时器，每隔指定时间滚动一次
setInterval(scrollTextFunc, scrollInterval);