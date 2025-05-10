function updateLink(link, button) {
    // 移除之前选中的按钮样式
    const buttons = document.querySelectorAll('.episode-button');
    buttons.forEach(btn => btn.classList.remove('selected'));

    // 添加选中样式
    button.classList.add('selected');

    const iframe = document.getElementById('videoWindow');
    iframe.src = link; // 直接设置iframe的src为传入的链接
    const subtitleElement = document.getElementById('subtitle');
    // 显示按钮上的文字
    subtitleElement.textContent = button.textContent;
    subtitleElement.style.fontSize = "20px"; // 设置副标题字号
    subtitleElement.style.color = "#000000"; // 设置副标题颜色为黑色

    // 存储选择的按钮文本到本地存储
    localStorage.setItem('selectedEpisode', button.textContent);
}

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
    const savedEpisode = localStorage.getItem('selectedEpisode');
    const buttons = document.querySelectorAll('.episode-button');
    const iframe = document.getElementById('videoWindow');
    const subtitleElement = document.getElementById('subtitle');

    if (savedEpisode) {
        // 如果有保存的集数，尝试恢复状态
        let foundButton = false;
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

    // 设置iframe高度为宽度的9/16
    const iframeWidth = iframe.offsetWidth;
    iframe.style.height = `${iframeWidth * 9 / 16}px`;
};

// 窗口大小改变时调整iframe高度
window.onresize = function() {
    const iframe = document.getElementById('videoWindow');
    const iframeWidth = iframe.offsetWidth;
    iframe.style.height = `${iframeWidth * 9 / 16}px`;
};

// 默认选择第一个按钮
function defaultButtonState() {
    const firstButton = document.querySelector('.episode-button');
    if (firstButton) {
        const link = firstButton.getAttribute('onclick').split("'")[1];
        updateLink(link, firstButton);
    }
}