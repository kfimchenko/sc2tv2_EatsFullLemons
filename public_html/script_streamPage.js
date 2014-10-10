$(document).ready(function(){
		Rating_lines();
});
//CONNECTING LINES FOR STREAMER PAGE RATINIG BLOCK
function Rating_lines(){
//so much aaray cuz i needed to customize every fucking line
	var Bottom = new Array(6);
		Bottom =[1,0,0,0,-1,4];
	var Bottom2 = new Array(6);
		Bottom2 =[1,0,0,0,-8,7];
	var Bottom3 = new Array(6);
		Bottom3 =[1,0,0,0,-5,4];
	var Bottom4 = new Array(6);
		Bottom4 =[1,0,0,0,-8,7];
	var Bottom5 = new Array(6);
		Bottom5 =[1,0,0,0,-6,2];
	var Bottom6 = new Array(6);
		Bottom6 =[1,0,0,0,-1,4];
		
		jsPlumb.connect({
		source:$('.user_stream_page .main_rating'), 
		target:$('.user_stream_page .plusses_rating'),
		connector:[ "Straight"],
		endpoint:[ "Dot", { 
		  radius:1
		}],
		endpointStyle:{ fillStyle:"#fff", outlineColor:"#fff" },
		anchors:[Bottom,Bottom2],
		paintStyle:{ strokeStyle:"#035392",lineWidth:1} 
	});
	jsPlumb.connect({
		source:$('.user_stream_page .money_rating'), 
		target:$('.user_stream_page .minuses_rating'),
		connector:[ "Straight"],
		endpoint:[ "Dot", { 
		  radius:1
		}],
		endpointStyle:{ fillStyle:"#fff", outlineColor:"#fff" },
		anchors:[Bottom6,Bottom5],
		paintStyle:{ strokeStyle:"#035392",lineWidth:1} 
	});
	jsPlumb.connect({
		source:$('.user_stream_page .money_rating'), 
		target:$('.user_stream_page .plusses_rating'),
		connector:[ "Straight"],
		endpoint:[ "Dot", { 
		  radius:1
		}],
		endpointStyle:{ fillStyle:"#fff", outlineColor:"#fff" },
		anchors:[Bottom3,Bottom4],
		paintStyle:{ strokeStyle:"#035392",lineWidth:1} 
	});
		
}
