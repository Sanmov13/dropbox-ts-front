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
import styled from "styled-components";

export interface Props {
  height?: string;
  display?: string;
  justifyContent?: string
}

const MainStyled = styled.div<Props>`
  display: flex;
  background-color: azure;
  justify-content: space-between;
  align-items: center;
  padding: 40px 150px;
  width: 100wv;
  height: ${(props) => props.height || '70px'};
`;

const LinkStyled = styled(Link)`
  border: none;
  background-color: unset;
  color: #0e2f56;
  cursor: pointer;
  text-decoration: none;
  height: 10px;
`;

const MainImageStyled = styled.div<Props>`
  display: flex;
  justify-content: ${props => props.justifyContent || 'space-between'};
  width: 200px;
`;

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
          <LinkStyled onClick={handleExit} to="/">
            Выход
          </LinkStyled>
        ) : (
          <LinkStyled to="/auth">
            Вход/Регистрация
          </LinkStyled>
        )}
      </div>
      <MainStyled height="75px">
        <h2 className={styles.title}>
          <span>ALL</span> NEWS
        </h2>
        <MainImageStyled>
          <img src={img1} alt="tg" className={styles.imageList} />
          <img src={img2} alt="vk" className={styles.imageList} />
          <img src={img3} alt="whatsapp" className={styles.imageList} />
          <img src={img4} alt="youtube" className={styles.imageList} />
        </MainImageStyled>
      </MainStyled>
      <Categories />
    </div>
  );
};

export default Header;
