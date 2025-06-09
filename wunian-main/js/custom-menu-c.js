// 自定义菜单功能
(function() {
  // 创建自定义菜单元素
  const menuHTML = `
      <ul class="custom-menu" id="customMenu">
          <li>刷新页面</li>
          <li>分享网站</li>
          <li>去往博客</li>
          <li>影视学习</li>
          <li>QQ群:1038095492</li>
      </ul>
  `;
  document.body.insertAdjacentHTML('beforeend', menuHTML);

  // 获取菜单元素
  const menu = document.getElementById('customMenu');

  // 禁用默认右键菜单并显示自定义菜单
  document.addEventListener('contextmenu', function(e) {
      e.preventDefault();

      // 显示自定义菜单并获取其实际尺寸
      menu.style.display = 'block';
      menu.style.left = '0px';
      menu.style.top = '0px';

      const menuRect = menu.getBoundingClientRect();
      const menuWidth = menuRect.width;
      const menuHeight = menuRect.height;

      let menuLeft = e.pageX;
      let menuTop = e.pageY;

      // 如果菜单超出屏幕右侧，向左对齐
      if (menuLeft + menuWidth > window.innerWidth) {
          menuLeft = window.innerWidth - menuWidth;
      }

      // 如果菜单超出屏幕底部，向上对齐
      if (menuTop + menuHeight > window.innerHeight) {
          menuTop = e.pageY - menuHeight;
      }

      menu.style.left = menuLeft + 'px';
      menu.style.top = menuTop + 'px';

      // 点击其他地方关闭菜单
      function hideMenu() {
          menu.style.display = 'none';
          document.removeEventListener('click', hideMenu);
      }

      document.addEventListener('click', hideMenu);
  });

  // 为自定义菜单选项添加点击事件
  const menuItems = document.querySelectorAll('.custom-menu li');
  menuItems.forEach(item => {
      item.addEventListener('click', function() {
          if (this.textContent === '刷新页面') {
              location.reload();
          } else if (this.textContent === '分享网站') {
              const pageUrl = window.location.href;
              navigator.clipboard.writeText(pageUrl)
                  .then(() => {
                      alert('已复制链接到剪贴板');
                  })
                  .catch(err => {
                      console.error('复制失败:', err);
                  });
          } else if (this.textContent === '去往博客') {
              window.open('https://wunian.xyz/', '_blank');
          } else if (this.textContent === '影视学习') {
              window.open('https://wunian.netlify.app/', '_blank');
          } else if (this.textContent === 'QQ群:1038095492') {
              window.open('https://qm.qq.com/q/9iwS7ReiGY', '_blank');
          }
      });
  });

  // 添加CSS样式
  const styleHTML = `
      <style>
          /* 隐藏默认右键菜单 */
          /* 自定义右键菜单的样式 */
          .custom-menu {
              position: fixed;
              background: white;
              border: 1px solid #ccc;
              box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
              padding: 5px 0;
              display: none;
              z-index: 9999;
              list-style-type: none;
              margin: 0;
              padding: 5px;
              min-width: 150px;
          }

          .custom-menu li {
              padding: 8px 15px;
              cursor: pointer;
          }

          .custom-menu li:hover {
              background-color: #f0f0f0;
          }
      </style>
  `;
  document.head.insertAdjacentHTML('beforeend', styleHTML);
})();