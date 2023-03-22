import Head from "next/head";
import styles from "@/styles/Landing.module.css";
import Landing from "@/components/landing";

export default function Home() {
  return (
    <>
      <Head>
        <title>Modeltune</title>
        <meta
          name="description"
          content="API Access to High Quality Fine-tuned GPT Models by the Community"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Landing />
      </main>
    </>
  );
}
