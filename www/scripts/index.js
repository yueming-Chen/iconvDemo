var string=[];
var show = function(string,index,checkNum){
	var results=['','',''];
	var index1 = 16,index2 = 34;
	var page;
	for(var i = index1;i < index2;i++){
		results[0] += string[index][i];
	}
	$('#main').append('<div class="col-md-11">'+ results[0] +'</div>');
}

var check=function(checkNum){
	if(checkNum=='9')
		return 2;
	else
		return 0;
}

var showData = function(){
	//開啟分頁
	for(var index = 1;index <= (string.length/10)+1;index++){
		$('#page').append('<button class="page btn btn-default" >'+ index +'</button>');
	}
	for(var key = 0 ; key < string.length ; key++){
		show(string,key,string[key][22]);
		key+=check(string[key][22]);
		//分頁顯示幾筆資料
		 if(key>8){
		 	break;
		 }
	}
}

$('#sub').click(function(){
	if($('#upload').val()){
		var mode = 'RE';
		var selectedFile = $('#upload').val().split('\\');
		selectedFile = selectedFile[selectedFile.length - 1];
		$.get('/Api/readData/' + selectedFile + '/' + mode,function(data,status){
			string.length = 0;
			for(var key in data.results){
				string.push(data.results[key]);
			}
			$('#page').empty();
			$('#main').empty();
			if(string.length == 0){
				$('#main').append('<p>尚無資料!</p>');
			}else{
				showData();
			}
		});
	}
});

$('#write').click(function(){
	if($('#upload').val() && $('#mode').val()){
		var mode = $('#mode').val();
		var selectedFile = $('#upload').val().split('\\');
		selectedFile = selectedFile[selectedFile.length - 1];
		$.get('/Api/writeData/' + selectedFile + '/' + mode,function(data,status){
			console.log('done');
		});
	}
});

var cool = function(){
	var mode=100;
	for(var a = 0;a<300;a++){
		if(a%mode<(mode/2)){
			for(var b=0;b < a % mode + 1;b++){
				document .writeln( "*" );
			}
		}else{
			for(var b = 0;b < mode - ( a % mode );b++){
				document .writeln( "*" );
			}
		}
		document .writeln( "</br>" );
	}
}

	$('#page').on('click','.page',function(){
		$('#main').empty();
		for(var index=($(this).text()-1)*10;index<($(this).text())*10;index++){
			if(string[index+1]==undefined){
				break;
			}
			show(string,index,string[index][22]);
			index+=check(string[index][22]);

		}
	});

	$(document).on('change', ':file', function() {
    	var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    	input.trigger('fileselect', [numFiles, label]);
 	 });

	$(':file').on('fileselect', function (event, numFiles, label) {
		var input = $(this).parents('.input-group').find(':text'),
		log = numFiles > 1 ? numFiles + ' files selected' : label;
		if (input.length) {
		input.val(log);
		} else {
		if (log) alert(log);
		}
	});


function enterSecretCode() {
//console.log('enterSecretCode');
// UP 38, DOWN 40, LEFT 37, RIGHT 39, A 65, B 66
// SPACE 32
var secretCodes = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
var enteredCodes = secretCodes.slice(0);

var resetTimer;
var resetTime = 1500;

function onKeydown(event) {
	var keycode = event.which;
	// console.log('keycode : ' + keycode);
	if (enteredCodes[0] == keycode) {
		enteredCodes.shift();
		var indicator = secretCodes.length - enteredCodes.length;
		if (enteredCodes.length == 0) {
			alert('give me money');
			clearTimeout(resetTimer);
		} 
		else{
			clearTimeout(resetTimer);
			resetTimer = setTimeout(function(){
				clearTimeout(resetTimer);
				enteredCodes = secretCodes.slice(0);
			}, resetTime);
		}

	}else if (enteredCodes.length < secretCodes.length) {
		clearTimeout(resetTimer);
		enteredCodes = secretCodes.slice(0);
	}
}

$(window).bind('keydown', onKeydown);
}

enterSecretCode();