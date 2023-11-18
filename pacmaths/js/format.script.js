const mainContainer = document.querySelector('#main')
const displayBox = document.querySelector('#display-box')
const noticeBox = document.querySelector('#notice-box')
const questionBox = document.querySelector('#question-box')
const canvas = document.querySelector('canvas')
let dimension

function respondCanvas() {
    canvas.height = mainContainer.offsetHeight
    canvas.width = Math.floor((mainContainer.offsetHeight) * (11/13))
    dimension = Math.floor(canvas.height / 13)
    displayBox.style.marginTop = 120 + dimension * 2 + "px"
    questionBox.style.marginTop = 120 + "px"
    noticeBox.style.marginTop = 120 + "px"
}

window.addEventListener('resize', respondCanvas)

respondCanvas()