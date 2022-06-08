import React from 'react'
import { render, waitForElementToBeRemoved, fireEvent, waitFor } from '@testing-library/react'
import GiphyFeedViewer from '../src/components/index'
import giphyTrendingGetSuccess from './testAssets/giphyTrendingGetSuccess.json'
import giphyTrendingGet404Error from './testAssets/giphyTrendingGet404Error.json'
import giphySearchGetSuccessEmpty from './testAssets/giphySearchGetSuccessEmpty.json'
import giphySearchGetSuccess from './testAssets/giphySearchGetSuccess.json'

// TO-DO: Test the loading more (infinite scrolling)

describe('GiphyFeedViewer', () => {
  const onSelect = jest.fn()
  const onSearch = jest.fn()
  const defaults = {
    apiKey: 'tVaJe9QRTL6VZp9xhBkogbNWFTI9hYnJ',  
    masonryConfig: [{ columns: 2, imageWidth: 120, gutter: 5 }],
    onSearch,
    onSelect
  }

  const buildSubject = (props = defaults) =>
    render(<GiphyFeedViewer {...props} />)

  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('fetches Giphy Api and displays trending gifs', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => giphyTrendingGetSuccess,
    })

    const { getByTestId } = buildSubject()

    const MasonryLayoutContainer = await waitFor(() =>
      getByTestId('MasonryLayoutContainer'),
    )

    // Trending gif results displayed
    expect(MasonryLayoutContainer.children.length).toBe(5)
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test('fetches Giphy Api and returns an error', async () => {
    window.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => giphyTrendingGet404Error,
    })
    const { getByTestId } = buildSubject()

    const Alert = await waitForElementToBeRemoved(() => getByTestId('Alert'))
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test('dispatches the onSearch action and shows some gifs', async () => {
    let MasonryLayoutContainer
    window.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => giphyTrendingGetSuccess,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => giphySearchGetSuccess,
      })

    const { getByTestId } = buildSubject()


    MasonryLayoutContainer = await waitForElementToBeRemoved(() =>
      getByTestId('MasonryLayoutContainer'),
    )

    // Trending gif results displayed
    expect(MasonryLayoutContainer.children.length).toBe(5)
    expect(window.fetch).toHaveBeenCalledTimes(1)

    // Search something typing 'pizza' on input field
    // to simulate a full response
    fireEvent.change(getByTestId('SearchFormInput'), {
      target: { value: 'Pizza' },
    })

    MasonryLayoutContainer = await waitForElementToBeRemoved(() =>
      getByTestId('MasonryLayoutContainer'),
    )

    // Searched gif results displayed
    expect(MasonryLayoutContainer.children.length).toBe(5)
    expect(window.fetch).toHaveBeenCalledTimes(2)
    expect(onSearch).toHaveBeenLastCalledWith('Pizza')
  })

  test('dispatches the onSearch action and shows an empty response', async () => {
    let Loader
    window.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => giphyTrendingGetSuccess,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => giphySearchGetSuccessEmpty,
      })

    const { getByTestId } = buildSubject()

    const MasonryLayoutContainer = await waitFor(() =>
      getByTestId('MasonryLayoutContainer'),
    )

    // Trending gif results displayed
    expect(MasonryLayoutContainer.children.length).toBe(5)
    expect(window.fetch).toHaveBeenCalledTimes(1)

    // Search something typing 'foo' on input field
    // to simulate an empty response
    fireEvent.change(getByTestId('SearchFormInput'), {
      target: { value: 'foo' },
    })

    const Alert = await waitForElementToBeRemoved(() => getByTestId('Alert'))


    expect(window.fetch).toHaveBeenCalledTimes(2)
    expect(onSearch).toHaveBeenLastCalledWith('foo')
  })
})
