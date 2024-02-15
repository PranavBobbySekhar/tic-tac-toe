import { ComponentProps, useEffect, useState } from "react";
import Board from "./game/Board";
import MoveList from "./game/MoveList";

const Button = ({ ...props }: ComponentProps<"button">) => {
  return (
    <button
      {...props}
      className="bg-black px-5 py-2 text-xl text-white font-mono font-semibold rounded-md hover:opacity-80 active:opacity-60"
    ></button>
  );
};

const App = () => {
  const [turnToPlay, setTurnToPlay] = useState("X");
  const [grid, setGrid] = useState(["", "", "", "", "", "", "", "", ""]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [moveList, setMoveList] = useState([]);

  type scoreType = {
    [key: string]: number;
  };

  const [score, setScore] = useState<scoreType>({
    X: 0,
    O: 0,
  });

  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const restart = () => {
    setTurnToPlay("X");
    setGrid(["", "", "", "", "", "", "", "", ""]);
    setGameOver(false);
    setWinner("");
    setMoveList([]);
  };

  const resetScore = () => {
    setScore({
      X: 0,
      O: 0,
    });
    localStorage.setItem("score", JSON.stringify({ X: 0, O: 0 }));
  };

  useEffect(() => {
    localStorage.getItem("score")
      ? setScore(JSON.parse(localStorage.getItem("score")!))
      : setScore({
          X: 0,
          O: 0,
        });
  }, []);

  useEffect(() => {
    winningCombination.map((combination) => {
      if (
        grid[combination[0]] === grid[combination[1]] &&
        grid[combination[1]] === grid[combination[2]] &&
        grid[combination[0]] !== ""
      ) {
        setWinner(`${grid[combination[0]]} Wins!`);
        setGameOver(true);
        setScore({
          ...score,
          [grid[combination[0]]]: score[grid[combination[0]]] + 1,
        });
        localStorage.setItem(
          "score",
          JSON.stringify({
            ...score,
            [grid[combination[0]]]: score[grid[combination[0]]] + 1,
          })
        );
      }
    });
    if (!grid.includes("")) {
      setWinner("Draw");
      setGameOver(true);
    }
  }, [grid]);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center relative">
      <h1 className="absolute top-2 text-4xl font-bold font-mono underline">TIC TAC TOE</h1>
      <div className="w-[400px] flex flex-col items-center gap-10">
        <div className="flex w-full justify-between text-3xl font-bold">
          <p>X: {score.X}</p>
          <h1>{winner !== "" ? `${winner}` : `Turn: ${turnToPlay}`}</h1>
          <p>O: {score.O}</p>
        </div>
        <div className="flex gap-8">
          <Board
            changeTurn={() => setTurnToPlay(turnToPlay === "X" ? "O" : "X")}
            turnToPlay={turnToPlay}
            gameOver={gameOver}
            setGrid={setGrid}
            grid={grid}
            setMoveList={setMoveList}
            moveList={moveList}
          />
          <div className="flex flex-col items-center gap-5">
            <MoveList moveList={moveList} />
            <div className="flex flex-col gap-3">
              <Button onClick={() => restart()}>Restart</Button>
              <Button onClick={() => resetScore()}>Reset Score</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
