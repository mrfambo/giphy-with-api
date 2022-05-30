import { ReactElement } from 'react'

export function LoadingSVG(): ReactElement {
  return (
    <svg
      className="animate-spin h-5 w-5 text-black"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}

export function SearchSVG(): ReactElement {
  return (
    <svg
      className="w-5 h-5 text-gray-500"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  )
}

export function LoadingGifsSVG(): ReactElement {
  return (
    <svg
      width="50px"
      height="50px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <defs>
        <filter
          id="ldio-7fpgppedcp9-filter"
          x="-100%"
          y="-100%"
          width="300%"
          height="300%"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation="2.4000000000000004"
          ></feGaussianBlur>
          <feComponentTransfer result="cutoff">
            <feFuncA type="table" tableValues="0 0 0 0 0 0 1 1 1 1 1"></feFuncA>
          </feComponentTransfer>
        </filter>
      </defs>
      <g filter="url(#ldio-7fpgppedcp9-filter)">
        <g transform="translate(50 50)">
          <g>
            <circle cx="17" cy="0" r="5" fill="#e15b64">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.5999999999999996;8.399999999999999;3.5999999999999996"
                dur="4s"
                repeatCount="indefinite"
                begin="-0.25s"
              ></animate>
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="4s"
              repeatCount="indefinite"
              begin="0s"
            ></animateTransform>
          </g>
        </g>
        <g transform="translate(50 50)">
          <g>
            <circle cx="17" cy="0" r="5" fill="#f47e60">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.5999999999999996;8.399999999999999;3.5999999999999996"
                dur="2s"
                repeatCount="indefinite"
                begin="-0.2s"
              ></animate>
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="2s"
              repeatCount="indefinite"
              begin="-0.05s"
            ></animateTransform>
          </g>
        </g>
        <g transform="translate(50 50)">
          <g>
            <circle cx="17" cy="0" r="5" fill="#f8b26a">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.5999999999999996;8.399999999999999;3.5999999999999996"
                dur="1.3333333333333333s"
                repeatCount="indefinite"
                begin="-0.15s"
              ></animate>
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="1.3333333333333333s"
              repeatCount="indefinite"
              begin="-0.1s"
            ></animateTransform>
          </g>
        </g>
        <g transform="translate(50 50)">
          <g>
            <circle cx="17" cy="0" r="5" fill="#abbd81">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.5999999999999996;8.399999999999999;3.5999999999999996"
                dur="1s"
                repeatCount="indefinite"
                begin="-0.1s"
              ></animate>
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="1s"
              repeatCount="indefinite"
              begin="-0.15s"
            ></animateTransform>
          </g>
        </g>
        <g transform="translate(50 50)">
          <g>
            <circle cx="17" cy="0" r="5" fill="#849b87">
              <animate
                attributeName="r"
                keyTimes="0;0.5;1"
                values="3.5999999999999996;8.399999999999999;3.5999999999999996"
                dur="0.8s"
                repeatCount="indefinite"
                begin="-0.05s"
              ></animate>
            </circle>
            <animateTransform
              attributeName="transform"
              type="rotate"
              keyTimes="0;1"
              values="0;360"
              dur="0.8s"
              repeatCount="indefinite"
              begin="-0.2s"
            ></animateTransform>
          </g>
        </g>
      </g>
    </svg>
  )
}

export function CloseIconSVG(): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  )
}
