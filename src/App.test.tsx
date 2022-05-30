import {
  render,
  screen,
  waitFor,
  cleanup,
  fireEvent,
} from '@testing-library/react'
import App from './App'
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils'

afterEach(cleanup) // clean up the DOM after each test

describe('Trending Gifs', () => {
  test('should render loader', async () => {
    render(<App />)
    const loader = await waitFor(() => screen.getByTestId('loader'), {
      timeout: 50000,
    })
    expect(loader).toBeVisible()
  })

  test('should show 25 trending gifs', async () => {
    render(<App />)
    mockAllIsIntersecting(0.1)

    const gif = await waitFor(
      () => {
        return screen.getByTestId('gif-0')
      },
      {
        timeout: 70000,
        onTimeout: (error) => {
          console.error('No Request completed:', error)
          return error
        },
      }
    )
    expect(gif).toBeVisible()

    const allgifs = screen.getAllByRole('img')
    expect(allgifs.length).toBe(25)
  }, 10000)

  test('should show loader when scrolled to bottom', async () => {
    render(<App />)
    mockAllIsIntersecting(1)

    const loader = await waitFor(() => screen.getByTestId('loader'), {
      timeout: 50000,
    })
    expect(loader).toBeVisible()
  })

  test('should load 50 gifs when scrolled to bottom', async () => {
    render(<App />)
    mockAllIsIntersecting(0)

    const loader = await waitFor(() => screen.getByTestId('loader'), {
      timeout: 50000,
    })
    expect(loader).toBeVisible()

    const firstGif = await waitFor(
      () => {
        return screen.getByTestId('gif-0')
      },
      {
        timeout: 70000,
        onTimeout: (error) => {
          console.error('No Request completed:', error)
          return error
        },
      }
    )
    expect(firstGif).toBeVisible()

    mockAllIsIntersecting(1)

    const gifNumber50 = await waitFor(
      () => {
        return screen.getByTestId('gif-49')
      },
      {
        timeout: 70000,
        onTimeout: (error) => {
          console.error('No Request completed:', error)
          return error
        },
      }
    )
    expect(gifNumber50).toBeVisible()
    const allgifs = screen.getAllByRole('img')
    expect(allgifs.length).toBe(50)
  }, 20000)
})

describe('Search Gifs', () => {
  test('search input is typeable on initial load', async () => {
    render(<App />)
    const input = screen.getByTestId('search-input')
    expect(input).not.toBeDisabled()
  })

  test('can search', async () => {
    render(<App />)
    const input: HTMLInputElement = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'reactjs' } })
    expect(input.value).toBe('reactjs')

    const submitBtnNonSearch: HTMLButtonElement = screen.getByTestId(
      'submit-non-search-mode'
    )
    fireEvent.click(submitBtnNonSearch)
  })

  test('submitting form triggers search mode', async () => {
    render(<App />)
    const input: HTMLInputElement = screen.getByTestId('search-input')
    fireEvent.change(input, { target: { value: 'reactjs' } })
    expect(input.value).toBe('reactjs')

    const submitBtnNonSearch: HTMLButtonElement = screen.getByTestId(
      'submit-non-search-mode'
    )
    fireEvent.click(submitBtnNonSearch)

    expect(input).toBeDisabled()
    expect(submitBtnNonSearch).not.toBeInTheDocument()

    const submitBtnSearch: HTMLButtonElement = await waitFor(
      () => screen.getByTestId('submit-search-mode') as HTMLButtonElement
    )
    expect(submitBtnSearch).toBeVisible()
    expect(submitBtnSearch).toBeDisabled()
    const closeBtnSearch: HTMLButtonElement = await waitFor(
      () => screen.getByTestId('close-search-button') as HTMLButtonElement
    )
    expect(closeBtnSearch).toBeVisible()
  })

  test('submitting form loads new gifs', async () => {
    render(<App />)

    mockAllIsIntersecting(0.1)

    const gif = await waitFor(
      () => {
        return screen.getByTestId('gif-0')
      },
      {
        timeout: 70000,
        onTimeout: (error) => {
          console.error('No Request completed:', error)
          return error
        },
      }
    )
    expect(gif).toBeVisible()

    const allgifs = screen.getAllByRole('img')
    expect(allgifs.length).toBe(25)
  }, 10000)

  test('should have 50 gifs when scrolled to bottom: form submit', async () => {
    render(<App />)
    typeAndSearch()
    mockAllIsIntersecting(0)

    const loader = await waitFor(() => screen.getByTestId('loader'), {
      timeout: 50000,
    })
    expect(loader).toBeVisible()

    const firstGif = await waitFor(
      () => {
        return screen.getByTestId('gif-0')
      },
      {
        timeout: 70000,
        onTimeout: (error) => {
          console.error('No Request completed:', error)
          return error
        },
      }
    )
    expect(firstGif).toBeVisible()

    mockAllIsIntersecting(1)

    const gifNumber50 = await waitFor(
      () => {
        return screen.getByTestId('gif-49')
      },
      {
        timeout: 70000,
        onTimeout: (error) => {
          console.error('No Request completed:', error)
          return error
        },
      }
    )
    expect(gifNumber50).toBeVisible()
    const allgifs = screen.getAllByRole('img')
    expect(allgifs.length).toBe(50)
  }, 20000)
})

function typeAndSearch() {
  const input: HTMLInputElement = screen.getByTestId('search-input')
  fireEvent.change(input, { target: { value: 'reactjs' } })
  expect(input.value).toBe('reactjs')

  const submitBtnNonSearch: HTMLButtonElement = screen.getByTestId(
    'submit-non-search-mode'
  )
  fireEvent.click(submitBtnNonSearch)
}
