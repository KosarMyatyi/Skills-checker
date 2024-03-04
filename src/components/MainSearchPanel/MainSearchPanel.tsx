import { useDispatch, useSelector } from "react-redux";
import cls from "./MainSearchPanel.module.scss";
import { AppDispatch, RootState } from "../../store/store";
import { Field, FieldsParams } from "../../types/productsTypes";
import { fetchDataProductFields } from "../../store/fetchAsyncThunk ";
import { setSearchValue, setSelectedField } from "../../store/productSlice";

const MainSearchPanel = () => {
  const { fields, offset, limit, selectedField, searchValue } = useSelector((state: RootState) => state.products)
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = () => {
    dispatch(fetchDataProductFields({
      action: 'get_fields',
      params: { field: selectedField, offset: offset, limit: limit } as FieldsParams,
    }))
  }

  return (
    <div className={cls.searchWrap}>
      <select defaultValue={selectedField} onChange={e => dispatch(setSelectedField(e.target.value))} className={cls.searchSelect}>
        {fields.map((f: Field) => <option key={f.id} value={f.value}>{f.label}</option>)}
      </select>
      <input
        onChange={e => dispatch(setSearchValue(e.target.value))}
        className={cls.searchInput}
        placeholder={"Поиск"}
        type={selectedField === "price" ? "number" : "text"}
      />
      <button disabled={!searchValue} className={cls.searchBtn} onClick={onSubmit}>Найти</button>
    </div>
  );
}

export default MainSearchPanel;