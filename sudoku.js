const TEST_SUDOKU = [3,5,8,6,9,1,2,7,4,2,1,9,8,7,4,5,6,3,4,6,7,3,5,2,8,9,1,9,8,2,1,6,3,7,4,5,1,4,6,5,8,7,9,3,2,7,3,5,4,2,9,6,1,8,5,7,1,2,3,6,4,8,9,6,2,3,9,4,8,1,5,7,8,9,4,7,1,5,3,2,6]

class Sudoku{
  constructor(board){
    this.board = board
    this.format = []
    this.format = this.convert2D(board)
  }
  convert2D(){
    for (let i = 0; i < this.board.length;i+=9){
      this.format.push(this.board.slice(i,i+9))
    }
    return this.format
  }
  getCell(row,col){
    return this.format[row][col]
  }
  setCell(row,col,num){
    this.format[row][col] = num
  }
  checkRow(number,row){
    return this.format[row].includes(number)
  }
  checkCol(number,col){
    for (let i=0;i<9;i++){
      if(this.format[i][col] === number) return true
    }
    return false
  }
  checkBox(number,box){
    for(let r=0;r<9;r++){
      for(let c=0;c<9;c++){
        this.format[r][c]
        if (this.getBox(r,c) === box){
          if(this.format[r][c] === number) return true
        }
      }
    }
    return false
  }
  getBox(row,col){
    return Math.floor((row / 3)) * 3 + Math.floor(col / 3)
  }
  isValid(){
    let numbers = [1,2,3,4,5,6,7,8,9]
    let valid = true
    numbers.forEach(num => {
      for (let i = 0; i < 9; i++){
        if (!this.checkRow(num, i)){
          console.log("Row Error: " + num + " in row " + i)
          valid = false
        }
        if (!this.checkCol(num, i)){
          console.log("Column Error: " + num + " in column " + i)
          valid = false
        }
        if (!this.checkBox(num, i)){
          console.log("Box Error: " + num + " in box " + i)
          valid = false
        }
      }
    })
    return valid
  }
}

sudoku = new Sudoku(TEST_SUDOKU)

sudoku.isValid()

createBoard()
function createBoard(){
  let id = 0;
  for(let row = 0; row < 9;row++){
    for(let col=0; col < 9; col++){
      cell = document.createElement('div')
      // input = document.createElement('input')
      // input.value = sudoku.getCell(row,col)
      cell.classList.add('cell','row-'+row,'col-'+col)
      cell.id=id
      cell.innerHTML = sudoku.getCell(row,col)
      // cell.appendChild(input)
      document.getElementsByClassName('board')[0].appendChild(cell)
      id++
    }
  }
}
let previousTarget = null
let selected = false

window.addEventListener('click',ev=>{
  if(previousTarget) {
    previousTarget.style.backgroundColor="beige"
    selected=false;
  }

  if(ev.target.classList[0] === "cell"){
    if(previousTarget) previousTarget.style.backgroundColor="beige"
    ev.target.style.backgroundColor = "aqua"
    previousTarget = ev.target
    selected = true;
  }
})
window.addEventListener('keydown',ev=>{
  // console.log(ev)
  if(selected){
    previousTarget.innerHTML = ev.key
    row = previousTarget.classList[1].split('row-')[1]
    col = previousTarget.classList[2].split('col-')[1]
    console.log(sudoku.getCell(row,col))
  }
})
