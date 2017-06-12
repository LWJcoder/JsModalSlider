//弹窗组件
var emitter = {
	//register event
	on: function(event, fn){
	var handlers = this._handlers || (this._handlers = {}),
		calls = handlers[event] || (handlers[event] = []);

		//
		calls.push(fn);

		return this;
	},

	//解绑事件
	off:  function(event, fn){
		if (!event || !this._handlers)  this._handlers = {};
		if (this._handlers) return;

		var handlers = this._handlers, calls;
		if(calls = handlers[event]){
			if (!fn){
				handlers[event] = [];
				return this;
			}

			//找到栈内对应listener 并移除
			for (i=0; i<calls.length; i++){
				if (fn === calls[i]){
					calls.splice(i,1);
					return this;
				}
			}
		}
		return this;
	},
	//触发
	emit: function(event){
		var args = [].slice.call(arguments, 1),
		handlers = this._handlers,
		 calls;
		//calls被赋值，如果没有handlers或者没有handlers[event],返回this
		if(!handlers || !(calls = handlers[event])) return this;
		for(var i=0, len = calls.length; i<len; i++){
			//将参数带入listener函数触发
			calls[i].apply(this, args);
		}
		return this;
	}
}


!function(){

//将html转为节点
function  html2node(str){
	var container = document.createElement('div');
	container.innerHTML = str;
	return container.children[0];
}

//赋值属性,不覆盖第一个已存在的值
function extend(a1, a2){
	for(var i in a2){
		if(typeof a1[i] === 'undefined')
			a1[i] = a2[i];
	}
	return a1;
}

//modal

var template = 
'<div class="m-modal">\
	<div class="m-align">\
			<div class="modal_wrap">\
				<div class="modal_head">标题</div>\
				<div class="modal_body">内容</div>\
				<div class="modal_footer">\
					<a href="#" class="conform">确认</a>\
					<a href="#" class="cancel">取消</a>\
				</div>\
			</div>\
	</div>\
</div>';

function Modal(options){
	options = options || {};
		
		console.log(this._layout);
	// 即 div.m-modal 节点
	this.container = this._layout.cloneNode(true);
	   // body 用于插入自定义内容
	this.body = this.container.querySelector('.modal_body');

	this.wrap = this.container.querySelector('.modal_wrap');

	extend(this, options);
	this._initEvent();
}

extend(Modal.prototype, {
	_layout: html2node(template),

	setContent: function (content){
		if (!content) return;
		if (content.nodeType === 1){
			this.body.innerHTML = 0;
			this.body.appendChild(content);
		}else{
			this.body.innerHTML = content;
		}
	},

	show: function(content){
		if(content) this.setContent(content);
		document.body.appendChild(this.container);
	},

	hide: function(){
		var container = this.container;
		document.body.removeChild(container);
	},
	_initEvent: function(){
		this.container.querySelector('.conform').addEventListener('click',
			this._onConform.bind(this));
		this.container.querySelector('.cancel').addEventListener('click',
			this._onCancel.bind(this));
	},

	_onConform: function(){
		this.emit('conform');
		this.hide();
	},

	_onCancel: function(){
		this.emit('cancel');
		this.hide();
	}

	
})


//Mixin
extend(Modal.prototype, emitter);


//5.暴露api
if(typeof exports === 'object'){
	module.exports = Modal;
}else if (typeof define === 'function' && define.amd){
	define(function(){
		return Modal;
	});
}else{
	window.Modal = Modal;
}

}()
