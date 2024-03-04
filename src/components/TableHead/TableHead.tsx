import { FC } from "react";
import cls from "./TableHead.module.scss"
import { TableHeadProps } from "../../types/productsTypes";

const TableHead: FC<TableHeadProps> = ({ headers, children }) => {
  return (
    <table className={cls.wrapper}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h.head} style={{ width: h.width }}>
              {h.head}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export default TableHead;
