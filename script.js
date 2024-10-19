// 照片轮播
const photoCarousel = new Swiper('.photo-carousel', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// 视频播放
function loadVideos() {
    const videos = [
        { id: 1, title: '梨子视频1', thumbnail: 'images/pear1.jpg', url: 'video1.mp4' },
        { id: 2, title: '梨子视频2', thumbnail: 'images/pear2.jpg', url: 'video2.mp4' },
        { id: 3, title: '梨子视频3', thumbnail: 'images/pear3.jpg', url: 'video3.mp4' },
    ];

    const videoGrid = document.querySelector('.video-grid');
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" style="width: 100%; height: auto;">
            <h3>${video.title}</h3>
        `;
        videoElement.addEventListener('click', () => playVideo(video.url));
        videoGrid.appendChild(videoElement);
    });
}

function playVideo(url) {
    // 实现视频播放逻辑
    console.log('播放视频:', url);
    alert('视频播放功能尚未实现，您点击了: ' + url);
}

// 将原有的留言板功能替换为以下内容
function initTimeline() {
    const uploadForm = document.getElementById('uploadForm');
    const imageGallery = document.getElementById('imageGallery');
    let images = JSON.parse(localStorage.getItem('images')) || [];

    function displayImages() {
        imageGallery.innerHTML = '';
        images.forEach((img, index) => {
            const imageElement = document.createElement('div');
            imageElement.className = 'col-md-4 mb-3';
            imageElement.innerHTML = `
                <img src="${img.data}" alt="Uploaded image" class="img-fluid gallery-image">
                <p class="text-center mt-2">${img.date}</p>
            `;
            imageGallery.appendChild(imageElement);
        });
    }

    uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fileInput = document.getElementById('imageUpload');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageData = e.target.result;
                images.unshift({ data: imageData, date: new Date().toLocaleString() });
                localStorage.setItem('images', JSON.stringify(images));
                displayImages();
                uploadForm.reset();
            };
            reader.readAsDataURL(file);
        }
    });

    // 每次打开模态框时刷新图片库
    document.getElementById('timelineModal').addEventListener('show.bs.modal', displayImages);
}

// 添加留言板功能
function initMessageBoard() {
    const messageForm = document.getElementById('messageForm');
    const messageList = document.getElementById('messageList');
    let messages = JSON.parse(localStorage.getItem('messages')) || [];

    function displayMessages() {
        messageList.innerHTML = '';
        messages.forEach((msg, index) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message-item';
            messageElement.innerHTML = `
                <p><span class="name">${msg.name}</span> <span class="date">${msg.date}</span></p>
                <p>${msg.message}</p>
            `;
            messageList.appendChild(messageElement);
        });
    }

    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        const date = new Date().toLocaleString();

        messages.unshift({ name, message, date });
        localStorage.setItem('messages', JSON.stringify(messages));

        displayMessages();
        messageForm.reset();
    });

    // 每次打开模态框时刷新留言列表
    document.getElementById('messageModal').addEventListener('show.bs.modal', displayMessages);
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有的工具提示
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // 为微信图标添加点击事件
    document.getElementById('wechatIcon').addEventListener('click', function(e) {
        e.preventDefault();
        const wechatId = this.getAttribute('data-wechat-id');
        alert(`🍐大王的微信号是：\n\n${wechatId}\n\n欢迎添加好友，与我分享您的梨子故事或咨询任何关于梨子的问题！`);
    });

    // 初始化轮播图
    var myCarousel = new bootstrap.Carousel(document.getElementById('photoCarousel'), {
        interval: 1000,  // 每秒切换一张图片
        wrap: true
    });

    // 加载视频
    loadVideos();

    initTimeline();
    initMessageBoard();
});
