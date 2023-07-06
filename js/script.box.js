const displayBoxes = [
  [
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['1', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '|'],
    ['4', '-', '-', '-', '-', '-', '3']
  ],
]
  
function displayBox(id){
  displayBoxes[id].forEach((row, i) => {
    row.forEach((symbol, j) => {
      switch (symbol) {
        case '-':
          displays.push(
            new Display({
              position: {
                x: Display.width * j,
                y: Display.height * i
              },
              image: createImage('pipeHorizontal')
            })
          )
          break
        case '|':
          displays.push(
            new Display({
              position: {
                x: Display.width * j,
                y: Display.height * i
              },
              image: createImage('pipeVertical')
            })
          )
          break
        case '1':
        case '2':
        case '3':
        case '4':
          displays.push(
            new Display({
              position: {
                x: Display.width * j,
                y: Display.height * i
              },
              image: createImage(`pipeCorner${symbol}`)
            })
          )
          break
        case '.':
          displays.push(
            new Display({
              position: {
                x: Display.width * j,
                y: Display.height * i
              },
              image: createImage('blank')
            })
          )
          break
      }
    })
  })
}