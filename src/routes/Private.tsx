import { ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): any {
  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        };
        localStorage.setItem("@flowLinks", JSON.stringify(userData));
        setLoading(false);
        setSigned(true);
        console.log("usuário logado");
      } else {
        setLoading(false);
        setSigned(false);
        console.log("não há usuário logado");
      }
    });
    return () => {
      unsub();
    };
  }, []);
  if (loading) {
    <div></div>;
  }
  if (!signed) {
    return <Navigate to={"/login"} />;
  }
  return children;
}
