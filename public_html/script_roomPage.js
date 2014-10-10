$(document).ready(function(){
	Rating_lines_room();
});

//IF YOU NEED TO USE THIS RATING SOMEWHERE ELSE - GIVE EXECTLY SORCE AND TARGET, WITH TOP PARENT (IN ORDER THAT SCRIPTS NOT BEEN IN A CONFLICT)
//CONNECTING LINES FOR OPEN ROOM
function Rating_lines_room(){
//so much aaray cuz i needed to customize every fucking line <- don't cry
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
		source:$('.open_room .main_rating'), 
		target:$('.open_room .plusses_rating'),
		connector:[ "Straight"],
		endpoint:[ "Dot", { 
		  radius:1
		}],
		endpointStyle:{ fillStyle:"#fff", outlineColor:"#fff" },
		anchors:[Bottom,Bottom2],
		paintStyle:{ strokeStyle:"#035392",lineWidth:1} 
	});
	jsPlumb.connect({
		source:$('.open_room .money_rating'), 
		target:$('.open_room .minuses_rating'),
		connector:[ "Straight"],
		endpoint:[ "Dot", { 
		  radius:1
		}],
		endpointStyle:{ fillStyle:"#fff", outlineColor:"#fff" },
		anchors:[Bottom6,Bottom5],
		paintStyle:{ strokeStyle:"#035392",lineWidth:1} 
	});
	jsPlumb.connect({
		source:$('.open_room .money_rating'), 
		target:$('.open_room .plusses_rating'),
		connector:[ "Straight"],
		endpoint:[ "Dot", { 
		  radius:1
		}],
		endpointStyle:{ fillStyle:"#fff", outlineColor:"#fff" },
		anchors:[Bottom3,Bottom4],
		paintStyle:{ strokeStyle:"#035392",lineWidth:1} 
	});
		
}
