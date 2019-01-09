var spanX;
var spanY;
var draggable;
var father=$("#calendar");

$(".fc-event-draggable").live("mousedown",function() {
	spanX=0;
	spanY=0;
	draggable = this;
	var top = father.offset().top;
	var left = father.offset().left;
	var width = father.width();
	var height = father.height();
	document.onmousemove = function() {
		var x = event.clientX;
		var y = event.clientY;
		spanX = x - left - (draggable.clientWidth / 2);
		spanY = y - top - (draggable.clientTop / 2);
		spanX = spanX < 0 ? 0 : spanX;
		spanY = spanY < 0 ? father.find("thead").height() : spanY;
		if (spanX > width) {
			spanX = width - draggable.clientWidth;
		}
		if (spanY > height) {
			spanY = height - draggable.clientHeight;
		}
		draggable.style.position = 'absolute';
		draggable.style.left = (x - left - (draggable.clientWidth / 2)) + 'px';
		draggable.style.top = (y - top - (draggable.clientTop / 2)) + 'px';
	}
});

$(".fc-event-draggable").live("mouseup",function() {
	if(spanX>0 || spanY>0){
		draggable.style.position="relative";
		draggable.style.left=0;
		draggable.style.top=0;
		findDate();
	}
	document.onmousemove = false;
});

function findDate(){
	var lists=father.find(".fc-week td");
	console.log("spanx:"+spanX);
	console.log("spany:"+spanY);
	var obj;
	$.each(lists,function(i,value){
		obj=$(value);
		var top=obj.position().top+obj.height();
		var left=obj.position().left+obj.width();
		console.log(top);
		console.log(left);
		if(top>=spanY && left>=spanX){
			return false;
		}
	});
	obj.find(".fc-day-content").append($(draggable).clone());
	$(draggable).remove();
}