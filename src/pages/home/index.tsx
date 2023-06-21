import { Social } from "../../components/social";
import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

interface LinkProps {
  id: string;
  name: string;
  url: string;
  bg: string;
  color: string;
}

interface SocialLinksProps {
  youtube: string;
  instagram: string;
  whatsapp: string;
  facebook: string;
}

export function Home() {
  const [links, setLinks] = useState<LinkProps[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLinksProps>();

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));
      getDocs(queryRef).then((snapshot) => {
        const list = [] as LinkProps[];
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            bg: doc.data().bg,
            name: doc.data().name,
            url: doc.data().url,
            color: doc.data().color,
          });
        });
        setLinks(list);
      });
    }
    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data()?.facebook,
            instagram: snapshot.data()?.instagram,
            whatsapp: snapshot.data()?.whatsapp,
            youtube: snapshot.data()?.youtube,
          });
        }
      });
    }
    loadSocialLinks();
  }, []);

  return (
    <div className=" h-screen flex flex-col w-full py-4 items-center">
      <h1 className="md:text-4xl text-3xl font-bold text-white mt-20">
        Flow Links
      </h1>
      <span className="text-white mb-5 mt-3">Veja meus links ⬇ </span>
      <main className="flex flex-col w-11/12 max-w-xl text-center justify-center h-full">
        {links.map((link) => (
          <section
            style={{ backgroundColor: link.bg }}
            key={link.id}
            className="bg-white mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105 cursor-pointer"
          >
            <a href={link.url} target="_blank">
              <p
                style={{ color: link.color }}
                className="text-base md:text-lg "
              >
                {link.name}
              </p>
            </a>
          </section>
        ))}
        {socialLinks && Object.keys(socialLinks).length > 0 && (
          <footer className=" flex justify-center gap-3 py-4">
            <Social url={socialLinks?.facebook}>
              <FaFacebook size={35} color={"#fff"} />
            </Social>
            <Social url={socialLinks?.instagram}>
              <FaInstagram size={35} color={"#fff"} />
            </Social>
            <Social url={socialLinks?.youtube}>
              <FaYoutube size={35} color={"#fff"} />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
}
