var gmstate;
var Winning = new Array();
var player;

function InitiateGame(N, X) {
	GameSize = N;
	gmstate = new Array(SumNaturalN(GameSize)).fill(0)
	CreatePattern(GameSize);
	player = X;
	// alert(player);
	if (!X) {
		bot_play();
	}

	$('.dot').click(async function () {
		dotvalue = $(this).attr("value").split("-");
		rowno = dotvalue[0];
		if (Selected) {
			if ((+Selected[0]) != rowno) {
				return;
			} else if ((+Selected[1]) == dotvalue[1]) {
				// RemoveGrey(rowno);
				Selected = undefined;
				$(this).attr('style', 'color:#' + color);
				$(this).removeClass('fa');
				$(this).addClass('far');
				return;
			}
			Selected.push(dotvalue[1]);
			if (IsNotLegal()) {
				$('#' + Selected[0] + '-' + Selected[1]).attr('style', 'color:#' + color);
				$('#' + Selected[0] + '-' + Selected[1]).removeClass('fa');
				$('#' + Selected[0] + '-' + Selected[1]).addClass('far');
				Selected = undefined;
				Display();
				$('#modal-text-dd').html('<center>Ilegal move</center>');
				$('#exampleModalCenter').modal('show');
				// $(".alert").fadeTo(2000, 500).fade(500, function(){
				// 	$(".alert").fade(500);
				// });

				// alert('Illegal Move');
				// RemoveGrey(rowno);
				return;
			}
			DISPLAY = Selected.map((x) => parseInt(x, 10));
			j = SumNaturalN((+Selected[0]) - 1);
			for (i = j + (+Selected[1]) - 1; i < j + (+Selected[2]) - 1; i++, gmstate[i - 1] = 1);
			player ^= 1;
			Selected = undefined;
			Display();
			if (EndOfGame(SumNaturalN(GameSize))) {
				TrueEndOfGame();
				return;
			}
			// RemoveGrey(rowno);
			await sleep(1000);
			bot_play();
			// 
			if (EndOfGame(SumNaturalN(GameSize))) {
				TrueEndOfGame();
				return;
			}
		} else {
			var a = $(this).prev().hasClass('dash');
			var b = $(this).next().hasClass('dash');
			var c = $(this).prev().attr("style") != "color:#fff";
			var d = $(this).next().attr("style") != "color:#fff";
			if (a && !b) {
				if (c) return;
			} else if (!a && b) {
				if (d) return;
			} else if (a && b) {
				if (c && d) return;
			}
			Selected = dotvalue;
			$(this).attr('style', 'color:red');
			$(this).addClass('fa');
			$(this).removeClass('far');
			// Grey(rowno);
			// $(this).addClass('fa');
			// $(this).removeClass('far');
		}
	});
}


rrw = (x, y) => {
	$('#rownumbers').html(x);
	$('#rowsdisplay').html(x + ' Rows');
	$(y).addClass('active');
	$('.rowconfig').not(y).removeClass('active');
}

srw = (x, y) => {
	$('#startplayer').html(+x);
	$('#namedisplay').html((+x ? 'You ' : 'Bot ') + 'will Start');
	$(y).addClass('active');
	$('.playerconfig').not(y).removeClass('active');
}

$('.rowconfig').click(function () {
	rrw($(this).text(), this);
});

$('.playerconfig').click(function () {
	srw($(this).text() == 'You', this);
});

$('#gamestarter').click(function () {
	$('#init').hide();
	InitiateGame(+$('#rownumbers').text(), +$('#startplayer').text())
	$('#loader').show();
	setTimeout(() => {
		$('#pattern').show();
		$('#loader').hide();
	}, 1000);


});

$('.theme').click(function () {
	color = COLOR[$(this).text().toLowerCase()];
	fillcolor = FILLCOLOR[$(this).text().toLowerCase()];
	$('#theme').html($(this).text()+' theme');
});


$('#exampleModalCenter').modal({
	show: false
});

$('#gameinfomodal').modal({
	show: false
});

$('#rowsinit').click();
$('#playerinit').click();