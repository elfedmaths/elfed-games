const map = [
  [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
  ],
  [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', 'p', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', 'p', '.', '.', '.', '.', '.', '.', '.', 'p', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
  ]
]
  
function createMap(mapId){
  map[mapId].forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case '-':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('pipeHorizontal')
            })
          )
          break
        case '|':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('pipeVertical')
            })
          )
          break
        case '1':
        case '2':
        case '3':
        case '4':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage(`pipeCorner${symbol}`)
            })
          )
          break
        case 'b':
          boundaries.push(
            new Boundary({
              position: {
                x: Boundary.width * j,
                y: Boundary.height * i
              },
              image: createImage('block')
            })
          )
          break
        case '[':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('capLeft')
            })
          )
          break
        case ']':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('capRight')
            })
          )
          break
        case '_':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('capBottom')
            })
          )
          break
        case '^':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('capTop')
            })
          )
          break
        case '+':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('pipeCross')
            })
          )
          break
        case '5':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              color: 'blue',
              image: createImage('pipeConnectorTop')
            })
          )
          break
        case '6':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              color: 'blue',
              image: createImage('pipeConnectorRight')
            })
          )
          break
        case '7':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              color: 'blue',
              image: createImage('pipeConnectorBottom')
            })
          )
          break
        case '8':
          boundaries.push(
            new Boundary({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height
              },
              image: createImage('pipeConnectorLeft')
            })
          )
          break
        case '.':
          pellets.push(
            new Pellet({
              position: {
                x: j * Boundary.width + Boundary.width / 2,
                y: i * Boundary.height + Boundary.height / 2
              }
            })
          )
          break
        case 'p':
            powerUps.push(
              new PowerUp({
                position: {
                  x: j * Boundary.width + Boundary.width / 2,
                  y: i * Boundary.height + Boundary.height / 2
                }
              })
            )
            break
      }
    })
  })
}