import cls from "./Pagination.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setPage } from "../../store/productSlice";

export const Pagination = () => {
  const { page, products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  const nextPage = () => {
    dispatch(setPage(page + 1))
  }

  const prevPage = () => {
    dispatch(setPage(page - 1))
  }

  return (
    <div className={cls.pagination}>
      <button
        onClick={prevPage}
        disabled={page === 1}>
        {"<"}
      </button>

      <button>{page}</button>

      <button
        onClick={nextPage}
        disabled={products.length < 49}>
        {">"}
      </button>

    </div>
  );
}

export default Pagination;