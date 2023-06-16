import { FiTrash } from "react-icons/fi";

interface CardProps {
  name: string;
  color: string;
  background: string;
  onClick: () => void;
}

export function Card({ name, color, background, onClick }: CardProps) {
  return (
    <article
      className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
      style={{ backgroundColor: background, color: color }}
    >
      <p>{name}</p>
      <div>
        <button
          className="border border-dashed py-1 p-1 rounded"
          onClick={onClick}
        >
          {<FiTrash size={18} color={"#fff"} />}
        </button>
      </div>
    </article>
  );
}
