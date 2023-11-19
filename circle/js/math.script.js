let cWidth, cHeight, minX, maxX, minY, maxY

function processMath(){
    minX = Math.min(...coords.map(o => o.x))
    maxX = Math.max(...coords.map(o => o.x))
    minY = Math.min(...coords.map(o => o.y))
    maxY = Math.max(...coords.map(o => o.y))
    cWidth = canvas.width
    cHeight = canvas.height
    if(!lengthCheck()) return false
    if(!crossCheck()) return false
    completePoly()
    return true
}

function lengthCheck(){
    if  (coords.length < 20 
        || (maxX - minX) / Math.min(cWidth,cHeight) < 0.3
        || (maxY - minY) / Math.min(cWidth,cHeight) < 0.3
    ){
        error = "Not enough data points"
        return false
    }
    return true
}

function crossCheck(){
    return true
}

function completePoly(){
    let start = coords[0];
    let currScore = 100;
    for (let i = coords.length - 1; i > coords.length / 2; i--) {
        let end = coords[i];
        let distance = Math.sqrt(Math.pow((end.x - start.x),2) + Math.pow((end.y - start.y),2));
        if(distance < currScore){
            currScore = distance;
        }
    }
    score = 100 - currScore;
    if(score > highScore) highScore = score
    return true
}