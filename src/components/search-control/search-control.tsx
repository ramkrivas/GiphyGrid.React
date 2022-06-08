import React from "react";
import { useStyle } from "../../style";
import { styles } from "./search-control.styles";
import type { SearchControlProps } from "../../types/application-types";

const SearchControl = ({ onSubmit, setValue, value }: SearchControlProps) => {
  useStyle("SearchForm", styles);

  return (
    <form data-testid="SearchFormForm" onSubmit={onSubmit} autoComplete="off">
      <input
        data-testid="SearchFormInput"
        type="text"
        placeholder="Search your Giphy :-) "
        onChange={setValue}
        value={value}
        name="search"
        className="searchControl-input"
      />
    </form>
  );
};
export default SearchControl;
