import { renderHook, act } from "@testing-library/react-hooks";
import giphyTrendingGet404Error from "../../tests/testAssets/giphy-feed-404.json";
import giphyTrendingGetSuccess from "../../tests/testAssets/giphy-feed-trending.json";
import giphySearchGetSuccessMissingPagination from "../../tests/testAssets/giphy-feed-without-pagination.json";
import useFetch from "./useFetch";

describe("useFetch", () => {
  const fetchingInitValues = {
    loading: true,
    error: false,
    data: [],
    lastPage: false,
  };

  test("perform a get request and receive some data", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch());
    const [, fetchImages] = result.current;

    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => giphyTrendingGetSuccess,
    });

    act(() => {
      fetchImages();
    });

    expect(result.current[0]).toEqual(fetchingInitValues);
    await waitForNextUpdate();
    expect(result.current[0]).toEqual({
      loading: false,
      error: false,
      data: giphyTrendingGetSuccess.data,
      lastPage: false,
    });
  });

  test("perform a get request with `isMore` option and receive some data", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch());
    const [, fetchImages] = result.current;

    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => giphyTrendingGetSuccess,
    });

    act(() => {
      fetchImages("", true);
    });

    expect(result.current[0]).toEqual(fetchingInitValues);
    await waitForNextUpdate();
    expect(result.current[0]).toEqual({
      loading: false,
      error: false,
      data: giphyTrendingGetSuccess.data,
      lastPage: false,
    });
  });

  test("perform a get request and receive an error", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch());
    const [, fetchImages] = result.current;

    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => giphyTrendingGet404Error,
    });

    act(() => {
      fetchImages();
    });

    expect(result.current[0]).toEqual(fetchingInitValues);

    await waitForNextUpdate();

    expect(result.current[0]).toEqual({
      loading: false,
      error: true,
      data: [],
      lastPage: false,
    });
  });

  test("perform a get request and receive a response without the pagination", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch());
    const [, fetchImages] = result.current;

    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => giphySearchGetSuccessMissingPagination,
    });

    act(() => {
      fetchImages();
    });

    expect(result.current[0]).toEqual(fetchingInitValues);
    await waitForNextUpdate();
    expect(result.current[0]).toEqual({
      loading: false,
      error: true,
      data: [],
      lastPage: false,
    });
  });
});
