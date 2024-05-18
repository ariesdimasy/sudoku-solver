function checkArea(board, coor, value) {
  return true;
}

function checkColumn(board, coor, value) {
  for (let i = 0; i < board.length; i++) {
    if (value == board[i][coor[1]] && i != coor[0]) {
      return false;
    }
  }
  return true;
}

function checkRow(board, coor, value) {
  for (let i = 0; i < board.length; i++) {
    if (value == board[coor[0]][i] && i != coor[1]) {
      return false;
    }
  }
  return true;
}

function checkBoard(board, coor, value) {
  if (
    checkColumn(board, coor, value) &&
    checkRow(board, coor, value) &&
    checkArea(board, coor, value)
  ) {
    return true;
  }
  return false;
}

function boardIntoStack(board) {
  let stacks = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] == " ") {
        stacks.push({ coor: [i, j], val: 0 });
      }
    }
  }

  return stacks;
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildBoard(str) {
  let result = [];
  let arr = str.split("");
  let counter = 0;
  for (let i = 0; i < 9; i++) {
    let row = [];
    for (let j = 0; j < 9; j++) {
      if (Number(arr[counter])) {
        row.push(Number(arr[counter]));
      } else {
        row.push(" ");
      }

      counter++;
    }
    result.push(row);
  }
  return result;
}

async function main(str) {
  let board = buildBoard(str);
  console.table(board);
  let stackItems = boardIntoStack(board);
  let counter = 0;

  while (counter <= stackItems.length - 1) {
    console.clear();

    let row = stackItems[counter].coor[0];
    let col = stackItems[counter].coor[1];
    let limit = 9;
    //console.table(board);
    if (stackItems[counter].val == 9) {
      stackItems[counter].val = 0;
    } else {
      stackItems[counter].val += 1;
    }
    while (stackItems[counter].val <= limit) {
      await timeout(200);

      board[row][col] = stackItems[counter].val;
      if (checkBoard(board, [row, col], stackItems[counter].val)) {
        break;
      }
      if (
        stackItems[counter].val == limit &&
        !checkBoard(board, [row, col], stackItems[counter].val)
      ) {
        stackItems[counter].val = 0;
        board[row][col] = stackItems[counter].val;

        counter -= 2;
        break;
      }

      console.clear();
      console.table(board);
      console.log(stackItems[counter]);
      stackItems[counter].val += 1;
    }

    counter++;
  }
}

// console.log(checkBoard(board, [0, 1], 4));
// console.log(checkBoard(board, [0, 1], 3));

// console.log(boardIntoStack(board));

main(
  "1....7.9..3..2...8..96..5....53..9...1..8...26....4...3......1..4......7..7...3.."
);
