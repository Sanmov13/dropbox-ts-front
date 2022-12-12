import React from "react";
import styles from "../NewsCard/newscard.module.css";
import { Link } from "react-router-dom";

interface News {
  id1: string,
  image1: string,
  title1: string,
  text1: string,
  category1: string
}

const NewsCard: React.FC<News> = ({ id1, image1, title1, text1, category1 }) => {
  return (
    <div className={styles.main}>
      <div className={styles.mainCard}>
        <img
          className={styles.image}
          src={`http://localhost:3010/${image1}`}
          alt="surt"
        />
        <h2 className={styles.title}>{title1}</h2>
        <p className={styles.text}>{text1.substr(0, 147)}</p>
        <p className={styles.textSecond}>
          <span className={styles.data}>Дата:</span> 31 августа /{" "}
          {category1}
        </p>
      </div>
      <div className={styles.secondMain}>
        <div className={styles.surt}>
          <Link to={`news/${id1}`} className={styles.desc}>
            Подробнее
          </Link>
          <img
            src="https://html6.com.ru/demo/all-news/images/elements/read-arrow.png"
            alt="pal"
          />
        </div>
        <span className={styles.desc1}>5 комментариев</span>
      </div>
    </div>
  );
};

export default NewsCard;
