<#include "../shared/base.ftl"> 
<@base base_title="LOCAL泛设计" splash_height=400 base_js=["/js/index.js"] base_css=["/less/index.less"] >
<!--host -->
<div id="section-host" class="section-style">

	<div>
		<header class="section-title">
			<h2>HOST作品</h2>
			<h6>绘本 连番 设计 工艺 小件 摄影 小说 随笔</h6>
		</header>
	</div>

	<div>

		<div class="left">
			<#list mediaModelList as mediaModel>

			<div class="photo-warp">
				<a href="${mediaModel.path}"> <img src="${mediaModel.path}"
					data-origin="${mediaModel.path}" alt="" />
				</a>
				<div class="photo-desc">
					<span class="photo-name"> <a href="${mediaModel.path}">
							<#if mediaModel.userMode?exists> ${mediaModel.userModel.nikename}
							</#if> </a>
					</span> <span class="photo-num">24张照片</span>
				</div>

			</div>

			</#list>


			<div class="photo-warp">
				<a href="/images/p2371088348.jpg"><img
					src="/images/p2371088348.jpg" data-origin="/images/p2371088348.jpg"
					alt="" /></a>
				<div class="photo-desc">
					<span class="photo-name"><a href="/images/p2371088348.jpg">夏日食材</a></span>
					<span class="photo-num">24张照片</span>
				</div>
			</div>

			<div class="photo-warp">
				<a href="/images/p2371088385.jpg"><img
					src="/images/p2371088385.jpg" data-origin="/images/p2371088385.jpg"
					alt="" /></a>
				<div class="photo-desc">
					<span class="photo-name"><a href="/images/p2371088385.jpg">夏日食材</a></span>
					<span class="photo-num">24张照片</span>
				</div>

			</div>

			<div class="photo-warp">
				<a href="/images/p2371088376.jpg"><img
					src="/images/p2371088376.jpg" data-origin="/images/p2371088376.jpg"
					alt="" /></a>
				<div class="photo-desc">
					<span class="photo-name"><a href="/images/p2371088376.jpg">夏日食材</a></span>
					<span class="photo-num">24张照片</span>
				</div>

			</div>


		</div>

	</div>
</div>


<div style="min-height: 1000px;">123</div>

</@base>
