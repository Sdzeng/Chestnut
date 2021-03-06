<!-- 在基本宏里定义#compress 压缩页面指令， 扩展页就不需要定义了 -->
<#compress> 
<#macro base base_title splash_height   staticsPath="" base_js=[] base_css=[]>
<!-- base: 模板名 base_title base_keywords 可由扩展页传入的标题和关键字 -->
<!-- base_js css 由扩展页传入其自己的css js 我这里定义的是一个数据，方便传入多个 -->
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<title>${base_title}</title>
<!-- 标题 后缀为扩展页所传入 -->
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<link rel="icon" href="images/favicon/favicon-32x32.png" sizes="32x32">

<!-- 公共css -->
<!--<link rel="stylesheet" href="/buildcss/bootswatch.min.css" media="screen">
<link rel="stylesheet" href="/buildcss/pages/index.min.css" media="screen">
-->

<!--<link rel="stylesheet/less" href="/less/bootswatch/default/bootswatch_custom.less" media="screen">
<link rel="stylesheet/less" href="/css/font-awesome.min.css" media="screen"> 
<link rel="stylesheet/less" href="/less/pages/index.less" media="screen">
<script src="/js/less.js" type="text/javascript"></script>
-->

<!-- 遍历扩展页css -->
<#list base_css as c>
<link rel="stylesheet/less" href="${staticsPath}${c}" media="screen">
</#list>
<script src="/js/less.js" type="text/javascript"></script>
</head>
<body id="home">
	<!--公共导航栏 -->
	<nav id="navbar" class="navbar bg-layer"  style="background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%),url( ${coverModel.mediaModel.path})">

		<div class="navbar-logo">
			<a href="/index/1"><img src="/images/logo-nav.png">LOCAL</a>
		</div>
		<div class="navbar-left">
			<ul id="menuList" class="navbar-nav">
			</ul>
		</div>
		<div class="navbar-right">
			<ul class="navbar-nav">
				<li><a href="/user/1" target="_self">登陆</a></li>
				<li><a href="http://builtwithbootstrap.com/" target="_blank">注册</a></li>
			</ul>
		</div>

	</nav>

	<!--封面-->
	<div id="splash" class="splash bg-layer" style="height:${splash_height}px;background-image:linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%),url( ${coverModel.mediaModel.path})">
		<div class="quote">
			<div class="essay-content">
				<blackquote style=" top:${splash_height-150}px;max-height:${splash_height - 250 - 50}px;"> 
				<q>
					<#if coverModel.mediaModel.essayModel.content?exists> 
					 ${coverModel.mediaModel.essayModel.content}
					<#else> 
				       In photography there is a reality so subtle that it becomes more real than reality.
					</#if> 
					</q> 
					</blackquote>
			</div>
			<div class="essay-other">

				<blackquote style=" top:${splash_height-110}px;max-height:${splash_height - 300-10}px;">
				<div>

					<ul>
						<li class="author"><a href="javascript:;">${coverModel.mediaModel.userModel.nikename}</a></li>
						<li class="location">${coverModel.mediaModel.essayModel.location}  ${coverModel.mediaModel.essayModel.createDate}</li>
			   
					</ul>
				</div>
				</blackquote>
			</div>

		</div>
	</div>



	<!-- #nested 指令表示扩展页内容将嵌套在此处 -->
	<#nested>



	<!-- 以下是公共页脚 -->
	<footer class="blog-footer">
		<p>? 2015-2016 初</p>
	</footer>

	<!-- 公共js -->
	<script src="/js/jquery-3.1.1.min.js"></script>
	<!--<script src="/js/bootstrap.js"></script> -->
	<script src="/js/base.js"></script>

	<!-- 遍历公共js -->
	<#list base_js as j>
	<script src="${staticsPath}${j}"></script>
	</#list>

</body>
</html>
</#macro> </#compress>
