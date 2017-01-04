var g_index = 0;
var g_page_size = 2;
//计算时间差
function fn_diffTime(publishTime) {
	var d_minutes, d_hours, d_days;
	var nowDate = new Date();
	var timeNow = parseInt(nowDate.getTime() / 1000);
	var d;
	d = timeNow - publishTime;
	d_days = parseInt(d / 86400);
	d_hours = parseInt(d / 3600);
	d_minutes = parseInt(d / 60);
	if (d_days > 0 && d_days < 4) {
		return d_days + "天前";
	} else if (d_days <= 0 && d_hours > 0) {
		return d_hours + "小时前";
	} else if (d_hours <= 0 && d_minutes > 0) {
		return d_minutes + "分钟前";
	} else {
		var s = new Date(publishTime * 1000);
		var y = nowDate.getFullYear();
		if (s.getFullYear() == y) {
			return (s.getMonth() + 1) + "月" + s.getDate() + "日";
		} else {
			return (s.getFullYear() + "年" + s.getMonth() + 1) + "月" + s.getDate() + "日";
		}

	}
}
function getMdEach() {
	
	$.getJSON("./mdJson/2017.json",function(data) {
		var str = "";
		var v_size = g_index + g_page_size;
		$.each(data.listData,function(vIndex, v) {
		
			if(vIndex >= g_index && vIndex < v_size){
				str += "<li><div class='block'><div class='block_content'>";
				str += "<h2 class='title'><a  href='" + v["link"] + "' class='showHover' >" + v["title"] + "</a></h2>";
				str += "<div class='byline'><span>"+fn_diffTime(parseInt(new Date(v["time"]).getTime() / 1000))+"</span> by <a href='mailto:" + v["email"] + "'>" + v["user"] + "</a></div>";
				str += "<p class='excerpt'>" + v["fdesc"] + "</p><a href='" + v["link"] + "'>更多...</a>";
				str += "</div></div></li>";
				g_index = vIndex+1;
			}
			
		});

		if(g_index == data.listSize){
			//更多
			str += "<li id='mdMore'><div class='block'><div class='block_content'><h2 class='title'><a href='mailto:bobolnear@163.com' data-toggle='tooltip' data-placement='top' title='邮件'>已经到底啦,通知我！ <i class='fa fa-envelope-o'></i></a>";
			str += "</h2></div></div></li>";
		}else{
			//更多
			str += "<li id='mdMore'><div class='block'><div class='block_content'><h2 class='title'><a  href='#' class='showHover' onclick='Javascript:getMdEach();' data-index='"+g_index+"'>加载更多文章......</a>";
			str += "</h2></div></div></li>";
		}
		$("#mdMore").remove(); // 删除更多按钮
		$("#mdEach").append(str); // 显示处理后的数据
		
		
	});
	

}
$(document).ready(function() {
	$("#doc_last").click();
	getMdEach();
	
	
});