import * as React from "react";

export type ImageRenditionFileType = "gif" | "webp";

export type ThumbnailProps = {
  item: any;
  onSelect: (item: any) => void;
  size: number;
};

export type GalleryGridProps = {
  children: any;
  sizes: Array<any>;
};
export type SpinnerProps = {
  show: boolean;
  message: string;
  image?: string;
};

export type SearchControlProps = {
  onSubmit: any;
  setValue: any;
  value: string;
};

export type GiphyProps = {
  apiKey: string;
  masonryConfig: Array<any>;
  onSearch: Function;
  onSelect: Function;

};
export type ReducerState ={
  data: any,
  error:boolean,
  lastPage:boolean,
  loading:boolean,
  
}
export type ReducerAction ={
  type:string,
  pagination?:any,
  payload?:any
}

type Item ={
  id:string
  images: any,
  title: string,
  type:string,
  url: string
}