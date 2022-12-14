import React, { useEffect } from "react";
import { fetchCategories } from "../../features/categoriesSlice";
import styles from "../Categories/cat.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styled from "styled-components";

const CategoriesStyled = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 150px;
  background-color: #0e2e56d3;
  transition: 0.25ms;
`;

interface Category {
  _id: string;
  title: string;
}

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.categoriesSlice.categories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <CategoriesStyled>
      <Link to="/" className={styles.list}>
        Главная
      </Link>
      {categories.map((elem: Category) => {
        return (
          <Link to={`categories/${elem._id}`} className={styles.list}>
            {elem.title}
          </Link>
        );
      })}
    </CategoriesStyled>
  );
};

export default Categories;
