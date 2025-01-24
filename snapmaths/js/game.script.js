const selectors = {
    board: document.querySelector('main'),
    moves: document.querySelector('#moves'),
    mins: document.querySelector('#mins'),
    secs: document.querySelector('#secs'),
    notice: document.querySelector('#notice'),
    restart: document.querySelector('#restart')
};

const state = {
    gameStarted: false,
    widthCards: 4,
    heightCards: 3,
    minCards: 10,
    maxCards: 100,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null,
};

const randomIntExcl = (min, max, excl) => {
    if (!Array.isArray(excl)) {
        excl = [excl];
    }
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    } while (excl.includes(randomNumber));
    return randomNumber;
};

const createSum = (int) => {
    const int1 = randomIntExcl(1, int - 1);
    const int2 = int - int1;
    return `${int1} + ${int2}`;
};

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const pickRandom = (dimensions) => {
    const min = state.minCards
    const max = state.maxCards
    const totalsList = [];
    const randomPicks = [];
    for (let index = 0; index < dimensions / 2; index++) {
        const randomIndex = randomIntExcl(min, max, totalsList);
        totalsList.push(randomIndex);
        randomPicks.push({ val: randomIndex, sum: createSum(randomIndex) });
        randomPicks.push({ val: randomIndex, sum: createSum(randomIndex) });
    }
    return randomPicks;
};

const generateGame = () => {
    let dimensions = state.widthCards * state.heightCards
    const items = shuffle(pickRandom(dimensions));
    for (let i = 0; i < dimensions; i++) {
        let cardFront = document.createElement('div')
            cardFront.classList.add('card-front')
        let pFront = document.createElement('p')
            pFront.innerHTML = i + 1
        cardFront.appendChild(pFront)
        let card = document.createElement('div')
            card.classList.add('card')
            card.dataset.val = items[i].val
        let cardBack = document.createElement('div')
            cardBack.classList.add('card-back')
        let pBack = document.createElement('p')
            pBack.innerHTML = items[i].sum
        cardBack.appendChild(pBack)
        card.appendChild(cardBack)
        card.appendChild(cardFront)
        selectors.board.appendChild(card)
    }
};

const startGame = () => {
    state.gameStarted = true;
    state.loop = setInterval(() => {
        state.totalTime++;
        let moves = state.totalFlips
        if(moves < 10) moves = "0" + moves
        selectors.moves.innerText = moves;
        let mins = Math.floor(state.totalTime/60)
        if(mins < 10) mins = "0" + mins
        let secs = state.totalTime % 60
        if(secs < 10) secs = "0" + secs
        selectors.mins.innerText = mins;
        selectors.secs.innerText = secs;
    }, 1000);
};

const flipBackCards = () => {
    document.querySelectorAll('.card:not(.matched)').forEach((card) => {
        card.classList.remove('flipped');
    });
    state.flippedCards = 0;
};

const flipCard = (card) => {
    state.flippedCards++;
    state.totalFlips++;
    if (!state.gameStarted) {
        startGame();
    }
    if (state.flippedCards <= 2) {
        card.classList.add('flipped');
    }
    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');
        if (flippedCards[0].dataset.val === flippedCards[1].dataset.val) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
        }
        setTimeout(() => {
            flipBackCards();
        }, 1000);
    }
    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.notice.innerHTML = "Game Over";
            clearInterval(state.loop);
        }, 1000);
    }
};

const attachEventListeners = () => {
    document.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (card && !card.classList.contains('flipped')) {
            flipCard(card);
        }
    });
};

generateGame();
attachEventListeners();
