type moveListProps = {
  moveList: string[];
};

const MoveList = ({ moveList }: moveListProps) => {
  return (
    <div className="w-[265px] h-[127px] border-4 border-black">
      <ol className="grid grid-cols-3 gap-x-8 gap-y-4 p-2 font-semibold">
        {moveList.map((move, index) => (
          <li key={index}>
            {index + 1}. {move}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MoveList;
