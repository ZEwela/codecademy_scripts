const prompt = require('prompt-sync')({sigint: true});

// kind of icons 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor (field) {
    this._field = field;
    this._Xposition = 0;
    this._Yposition = 0;

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
  // inserting
    for (let i = 0; i< rows; i++) {
        for(let j = 0; j< columns; j++) {
            arr[i][j] = fieldCharacter;
        }
    }

  const randomize = (number) => {
    return Math.floor(Math.random() * number)
  }

pat = 1
hats = 1
hole = 4

arr = []

def asssign_icon(type)
  x, y = randomize(5,5)
  
  if arr[x][y] != undefined
    arr[x][y] = type 
  else
    assign_icon(type)
  end 
end 

assingn_icon(pat)



2x3

coords_list = [0,0],[0,1],[1,0],[1,1],[2,0],[2,1]


  // add 4 random holes
// char = kind of icon element in a matrix
// number = how many characters you want to make 
  const charMake = (char) => {
          return if coords_list.empty?
    // let CharToCheck = arr[randomize(rows)][randomize(columns)]
      let ranomized_coords = ...[[2,4],[1,0]...]
      x,y  = ranomized_coords.pop
      arr[x, y] = char

      // if (CharToCheck !== undefined) {
      //   charToCheck = char;
      // } else {
      //   charMake(char, number)
      // }

const charsMake = (char, number) => {
    for ( let i = number; i > 0; i-- ) {
      charMake(char)    
    }
  }

  charsMake(hole, 5);
  charsMake(hat, 1);
  charsMake(pathCharacter, 1);
 
     const linearSearch = (arr, target) => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j] == target) {
                    return [i, j];
                }
            }
        }
        return [-1, -1];
    }

    let startChar =  linearSearch(arr, pathCharacter);
    let hatChar = linearSearch(arr, hat);
    console.log('aaaa', startChar, hatChar);
    if (startChar === [-1, -1] ) {
      let avoid = hatChar;
      charMake()
    }
    return arr;
  }
}


console.log(Field.generateField(3,5));


const myField = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);


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


const checkMove = (data) => {
  let direction = data.toString().toUpperCase().trim();
  newDirection(direction)
}


process.stdin.on('data', checkMove)










