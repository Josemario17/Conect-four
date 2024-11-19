import { useState } from "react";

type CelulaProps = {
  selectedState: { seletion: "empty" | "player1" | "player2" };
};

export default function Celula({ selectedState }: CelulaProps) {
  return (
    <div
      className={`size-10 rounded-full border border-zinc-100 ${
        selectedState.seletion === "player1"
          ? "bg-green-500/80"
          : selectedState.seletion === "player2"
          ? "bg-orange-500/80"
          : "bg-transparent"
      }`}
    ></div>
  );
}