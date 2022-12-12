import React, { useEffect } from "react";
import styles from "../Header/header.module.css";
import img1 from "../Header/images/Telegram_black.png";
import img2 from "../Header/images/VK_black.png";
import img3 from "../Header/images/WhatsApp_black.png";
import img4 from "../Header/images/YouTube_black.png";
import { fetchCategories } from "../../features/categoriesSlice";
import Categories from "../Categories/Categories";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.applicationSlice.token);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleExit = (): void => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={styles.main}>
      <div className={styles.entry}>
        {token ? (
          <Link onClick={handleExit} className={styles.enter} to="/">
            Выход
          </Link>
        ) : (
          <Link className={styles.enter} to="/auth">
            Вход/Регистрация
          </Link>
        )}
      </div>
      <div className={styles.main1}>
        <h2 className={styles.title}>
          <span>ALL</span> NEWS
        </h2>
        <div className={styles.mainImage}>
          <img src={img1} alt="tg" className={styles.imageList} />
          <img src={img2} alt="vk" className={styles.imageList} />
          <img src={img3} alt="whatsapp" className={styles.imageList} />
          <img src={img4} alt="youtube" className={styles.imageList} />
        </div>
      </div>
      <Categories />
    </div>
  );
};

export default Header;
