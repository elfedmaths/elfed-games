// Mastermind Game in JavaScript

// Function to generate a random secret code
function generateSecretCode() {
    const colors = ['R', 'G', 'B', 'Y']; // You can add more colors if desired
    let secretCode = '';
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * colors.length);
      secretCode += colors[randomIndex];
    }
    return secretCode;
  }
  
  // Function to compare the guess with the secret code
  function evaluateGuess(secretCode, guess) {
    let exactMatches = 0;
    let partialMatches = 0;
  
    for (let i = 0; i < secretCode.length; i++) {
      if (guess[i] === secretCode[i]) {
        exactMatches++;
      } else if (secretCode.includes(guess[i])) {
        partialMatches++;
      }
    }
  
    return { exactMatches, partialMatches };
  }
  
  // Function to play the Mastermind game
  function playMastermind() {
    const secretCode = generateSecretCode();
    let attempts = 0;
  
    console.log('Welcome to Mastermind! Try to guess the 4-color secret code.');
  
    while (attempts < 10) {
      const guess = prompt('Enter your guess (e.g., RGBY):').toUpperCase();
  
      if (guess.length !== 4 || !/^[RGBY]+$/.test(guess)) {
        console.log('Invalid input. Please enter a 4-color code using the letters R, G, B, Y.');
        continue;
      }
  
      const result = evaluateGuess(secretCode, guess);
  
      console.log(`Result: ${result.exactMatches} exact matches, ${result.partialMatches} partial matches.`);
  
      if (result.exactMatches === 4) {
        console.log(`Congratulations! You guessed the secret code ${secretCode} in ${attempts + 1} attempts.`);
        return;
      }
  
      attempts++;
    }
  
    console.log(`Sorry, you've run out of attempts. The secret code was ${secretCode}.`);
  }
  
  // Start the game
  //playMastermind();
  