// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 5;
var dots = 240;
var ghostsEaten = 0;
var level = 1;
var fruit = 'Cherry';
var scores = [['RIC',1000]];
var highScore = highscore();

function highscore() {
  var top_score = 0
  var top_player = "PAC"
  scores.forEach(function(score) {
    if (score[1] > top_score) {
      top_player = score[0];
      top_score = score[1];
    }
  })
  console.log('Highscore:' + '\n' + 'Player: ' + top_player + ' Score: ' + top_score)
  }

// Define your ghosts here

var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde];


// Set up a fruits objects

var fruits = {
  Cherry: 100,
  Strawberry: 300,
  Orange: 500,
  Apple: 700,
  Pineapple: 1000,
  'Galaxian Spaceship': 2000,
  Bell: 3000,
  Key: 5000
};

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '   Powerpellets: ' + powerPellets + '    Dots: ' + dots);
  highscore();
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (dots > 9) {
    console.log('(w) Eat 10 Dots');
  }
  if (dots > 99) {
    console.log('(e) Eat 100 Dots');
  }
  console.log('(p) Eat Powerpellet');
  if (dots < (Math.random()*240)) {
    console.log('(f) Eat ' + fruit);
  }
  ghosts.forEach(function(ghost) {
    if (ghost['edible'] === true) {
    var edible = ' (edible)';
    }
    else {
    var edible = ' (inedible)';
    }
    console.log('(' + ghost['menu_option'] + ') Eat ' + ghost['name'] + edible);
  })
  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  if (dots < 1) {
    console.log('Pac-Man is out of dots!')
  }
  else {
  console.log('\nChomp!');
  score += 10;
  dots--;
}
}

function eatGhost(ghost) {
  if (ghost['edible'] === false) {
    lives--
    console.log('\n'+ ghost['name'] + ', the ' + ghost['colour'] + ' ghost, has killed Pac-Man.');
    }
  else {
    score += (Math.pow(2,ghostsEaten + 1) * 100)
    console.log('\nPac-Man has eaten ' + ghost['name'] + ', the ' + ghost['character'] + '. Yummy!');
    ghost['edible'] = false;
    ghostsEaten++
    }
}

function livesCheck() {
  if (lives < 1) {
    console.log('Boo hoo. Pac-Man is out of lives!')
    process.exit();
  }
}

function eatPowerPellet() {
  var edibleGhosts = false
  ghosts.forEach(function(ghost) {
      if (ghost['edible'] === true) {
        edibleGhosts = true;
      }
  })
  if (powerPellets < 1) {
    console.log('Pac-Man does not have any power pellets to eat.')
  }
  else if (powerPellets > 0 && edibleGhosts === false ) {
    score += 50
    ghosts.forEach(function(ghost) {
      ghost['edible'] = true;
    })
    powerPellets--
  }
  else {
    console.log('There are still edible ghosts out there for Pac-Man to eat!')
  }

  setTimeout(function() { ghosts.forEach(function(ghost) { ghost['edible'] = false; })}, 10000)
  }

function eatFruit() {
  if (fruit === undefined) {
    console.log('Pac-Man has already eaten his fruit');
  }
  else {
    console.log('Pac-Man eats the ' + fruit);
    score += fruits[fruit];
    fruit = undefined;
  }
}

function eat10Dots() {
  for (var i = 1; i < 11; i++) {
    eatDot();
  }
}

function eat100Dots() {
  for (var i = 1; i < 101; i++) {
    eatDot();
  }
}

function levelUp() {
  if (dots === 0 && powerPellets === 0) {
    level++;
    dots = 240;
    powerPellets = 4;
    switch (level) {
      case 1:
        fruit = 'Cherry';
        break;
      case 2:
        fruit = 'Strawberry';
        break;
      case 3:
      case 4:
        fruit = 'Orange';
        break;
      case 5:
      case 6:
        fruit = 'Apple';
        break;
      case 7:
      case 8:
        fruit = 'Pineapple';
        break;
      case 9:
      case 10:
        fruit = 'Galaxian Spaceship';
        break;
      case 11:
      case 12:
        fruit = 'Bell';
        break;
      default:
        fruit = 'Key';
        break;
      }
    }
  }


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'f':
      eatFruit();
      break;
    case 'd':
      eatDot();
      levelUp();
      break;
    case 'w':
      eat10Dots();
      levelUp();
      break;
    case 'e':
      eat100Dots();
      levelUp();
      break;
    case 'p':
      eatPowerPellet();
      levelUp();
      break;
    case '1':
      eatGhost(ghosts[0]);
      livesCheck();
      break;
    case '2':
      eatGhost(ghosts[1]);
      livesCheck();
      break;
    case '3':
      eatGhost(ghosts[2]);
      livesCheck();
      break;
    case '4':
      eatGhost(ghosts[3]);
      livesCheck();
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  // var initials = process.stdin
  // ('What are your gamer initials?')
  // console.log('Congratulations ' + initials + ' you have scored ' + score + ' points!' )
  // if (highScore < score) {
  //   console.log('That is a new high score!')
  //   highScore = score
  // }
  console.log('\n\nGame Over!\n');
});
