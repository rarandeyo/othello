import { useState } from 'react';

export const useGame = () => {
  const [turnColor, setTurncolor] = useState(1);
  // prettier-ignore
  const[board,setboard]=useState([
    [0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,],
    [0,0,0,1,2,0,0,0,],
    [0,0,0,2,1,0,0,0,],
    [0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,],
  ]);
  const directions = [
    { dx: 0, dy: -1 }, // 上
    { dx: 0, dy: 1 }, // 下
    { dx: -1, dy: 0 }, // 左
    { dx: 1, dy: 0 }, // 右
    { dx: -1, dy: -1 }, // 左上
    { dx: 1, dy: -1 }, // 右上
    { dx: -1, dy: 1 }, // 左下
    { dx: 1, dy: 1 }, // 右下
  ];
  const countStone = (color: number) => {
    return board.flat().filter((cell) => cell === color).length;
  };
  const checkCanPut = (x: number, y: number) => {
    if (board[y][x] !== 0) {
      return false;
    }

    let canPut = false;

    directions.forEach(({ dx, dy }) => {
      let i = y + dy;
      let j = x + dx;

      if (
        i >= 0 &&
        i < board.length &&
        j >= 0 &&
        j < board.length &&
        board[i][j] === 3 - turnColor
      ) {
        i += dy;
        j += dx;

        while (i >= 0 && i < board.length && j >= 0 && j < board.length) {
          if (board[i][j] === 0) {
            break;
          }
          if (board[i][j] === turnColor) {
            canPut = true;
            break;
          }
          i += dy;
          j += dx;
        }
      }
    });

    return canPut;
  };

  const clickLine = (x: number, y: number) => {
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    const canPut = checkCanPut(x, y);
    console.log(canPut);
    if (!canPut) return;
    for (const { dx, dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;

      let i = ny;
      let j = nx;

      while (
        i >= 0 &&
        i < board.length &&
        j >= 0 &&
        j < board.length &&
        board[i][j] !== turnColor
      ) {
        i += dy;
        j += dx;
      }

      if (i >= 0 && i < board.length && j >= 0 && j < board.length && board[i][j] === turnColor) {
        for (
          let k = y, l = x;
          (dy > 0 ? k <= i : k >= i) && (dx > 0 ? l <= j : l >= j);
          k += dy, l += dx
        ) {
          newBoard[k][l] = turnColor;
        }
        setTurncolor(3 - turnColor);
      }
    }

    setboard(newBoard);
  };
  return { board, turnColor, countStone, clickLine };
};
