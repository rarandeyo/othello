import { useState } from 'react';
import { Line } from '../components/line';
import styles from './index.module.css';

const Home = () => {
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
  const count_stone = (color: number) => {
    let counter = 0;
    for (const raw of board) {
      for (const cell of raw) {
        if (color === cell) {
          counter++;
        }
      }
    }
    return counter;
  };

  const clickLine = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
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

    for (const { dx, dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (newBoard[ny] !== undefined && newBoard[ny][nx] !== 0 && newBoard[ny][nx] !== turnColor) {
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
    }

    setboard(newBoard);
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
      <div>{turnColor === 1 ? '黒のターン' : '白のターン'}</div>
      <div>
        黒{count_stone(1)} 白{count_stone(2)}
      </div>
    </div>
  );
};
export default Home;
//saaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
