// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;


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
  character: 'Bashfull',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};

var ghosts = [inky, blinky, pinky, clyde]

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

function displayStats () {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('\n\nPower-Pellets: '+powerPellets);
}

function displayMenu () {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  if (powerPellets > 0) {
    console.log('(p) Power-Pellet');
  }
  // use a for each loop to iterate through the array and dipslay the contents for all
  ghosts.forEach(function (ghost) {
    if (ghost.edible === true) {
      edibility = '(edible)'
    } else {
      edibility = '(inedible)'
    }
    console.log('(' + ghost.menu_option + ') Eat ' + ghost.name + ' ' + edibility);
  });

  console.log('(q) Quit');
}

function displayPrompt () {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {
  if (ghost.edible === false) {
    console.log('\nYou were rekt by ' + ghost.name + ' Colour: '+ ghost.colour);
    lives--;
  } else {
    console.log('\nPacman eats ' + ghost.name + ' who is ' + ghost.character);
    score += 200
    ghost.edible = false
  }
  dead();
}

function dead () {
  if (lives < 0) {
    process.exit();
  }
}

function eatPowerPellet() {
  ghosts.forEach(function(ghost){
    ghost.edible = true
  });
  score += 50;
  powerPellets--
}

// Process Player's Input
function processInput (key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerPellets > 0) {
        eatPowerPellet();
      } else {
        console.log('\nNo Power Pellets left!');
      }
      break;
    case '1':
    case '2':
    case '3':
    case '4':
      eatGhost(ghosts.find((ghost) => ghost.menu_option === key));
      // eat the ghost, by finding the ghost in the array where the key(user input) matches the menu_item, consider case 1-4 for the key value
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
  console.log('\n\nGame Over!\n');
});
