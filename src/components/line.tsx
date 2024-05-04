import styles from './line.module.css';
export const Line = (props: { x: number; y: number; color: number; onClick: () => void }) => {
  const colorMap: Record<number, { colorCode: string; size: string }> = {
    1: { colorCode: '#000', size: '70px' },
    2: { colorCode: '#fff', size: '70px' },
    3: { colorCode: '#19c1b9', size: '20px' },
  };
  return (
    <div className={styles.line} onClick={props.onClick}>
      {colorMap[props.color] && (
        <div
          className={styles.stone}
          style={{
            background: colorMap[props.color].colorCode,
            width: colorMap[props.color].size,
            height: colorMap[props.color].size,
          }}
        />
      )}
    </div>
  );
};
