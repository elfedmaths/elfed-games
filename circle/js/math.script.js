let cWidth, cHeight, minX, maxX, minY, maxY, centerX, centerY, radius, perc = []

function processMath(){
    if(!lengthCheck()) return false
    if(!closeCheck()){
        if(!crossCheck()) return false
    }
    if(!lengthCheck()) return false
    completePoly()
    return true
}

function lengthCheck(){
    minX = Math.min(...coords.map(o => o.x))
    maxX = Math.max(...coords.map(o => o.x))
    minY = Math.min(...coords.map(o => o.y))
    maxY = Math.max(...coords.map(o => o.y))
    cWidth = canvas.width
    cHeight = canvas.height
    if  (coords.length < 20 
        || (maxX - minX) / Math.min(cWidth,cHeight) < 0.3
        || (maxY - minY) / Math.min(cWidth,cHeight) < 0.3
    ){
        error = "Circle not big enough!!"
        return false
    }
    return true
}

function closeCheck(){
    if(Math.abs(coords[0].x - coords[coords.length-1].x) < 20
        && Math.abs(coords[0].y - coords[coords.length-1].y) < 20
    ) return true
    return false
}

function crossCheck(){
    let coordArrX = [], coordArrY = [], indexStart, indexEnd, intersection
    mainLoop: for (let i = 0; i < coords.length / 2; i++) {
        coordArrX.push(coords[i].x)
        coordArrY.push(coords[i].y)
        for (let j = coords.length - 1; j > coords.length / 2; j--) {
            for (let k = 1; k < coordArrX.length; k++) {
                intersection = findIntersection(
                    [coords[j].x,coords[j].y],
                    [coords[j-1].x,coords[j-1].y], 
                    [coordArrX[k],coordArrY[k]], 
                    [coordArrX[k-1],coordArrY[k-1]]
                );
                if (intersection[0] > Math.min(coords[j].x,coords[j-1].x)
                    && intersection[0] < Math.max(coords[j].x,coords[j-1].x)
                    && intersection[0] > Math.min(coordArrX[k],coordArrX[k-1])
                    && intersection[0] < Math.max(coordArrX[k],coordArrX[k-1])
                    && intersection[1] > Math.min(coords[j].y,coords[j-1].y)
                    && intersection[1] < Math.max(coords[j].y,coords[j-1].y)
                    && intersection[1] > Math.min(coordArrY[k],coordArrY[k-1])
                    && intersection[1] < Math.max(coordArrY[k],coordArrY[k-1])
                ) {
                    indexStart = k, indexEnd = j
                    break mainLoop
                }                 
            }
        }
    }
    if(indexStart && indexEnd){
        coords = coords.slice(indexStart, indexEnd + 1)
        return true
    }
    error = "Circle not recognised!!"
    return false
}

function tempDraw() {
    for (let i = 0; i < coords.length - 1; i++) {
        c.beginPath()
        c.lineWidth = 5
        c.lineCap = 'round'
        c.strokeStyle = 'Red'
        c.moveTo(coords[i].x, coords[i].y)
        c.lineTo(coords[i+1].x, coords[i+1].y)
        c.stroke()
    }
}

function findIntersection(point1Line1, point2Line1, point1Line2, point2Line2) {
    // Extracting coordinates
    const [x1, y1] = point1Line1
    const [x2, y2] = point2Line1
    const [x3, y3] = point1Line2
    const [x4, y4] = point2Line2
    // Calculate slopes
    const m1 = (y2 - y1) / (x2 - x1)
    const m2 = (y4 - y3) / (x4 - x3)
    // Check if lines are parallel
    if (m1 === m2) return false
    // Calculate intersection point
    const intersectionX = (m1 * x1 - m2 * x3 + y3 - y1) / (m1 - m2)
    const intersectionY = m1 * (intersectionX - x1) + y1
    return [intersectionX, intersectionY]
}

function completePoly(){
    minX = Math.min(...coords.map(o => o.x))
    maxX = Math.max(...coords.map(o => o.x))
    minY = Math.min(...coords.map(o => o.y))
    maxY = Math.max(...coords.map(o => o.y))
    centerX = minX + Math.abs(maxX - minX) / 2
    centerY = minY + Math.abs(maxY - minY) / 2
    radius = Math.min(maxX-minX, maxY-minY) / 2
    for (let i = 0; i < coords.length; i++) {
        let distance = Math.sqrt(Math.pow((coords[i].x - centerX),2) + Math.pow((coords[i].y - centerY),2))
        let percDist = 1 - (Math.abs(distance-radius) / radius)
        perc.push(percDist)
    }
    score = 100 * calculateAverage(perc)
    if(score > highScore) highScore = score
    return true
}

function calculateAverage(array) {
    if (array.length === 0) return null
    const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    const average = sum / array.length
    return average;
}