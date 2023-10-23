export const SectionLoader = () => {
  return (
    <div className='flex justify-start animate-pulse full bg-slate-400/10 rounded-md p-4'>
      <span className='loading loading-ring loading-lg scale-50 origin-left' />
    </div>
  )
}

export const SingleLoader = () => {
  return (
    <div className='h-auto w-auto'>
      <span className='loading loading-ring loading-lg scale-50' />
    </div>
  )
}