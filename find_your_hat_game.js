const prompt = require('prompt-sync')({sigint: true});

// kinds of icons 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor (rows, columns) {
    this._field = Field.generateField(rows, columns);
    this._Xposition = Field.startXPosition;
    this._Yposition = Field.startYPosition;

  }
  print(){
    this._field.forEach((row) => {
      console.log(row.join(''));
    })
  }
  
  currentPosition() {
    let arr = [];
    let currentPosition = arr.concat(this._Xposition, this._Yposition);
    return currentPosition;
  }
  up () {
    this._Yposition -= 1;
  }
  down () {
    this._Yposition += 1;
  }
  left () {
    this._Xposition -= 1;
  }
  right () {
    this._Xposition += 1;
  }
  checkThisFieldAndMove(x, y) {    
    if (this._field[y][x] === fieldCharacter) {
      this._field[y][x] = pathCharacter;
    } else if (this._field[y][x] === hole) {
      console.log('Sorry, you fell down a hole');
      return process.exit();
    } else if (this._field[y][x] === hat) {
      console.log('Congrats, you found your hat');
      return process.exit();
    } 
  }
  static generateField(rows, columns) {
    let arr = [];
// creating 
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        arr[i] = [];
      }
    }
  // inserting fieldCharacters
    for (let i = 0; i< rows; i++) {
        for(let j = 0; j< columns; j++) {
            arr[i][j] = fieldCharacter;
        }
    }

  // flatten array
  let flatArray = [].concat(...arr);



  //  add icon characters to flatten array of fieldCharacters
  // char = kind of icon element in a matrix
  // number = how many characters you want to make 
  let indexWatch = 0;
  const charMake = (char) => {
      flatArray[indexWatch] = char;
      indexWatch += 1;
  }
  const charsMake = (char, number) => {
    for ( let i = number; i > 0; i-- ) {
      charMake(char)    
    }
  }

  charsMake(hole, 5);
  charsMake(hat, 1);
  charsMake(pathCharacter, 1);


// Shuffle Flatten Array
const shuffle = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

const shuffledFlattenArray = shuffle(flatArray);



// Back to 2D Array  and set start point in constructor
const chunk = (arr, rows) => {
    let subArrayCount = arr.length / rows;
    let result = [];
    let xPosition = null;
    let yPosition = 0;
    for (let i = rows; i > 0; i--) {
        let remove = subArrayCount;
        let spliced = arr.splice(0, remove);

// Look for start point, and set it in constructor
        if (xPosition === null ) {
          let xPositionCheck = spliced.findIndex(element => element === pathCharacter)
          if (xPositionCheck !== -1) {
            xPosition = xPositionCheck;
            Field.setStartPosition(xPosition, yPosition);
          }
        }

        result.push(spliced);
        yPosition ++;
    }
    return result;
}

const twoDArray = chunk(shuffledFlattenArray, rows);

return twoDArray;
}
static setStartPosition (x,y) {
    Field.startXPosition = x;
    Field.startYPosition = y; 
}
}

const myField = new Field(5,5);
myField.print();

const move = () => {
  let position = myField.currentPosition(); 
  myField.checkThisFieldAndMove(position[0], position[1]);
  myField.print();
}

const newDirection = (direction) => {

  // array [0,0]
  if (direction === 'S') {
    myField.down();
  } else if (direction === 'N') {
    myField.up();
  } else if (direction === 'W') {
    myField.left();
  } else if (direction === 'E') {
    myField.right();
  }
  let position = myField.currentPosition();
  if (position[0] === 3 || position[1] === 3 || position[0] === -1 || position[1] === -1 ) {
    console.log('Ouuups, you are out of the game field!')
    return process.exit();
  } 
  move();
}



process.stdout.write('Get to the hat (^), you start from (*). Be careful there are holes (O) of doom.\nNow, choose wisely:\nS = south,\nN = north,\nW = west,\nE = east\nWhich way? \n')

console.log('aaaaa', myField.currentPosition());
const checkMove = (data) => {
  let direction = data.toString().toUpperCase().trim();
  newDirection(direction)
}


process.stdin.on('data', checkMove)










