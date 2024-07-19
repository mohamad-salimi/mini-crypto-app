import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto App</h1>
        <p>React Practicing</p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>
          Developed By <a href="https://github.com/mohamad-salimi">Mohamad</a>{" "}
          with ❤️
        </p>
      </footer>
    </>
  );
};

export default Layout;
