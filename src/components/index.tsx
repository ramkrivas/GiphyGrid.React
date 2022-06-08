import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useStyle } from "../style";
import { styles } from "./index.styles";
import SearchControl from "../components/search-control/search-control";
import ThumbnailItem from "../components/thumbnail/thumbnail-item";
import type { GiphyProps } from "../types/application-types";
import { masonryConfig } from "../common/configurations";
import GalleryGrid from "../components/gallery-grid/gallery-grid";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import useSearchForm from "../utility-hooks/useSearchForm";
import useDebounce from "../utility-hooks/useDebounce";
import useFetch from "../service-hooks/useFetch";
import { apiConfig } from "../common/configurations";

const GiphyFeedViewer = ({
  apiKey,
  masonryConfig,
  onSearch,
  onSelect,
}: GiphyProps) => {
  const [modalShow, setShow] = useState(false);
  const [thumbnail, setThumbnail] = useState();
  useStyle("Index", styles);
  const { query, handleInputChange, handleSubmit } = useSearchForm();
  const debouncedQuery = useDebounce(query, 500);

  const apiEndpoint = query ? "search" : "trending";
  const apiUrl = (offset: any) =>
    `https://api.giphy.com/v1/${apiConfig.library}/${apiEndpoint}?api_key=${apiKey}&limit=${apiConfig.gifPerPage}&rating=${apiConfig.rating}&offset=${offset}&q=${query}`;

  const [{ data, loading, error, lastPage }, fetchImages] = useFetch();

  const [firstRun, setFirstRun] = useState(true);
  const isFirstRun = useRef(true);
  const onThumbnailSelect = (item: any): void => {
    setThumbnail(item);
    setShow(true);
  };
  useEffect(() => {
    fetchImages(apiUrl(0));
    onSearch(query);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      setFirstRun(false);
    }
  }, [debouncedQuery]);

  return (
    <React.Fragment>
      <div className={`giphyFeedViewer-componentWrapper`}>
        <SearchControl
          value={query}
          setValue={handleInputChange}
          onSubmit={handleSubmit}
        />

        <div className={`listWrapper`} style={{ height: "600px" }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={(page: any) =>
              fetchImages(apiUrl(page * apiConfig.gifPerPage), true)
            }
            hasMore={!loading && !lastPage}
            useWindow={false}
            initialLoad={false}
            loader={<div className="loader"></div>}
          >
            {data.length > 0 && (
              <GalleryGrid sizes={masonryConfig}>
                {data.map((item: any) => (
                  <ThumbnailItem
                    item={item}
                    size={masonryConfig[1].imageWidth}
                    key={item.id}
                    onSelect={onThumbnailSelect}
                  />
                ))}
              </GalleryGrid>
            )}
          </InfiniteScroll>
        </div>
      </div>
      <div>
        <Modal size="sm" show={modalShow} onHide={() => setShow(false)}>
          <Modal.Header closeButton>Your Giphy !!</Modal.Header>

          <Modal.Body>
            <ThumbnailItem
              item={thumbnail}
              size={masonryConfig[1].imageWidth}
              key={1}
              onSelect={onThumbnailSelect}
            />
          </Modal.Body>
        </Modal>
      </div>
    </React.Fragment>
  );
};

GiphyFeedViewer.defaultProps = {
  masonryConfig: [{ columns: 2, imageWidth: 120, gutter: 5 }],
  onSearch: () => {},
};

export default GiphyFeedViewer;
