export const Button = ({ onClick, node, currentNode, text }) => {
  // Passing current node and node to button allows means button can be disabled
  // once related data has been fetched. I realised much later that I could simply do the check
  // where button component is being used, meaning onClick function and button component could be
  // made more generic and reusable, however I've run out of time and so it unfortunately has to stand as is :(

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
