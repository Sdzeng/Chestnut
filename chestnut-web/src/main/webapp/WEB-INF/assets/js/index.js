function getPath() {
	var hash = window.location.hash, reg = /^#!/;
	if (reg.test(hash)) {

		return hash.replace(reg, '');
	} else { 
		return hash;//storage.session.getItem('redirect') || '';
	}
}

var topCover = {
	init : function() {
		var _this = this;
		_this.navbarObj = $('#navbar');
		_this.splashObj = $('#splash');
		_this.quoteObj = _this.splashObj.children('.quote');
		_this.contentBlackquoteObj=_this.quoteObj.children('.essay-content').children("blackquote");
		_this.otherBlackquoteObj=_this.quoteObj.children('.essay-other').children("blackquote");
		_this.menuList = $('#menuList');

		_this.makeMenu();
		_this.setCover();
	},
	makeMenu : function() {
		var _this = this;

		$.when($.getJSON('/menu/menu.json'), $.get('/function/'))
		.done(
				function() {
					//debugger;
					var arg=arguments;
					var data = arguments[0][0];// root = arguments[1][0].toUpperCase().split(',');

					_this.setMenu(data.menu);
					// _this.initShow();
				});
	},
	setMenu : function(menuObj) {
		var _this = this;
		function addMenu(item, title, wrapper) {

			for ( var key in item) {
				for (var i = 0; i < item[key].length; i++) {
					var m = item[key][i];
					var child = $(
							m.sublist ? "<li class='dropdown'><a class='dropdown-toggle' data-toggle='dropdown' href='javascript:;' >"
									+ m.namech
									+ "<span class='caret'></span></a><ul class='dropdown-menu' aria-labelledby='themes'></ul></li>"
									: "<li><a href='javascript:;'>" + m.namech+ "</a></li>").appendTo(wrapper)
							.children();
					/*
					 * var child = $("<li " + (m.sublist ? "class='treeview'" : "") + ">" + "<a
					 * href='javascript:;' >" + (isRoot ? "<i class='fa
					 * fa-link'></i> <span>" + m.namech + "</span><span
					 * class='pull-right-container'><i class='fa fa-angle-left
					 * pull-right'></i></span>" : "<i class='fa fa-circle-o'></i>" +
					 * m.namech) + "</a>" + (m.sublist ? "<ul class='treeview-menu'></ul>" :
					 * "") + "</li>" ).appendTo(wrapper).children();
					 */

					m.title = (title ? (title + ' > ') : "") + m.namech;

					if (m.url) {
						_this.menuClick(child.eq(0), m);
					}

					if (m.sublist) {
						addMenu(m.sublist, m.title, child.eq(1));
					}

				}
			}
		}

		addMenu(menuObj, null, _this.menuList.empty());
	},
	// 触发load
	fireLoad : function(url, title, data) {
	/*	var _this = this;
		_this.prog.begin();
		pageview.load(url, title, function() {
			_this.prog.finish();
			_this.section.hide().eq(1).show();
		}, data);*/
	},
	menuClick : function(target, item) {
		var _this = this;
		target.on('click', function(event, data) {

			console.log(item.title + ":" + item.url);
			// item['@append_param'] = data;
			// _this.setHash(item.url);
			if (getPath() != item.url) {
				window.location.hash = '#!' + item.url;
			}
			_this.fireLoad(item.url, item.title, data);
		});

		// target.on('hash', function () {
		// _this.fireLoad(item.url, item.title, item['@append_param']);
		// item['@append_param'] = null;
		// });

		if (getPath().indexOf(item.url) > -1) {

			_this.fireLoad(item.url, item.title);
			target.addClass("active");

		}
	},
	setCover:function(){
		var _this = this;
		
	    //设置首页封面
		var helper=	new httpHelper({
			url:"/getTodayCover/",
			success: function( data ) {
				//data = JSON.parse(data);
                if(!data)
			    {
                  return;
			    }
				//data.mediaModel.hasOwnProperty("path")&&
				if(data.mediaModel.path&&data.mediaModel.userModel.nikename)
				{
					$(".bg-layer").css("background-image","linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%),url("+(data.mediaModel.path||"")+"),linear-gradient(45deg, #FECDD3, #4A29EE)");
					$(".essay-content>blackquote>q").text(data.mediaModel.essayModel.content||"");
					$(".author").text(data.mediaModel.userModel.nikename||"");
					$(".location").text((data.mediaModel.essayModel.location||"")+" 凌晨5点");
				}
			 
			
			}
		});
		helper.send();
		
	  //设置首页滚动样式
	   $(window).scroll(function() {
							var scrollTop = $(document).scrollTop();
							var navbarHeight = _this.navbarObj.outerHeight();
							var splashHeight = _this.splashObj.outerHeight();
							var splashNoNavbarHeight=(splashHeight - navbarHeight);
							
							var contentBlackquoteTop= 250;//parseInt(_this.contentBlackquoteObj.css("top"));
							var contentBlackquoteHeight= _this.contentBlackquoteObj.outerHeight();
							var contentBlackquoteTopRange=(splashHeight - contentBlackquoteTop - contentBlackquoteHeight);
							var coeff=(scrollTop/(splashNoNavbarHeight - contentBlackquoteHeight));
							


							// 导航条

							if (scrollTop < navbarHeight) {
								_this.navbarObj.removeClass('navbar-min');

							} else if (scrollTop < splashNoNavbarHeight) {
								_this.navbarObj.removeClass('navbar-bottom-shadow').addClass('navbar-min');

							} else {
								_this.navbarObj.removeClass('navbar-min').addClass('navbar-bottom-shadow');
							}
							//文字
							if (scrollTop < (splashNoNavbarHeight - contentBlackquoteHeight)) {
								_this.quoteObj.css('opacity',1);
							}
							else{
								_this.quoteObj.css('opacity',0);
							}
							_this.contentBlackquoteObj.css({'top':(contentBlackquoteTop + contentBlackquoteTopRange * coeff)});
							
						
			});
		

	}
}

