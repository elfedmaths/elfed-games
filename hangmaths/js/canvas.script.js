const canvas = document.getElementById("hangmanCanvas");
const ctx = canvas.getContext("2d");

const segments = [
    { id: 'base', x: 390, y: 390, xend: 0, yend: 0, length: 380, width: 10, angle: Math.PI, currAngle: Math.PI, range: 0, direction: 0 },
    { id: 'vertical', x: 15, y: 390, xend: 0, yend: 0, length: 380, width: 10, angle: 3 * Math.PI / 2, currAngle: 3 * Math.PI / 2, range: 0, direction: 0 },
    { id: 'top', x: 10, y: 10, xend: 0, yend: 0, length: 250, width: 10, angle: 2 * Math.PI, currAngle: 2 * Math.PI, range: 0, direction: 0 },
    { id: 'angled', x: 15, y: 80, xend: 0, yend: 0, length: 100, width: 5, angle: 7 * Math.PI / 4, currAngle: 7 * Math.PI / 4, range: 0, direction: 0 },
    { id: 'rope', x: 255, y: 10, xend: 0, yend: 0, length: 40, width: 10, angle: Math.PI / 2, currAngle: Math.PI / 2, range: 30, direction: 0.5 },
    { id: 'head', source: 'rope', xend: 0, yend: 0, length: 40, width: 80, angle: Math.PI / 2, currAngle: Math.PI / 2, range: 10, direction: 0.1 },
    { id: 'neck', source: 'head', xend: 0, yend: 0, length: 10, width: 10, angle: Math.PI / 2, currAngle: Math.PI / 2, range: 10, direction: 0.1 }, 
    { id: 'ularm', source: 'neck', xend: 0, yend: 0, length: 60, width: 5, angle: 9 * Math.PI / 10, currAngle: 9 * Math.PI / 10, range: 10, direction: 0.2 },
    { id: 'llarm', source: 'ularm', xend: 0, yend: 0, length: 60, width: 5, angle: 7 * Math.PI / 10, currAngle: 7 * Math.PI / 10, range: 20, direction: 0.3 },
    { id: 'urarm', source: 'neck', xend: 0, yend: 0, length: 60, width: 5, angle: 1 * Math.PI / 10, currAngle: 1 * Math.PI / 10, range: 10, direction: -0.2 },
    { id: 'lrarm', source: 'urarm', xend: 0, yend: 0, length: 60, width: 5, angle: 3 * Math.PI / 10, currAngle: 3 * Math.PI / 10, range: 20, direction: -0.3 },
    { id: 'body', source: 'neck', xend: 0, yend: 0, length: 80, width: 10, angle: Math.PI / 2, currAngle: Math.PI / 2, range: 20, direction: 0.1 },
    { id: 'ulleg', source: 'body', xend: 0, yend: 0, length: 70, width: 5, angle: 8 * Math.PI / 10, currAngle: 8 * Math.PI / 10, range: 10, direction: 0.2 },
    { id: 'llleg', source: 'ulleg', xend: 0, yend: 0, length: 50, width: 5, angle: 4 * Math.PI / 10, currAngle: 4 * Math.PI / 10, range: 10, direction: 0.1 },
    { id: 'urleg', source: 'body', xend: 0, yend: 0, length: 70, width: 5, angle: 2 * Math.PI / 10, currAngle: 2 * Math.PI / 10, range: 10, direction: 0.2 },
    { id: 'lrleg', source: 'urleg', xend: 0, yend: 0, length: 50, width: 5, angle: 6 * Math.PI / 10, currAngle: 6 * Math.PI / 10, range: 10, direction: 0.1 },
];

function randomAngle(angle, currAngle, range, direction){
    let deg = angle * 180 / Math.PI
    let currDeg = currAngle * 180 / Math.PI
    currDeg = currDeg + direction
    if(currDeg > deg + (range / 2)){
        direction = -1 * Math.abs(direction)
    }else if(currDeg < deg - (range / 2)){
        direction = Math.abs(direction)
    }
    let rad = currDeg * Math.PI / 180
    return {angle: rad, direction: direction}
}

function drawSegment(x, y, length, width, angle) {
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x, y);
  const endX = x + length * Math.cos(angle);
  const endY = y + length * Math.sin(angle);
  ctx.lineTo(endX, endY);
  ctx.stroke();
  return { x: endX, y: endY };
}

function getEnd(targetArr, targetId) {
    for (const target of targetArr) {
        if (Array.isArray(target)) {
            const result = getEnd(target, targetId);
            if (result) return result;
        } else if (target.id === targetId) {
            return { xend: target.xend, yend: target.yend };
        }
    }
    return null;
}

function drawStickman() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < Math.min(lives, segments.length); i++) {
    const seg = segments[i];
    const segEnd = getEnd(segments, seg.source)
    const segX = seg.x ?? segEnd?.xend ?? 0;
    const segY = seg.y ?? segEnd?.yend ?? 0;
    const rand = randomAngle(seg.angle, seg.currAngle, seg.range, seg.direction);
    seg.currAngle = rand.angle;
    seg.direction = rand.direction;
    const { x: newX, y: newY } = drawSegment(segX, segY, seg.length, seg.width, rand.angle);
    seg.xend = newX;
    seg.yend = newY;
  }
}

function animate() {
    requestAnimationFrame(animate);
    drawStickman();
}

animate();
