import * as React from "react";
import { useRef, useEffect, Children } from "react";
import Bricks from "bricks.js";
import type { GalleryGridProps } from "../../types/application-types";

const GalleryGrid = ({ children, sizes }: GalleryGridProps) => {
  const container = useRef(null);

  useEffect(() => {
    const bricks = Bricks({
      container: container.current!,
      packed: "data-packed",
      sizes,
      position: true,
    });

    bricks.resize(true);

    if (Children.count(children) > 0) {
      bricks.pack();
    }
  }, [children]);

  return (
    <div
      ref={container}
      data-testid="GalleryGridContainer"
      style={{ width: "600px" }}
    >
      {children}
    </div>
  );
};

export default GalleryGrid;
