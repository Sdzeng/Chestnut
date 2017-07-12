var defaults = {
	type:"POST",
	contentType:null,//"application/json;charset=utf-8",
	data:null,
	loading:"off"
};


var httpHelper =function httpHelper() {
	this.init.apply(this, arguments);
};

$.extend(httpHelper.prototype, {
	init: function(opts) {
		var _this=this;
		_this.opts =opts;
		_this.opts.type=opts.type||defaults.type;
		_this.opts.contentType=opts.contentType||defaults.contentType;
		_this.opts.data=opts.data||defaults.data;
		_this.opts.loading=opts.loading||defaults.loading;
		
	    if (!_this.opts.url) {
	    	console.error("url is empty");
	    	alert("url is empty");
	    	return null;
	    }
	    else
	    {return _this;}
	},
	// 发送数据
	send:function () {
	       	var _this=this;
	        return $.Deferred(function ($dfd) {
		        $.ajax({
		            url: _this.opts.url,
		            type: _this.opts.type,
		            data: _this.opts.data,
		            contentType: _this.opts.contentType,
		            traditional: _this.opts.traditional,
		            success: function (data, textStatus, jqXHR) {//success
		                // session超时、操作失败
		                if (/\"out\":true|\"flag\":false/.test(data)) {
		                	// dialog.alert(JSON.parse(data).msg, 'warn');
		                	// 用户登录框
		                	if (/\"out\":true/.test(data)) {
		                		alert("请重新登陆");
		                	}
		                	else {
		                		alert(data.msg||"内容有误");
		                	}
		                }
		                else {
		                	_this.opts.success && _this.opts.success.apply(this, arguments);
		                }
		                
		            },
		            beforeSend: function() {
		                // loading();
		                //_this.opts.loading !== 'off' && dialog.loading();
		                _this.opts.beforeSend && _this.opts.beforeSend.apply(this, arguments);
		            },
		            complete: function() {
		               // _this.opts.loading !== 'off' && dialog.loading.fade();
		                _this.opts.complete && _this.opts.complete.apply(this, arguments);
		            },
		            error: function () {
		                console.error(arguments[2]);
		                alert(arguments[2]);
		            }
		        });
		    });


	}

});


/*return {
	defaults: defaults,
	init: function(opts) {
		var t = new HttpLoad;
		t.options(opts);
		return t;
	},
	create: function() {
		return new Table;
	}
};
		*/
		