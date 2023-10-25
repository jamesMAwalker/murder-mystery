export default function Home() {
  return (
    <main className='flex min-h-screen flex flex-col items-center justify-start'>
      <div className='HERO flex-col-center w-4/5 py-10 gap-4'>
        <h1 className='text-3xl font-bold w-full flex-center py-4 border-b border-red-500'>
          <span className='text-red-500'>Murder</span>
          <span className='text-slate-100'>Mystery</span>
        </h1>
        <p className='SUBTITLE text-lg font-bold'>
          Electronic Detective’s Notebook
        </p>
        <img
          src='/notebook.png'
          alt=''
          className='w-full lg:w-1/2 lg:rounded-lg aspect-square object-cover'
        />
        <p className='flex-col-tl gap-4'>
          <span>
            Who is the murderer! Put your English skills to the test by
            interviewing suspects, taking written notes on their stories, and
            collaborating with other students to figure out whodunnit.
          </span>
          <span>
            This Electronic Detective&#39;s handbook includes all the
            information and tools you need to get to the bottom of the mystery.
            Take notes on each of the suspects on your notebook page, review
            evidence that comes through in your reports inbox, and review
            background details at any time from the story and suspects pages.
          </span>
          <span className='italic font-bold text-red-500'>Happy hunting!</span>
        </p>
      </div>
    </main>
  )
}
