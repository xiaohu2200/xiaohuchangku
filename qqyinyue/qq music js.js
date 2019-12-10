window.onload=function(){
	jQuery(function () {

      jQuery('.recommend-slide').banner({
        imgs: [
          './images/slide1.jpeg',
          './images/slide2.jpg',
          './images/slide1.jpeg',
          './images/slide2.jpg'
        ],
        isHasArrow: true,
        duration: 2000,
        time: 800
      })
			
			console.log('a')
    })  
    
    var mySwiper = new Swiper('.swiper-container', {
				direction: 'horizontal', // 垂直切换选项
				loop: true, // 循环模式选项
				speed : 1000,
				grabCursor:true,
				autoplay:{
					delay:1000
				},
				
				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
				},

				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},

				// 如果需要滚动条
				scrollbar: {
					el: '.swiper-scrollbar',
				},
			})
}
