import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchControl from "./search-control";

describe("SearchForm", () => {
  const onSubmit = jest.fn();
  const setValue = jest.fn();
  const defaults = {
    onSubmit,
    setValue,
    value: "",
  };

  const buildSubject = (props = defaults) =>
    render(<SearchControl {...props} />);

  test("dispatch the onSubmit action on form submit", () => {
    const { getByTestId } = buildSubject();

    fireEvent.submit(getByTestId("SearchFormForm"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  test("on value change, dispatch the setValue action", () => {
    const { getByTestId } = buildSubject();

    fireEvent.change(getByTestId("SearchFormInput"), {
      target: { value: "foo" },
    });
    expect(setValue).toHaveBeenCalledTimes(1);
  });
});
