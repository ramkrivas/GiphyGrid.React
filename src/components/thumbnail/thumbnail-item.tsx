import React from "react";
import { useStyle } from "../../style";
import { styles } from "./thumnail-item-styles";
import type {
  ThumbnailProps,
  ImageRenditionFileType,
} from "../../types/application-types";
import { thumbnailConfig } from "../../common/configurations";

const getUrl = (fileType: ImageRenditionFileType): string => {
  if (fileType === "gif") {
    return "url";
  }
  return fileType;
};

const ThumbnailItem = ({ item, size, onSelect }: ThumbnailProps) => {
  console.log(item);
  useStyle("ImageItem", styles);
  return (
    <button
      data-testid="ImageItemButton"
      type="button"
      className={`thumbnail`}
      style={{
        backgroundColor: thumbnailConfig.imageBackgroundColor,
        width: `${size}px`,
        height: `${
          (item.images[thumbnailConfig.imageRenditionName].height * size) /
          item.images[thumbnailConfig.imageRenditionName].width
        }px`,
      }}
      onClick={() => onSelect(item)}
    >
      <img
        data-testid="ImageItemImage"
        width={item.images[thumbnailConfig.imageRenditionName].width}
        height={item.images[thumbnailConfig.imageRenditionName].height}
        alt={item.title}
        src={
          item.images[thumbnailConfig.imageRenditionName][
            getUrl(thumbnailConfig.imageRenditionFileType)
          ]
        }
        className="thumbnail-image"
      />
    </button>
  );
};

export default ThumbnailItem;
