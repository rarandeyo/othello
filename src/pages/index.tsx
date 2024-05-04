import { useEffect, useState } from 'react';
import { Line } from '../components/line';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 3, 0, 0, 0],
    [0, 0, 0, 1, 2, 3, 0, 0],
    [0, 0, 3, 2, 1, 0, 0, 0],
    [0, 0, 0, 3, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
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

  const isInBounds = (i: number, j: number, board: number[][]) => {
    return i >= 0 && i < board.length && j >= 0 && j < board.length;
  };

  const canPlaceStone = (x: number, y: number, color: number): boolean => {
    if (board[y][x] !== 0) {
      return false;
    }

    return directions.some(({ dx, dy }) => {
      let i = y + dy;
      let j = x + dx;
      if (!isInBounds(i, j, board) || board[i][j] !== 3 - color) {
        return false;
      }

      while (isInBounds(i, j, board) && board[i][j] === 3 - color) {
        i += dy;
        j += dx;
      }

      return isInBounds(i, j, board) && board[i][j] === color;
    });
  };

  const updatePlaceableStones = (color: number) => {
    const newBoard = board.map((row, y) =>
      row.map((cell, x) => (canPlaceStone(x, y, color) ? 3 : cell))
    );
    console.table(newBoard);
    setBoard(newBoard);
  };
  useEffect(() => {
    updatePlaceableStones(turnColor);

    // eslint-disable-next-line
  }, [turnColor]);

  const clickLine = (x: number, y: number) => {
    if (board[y][x] !== 3) {
      return;
    }
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    newBoard[y][x] = turnColor;

    directions.forEach(({ dx, dy }) => {
      let i = y + dy;
      let j = x + dx;
      const flipStones: number[][] = [];

      while (isInBounds(i, j, newBoard) && newBoard[i][j] === 3 - turnColor) {
        flipStones.push([i, j]);
        i += dy;
        j += dx;
      }

      if (isInBounds(i, j, newBoard) && newBoard[i][j] === turnColor) {
        flipStones.forEach(([i, j]) => {
          newBoard[i][j] = turnColor;
        });
      }
    });
    newBoard.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 3) {
          newBoard[y][x] = 0;
        }
      });
    });

    setBoard(newBoard);
    setTurnColor(3 - turnColor);
  };

  return (
    <div className={styles.container}>
      <div className={styles.square}>
        {board.map((raw, y) =>
          raw.map((color, x) => (
            <Line key={`${x}-${y}`} x={x} y={y} color={color} onClick={() => clickLine(x, y)} />
          ))
        )}
      </div>
      <div>{{ 1: '黒', 2: '白' }[turnColor]}の番です</div>
      <div>
        黒{countStone(1)} 白{countStone(2)}
      </div>
    </div>
  );
};
export default Home;
