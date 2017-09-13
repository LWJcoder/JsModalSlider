# JsConp
javascript component , slider , alert box

Slider 使用：

```html
	<div class="banner">
			<div id="bannerBody"></div>
				<div class="m-banner">
					<ul class="m-cursor">
						<li class="prev"><</li>
						<li class="cursor">1</li>
						<li class="cursor">2</li>
						<li class="cursor">3</li>
						<li class="next">></li>
					</ul>
				</div>
		</div>
```



```javascript

	var $ = function(selector){
			return [].slice.call(document.querySelectorAll(selector));
		}

		var cursor = $('.m-cursor .cursor');
		var prev = $('.m-cursor .prev')[0];
		var next = $('.m-cursor .next')[0];



		cursor.forEach(function (cursor, index){
			cursor.addEventListener('click', function(){
				slider.nav(index);
			})
		})

		prev.addEventListener('click',function(){
			slider.prev();
		});

		next.addEventListener('click', function(){
			slider.next();
		});

		var slider = new Slider({
			     //视口容器
  				  container: document.body,
  				 // 图片列表
				  images: [
				    "./imgs/banner1.jpg",
				    "./imgs/banner2.jpg",
				    "./imgs/banner3.jpg",
				  
				  ],

				  // 是否允许拖拽
				  drag: true
		});

		// 通过监听`nav`事件来完成额外逻辑
	// --------------
	slider.on('nav', function(ev){
		var pageIndex = ev.pageIndex;
		cursor.forEach(function(cursor, index){
			if (index === pageIdnex){
				cursor.className = 'z-active';
			}else{
				cursor.className = 'slide';
			}
		})
	})

// 3s 自动轮播
	// setInterval(function(){
	// 	slider.next();
	// }, 3000);

	slider.nav(1)
```
