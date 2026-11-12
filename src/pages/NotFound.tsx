import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { UI, tr } from "../lib/ui";

export function NotFound() {
  const { lang } = useApp();
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <div className="text-5xl">🔍</div>
      <p className="mt-3 text-lg">{tr(UI.notFound, lang)}</p>
      <Link to="/" className="btn-primary mt-5 inline-flex">
        {tr(UI.goHome, lang)}
      </Link>
    </div>
  );
}
