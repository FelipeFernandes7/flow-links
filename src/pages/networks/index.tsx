import { FormEvent, useEffect, useState } from "react";
import { Header } from "../../components/header";
import { Input } from "../../components/input";

import { db } from "../../services/firebaseConnection";
import { setDoc, doc, getDoc } from "firebase/firestore";

export function Networks() {
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [youtube, setYoutube] = useState("");

  function loadLinks() {
    const docRef = doc(db, "social", "link");
    getDoc(docRef).then((snapshot) => {
      if (snapshot.data() !== undefined) {
        setFacebook(snapshot.data()?.facebook);
        setWhatsapp(snapshot.data()?.whatsapp);
        setInstagram(snapshot.data()?.youtube);
        setYoutube(snapshot.data()?.instagram);
      }
    });
  }
  useEffect(() => {
    loadLinks();
    return () => {
      loadLinks();
    };
  }, []);

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    setDoc(doc(db, "social", "link"), {
      facebook: facebook,
      instagram: instagram,
      whatsapp: whatsapp,
      youtube: youtube,
    })
      .then(() => {
        alert("Salvo com sucesso!");
      })
      .then((error) => [console.log(error)]);
  }

  return (
    <div className=" flex flex-col items-center min-h-screen pb-7 px-2">
      <Header />
      <h1 className="text-white text-2xl font-medium mt-8 mb-4">
        Minhas redes sociais
      </h1>
      <form
        onSubmit={handleRegister}
        className="flex flex-col max-w-xl w-full "
      >
        <label className="text-white font-medium mt-2 mb-2">
          Link do Facebook
        </label>
        <Input
          type="url"
          placeholder="Digite a Url do Facebook..."
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Link do Instagram
        </label>
        <Input
          type="url"
          placeholder="Digite a Url do instagram..."
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Link do Whatsapp
        </label>
        <Input
          type="url"
          placeholder="Digite a Url do Whatsapp..."
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
        />
        <label className="text-white font-medium mt-2 mb-2">
          Link do Youtube
        </label>
        <Input
          type="url"
          placeholder="Digite a Url do youtube..."
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
        <button
          type="submit"
          className=" mt-4 h-10 bg-gradient-to-r from-blue-600 to-violet-500 
          rounded border-0 text-lg font-medium text-white transition-all active:scale-95"
        >
          Salvar Links
        </button>
      </form>
    </div>
  );
}
