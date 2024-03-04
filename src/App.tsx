import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import ProductsList from "./components/ProductsList/ProductsList";
import { IdsParams } from "./types/productsTypes";
import MainSearchPanel from "./components/MainSearchPanel/MainSearchPanel";
import Pagination from "./components/Pagination/Pagination";
import { fetchDataProductsId } from "./store/fetchAsyncThunk ";
import cls from "./index.module.scss"

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { offset, limit } = useSelector((state: RootState) => state.products)

  useEffect(() => {
    dispatch(fetchDataProductsId({
      action: 'get_ids',
      params: { offset: offset, limit: limit } as IdsParams,
    }));
  }, [dispatch, offset]);

  return (
    <div className={cls.wrap}>
      <MainSearchPanel />
      <ProductsList />
      <Pagination />
    </div>
  );
}

export default App;
