var GameSize, Selected = undefined;
var defplayer = 1;
var DISPLAY,
    COLOR = {
        "default": '007bff',
        "yellow": 'ffc107'
    },
    FILLCOLOR = {
        "default": '004085',
        "yellow": '343a40'
    },
    color = COLOR.default,
    fillcolor = FILLCOLOR.default;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

SumNaturalN = (x) => x * (x + 1) / 2;
SumNaturalInv = (x) => Math.floor((1 + Math.sqrt(8 * x + 1)) / 2);

function SkipSum(skip, i) {
    var y = 0,
        r;
    for (r = 0; r < i; y += skip[r++]);
    return y;
}


function EndOfGame() {
    var i;
    for (i = 0; i < SumNaturalN(GameSize); i++) {
        if (!gmstate[i])
            return false;
    }
    return true;
}

function IsNotLegal() {
    var i, j = 0,
        k;
    // if ((+Selected[2]) <= (+Selected[1]) || (+Selected[2]) > (+Selected[0]) + 1 || (+Selected[1]) < 1)
    // 	return 1;
    if ((+Selected[2]) < (+Selected[1]))[Selected[2], Selected[1]] = [Selected[1], Selected[2]];
    // console.log(Selected);
    k = (+Selected[0]) * ((+Selected[0]) - 1) / 2;
    for (i = k + (+Selected[1]); i < k + (+Selected[2]); j |= gmstate[i++ - 1]);
    if (j)
        return true;
    return false;
}

function FindWinning(f, n) {
    var i, j = 0,
        k = 0,
        xor = 0,
        len = 0,
        seen = 0;
    var e = new Array(2 * GameSize).fill(0);
    var loop = new Array(2 * GameSize).fill(0);
    var skip = new Array(2 * GameSize).fill(0);

    for (i = 0; i < n; i++) {
        for (k = SumNaturalN(i); k < SumNaturalN(i + 1); k++) {
            if (k - SumNaturalN(i) && SumNaturalN(i + 1) - k - 1 && f[k] && !f[k - 1]) {
                while (k < SumNaturalN(i + 1) && f[k++]);
                k--;
                if (!f[k]) skip[j++]++;
                //continue;
            }
            if (!f[k]) e[j]++;

        }
        j++;
    }

    for (i = 0; i < j; i++) loop[i] = e[i];
    for (i = 0; i < j; xor ^= e[i++]);
    for (i = j - 1; i >= 0; i--) {
        if (!xor) break;
        for (j = 1; j <= loop[i]; j++) {
            xor ^= e[i];
            xor ^= e[i] - j;
            if (!xor) {
                Winning[0] = i - SkipSum(skip, i);
                Winning[1] = j;
                return;
            }
            xor ^= e[i] - j;
            xor ^= e[i];
        }
    }
    Winning[0] = Winning[1] = -1;
}

function PlayMove(w, n) {
    var i, row = +w[0],
        j = SumNaturalN(+row),
        k, l = w[1],
        flag;
    Selected = new Array(3);
    if (+w[0] == -1) {
        while (1) {
            i = Math.floor((Math.random() * n) + 0);
            if (!gmstate[i]) {
                gmstate[i] = 1;
                k = SumNaturalInv(i);
                i -= k * (k - 1) / 2 - 1;
                Selected[0] = k;
                Selected[1] = i;
                Selected[2] = i + 1;
                DISPLAY = Selected;
                break;
            }
        }
    } else {
        for (i = 0; i <= row - l + 1; i++) {
            flag = 0;
            for (k = 0; k < l; k++) {
                if (gmstate[i + j + k])
                    flag = 1;
            }
            if (flag) continue;
            Selected[0] = row + 1, Selected[1] = i + 1, Selected[2] = i + l + 1;
            DISPLAY = Selected;
        }
        j = (+Selected[0]) * ((+Selected[0]) - 1) / 2;
        for (i = j + (+Selected[1]) - 1; i < j + (+Selected[2]) - 1; i++, gmstate[i - 1] = 1);
    }
}

