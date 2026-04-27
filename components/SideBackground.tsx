"use client";

export default function SideBackground() {
  return (
    <>
      {/* LEFT */}
      <div className="fixed left-0 top-0 h-full w-1/5 hidden lg:block -z-10">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWw3aGo0OWZvMXdzbGptYzdueG5iNmptNWUyNGd3cG0yMG9zemp6dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/a6pzK009rlCak/giphy.gif"
          className="w-full h-full object-cover opacity-70 blur-[1px]"
        />
      </div>

      {/* RIGHT */}
      <div className="fixed right-0 top-0 h-full w-1/5 hidden lg:block -z-10">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWw3aGo0OWZvMXdzbGptYzdueG5iNmptNWUyNGd3cG0yMG9zemp6dSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/a6pzK009rlCak/giphy.gif"
          className="w-full h-full object-cover opacity-70 blur-[1px]"
        />
      </div>
    </>
  );
}