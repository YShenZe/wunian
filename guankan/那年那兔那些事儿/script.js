// 全屏播放功能
function goFullScreen() {
    const iframe = document.getElementById('videoWindow');
    if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) { /* Firefox */
        iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) { /* IE/Edge */
        iframe.msRequestFullscreen();
    }
}

// 页面加载时检查本地存储
window.onload = function() {
    // 设置iframe高度为宽度的9/16
    const iframe = document.getElementById('videoWindow');
    const iframeWidth = iframe.offsetWidth;
    iframe.style.height = `${iframeWidth * 9 / 16}px`;
    
    // 窗口大小改变时调整iframe高度
    window.onresize = function() {
        const iframeWidth = iframe.offsetWidth;
        iframe.style.height = `${iframeWidth * 9 / 16}px`;
    };
    
    // 加载保存的集数或默认选择第一个按钮
    const savedEpisode = localStorage.getItem('selectedEpisode');
    
    if (savedEpisode) {
        // 如果有保存的集数，尝试恢复状态
        let foundButton = false;
        const buttons = document.querySelectorAll('.episode-button');
        buttons.forEach(button => {
            if (button.textContent === savedEpisode) {
                const link = button.getAttribute('onclick').split("'")[1];
                updateLink(link, button);
                foundButton = true;
            }
        });

        if (!foundButton) {
            // 如果没有找到匹配的按钮，恢复到默认状态
            defaultButtonState();
        }
    } else {
        // 如果没有保存的记录，默认选择第一个按钮
        defaultButtonState();
    }

    // 初始化集数按钮
    updateEpisodeButtons();
};

// 默认选择第一个按钮
function defaultButtonState() {
    const firstButton = document.querySelector('.episode-button');
    if (firstButton) {
        const link = firstButton.getAttribute('onclick').split("'")[1];
        updateLink(link, firstButton);
    }
}