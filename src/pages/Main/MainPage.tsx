import React, { useEffect } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import { fetchNews } from "../../features/newsSlice";
import { useParams } from "react-router-dom";
import { Dna } from "react-loader-spinner";
import styles from "../Main/main.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";

interface News {
  _id: string;
  image: string;
  title: string;
  text: string;
  category: Category;
}

interface Category {
  _id: String;
  title: string;
}

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const novosti = useAppSelector((state) => state.newsSlice.news);
  const loading = useAppSelector((state) => state.newsSlice.loading);
  const { categoryId } = useParams<string>();

  const filtered = novosti.filter((elem): boolean => {
    if (!categoryId) return true;

    return categoryId === elem.category._id;
  });

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  if (loading) {
    return (
      <div className={styles.center}>
        <Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </div>
    );
  }

  return (
    <div className={styles.main}>
      {filtered.map((item: News) => {
        return (
          <NewsCard
            id1={item._id}
            image1={item.image}
            title1={item.title}
            text1={item.text}
            category1={item.category.title}
          />
        );
      })}
    </div>
  );
};

export default MainPage;