$(function() {
	topCover.init();

});

/*
 * ( function() {
 * 
 * var navbarObj = $('#home > .navbar'); var splashObj = $('#home > .splash');
 * var quoteObj = splashObj.children('.container');
 * 
 * $(window) .scroll( function() { var top = $(document).scrollTop(); var
 * navbarHeight = navbarObj .outerHeight(); var splashHeight = splashObj
 * .outerHeight(); var containerHeight = quoteObj .outerHeight();
 * 
 * 
 * var splashImgBackgroundPositionY= 100; splashObj.css({ 'background-position':
 * '0px -'+(parseInt(splashImgBackgroundPositionY)+(top/10)).toFixed(2)+'px' });
 * 
 *  // 导航条 if (top < navbarHeight) { navbarObj .removeClass('navbar-bg-shrink'); }
 * else if (top < (splashHeight - navbarHeight)) { navbarObj.removeClass(
 * 'navbar-bg-img').addClass( 'navbar-bg-shrink'); } else {
 * navbarObj.removeClass( 'navbar-bg-shrink') .addClass('navbar-bg-img'); } //
 * img上的文字 if (top == 0) { quoteObj.css('opacity', '1'); } else if (top <
 * (splashHeight - navbarHeight - containerHeight)) { quoteObj .css(
 * 'opacity', (((splashHeight - navbarHeight - containerHeight) - top) /
 * (splashHeight - navbarHeight - containerHeight)) .toFixed(2)); } else {
 * quoteObj.css('opacity', '0'); }
 * 
 * });
 * 
 * $("a[href='#']").click(function(e) { e.preventDefault(); });
 * 
 * var $button = $( "<div id='source-button' class='btn btn-primary
 * btn-xs'>&lt; &gt;</div>") .click(function() { var html =
 * $(this).parent().html(); html = cleanSource(html); $("#source-modal
 * pre").text(html); $("#source-modal").modal(); });
 * 
 * $('.bs-component [data-toggle="popover"]').popover(); $('.bs-component
 * [data-toggle="tooltip"]').tooltip();
 * 
 * $(".bs-component").hover(function() { $(this).append($button);
 * $button.show(); }, function() { $button.hide(); });
 * 
 * function cleanSource(html) { html = html.replace(/×/g,
 * "&times;").replace(/«/g, "&laquo;").replace(/»/g, "&raquo;").replace( /←/g,
 * "&larr;").replace(/→/g, "&rarr;");
 * 
 * var lines = html.split(/\n/);
 * 
 * lines.shift(); lines.splice(-1, 1);
 * 
 * var indentSize = lines[0].length - lines[0].trim().length, re = new RegExp(" {" +
 * indentSize + "}");
 * 
 * lines = lines.map(function(line) { if (line.match(re)) { line =
 * line.substring(indentSize); }
 * 
 * return line; });
 * 
 * lines = lines.join("\n");
 * 
 * return lines; }
 * 
 * })();
 */
