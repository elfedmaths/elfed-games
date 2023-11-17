function randomInt(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
function randomExclude(min, max, excludeArray) {
    let randomNum;
    do {
        randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (excludeArray.includes(randomNum));
    return randomNum;
}
  
function randColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function roundNum(number, round) {
    return Math.round(number / round) * round;
}