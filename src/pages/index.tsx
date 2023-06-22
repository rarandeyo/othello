import { Line } from '../components/line';
import { useGame } from '../hooks/useGame';
import styles from './index.module.css';

const Home = () => {
  const { board, clickLine, turnColor, count_stone } = useGame();
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
