import { useState } from 'react';
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
  ])
  const clickLine = (x: number, y: number) => {
    console.log(x, y);
    const newborad: number[][] = JSON.parse(JSON.stringify(board));
    if (board[y + 1] !== undefined && board[y + 1][x] !== 0 && board[y + 1][x] !== turnColor) {
      for (let i = y + 1; i < board.length; i++) {
        if (board[i][x] === turnColor) {
          newborad[y][x] = turnColor;
          for (let j = y + 1; j < i; j++) {
            newborad[j][x] = turnColor;
          }
          setTurncolor(3 - turnColor);
        }
      }
    }
    if (board[y - 1] !== undefined && board[y - 1][x] !== 0 && board[y - 1][x] !== turnColor) {
      for (let i = y - 1; i < board.length && i >= 0; i = i - 1) {
        if (board[i][x] === turnColor) {
          newborad[y][x] = turnColor;
          for (let j = y - 1; j > i; j = j - 1) {
            newborad[j][x] = turnColor;
          }
          setTurncolor(3 - turnColor);
        }
      }
    }
    if (board[y][x - 1] !== undefined && board[y][x - 1] !== 0 && board[y][x - 1] !== turnColor) {
      for (let i = x - 1; i >= 0; i = i - 1) {
        if (board[y][i] === turnColor) {
          newborad[y][x] = turnColor;
          for (let j = x - 1; j > i; j = j - 1) {
            newborad[y][j] = turnColor;
          }
          setTurncolor(3 - turnColor);
        }
      }
    }
    if (board[y][x + 1] !== undefined && board[y][x + 1] !== 0 && board[y][x + 1] !== turnColor) {
      for (let i = x + 1; i < board.length; i++) {
        if (board[y][i] === turnColor) {
          newborad[y][x] = turnColor;
          for (let j = x + 1; j < i; j++) {
            newborad[y][j] = turnColor;
          }
          setTurncolor(3 - turnColor);
        }
      }
    }

    setboard(newborad);
  };

  return (
    <div className={styles.container}>
      <div className={styles.square}>
        {board.map((raw, y) =>
          raw.map((color, x) => (
            <div className={styles.line} key={`${x}-${y}`} onClick={() => clickLine(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? '#000' : '#fff' }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default Home;
