import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { FormEvent, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("preencha todos os campos");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/admin", { replace: true });
      })
      .catch((error) => {
        console.log(error, "erro ao logar");
      });
  }
  return (
    <div className="flex w-full h-screen items-center justify-center flex-col">
      <Link to={"/"}>
        <h1 className=" text-white mb-7 font-bold text-5xl">
          Flow
          <span className="bg-gradient-to-r from-blue-600 to-violet-500 bg-clip-text text-transparent">
            Links
          </span>
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col px-4"
      >
        <Input
          placeholder="Digite seu email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<MdOutlineMailOutline color={"#cec9c9"} size={16} />}
        />
        <Input
          placeholder="**********"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<RiLockPasswordLine color={"#cec9c9"} size={16} />}
        />
        <button
          type="submit"
          className=" mt-4 h-9 bg-gradient-to-r from-blue-600 to-violet-500 
          rounded border-0 text-lg font-medium text-white transition-all active:scale-95"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
