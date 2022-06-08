import React from "react";
import { render } from "@testing-library/react";
import GalleryGrid from "./gallery-grid";

describe("GalleryGrid", () => {
  const defaults = {
    sizes: [{ columns: 2, gutter: 5 }],
  };

  const buildSubject = (props = defaults) =>
    render(
      <GalleryGrid {...props}>
        <div>Test value</div>
        <div>Test value</div>
      </GalleryGrid>
    );

  test("render the passed children elements", () => {
    const { getByTestId } = buildSubject();

    expect(
      getByTestId("GalleryGridContainer").children[0].getAttribute(
        "data-packed"
      )
    ).toBe("");
    expect(
      getByTestId("GalleryGridContainer").children[1].getAttribute(
        "data-packed"
      )
    ).toBe("");
    expect(getByTestId("GalleryGridContainer").children.length).toBe(2);
  });
});
