import { useSelector } from "react-redux";
import cls from "./ProductsList.module.scss"
import TableHead from "../TableHead/TableHead";
import { Header, Product } from "../../types/productsTypes";
import { RootState } from "../../store/store";

const productHeaders: Header[] = [
  { width: "30%", head: "ID" },
  { width: "40%", head: "Название" },
  { width: "15%", head: "Цена" },
  { width: "15%", head: "Бренд" },
];

const ProductsList = () => {
  const { status, products } = useSelector((state: RootState) => state.products)

  if (status === "loading") return "Loading..."

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className={cls.wrapper}>
        {products.length !== 0 ?
          <TableHead headers={productHeaders}>
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.product}</td>
                <td>{product.price}</td>
                <td>{product.brand || "-"}</td>
              </tr>
            ))}
          </TableHead>
          : <p>Товары не найдены...{" "}
            <a href="#" onClick={refreshPage}>
              Вернуться
            </a>
          </p>
        }
      </div >
    </>
  );
}

export default ProductsList;
