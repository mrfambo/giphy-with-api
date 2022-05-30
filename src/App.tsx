import React, { useCallback, useEffect, useRef, useState } from 'react'
import axios, { CancelToken } from 'axios'
import { useInView } from 'react-intersection-observer'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { IGif } from '@giphy/js-types'
import { throttle } from 'throttle-debounce'

import { CloseIconSVG, LoadingGifsSVG, LoadingSVG, SearchSVG } from './Svgs'
import MasonryGrid from './MasonryGrid'
import { getGifHeight } from './utils'
import GifDetailsDialog from './DetailsDialog'
import {
  GIPHY_TRENDING_ENDPOINT,
  GIPHY_SEARCH_ENDPOINT,
  GIPHY_API_KEY,
  LIMIT,
  placeholder,
} from './Config'

function App() {
  const [search, setSearch] = useState<string>('')
  const [isFetching, setIsFetching] = useState<boolean>(true)
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [gifs, setGifs] = useState<IGif[]>([])
  const [columns, setColumns] = useState<number>(3)
  const [totalCount, setTotalCount] = useState<number>()
  const [selectedGif, setSelectedGif] = useState<IGif>()
  const [isSearchMode, setIsSearchMode] = useState<boolean>()
  const [width, setWidth] = useState(innerWidth)

  const gifsContainer = useRef<HTMLDivElement | null>()
  const gotLoadMore = useRef<boolean>(false)

  const { ref, inView } = useInView({
    threshold: 1,
  })

  const fetchGifs = useCallback(
    async (
      token: CancelToken | undefined,
      formSubmit?: boolean,
      searchTerm?: string
    ) => {
      try {
        setIsFetching(true)
        const result = await axios.get(
          searchTerm && searchTerm.length !== 0
            ? GIPHY_SEARCH_ENDPOINT
            : GIPHY_TRENDING_ENDPOINT,
          {
            cancelToken: token ? token : undefined,
            params: {
              api_key: GIPHY_API_KEY,
              ...(searchTerm && searchTerm.length !== 0
                ? { q: searchTerm }
                : {}),
              limit: LIMIT,
              offset: formSubmit ? 0 : gifs.length,
            },
          }
        )
        setTotalCount(result.data.pagination.total_count)
        if (!formSubmit) setGifs([...gifs, ...result.data.data])
        else setGifs([...result.data.data])
        setIsFetching(false)
        setIsSearching(false)
        gotLoadMore.current = false
        if (formSubmit) {
          // We have search form as sticky, if user submits new form while scrolled down
          // reset the scroll to top so user can see new gifs
          window.scrollTo(0, 0)
        }
      } catch (err) {
        if (axios.isCancel(err)) {
          console.info('Request cancelled on unmount')
        } else {
          setError('Request failed. Please try again later!')
        }
      }
    },
    [gifs]
  )

  useEffect(() => {
    // Responsible to manage the screen size changes and setting the width of container
    // Why? We need it for making the Masonry grid
    const listener = throttle(500, () => {
      if (
        gifsContainer.current &&
        gifsContainer.current.clientWidth !== width
      ) {
        setWidth(gifsContainer.current.clientWidth - 10) // removing 10 because of padding and margins
      }
    })
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [])

  useEffect(() => {
    // Responsible to fetch more gifs once scrolled down
    // Why? We need to scroll more gifs if available once we scroll down and dummy end
    // container gets visible
    const source = axios.CancelToken.source()
    if (inView && !isFetching && !gotLoadMore.current) {
      gotLoadMore.current = true
      if (totalCount && totalCount > gifs.length) fetchGifs(source.token)
    }
    return () => {
      if (!gotLoadMore.current) source.cancel()
    }
  }, [inView])

  useEffect(() => {
    // Responsible to fetch initial gifs on load time
    // Why? We need to call fetchGifs function once loading the screen to show trending gifs
    // Sending CancelToken so that useEffect is not effected if called multiple times, (in case of React 18)
    const source = axios.CancelToken.source()
    fetchGifs(source.token)
    return () => {
      source.cancel()
    }
  }, [])

  useEffect(() => {
    // Responsible to set the number of masonry columns based on width of masonry container
    // Why? To make masonry responsive
    if (width < 640) setColumns(1)
    else if (width < 768) setColumns(2)
    else if (width < 1024) setColumns(3)
    else if (width < 1280) setColumns(4)
    else if (width > 1280) setColumns(5)
  }, [width])

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSearching(true)
    fetchGifs(undefined, true, search)
    setIsSearchMode(true)
  }

  const gutter = 6
  const gutterOffset = gutter * (columns - 1)
  const gifWidth = Math.floor((width - gutterOffset) / columns)

  return (
    <div className="container mx-auto max-w-[95%]">
      <form onSubmit={formSubmit} className="sticky top-0 py-4 bg-white z-10">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Your Email
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <SearchSVG />
          </div>
          <input
            data-testid="search-input"
            type="search"
            id="search"
            className="text-base block w-full p-3 pl-10 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 without-ring focus:border-gray-400"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
            onInvalid={(e) => {
              ;(e.target as HTMLInputElement).setCustomValidity(
                'Enter something to search!'
              )
            }}
            onInput={(e) => {
              ;(e.target as HTMLInputElement).setCustomValidity('')
            }}
            disabled={isSearching}
          />
          {isSearchMode && (
            <div className="absolute right-[16px] bottom-[8px] flex gap-2">
              <button
                data-testid="close-search-button"
                onClick={() => {
                  setSearch('')
                  setIsSearchMode(false)
                  fetchGifs(undefined, true, '')
                }}
                type="button"
              >
                <CloseIconSVG />
              </button>
              <button
                type="submit"
                data-testid="submit-search-mode"
                className="secondary-button  w-20"
                disabled={isSearching}
              >
                <div className="flex w-full items-center justify-center">
                  {!isSearching && 'Search'}
                  {isSearching && <LoadingSVG />}
                </div>
              </button>
            </div>
          )}
          {!isSearchMode && (
            <button
              data-testid="submit-non-search-mode"
              type="submit"
              className="right-[8px] bottom-[8px] secondary-button absolute w-20"
              disabled={isSearching}
            >
              <div className="flex w-full items-center justify-center">
                {!isSearching && 'Search'}
                {isSearching && <LoadingSVG />}
              </div>
            </button>
          )}
        </div>
      </form>
      {isFetching && (
        <div
          data-testid="loader"
          className="mt-2 flex items-center justify-center"
        >
          <LoadingGifsSVG />
        </div>
      )}
      {error && (
        <div className="mt-10 flex items-center justify-center">
          <p className="text-red-800">
            <i>Failed to fetch GIFs. Try again later</i>
          </p>
        </div>
      )}
      {!error && gifs.length > 0 && (
        <div className="bg-gray-900 p-5 mb-20">
          <div>
            <div
              ref={(ref) => {
                if (ref && ref.clientWidth !== width) {
                  gifsContainer.current = ref
                  setWidth(ref.clientWidth - 10)
                }
              }}
              data-testid="gif-grid"
            >
              <MasonryGrid
                itemHeights={gifs.map((gif) => getGifHeight(gif, gifWidth))}
                columns={columns}
                gutter={10}
                itemWidth={gifWidth}
              >
                {gifs.map((gif, index) => {
                  const height = getGifHeight(gif, gifWidth)

                  if (process.env.NODE_ENV === 'test') {
                    return (
                      <div
                        key={`${gif.id} + ${index}`}
                        data-testid={`gif-${index}`}
                      >
                        <img
                          className="rounded-md"
                          src={gif.images.downsized_still.url}
                          alt={gif.title}
                          height={height}
                          width={gifWidth}
                        />
                      </div>
                    )
                  }

                  return (
                    <div
                      key={`${gif.id} + ${index}`}
                      data-testid={`gif-${index}`}
                    >
                      <button
                        style={{
                          width: gifWidth,
                          height: height,
                        }}
                        onClick={() => {
                          setSelectedGif(gif)
                        }}
                      >
                        <LazyLoadImage
                          className="rounded-md"
                          src={gif.images.downsized_still.url}
                          alt={gif.title}
                          height={height}
                          width={gifWidth}
                          placeholderSrc={placeholder}
                        />
                      </button>
                    </div>
                  )
                })}
              </MasonryGrid>
            </div>
          </div>

          {isFetching && (
            <div className="mt-2 flex items-center justify-center">
              <LoadingGifsSVG />
            </div>
          )}
        </div>
      )}
      {!isFetching && !error && gifs.length > 0 && <div ref={ref}></div>}
      {selectedGif && (
        <GifDetailsDialog
          gif={selectedGif}
          modalClosed={() => setSelectedGif(undefined)}
        />
      )}
    </div>
  )
}

export default App
