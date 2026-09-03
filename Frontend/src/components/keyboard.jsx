import { useState } from "react";

export default function Keyboard({ usedKeys }) {
  const letters = [
    [
      { key: "Q" },
      { key: "W" },
      { key: "E" },
      { key: "R" },
      { key: "T" },
      { key: "Y" },
      { key: "U" },
      { key: "I" },
      { key: "O" },
      { key: "P" },
    ],
    [
      { key: "A" },
      { key: "S" },
      { key: "D" },
      { key: "F" },
      { key: "G" },
      { key: "H" },
      { key: "J" },
      { key: "K" },
      { key: "L" },
    ],
    [
      { key: "Z" },
      { key: "X" },
      { key: "C" },
      { key: "V" },
      { key: "B" },
      { key: "N" },
      { key: "M" },
    ],
  ];

  return (
    <div className="keyboard flex flex-col items-center justify-center gap-1">
      {letters.map((row, i) => (
        <div key={i} className="flex gap-1">
          {row.map(({ key }) => {
            const color = usedKeys[key];
            return (
              <div
                key={key}
                style={{ backgroundColor: color }}
                className={` w-10 h-10 shrink-0 border border-gray-300 flex justify-center items-center mt-1 text-2xl font-bold uppercase`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
