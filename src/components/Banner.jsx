import styles from "./Banner.module.css";

const Banner = ({ page, other }) => {
  return (
    <section className={styles.banner}>
      <h1>{page}</h1>
      <p>{other ? other : page}</p>
    </section>
  );
};

export default Banner;
