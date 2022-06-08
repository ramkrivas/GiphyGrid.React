import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ThumbnailItem from "./thumbnail-item";
import { ThumbnailProps } from "../../types/application-types";
describe("ThumbnailItem", () => {
  const onSelect = jest.fn();
  const defaults = {
    item: {
      images: {
        fixed_width_downsampled: {
          height: 310,
          width: 250,
          url: "http://imageurl.com/image",
        },
      },
      title: "Image title",
    },
    onSelect,
    size: 200,
  };

  const buildSubject = (props: ThumbnailProps = defaults) =>
    render(<ThumbnailItem {...props} />);

  test("render the image with the proper attributes", () => {
    const { getByTestId } = buildSubject();
    const image = getByTestId("ImageItemImage");

    expect(image.getAttribute("width")).toBe(
      defaults.item.images.fixed_width_downsampled.width.toString()
    );
    expect(image.getAttribute("height")).toBe(
      defaults.item.images.fixed_width_downsampled.height.toString()
    );
    expect(image.getAttribute("alt")).toBe(defaults.item.title);
    expect(image.getAttribute("src")).toBe(
      defaults.item.images.fixed_width_downsampled.url
    );
    expect(image.getAttribute("class")).toBe("thumbnail-image");
  });

  test("render the button", () => {
    const { getByTestId } = buildSubject();
    const button = getByTestId("ImageItemButton");

    expect(button.getAttribute("class")).toBe("thumbnail");
    expect(button.getAttribute("type")).toBe("button");
    expect(button.getAttribute("style")).toBe(
      "background-color: rgb(238, 238, 238); width: 200px; height: 248px;"
    );
  });

  test("render the button with a default background color", () => {
    const props = { ...defaults };
    const { getByTestId } = buildSubject(props);

    expect(getByTestId("ImageItemButton").getAttribute("style")).toBe(
      "background-color: rgb(238, 238, 238); width: 200px; height: 248px;"
    );
  });

  test("dispatch the onClick action on button click", () => {
    const { getByTestId } = buildSubject();

    fireEvent.click(getByTestId("ImageItemButton"));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
