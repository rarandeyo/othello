import { Line } from '../components/line';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { board, clickLine, turnColor, countStone } = useGame();
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
        黒{countStone(1)} 白{countStone(2)}
      </div>
    </div>
  );
};
export default Home;
