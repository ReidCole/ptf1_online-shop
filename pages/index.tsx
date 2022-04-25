import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useNotification from "../hooks/useNotification";

const Home: NextPage = () => {
  const { notification, showNotification } = useNotification();
  const [num, setNum] = useState(0);

  return (
    <>
      <Head>
        <title>Online Store Example</title>
      </Head>

      <main>
        <Header />

        <button
          onClick={() => {
            setNum((prev) => prev + 1);
            showNotification(num.toString(), "bg-blue-700", 8000);
          }}
          className="px-4 py-2 my-4 bg-gray-300 text-red-500"
        >
          Test
        </button>
        <button
          onClick={() => {
            showNotification("stuff", "", 3000);
          }}
          className="px-4 py-2 my-4 bg-gray-300"
        >
          Test
        </button>

        {notification}

        <Footer />
      </main>
    </>
  );
};

export default Home;
