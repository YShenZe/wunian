// 页面加载时立即执行，并在窗口大小改变时重复执行
function adjustIframeSize() {
    // 获取屏幕宽度和高度
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 获取 iframe 元素
    const iframe = document.querySelector('iframe');

    // 根据屏幕宽度和高度调整 iframe 的宽度
    if (screenWidth > screenHeight) {
        // 如果屏幕宽度大于高度，将 iframe 的宽度设置为屏幕宽度的 2/5
        iframe.style.width = (screenWidth / 5 * 2 ) + 'px';
    } else {
        // 如果屏幕高度大于宽度，恢复原样式（宽度为 100%）
        iframe.style.width = '100%';
    }
}

// 页面加载时调整 iframe 大小
adjustIframeSize();

// 监听窗口大小改变事件，动态调整 iframe 大小
window.addEventListener('resize', adjustIframeSize);

// 页面加载时立即执行
(function() {
    // 获取当前日期
    var currentDate = new Date();
    // 设置目标日期为9999年9月9日
    var targetDate = new Date(9999, 8, 9);

    // 获取弹窗元素
    var modal = document.getElementById('dateModal');
    var confirmBtn = document.getElementById('confirmBtn');

    // 比较当前日期和目标日期
    if (currentDate < targetDate) {
        // 显示弹窗
        modal.style.display = 'flex';
    }

    // 确定按钮点击事件
    confirmBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // 点击模态框外部关闭弹窗
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // 按下ESC键关闭弹窗
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
})();

// JavaScript 交互逻辑
document.querySelector('.toggle-button').addEventListener('click', function () {
    var dropdownMenu = document.querySelector('.dropdown-menu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    } else {
        dropdownMenu.style.display = 'block';
    }
});

// 点击页面其他地方时关闭下拉菜单
window.addEventListener('click', function (event) {
    var dropdownMenu = document.querySelector('.dropdown-menu');
    if (!event.target.matches('.toggle-button') && dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none';
    }
});

// 点击下拉菜单中的链接时改变 iframe 的 src 属性
document.querySelectorAll('.dropdown-menu a').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // 阻止默认的链接跳转行为

        // 获取链接的 href 属性值
        var href = this.getAttribute('href');

        // 检查是否是外部链接
        if (href.startsWith('http://') || href.startsWith('https://')) {
            // 如果是外部链接，确保在 iframe 中加载
            var iframe = document.querySelector('iframe');
            iframe.src = href; // 将 iframe 的 src 属性设置为链接的 href 值
        } else {
            // 如果是内部链接，直接加载
            var iframe = document.querySelector('iframe');
            iframe.src = href; // 将 iframe 的 src 属性设置为链接的 href 值
        }

        // 关闭下拉菜单
        var dropdownMenu = document.querySelector('.dropdown-menu');
        dropdownMenu.style.display = 'none';
    });
});
       function togglePopup() {
            const popup = document.getElementById('myPopup');
            const button = document.querySelector('.sidebar-button');
            
            if (popup.style.display === 'flex') {
                popup.style.display = 'none';
                button.style.left = '-30px';
            } else {
                popup.style.display = 'flex';
                button.style.left = '0';
            }
        }