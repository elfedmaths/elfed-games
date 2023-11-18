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

function roundNum(number, round) {
    return Math.round(number / round) * round;
}

function createQuestion(level){
    var output
    switch (topic) {
        case 'add':
            output = topicAdd(level)
            break;
        case 'sub':
            output = topicSub(level)
            break;
        case 'mult':
            output = topicMult(level)
            break;
        case 'div':
            output = topicDiv(level)
            break;
        default:
            output = topicAddition(level)
            break;
    }
    return output
}

function topicAdd(level){
    let quest, ans, int1, int2
    int1 = randomInt(1,Math.pow(10,Math.ceil(level/10)))
    int2 = randomInt(1,Math.pow(10,Math.ceil(level/10)))
    quest = int1 + " + " + int2
    ans = int1 + int2
    return [quest, ans]
}

function topicSub(level){
    let quest, ans, int1, int2
    int1 = randomInt(2,Math.pow(10,Math.ceil(level/10)))
    int2 = randomInt(1,int1-1)
    quest = int1 + " - " + int2
    ans = int1 - int2
    return [quest, ans]
}

function topicMult(level){
    let quest, ans, int1, int2
    int1 = randomInt(1,10 * Math.ceil(level/10))
    int2 = randomInt(1,10 * Math.ceil(level/10))
    quest = int1 + " x " + int2
    ans = int1 * int2
    return [quest, ans]
}

function topicDiv(level){
    let quest, ans, int1
    int1 = randomInt(1,Math.ceil(level/2))
    ans = randomInt(1,Math.ceil(level/2))
    quest = int1 * ans + " ÷ " + int1
    return [quest, ans]
}