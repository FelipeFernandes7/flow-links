import Lottie, { LottieRefCurrentProps } from "lottie-react";
import error from "../../lotties/error.json";
import { useRef } from "react";
import { Link } from "react-router-dom";

export function ErrorPage() {
  const iconRef = useRef<LottieRefCurrentProps | null>(null);

  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className="text-white font-medium text-4xl mt-4">
        Oops, página não encontrada {":("}
      </h1>
      <Lottie
        lottieRef={iconRef}
        style={{ width: 600, height: 500, marginBottom: 10 }}
        animationData={error}
        loop={true}
        autoplay={true}
      />
      <Link
        className="text-white text-medium bg-zinc-800 rounded p-1 w-full max-w-sm items-center text-center"
        to={"/"}
      >
        Voltar para home
      </Link>
    </div>
  );
}
