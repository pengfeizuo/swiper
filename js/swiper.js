function swiper(id,obj) {
	this.oContainer = document.querySelector(id)
	this.oWrapper = this.oContainer.querySelector('ul')
	this.oSlide = this.oWrapper.querySelectorAll('li')
	this.nextLeft = document.querySelector(obj.nextLeft)
	this.nextRight = document.querySelector(obj.nextRight)
	this.pagination = document.querySelector(obj.pagination)
	this.containerW = this.oContainer.offsetWidth;
	this.wrapperW = this.oSlide[0].offsetWidth * this.oSlide.length;
	this.itemwidth = this.oSlide[0].offsetWidth
	this.oWrapper.style.left = -this.wrapperW+'px'
	this.index = this.oSlide.length
	this.timer = null
	/* 当不传入轮播速度时，速度默认为2000 */
    this.speed = obj.speed || 1;
    this.interval = obj.interval || 2000
    this.timing = obj.timing || 'ease'
	this.init()
	// 鼠标移入时清除定时器，图片停止轮播
	this.oContainer.addEventListener('mouseover', ()=> {
		clearInterval(this.timer);
	});

	// 鼠标移出时图片继续轮播
	this.oContainer.addEventListener('mouseout', ()=> {
		this.slideMove();
	});
	var that = this
	//左滑动
	if(obj.nextLeft){
		this.nextLeft.addEventListener('click',()=>{
			
			this.slideLeft()
			
		})
	}
	if(obj.nextRight){
		this.nextRight.addEventListener('click',()=>{
			
			this.slideRight()
			
		})
	}
	this.pagSlide = null
	this.createfn()
}

swiper.prototype = {
	constructor: swiper,
	init: function() {
		this.oWrapper.style.width = this.wrapperW * 2 + 'px';
		// 复制所有图片以实现图片无缝衔接
		this.oWrapper.innerHTML += this.oWrapper.innerHTML;
		/*此处是为了防止所有图片总宽度小于最外层盒子的宽度，
		  这时需要将最外层盒子宽度设置为图片总宽度*/
		if(this.wrapperW < this.oContainer.offsetWidth) {
			this.oContainer.style.width = this.wrapperW + 'px';
		}
		this.slideMove()
	},
	slideMove: function() {
		var that = this
		that.timer = setInterval(function() {
			that.index++;
			if(that.index >= that.oSlide.length*2-1) {
				setTimeout(function() {
					that.oWrapper.style.transition = 'none'
					that.index = that.oSlide.length-1;
					that.oWrapper.style.left = -(that.oSlide.length-1)*that.itemwidth+'px'
				}, 1000)
			} else {
				that.oWrapper.style.transition = 'all '+that.speed+'s '+that.timing
			}
			that.oWrapper.style.left = -that.index * that.itemwidth + 'px';
			that.changePag()
		}, that.interval);
	},
	slideLeft:function(){
		this.nextLeft.style.pointerEvents = 'none'
		var that = this
		setTimeout(function(){
			that.nextLeft.style.pointerEvents = 'auto'
		},1000)
		that.index++;
		if(that.index >= that.oSlide.length*2-1) {
			setTimeout(function() {
				that.oWrapper.style.transition = 'none'
				that.index = that.oSlide.length-1;
				that.oWrapper.style.left = -(that.oSlide.length-1)*that.itemwidth+'px'
			}, 1000)
		} else {
			that.oWrapper.style.transition = 'all '+this.speed+'s '+this.timing
		}
		that.oWrapper.style.left = -that.index * that.itemwidth + 'px';
		that.changePag()
	},
	slideRight:function(){
		this.nextRight.style.pointerEvents = 'none'
		var that = this
		setTimeout(function(){
			that.nextRight.style.pointerEvents = 'auto'
		},1000)
		that.index--;
		that.oWrapper.style.transition = 'all '+this.speed+'s '+this.timing
		that.oWrapper.style.left = -that.index * that.itemwidth + 'px';
		console.log(that.index)
		if(that.index == 0) {
			setTimeout(function() {
				that.oWrapper.style.transition = 'none'
				that.oWrapper.style.left = -that.wrapperW+'px'
			}, 1000)
			that.index = that.oSlide.length;
		}
		that.changePag()
		
		
		
	},
	createfn:function(){
		if(this.pagination){
			var createUl = document.createElement("ul");
			for (var i=0; i<this.oSlide.length; i++) {
				createUl.innerHTML +="<li></li>"
			}
			this.pagination.appendChild(createUl)
			this.pagSlide = this.pagination.querySelectorAll('li')
			this.changePag()
		}
	},
	changePag:function(){
		if(this.pagination){
			for(var i=0;i<this.oSlide.length;i++){
				if(this.index>3){
					if(i!=this.index-this.oSlide.length){
						this.pagSlide[i].style.backgroundColor="rgba(0,0,0,.5)"
					}else{
						this.pagSlide[i].style.backgroundColor="#fff"
					}
				}else{
					if(i!=this.index){
						this.pagSlide[i].style.backgroundColor="rgba(0,0,0,.5)"
					}else{
						this.pagSlide[i].style.backgroundColor="#fff"
					}
				}
				
			}
		}
		
	}
}