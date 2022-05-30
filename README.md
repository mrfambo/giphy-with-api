# Tech Stack

1. ReactJS
2. Typescript
3. TailwindCSS
4. Jest
5. CRA

# Challenges

Below are the challenges i faced along the way:
<br />
## Complications making the Grid Layout (masonry)

I wanted to show gif tiles the same way displayed on the giphy.com homepage. For that i had to create a `masonry` grid which can load tiles based on variables heights and width.

1. `masonryjs` doesn't have first class support for ReactJS
2. I explored couple of other options like `bricksjs` and `colcade` but none worked for variable reasons like dynamic rows or dynamic columns or first class support for ReactJS
3. `@giphy/react-components` had masonry layout but it wasn't editable as we were needing to show stills (not the animated gifs)
4. Pure CSS `column` is the easiest to achieve, but it fills the columns first. Upon scrolling as we load more content it doesn't render towards the end (row wise) rather it add towards the columns side. It can be used on mobile devices as there is only 1 column, but not at all suitable for multi column screen sizes. 

### Solution
As i mentioned that `@giphy/react-components` have a masonry layout but the way they are rendering Gifs is not editable, i decided to grab the layout formation logic from there package with our own gif rendering logic

<br />

## Infinite Scrolling and lazy loading images

In order to make it optimized, there were two challenges:

1. Implementing something like pagination or infinite scrolling
2. If we have infinite scroll, i wanted it to work with window scroll, not a container with scroll init
3. Dealing with number of images rendering on the DOM

### Solution
In order to make it performant, i decided to go with Infinite Scroll using intersection observer. Though we can implement similar using scroll position too.
<br />
Once we are fetching Gifs from API, we are getting 25 images, all of them go to DOM at once. Some of them will be visible some of them will not be visible especially on mobile devices or small screens. In order to avoid 25 `img` fetch requests i used `react-lazy-load-image-component` to only load the images visible to the user. By doing this we are not firing 25 network requests to load the images once rendered on the DOM.

# Folder Structure
As application we built is small, i thought of not being fancy with any folder structure like `Components` etc. It is very flat as far as files are concerned.

| File Name  | Purpose  |
|---|---|
| `App.tsx`  | Search Form and all the core logic resides here  |
| `Config.ts` | Basic configuration paramets like endpoints are defined here |
| `DetailsDialog.tsx`  |  Once a gif is clicked, it opens the modal. That modal is coded here in this file  |
| `MasonryGrid.tsx ` | The grid code copied from `@giphy/react-components` lives here with almost no any changes in it |
| `Svgs.tsx` | I decided not to use any icons package rather use simple SVG's. It was bloating `App.tsx` so i moved them here |
| `utils.ts` | `getGifHeight` was a function being used in `@giphy/utils` but it was using the height of animated gif not the still. So i compied it over here. Probably we don't need it and can be moved inside `MasonryGrid.tsx` |

# Core Logic

1. We are loading the trending gifs if we have no any form submission which is tracked using the controlled input 
2. There is a single function responsible for fetching gifs. If we have a form submission, we ignore the previous existing gifs in array. If we are scrolling downwards, it counts the number of gifs already in array to set the offset.
3. There was a case when you have submitted the search, but wants to go back to trending gifs again. I added a `close` icon button in search bar. Clicking it removes the existing gifs and goes back to the trending gif mode.


# Area of Improvements

1. I believe we can refactor `App.tsx` so that the conditional rendering is not being used widely
2. Test cases for the modal could be implemented to increase coverage area
3. In case of mobile devices or small screens where we have a single column, we can stop using `masonry` grid to avoid unnecessory calculations
