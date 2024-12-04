export const Button = ({ onClick, node, currentNode, text }) => {
  return (
    <button
      onClick={() => onClick(node)}
      className="w-fit px-5 bg-slate-800 rounded-full hover:bg-slate-400 disabled:bg-slate-300"
      disabled={node === currentNode}
    >
      <h2 className="text-2xl text-white">{text}</h2>
    </button>
  );
};
