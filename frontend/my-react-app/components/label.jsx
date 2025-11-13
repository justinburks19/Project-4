export function Label({ onClick, children }) {
  return (
    <label
      className="block font-md text-slate-700 mb-2 border-2 border-black rounded-xl p-2"
      onClick={onClick}

    >
      {children}
    </label>
    );

}
