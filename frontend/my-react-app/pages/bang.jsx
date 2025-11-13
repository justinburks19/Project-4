import { useState } from "react";

export function Bang() {
  const [inputValue, setInputValue] = useState("");

  const num = Number(inputValue);
  const bool = Boolean(inputValue);

  return (
    <div className="bg-amber-200 m-4 rounded-lg border-2 p-4">
      <h1 className="text-2xl font-bold text-center border-b-2 pb-1">Bang</h1>

      <p className="text-center mt-2">Enter something</p>

      <label className="block mb-2 text-center font-bold mx-auto">
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2 w-64 mx-auto block"
          placeholder="Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </label>

      <p className="m-2">You typed: <b>{JSON.stringify(inputValue)}</b></p>

      <p className="m-2">
        Number(inputValue) = <b>{String(num)}</b>{" "}
        <span className="text-sm text-gray-700">
          (type: {typeof num})
        </span>
      </p>

      <p className="m-2">
        Boolean(inputValue) = <b>{String(bool)}</b>{" "}
        <span className="text-sm text-gray-700">
          (type: {typeof bool})
        </span>
      </p>

      <p className="m-2">
        !Number(inputValue) = <b>{String(!num)}</b>{" "}
        <span className="text-sm text-gray-700">
          (type: {typeof !num})
        </span>
      </p>

      <p className="m-2">
        Number.isNaN(Number(inputValue)) ={" "}
        <b>{String(Number.isNaN(num))}</b>
      </p>
    </div>
  );
}
