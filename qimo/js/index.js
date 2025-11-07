// 轮播数据 - 修正了路径和文件扩展名
        const sliderData = [
            { 
                image: "./img/轮播2.png", 
                title: "弼朝博虬",
                link: "./video8.html"
            },
            { 
                image: "./img/轮播4.png",  // 修正了扩展名（原来是临军对阵,png）
                title: "临军对阵",
                link: "./video3.html"
            },
            { 
                image: "./img/轮播1.png", 
                title: "潜蛟觊天",  // 移除了文件名中的.png
                link: "./video9.html"
            },
            { 
                image: "./img/轮播3.png", 
                title: "万人辟易",
                link: "./video18.html"
            },
            { 
                image: "./img/轮播5.png", 
                title: "倚星折月",  // 移除了文件名中的.png
                link: "./video12.html"
            }
        ];

        // DOM 元素 - 使用id选择器确保唯一性
        const sliderLink = document.getElementById('slider-link');
        const img = document.getElementById('slider-image');
        const title = document.getElementById('slider-title');
        const next = document.querySelector('.next');
        const prev = document.querySelector('.prev');
        const indicators = document.querySelectorAll('.slider-indicator li');
        let currentIndex = 0;
        let intervalId;
        const AUTO_PLAY_INTERVAL = 5000; // 5秒切换一次

        // 更新轮播显示
        function updateSlider(index) {
            // 防止索引越界
            if (index < 0) index = sliderData.length - 1;
            if (index >= sliderData.length) index = 0;
            
            currentIndex = index;
            
            // 添加淡入淡出效果
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = sliderData[index].image;
                img.alt = sliderData[index].title;
                title.textContent = sliderData[index].title;
                sliderLink.href = sliderData[index].link;
                img.style.opacity = '1';
            }, 300);
            
            // 更新指示器状态
            indicators.forEach((indicator, i) => {
                if (i === index) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        // 启动自动轮播
        function startAutoPlay() {
            // 清除现有定时器防止重复
            clearInterval(intervalId);
            
            intervalId = setInterval(() => {
                updateSlider(currentIndex + 1);
            }, AUTO_PLAY_INTERVAL);
        }

        // 鼠标悬停时暂停轮播，移开时恢复
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(intervalId);
        });
        slider.addEventListener('mouseleave', startAutoPlay);

        // 下一张图片
        next.addEventListener('click', () => {
            clearInterval(intervalId);
            updateSlider(currentIndex + 1);
            startAutoPlay();
        });

        // 上一张图片
        prev.addEventListener('click', () => {
            clearInterval(intervalId);
            updateSlider(currentIndex - 1);
            startAutoPlay();
        });

        // 点击指示器切换图片
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                clearInterval(intervalId);
                updateSlider(index);
                startAutoPlay();
            });
        });

        // 初始化
        updateSlider(0);
        startAutoPlay();
  