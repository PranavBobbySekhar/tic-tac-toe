import { ComponentProps } from "react";

const Button = ({ ...props }: ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className="w-full h-full border-2 border-black text-4xl font-bold flex items-center justify-center"
    ></button>
  );
};

type boardProps = {
  changeTurn: Function;
  turnToPlay: string;
  gameOver: boolean;
  setGrid: Function;
  grid: string[];
  setMoveList: Function;
  moveList: string[];
};

const Board = ({
  changeTurn,
  turnToPlay,
  gameOver,
  setGrid,
  grid,
  setMoveList,
  moveList,
}: boardProps) => {
  const play = (id: number) => {
    if (gameOver) return;
    const tempGrid = [...grid];
    if (tempGrid[id - 1] === "") {
      tempGrid[id - 1] = turnToPlay;
      setGrid(tempGrid);
      setMoveList([...moveList, `(${id}, ${turnToPlay})`]);
      changeTurn();
    }
  };

  return (
    <div className="w-64 h-64 grid grid-cols-3 grid-rows-3 border-2 border-black">
      <Button onClick={() => play(1)}>{grid[0]}</Button>
      <Button onClick={() => play(2)}>{grid[1]}</Button>
      <Button onClick={() => play(3)}>{grid[2]}</Button>
      <Button onClick={() => play(4)}>{grid[3]}</Button>
      <Button onClick={() => play(5)}>{grid[4]}</Button>
      <Button onClick={() => play(6)}>{grid[5]}</Button>
      <Button onClick={() => play(7)}>{grid[6]}</Button>
      <Button onClick={() => play(8)}>{grid[7]}</Button>
      <Button onClick={() => play(9)}>{grid[8]}</Button>
    </div>
  );
};

export default Board;
