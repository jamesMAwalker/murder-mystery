/*
  TODO
  # Refactor this route so that [page] becomes folders: instructions, background, suspects, and notes. These folders will change their content based on the selected round, which is determined by the url param 'round' and destructured from the 'params' object received by each page. For all pages except notes, content will be stored in either json or js object inside the same folder as the page.tsx. For notes, data will come from convex.

  # We will need to add a table to convex for storing notes. These tables should be linked to each user via id. 
*/

import React from 'react'

interface IPageParams {
  params: any
}

const page = ({ params }: IPageParams) => {
  console.log('params: ', params);
  return (
    <div className='flex  gap-4'>
      <span className='badge p-4'>{params.round}</span>
      <span className='badge p-4'>{params.page}</span>
    </div>
  )
}

export default page