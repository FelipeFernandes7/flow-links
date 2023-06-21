import { FormEvent, useState, useEffect } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { Card } from "../../components/card";

import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

export function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [url, setUrl] = useState("");
  const [color, setColor] = useState("#f1f1f1");
  const [backgroundColor, setBackgroundColor] = useState("#121212");
  const [links, setLinks] = useState<LinkProps[]>([]);

  const linksRef = collection(db, "links");
  const queryRef = query(linksRef, orderBy("created", "asc"));

  useEffect(() => {
    const unSub = onSnapshot(queryRef, (snapshot) => {
      const list = [] as LinkProps[];

      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          url: doc.data().url,
          name: doc.data().name,
          color: doc.data().color,
          bg: doc.data().bg,
        });
      });
      console.log(links, "links");
      setLinks(list);
    });
    return () => {
      unSub();
    };
  }, []);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (nameInput === "" || url === "") {
      alert("Preencha os campos");
      return;
    }
    await addDoc(collection(db, "links"), {
      name: nameInput,
      url: url,
      bg: backgroundColor,
      color: color,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrl("");
        console.log("cadastrado com sucesso");
        alert("cadastrado com sucesso");
      })
      .catch((error) => {
        alert(error.message);
      });
  }
  async function handleDeleteLink(id: string) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className=" flex items-center flex-col min-h-screen pb-7 px-2">
      <Header />
      <form
        onSubmit={handleRegister}
        className="flex flex-col mt-3 mb-3 w-full max-w-xl"
      >
        <label className="text-white font-medium mt-2 mb-2" htmlFor="">
          Nome do Link
        </label>
        <Input
          placeholder="Digite o nome do seu Link aqui..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2" htmlFor="">
          Url do link
        </label>
        <Input
          type="url"
          placeholder="Cole seu link aqui..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <section className=" flex my-4 gap-5">
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2" htmlFor="">
              Cor do link
            </label>
            <input
              className="rounded-md w-10 bg-transparent mt-1 cursor-pointer"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <label className="text-white font-medium mt-2 mb-2" htmlFor="">
              Fundo do Link
            </label>
            <input
              className="rounded-md w-10 bg-transparent mt-1 cursor-pointer"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>
        </section>
        {nameInput !== "" && (
          <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
            <label className="text-white font-medium mt-2 mb-3" htmlFor="">
              Exemplo
            </label>
            <article
              className="w-11/12 max-w-lg flex flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
              style={{
                marginBottom: 8,
                marginTop: 8,
                backgroundColor: backgroundColor,
              }}
            >
              <p className="font-medium" style={{ color: color }}>
                {nameInput}
              </p>
            </article>
          </div>
        )}
        <button
          type="submit"
          className="md:h-12 mt-4 h-12 bg-gradient-to-r from-blue-600 to-violet-500 
          rounded border-0 text-lg font-medium text-white transition-all active:scale-95"
        >
          Cadastrar Link
        </button>
      </form>
      <h2 className="font-bold text-white mt-4 mb-4 text-2xl">
        Links Cadastrados
      </h2>
      {links.map((item) => (
        <Card
          key={item.id}
          name={item.name}
          color={item.color}
          background={item.bg}
          onClick={() => handleDeleteLink(item.id)}
        />
      ))}
      {links.length > 0 && (
        <span className="text-center font-medium text-lg text-orange-50 mt-2">
          Obs: estes são os links que estarão visíveis na home
        </span>
      )}
    </div>
  );
}
