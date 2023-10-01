import React from 'react'

export const ProfileIcon = ({ fill = 'currentColor' }: { fill?: string }) => {
  return (
    <svg
      width='23'
      height='22'
      viewBox='0 0 23 22'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M6.72222 5.27778C6.72222 4.01063 7.22559 2.79539 8.1216 1.89938C9.01761 1.00337 10.2329 0.5 11.5 0.5C12.7671 0.5 13.9824 1.00337 14.8784 1.89938C15.7744 2.79539 16.2778 4.01063 16.2778 5.27778C16.2778 6.54492 15.7744 7.76017 14.8784 8.65618C13.9824 9.55218 12.7671 10.0556 11.5 10.0556C10.2329 10.0556 9.01761 9.55218 8.1216 8.65618C7.22559 7.76017 6.72222 6.54492 6.72222 5.27778ZM6.72222 12.4444C5.13829 12.4444 3.61923 13.0737 2.49922 14.1937C1.37921 15.3137 0.75 16.8327 0.75 18.4167C0.75 19.367 1.12753 20.2785 1.79953 20.9505C2.47154 21.6225 3.38297 22 4.33333 22H18.6667C19.617 22 20.5285 21.6225 21.2005 20.9505C21.8725 20.2785 22.25 19.367 22.25 18.4167C22.25 16.8327 21.6208 15.3137 20.5008 14.1937C19.3808 13.0737 17.8617 12.4444 16.2778 12.4444H6.72222Z'
        fill={fill}
      />
    </svg>
  )
}
