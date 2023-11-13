let data = [], high = 0, coordArr;

function math(){
    data = [];
    coordArr = fetchData();
    lengthCheck();
    data['complete'] = completePoly();
    data['high'] = "High score: " + high + "%";
    return data;
}

function lengthCheck(){
    if(coordArr.length < 150){
        data['error'] = "Not enough data points";
    }
}

function completePoly(){
    var start = coordArr[0];
    var score = 100;
    for (let i = coordArr.length - 1; i > coordArr.length / 2; i--) {
        var end = coordArr[i];
        var distance = Math.sqrt(Math.pow((end[0] - start[0]),2) + Math.pow((end[1] - start[1]),2));
        if(distance < score){
            score = distance;
        }
    }
    score = (100 - score).toFixed(2);
    if(score > high) high = score
    return score + "%";
}