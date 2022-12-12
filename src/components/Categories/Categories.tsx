import React, { useEffect } from "react";
import { fetchCategories } from "../../features/categoriesSlice";
import styles from "../Categories/cat.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";

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
    <div className={styles.secondMain}>
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
    </div>
  );
};

export default Categories;