// function Grey(r) {
// 	$('.dot:not([id^=' + rowno + '])','.dash:visible(:not([id^=' + rowno + ']))').attr("style", "color:grey");
// }

// function RemoveGrey(r) {
// 	$('.dot:not([id^=' + rowno + '])','.dash:visible(:not([id^=' + rowno + ']))').attr("style", "color:#007bff");
// }

function CreatePattern(rows) {
    var i = 0,
        j = 0,
        dash_val = 0;
    var x = document.getElementById("pattern");
    for (i = 1; i < rows + 1; i++) {
        for (j = 1; j < i + 2; j++) {
            var g = document.createElement("i");
            g.setAttribute("id", i + '-' + j);
            g.setAttribute("value", i + '-' + j);
            g.setAttribute("class", "dot mx-0 mb-3 far fa-circle ");
            g.setAttribute("style", "color:#" + color);
            x.appendChild(g);
            if (j != i + 1) {
                dash = document.createElement("i");
                dash.setAttribute("id", 'i-' + dash_val);
                dash.setAttribute("class", "dash fas fa-minus fa-xs");
                dash.setAttribute("style", "color:#fff");
                dash.setAttribute("lval", i + "-" + j);
                dash.setAttribute("rval", i + "-" + ((+j) + 1));
                x.append(dash); +
                dash_val++;
            }
        }
        x.appendChild(document.createElement("br"));
    }
}

function Display() {
    // console.log(DISPLAY);
    for (var i = 0; i < SumNaturalN(GameSize); i++) {
        if (gmstate[i]) {
            var color = '#' + fillcolor;
            var lval = $('#i-' + i).attr("lval");
            var rval = $('#i-' + i).attr("rval");
            var lvalx = lval.split("-");
            var rvalx = rval.split("-");
            $('#' + lval).removeClass("far");
            $('#' + rval).removeClass("far");
            $('#' + rval).addClass("fa");
            $('#' + lval).addClass("fa");
            if (+lvalx[0] == +DISPLAY[0]) {
                if ((+lvalx[1] >= +DISPLAY[1]) && (+rvalx[1] <= +DISPLAY[2])) {
                    // console.log(lvalx);
                    // console.log(rvalx);
                    color = 'red';
                }
            }
            $('#i-' + i).attr("style", "color:" + color);
            $('#' + rval).attr("style", "color:" + color);
            $('#' + lval).attr("style", "color:" + color);
        }
    }
}

function bot_play() {
    FindWinning(gmstate, GameSize);
    // console.log(Winning);
    PlayMove(Winning, SumNaturalN(GameSize));
    player ^= 1;
    $('#currplayer').html("To Play: " + (player ? P1 : P2));
    Selected = undefined;
    Display();
}

function TrueEndOfGame() {
    gmstate = new Array(SumNaturalN(GameSize)).fill(0);
    // Display();
    $('#modal-text-dd').html('<center>' + (!player ? (P1 + ((P1 == "You") ? ' Win' : ' Wins')) : P2 + ' Wins') +
        '<br><div id="imgthing"><img src="load.svg" class="my-2 img-fluid"></img></div></center>');
    $('#exampleModalCenter').modal('show');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var url = window.URL || window.webkitURL;
            var video = $('<video />', {
                id: 'myvideo',
                src: url.createObjectURL(this.response),
                class: 'img-fluid my-2',
                type: 'video/webm',
                controls: false,
                autoplay: true,
                loop: true,
                playsinline: true,
                muted: true
            });
            $('#imgthing').html(video);
        }
    }
    xhr.open('GET', './webms/' + (P1 == 'You' ? (!player ? 'hwin' : 'botwin') : 'wins') + '/' + Math.floor((Math.random() * 8) + 1) + '-min.webm');
    xhr.responseType = 'blob';
    xhr.send();
    $('#init').show();
    $('#pattern').html("");
    $('#pattern').hide("");
    $('#gamethings').hide("");
}