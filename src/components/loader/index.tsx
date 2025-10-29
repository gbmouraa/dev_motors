import "./loader.css";

interface LoaderProps {
  bg?: string;
}

export function Loader({ bg }: LoaderProps) {
  return (
    <div
      className={`min-w-full min-h-full absolute rounded-lg top-0 left-0 flex items-center justify-center z-50 ${
        bg ? bg : "bg-white/80"
      }`}
    >
      <div className="loader"></div>
    </div>
  );
}
