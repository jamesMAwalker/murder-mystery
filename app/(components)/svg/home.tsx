import React from 'react'

export const HomeIcon = ({ fill = 'currentColor' }: { fill?: string }) => {
  return (
    <svg
      width='26'
      height='22'
      viewBox='0 0 26 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.5 21.25V13.75H15.5V21.25H21.75V11.25H25.5L13 0L0.5 11.25H4.25V21.25H10.5Z'
        fill={fill}
      />
    </svg>
  )
}
