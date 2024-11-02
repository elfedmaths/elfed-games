const map = [
  [
    [9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
    [10, ' ', '.', '.', '.', '.', '.', '.', '.', '.', 10],
    [10, '.', 9, 1, 1, 1, 1, 1, 3, '.', 10],
    [10, '.', 8, 0, 0, 0, 0, 0, 2, '.', 10],
    [10, '.', 12, 4, 4, 4, 4, 4, 6, '.', 10],
    [10, '.', '.', '.', '.', '.', '.', '.', '.', '.', 10],
    [12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6]
  ],
  [
    [9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
    [10, ' ', '.', '.', '.', '.', '.', '.', '.', '.', 10],
    [10, '.', 9, 1, 1, 1, 1, 1, 3, '.', 10],
    [10, '.', 8, 0, 0, 0, 0, 0, 2, '.', 10],
    [10, '.', 12, 4, 4, 4, 4, 4, 6, '.', 10],
    [10, '.', '.', '.', '.', '.', '.', '.', '.', '.', 10],
    [10, '.', 13, 7, '.', 15, '.', 13, 7, '.', 10],
    [10, '.', '.', '.', '.', '.', '.', '.', '.', '.', 10],
    [12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6]
  ],
  [
    [9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
    [10, ' ', '.', '.', 'p', '.', '.', '.', '.', '.', 10],
    [10, '.', 9, 1, 1, 1, 1, 1, 3, '.', 10],
    [10, '.', 8, 0, 0, 0, 0, 0, 2, '.', 10],
    [10, 'p', 12, 4, 4, 4, 4, 4, 6, '.', 10],
    [10, '.', '.', '.', '.', '.', '.', '.', '.', '.', 10],
    [12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6]
  ],
  [
    [9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
    [10, ' ', '.', '.', '.', '.', '.', '.', '.', '.', 10],
    [10, '.', 9, 1, 1, 1, 1, 1, 3, '.', 10],
    [10, '.', 8, 0, 0, 0, 0, 0, 2, '.', 10],
    [10, '.', 12, 4, 4, 4, 4, 4, 6, '.', 10],
    [10, '.', '.', '.', '.', '.', '.', '.', '.', '.', 10],
    [12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6]
  ],
  [
    [9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
    [10, ' ', '.', '.', '.', '.', '.', '.', '.', 'p', 10],
    [10, '.', 9, 1, 1, 1, 1, 1, 3, '.', 10],
    [10, '.', 8, 0, 0, 0, 0, 0, 2, '.', 10],
    [10, '.', 12, 4, 4, 4, 4, 4, 6, '.', 10],
    [10, '.', '.', '.', '.', '.', '.', '.', '.', '.', 10],
    [10, '.', 15, '.', 13, 1, 7, '.', 15, '.', 10],
    [10, '.', '.', '.', '.', 14, '.', '.', '.', '.', 10],
    [10, '.', 13, 7, '.', '.', '.', 13, 7, '.', 10],
    [10, '.', '.', '.', '.', 11, '.', '.', '.', '.', 10],
    [10, '.', 15, '.', 13, 4, 7, '.', 15, '.', 10],
    [10, 'p', '.', '.', '.', '.', '.', '.', '.', 'p', 10],
    [12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6]
  ],
  [
    [9, 5, 5, 5, 5, 5, 5, 5, 5, 5, 3],
    [10, ' ', '.', '.', '.', '.', '.', '.', '.', 'p', 10],
    [10, '.', 15, '.', 13, 1, 7, '.', 15, '.', 10],
    [10, '.', '.', '.', '.', 14, '.', '.', '.', '.', 10],
    [10, '.', 13, 7, '.', '.', '.', 13, 7, '.', 10],
    [10, '.', '.', '.', '.', 11, '.', '.', '.', '.', 10],
    [10, '.', 15, '.', 13, 0, 7, '.', 15, '.', 10],
    [10, '.', '.', '.', '.', 14, '.', '.', '.', '.', 10],
    [10, '.', 13, 7, '.', '.', '.', 13, 7, '.', 10],
    [10, '.', '.', '.', '.', 11, '.', '.', '.', '.', 10],
    [10, '.', 15, '.', 13, 4, 7, '.', 15, '.', 10],
    [10, 'p', '.', '.', '.', '.', '.', '.', '.', 'p', 10],
    [12, 5, 5, 5, 5, 5, 5, 5, 5, 5, 6]
  ]
]
  
function createMap(mapId){
  map[mapId].forEach((row, i) => {
    row.forEach((symbol, j) => {
      if(symbol === '.'){
        pellets.push(
          new Pellet({
            position: {
              x: j * dimension + dimension / 2,
              y: i * dimension + dimension / 2
            }
          })
        )
      }
      if(symbol === 'p'){
        powerUps.push(
          new PowerUp({
            position: {
              x: j * dimension + dimension / 2,
              y: i * dimension + dimension / 2
            }
          })
        )
      }
      if(Number.isInteger(symbol)){
        let sides = []
        if(symbol >= 8){
          sides.push("L")
          symbol -= 8
        }
        if(symbol >= 4){
          sides.push("B")
          symbol -= 4
        }
        if(symbol >= 2){
          sides.push('R')
          symbol -= 2
        }
        if(symbol >= 1){
          sides.push("T")
          symbol -= 1
        }
        boundaries.push(
          new Boundary({
            position: {
              x: dimension * j,
              y: dimension * i
            },
            dimension: dimension,
            sides: sides
          })
        )
      }
    })
  })
}