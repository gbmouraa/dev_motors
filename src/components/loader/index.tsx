import "./loader.css";

export function Loader() {
  return (
    <div className="min-w-full min-h-full absolute rounded-lg top-0 left-0 bg-white/80 flex items-center justify-center">
      <div className="loader"></div>
    </div>
  );
}
