//Todo: Too Many Globals, FIXME
var doc = window.document;
var score = 0;
var div = doc.getElementById('score');
var message = doc.getElementById('message');
var hi = doc.getElementById('hiscore');
var charDiv = doc.getElementById('charDiv');
var begin = doc.getElementById('begin');
begin.disabled = true;
div.style.visibility = "hidden";
message.style.visibility = "hidden";
hi.style.visibility = "hidden";
processUI(score);
var diffSet = false;
function difficultyHandler(e, mode) {
    window.speeds = [];
    var arr = [];
    if (mode == "easy") {
        window.speeds = [1,2,1,2];
        e.target.style.backgroundColor = "red";
        arr = [].slice.call(e.target.parentNode.childNodes);
    }
    else if (mode == "med") {
        window.speeds = [4,5,4,5];
        e.target.style.backgroundColor = "red";
        arr = [].slice.call(e.target.parentNode.childNodes);
    }
    else if (mode == "hard"){
        window.speeds = [8,6,8,9];
        e.target.style.backgroundColor = "red";
        arr = [].slice.call(e.target.parentNode.childNodes);
    }
    else if (mode == "master") {
        window.speeds = [10,8,12,7];
        e.target.style.backgroundColor = "red";
        arr = [].slice.call(e.target.parentNode.childNodes);
    }
    else {
        window.speeds = [80,1,1,80];
        e.target.style.backgroundColor = "red";
        arr = [].slice.call(e.target.parentNode.childNodes);
    }
    var count = 0;
    arr.forEach(function(elem) {
        count++;
        if (count % 2 == 0) {
            if (elem != e.target)
            elem.style.backgroundColor = '#4CAF50';
        }
    });
    diffSet = true;
    if (diffSet && charSet) {
        begin.disabled = false;
    }
}
var sprite = null;
var charSet = false;
function char(num) {
    if (num == 1) {
        sprite = 'images/char-boy.png'
    }
    else if (num == 2) {
        sprite = 'images/char-cat-girl.png'
    }
    else if (num == 3) {
        sprite = 'images/char-horn-girl.png'
    }
    else if (num == 4) {
        sprite = 'images/char-pink-girl.png'
    }
    else if (num == 5) {
        sprite = 'images/char-princess-girl.png'
    }
    charSet = true;
    if (diffSet && charSet) {
        begin.disabled = false;
    }

}

function start() {
    var div = doc.getElementById('diffDiv');
    div.style.display = "none";
    var div2 = doc.getElementById('charDiv');
    div2.style.marginTop = 0;
    div2.style.display = "none";
    init(sprite);
}
document.addEventListener('keypress', function(e) {
    allowedKeys(e);
});
document.addEventListener('keydown', function (e) {
    allowedKeys(e);
});
function allowedKeys(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (player != null)
    player.handleInput(allowedKeys[e.keyCode]);
}
function processUI(score) {
    div.setAttribute('score', score);
    div.innerHTML = "Score: " + div.getAttribute('score');
    if (score == 0){
        message.innerHTML = "Beat The High Score!";
    }
    else if (score > 0) {
        message.innerHTML = "Keep Going";
    }
    else {
        message.innerHTML = "Awful";
    }
    if (window.localStorage.hiscore) {
        if (score > window.localStorage.hiscore) {
            window.localStorage.hiscore = score;
        }
        hi.innerHTML = "High Score: " + window.localStorage.hiscore;
    }
    else {
        window.localStorage.hiscore = 0;
        hi.innerHTML = "High Score: " + window.localStorage.hiscore;
    }
}