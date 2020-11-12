var gmstate;
var Winning = new Array();
var player;
var P1 = "You",
	P2 = "Bot",
	botplay = 1; // 1 for bot 0 for twoplayer
var names_data = [];

function InitiateGame(N, X) {
	
	GameSize = N;
	gmstate = new Array(SumNaturalN(GameSize)).fill(0)
	CreatePattern(GameSize);
	player = X;
	// alert(player);
	if (!X && botplay) {
		bot_play();
	}

	$('#currplayer').html("To Play: " + (player ? P1 : P2));

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
			$('#currplayer').html("To Play: " + (player ? P1 : P2));
			Selected = undefined;
			Display();
			if (EndOfGame(SumNaturalN(GameSize))) {
				Display();
				setTimeout(TrueEndOfGame, 800);
				return;
			}
			// RemoveGrey(rowno);
			if (botplay) {
				await sleep(800);
				bot_play();
			}
			// 
			if (EndOfGame(SumNaturalN(GameSize))) {
				Display();
				setTimeout(TrueEndOfGame, 800);
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

function getTwoNames() {
	var request = new XMLHttpRequest()
	https: //api.noopschallenge.com/wordbot?count=2&set=adjectives
		request.open('GET', 'https://api.noopschallenge.com/wordbot?count=2&set=animals', true)
	request.onload = function () {
		// Begin accessing JSON data here
		var data = JSON.parse(this.response)

		if (request.status >= 200 && request.status < 400) {
			names_data = data;
		} else {
			console.log('error');
		}
	}
	request.send();
}

rrw = (x, y) => {
	$('#rownumbers').html(x);
	$('#rowsdisplay').html(x + ' Rows');
	$(y).addClass('active');
	$('.rowconfig').not(y).removeClass('active');
}

srw = (x, y) => {
	$('#startplayer').html(+x);
	$('#namedisplay').html((+x ? P1 : P2) + ' will Start');
	$(y).addClass('active');
	$('.playerconfig').not(y).removeClass('active');
}

$('.rowconfig').click(function () {
	rrw($(this).text(), this);
});

$('.playerconfig').click(function () {
	srw($(this).text() == P1, this);
});

$('#doubleplayer').click(function () {
	$(this).addClass('active');
	$('#defplayer').removeClass('active');
	if (P1 == 'You') {
		P1 = names_data['words'][0];
		P2 = names_data['words'][1];
		$('#exname1').attr('value', P1);
		$('#exname2').attr('value', P2);
		$('#playerinit').html(P1);
		$('#botplayer').html(P2);
		getTwoNames();
	}
	$('#playerinit').click();
	$('#playernames').show();
	botplay = 0;
});

$('#exname1').change(function () {
	P1 = $(this).val().trim();
	if (!P1) {
		P1 = names_data['words'][0];
		$(this).val(P1);
	}
	$('#playerinit').html(P1);
});

$('#exname2').change(function () {
	P2 = $(this).val().trim();
	if (!P2) {
		P2 = names_data['words'][1];
		$(this).val(P2);
	}
	$('#botplayer').html(P2);
	$('#botplayer').click();
});

$('#defplayer').click(function () {
	$('#playernames').hide();
	$(this).addClass('active');
	$('#doubleplayer').removeClass('active');
	P1 = "You";
	P2 = "Bot";
	botplay = 1;
	$('#botplayer').html(P2);
	$('#playerinit').html(P1);
	$('#playerinit').click();
});

$('#resetgame').click(function () {
	$('#pattern').html("");
	Selected = undefined;
	$('#gamethings').hide();
	InitiateGame(+$('#rownumbers').text(), +$('#startplayer').text());
	$('#gamethings').show();
});

$('#back').click(function () {
	$('#init').show();
	$('#pattern').html("");
	$('#pattern').hide("");
	$('#gamethings').hide("");
});


$('#gamestarter').click(function () {
	$('#init').hide();
	InitiateGame(+$('#rownumbers').text(), +$('#startplayer').text())
	$('#loader').show();
	setTimeout(() => {
		$('#gamethings').show();
		$('#pattern').show();
		$('#loader').hide();
	}, 1000);


});

$('.theme').click(function () {
	color = COLOR[$(this).text().toLowerCase()];
	fillcolor = FILLCOLOR[$(this).text().toLowerCase()];
	$('#theme').html($(this).text() + ' theme');
});


$('#exampleModalCenter,#gameinfomodal').modal({
	show: false
});

// $('#gameinfomodal').modal({
// 	show: false
// });

$('#rowsinit, #playerinit, #defplayer').click();
$('[data-toggle="tooltip"]').tooltip();
// $('#playerinit').click();
$('script').remove();
getTwoNames();
