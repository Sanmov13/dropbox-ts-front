import React, { useEffect, useState } from "react";
import styles from "../NewsItem/newsitem.module.css";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useParams } from "react-router-dom";
import { fetchNews } from "../../features/newsSlice";
import { fetchCategories } from "../../features/categoriesSlice";
import {
  addComment,
  deleteComm,
  fetchComments,
} from "../../features/commentSlice";
import { Dna } from "react-loader-spinner";
import styled from "styled-components";
import { Props } from "../../components/Header/Header";

const ButtonStyled = styled.button<Props>`
  width: 20%;
  padding: 20px;
  margin-top: 20px;
  border: none;
  background-color: #3c5779;
  color: ${(props) => props.color || "#fff"};
  font-size: larger;
  cursor: pointer;

  &:hover {
    background-color: #0e2f56;
  }

  &:focus {
    transform: scale(1.03);
  }
`;

interface News {
  _id: string;
  image: string;
  title: string;
  text: string;
  category: Category;
}

interface Comments {
  _id: string;
  text: string;
  news: News;
  user: User;
}

interface Category {
  _id: string;
  title: string;
}

export interface User {
  _id: string;
  login: string;
  password: string;
}

const NewsItem: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const news = useAppSelector((state) => state.newsSlice.news);
  const comments = useAppSelector((state) => state.commentSlice.comments);
  const name = useAppSelector((state) => state.applicationSlice.login1);
  const token = useAppSelector((state) => state.applicationSlice.token);
  const loading = useAppSelector((state) => state.newsSlice.loading);
  const commsPending = useAppSelector((state) => state.commentSlice.loading);
  const [input, setInput] = useState("");

  const filteredComms = comments.filter((elem: Comments) => {
    if (!id) return true;

    return elem.news._id === id;
  });

  const filteredNews = news.filter((elem: News) => {
    if (!id) return true;

    return id === elem._id;
  });

  useEffect(() => {
    dispatch(fetchNews());
    dispatch(fetchCategories());
    dispatch(fetchComments());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const handleAdd = (): void => {
    dispatch(addComment({ input, id, name }));
    setInput("");
  };

  const handleDelete = (Id: string): void => {
    dispatch(deleteComm(Id));
  };

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
    <>
      {filteredNews.map((elem: News) => {
        return (
          <div className={styles.main}>
            <div className={styles.wrapper}>
              <h2 className={styles.title}>{elem.category.title}</h2>
              <p>{`${elem.text.substr(0, 147)}`}</p>
              <img
                className={styles.image}
                src={`http://localhost:3010/${elem.image}`}
                alt="redux"
              />
              <div className={styles.wrapperStyle}>
                <p>Автор: &nbsp;</p>
                <span> / Джон Доу / </span>
              </div>
            </div>
            <div className={styles.second}>
              <p>{`${elem.text.substr(0, 390)}.`}</p>
              <div className={styles.imageI}>
                <img
                  className={styles.photo}
                  src={`http://localhost:3010/${elem.image}`}
                  alt=""
                />
                <p>{elem.text}</p>
              </div>
            </div>
            <hr className={styles.siz} />
            <div className={styles.commentMain}>
              <h2>КОММЕНТАРИИ К СТАТЬЕ</h2>
              <div className={styles.text}>
                <span>Написать свой</span>
              </div>
            </div>
            <div className={styles.comments}>
              <input
                disabled={!token || token == undefined}
                type="text"
                value={input}
                onChange={handleChange}
              />
              <ButtonStyled disabled={!input} onClick={handleAdd}>
                Написать
              </ButtonStyled>
            </div>
            <hr className={styles.siz2} />
          </div>
        );
      })}
      {commsPending ? (
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
      ) : (
        filteredComms.map((item: Comments) => {
          return (
            <div className={styles.long}>
              <div className={styles.commentMain1}>
                <div className={styles.expo}>
                  <h3>{item.user.login}</h3>
                  <p>{item.text}</p>
                </div>
                {name === item.user._id ? (
                  <img
                    onClick={() => handleDelete(item._id)}
                    className={styles.delete}
                    src="https://cdn-icons-png.flaticon.com/512/216/216658.png"
                    alt="surt"
                  />
                ) : null}
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default NewsItem;
