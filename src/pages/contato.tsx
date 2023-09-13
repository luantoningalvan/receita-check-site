import Link from "next/link";
import styles from "../styles/PrivacyPolicy.module.css";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <div className={styles.privacyPolicy}>
      <Head>
        <title>Contato - Receita Check</title>
        <meta
          name="description"
          content="Entre em contato com a equipe do Receita Check"
        />
      </Head>

      <main
        style={{ height: "80vh", margin: "auto", width: "100%", maxWidth: 640 }}
      >
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfexsb6cNoMbs9ielGvA4EQKc55Rg61pCLy3xv0XRh73Cx10Q/viewform?embedded=true"
          width="640"
          height="800px"
        >
          Carregando…
        </iframe>
      </main>
    </div>
  );
}
