/*
  TODO: Build this Page
  # I decided to build this page first before deciding how to structure the back end code for creating notes.
   # My current thought is that we don't need to categorize notes by round. Instead we should organize notes by character (suspect). All notes will be in relevance to some character's whereabouts, motivations, associated objects, etc.
  # How should we display suspects? I'll first try a dropdown with images, but also considering a 4 column grid, or possible a series of stacked tabs. In any case, it should be compact enough to allow the notes content to be at least 50% of the vertical viewport. This way users still understand where they are in the app. 
*/


const NotesPage = ({ params }: any) => {
  return (
    <div className='flex-col-tl gap-4'>
      <h1 className='text-2xl font-bold'>Detective&apos;s Notes</h1>
      <p>Collect details from each of your interviews and record them here.</p>
    </div>
  )
}

export default NotesPage