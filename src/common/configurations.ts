/// Configuration types ///

type MasonryConfig = {
  mq?: string;
  columns: number;
  imageWidth: number;
  gutter: number;
};
type ThumbnailConfig = {
  imageBackgroundColor: string;
  imageRenditionName: string;
  imageRenditionFileType: "gif" | "webp";
};
type ApiConfig = {
  library: "gifs" | "stickers";
  gifPerPage: number;
  rating: string;
};

/// List of Configurations. Scope for fmprovement: This can be extended to make it as configurable at integration level"

export const apiConfig: ApiConfig = {
  library: "gifs",
  gifPerPage: 20,
  rating: "g",
};

export const masonryConfig: MasonryConfig[] = [
  {
    mq: "700px",
    columns: 3,
    imageWidth: 310,
    gutter: 5,
  },
  {
    columns: 2,
    imageWidth: 110,
    gutter: 5,
  },
];

export const thumbnailConfig: ThumbnailConfig = {
  imageBackgroundColor: "#eee",
  imageRenditionName: "fixed_width_downsampled",
  imageRenditionFileType: "gif",
};

export const errorHandlingConfig = {
  messageError: "Oops! Something went wrong. Please, try again.",
  messageLoading: "Loading...",
  messageNoMatches: "No matches found.",
};
