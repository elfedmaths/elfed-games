const mainContainer = document.querySelector('#main')
const scoreEl = document.querySelector('#score-elem')
const levelEl = document.querySelector('#level-elem')
const displayCont = document.querySelector('#display-container')
const displayEl = document.querySelector('#display-box')
const questEl = document.querySelector('#question-box')
const ansEl = document.querySelector('#answer-input')
const upEl = document.querySelector('#up')
const rightEl = document.querySelector('#right')
const downEl = document.querySelector('#down')
const leftEl = document.querySelector('#left')
const submitBtn = document.querySelector('#submit')
const noticeEl = document.querySelector('#notice-box')
const livesEl = document.querySelectorAll('.lives-elem')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 440
canvas.height = 520

const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2,
    },
    velocity: {
        x: 0,
        y: 0,
    }
})

const keys = {
    up: { pressed: false },
    left: { pressed: false },
    down: { pressed: false },
    right: { pressed: false }
}

let display = new Display({
    display: false,
    text: {
        h1: 'Heading',
        p: `Lorem ipsum dolor sit amet,<br>
            consectetur adipiscing elit,<br>
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
        q: '1 + 1 = 3'
    }
})

let pellets = []
let powerUps = []
let boundaries = []
let ghosts = []

let animationId
let gameOver = false
let paused = false
let numpad = false
let lastKey = ''
let score = 0
let level = 0
let lives = 0
let ghostCount = 0
let scaredTimeout
let answer
let index
let questType