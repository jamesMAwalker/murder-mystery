'use client'
/*
  TODO: Build this Page
  # I decided to build this page first before deciding how to structure the back end code for creating notes.
   # My current thought is that we don't need to categorize notes by round. Instead we should organize notes by character (suspect). All notes will be in relevance to some character's whereabouts, motivations, associated objects, etc.
  # How should we display suspects? I'll first try a dropdown with images, but also considering a 4 column grid, or possible a series of stacked tabs. In any case, it should be compact enough to allow the notes content to be at least 50% of the vertical viewport. This way users still understand where they are in the app. 
*/

import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'
import { cn } from '@/lib/utils'
import { useConvexAuth, useMutation, useQuery } from 'convex/react-internal'
import { useEffect, useRef, useState } from 'react'

const NotesPage = ({ params }: any) => {
  const [selectedSuspect, setSelectedSuspect] = useState(0)

  const suspects = useQuery(api.suspects.getAll)

  return (
    <div className='flex-col-tl gap-10'>
      <div className='HEADING flex-col-tl gap-4'>
        <h1 className='text-2xl font-bold'>Detective&apos;s Notes</h1>
        <p>
          Collect details from each of the suspects and record your thoughts
          here.
        </p>
      </div>
      <div className='full flex-col-tl gap-4'>
        <h2>Choose a Suspect</h2>
        <ul className='w-full grid grid-cols-3 gap-4'>
          {suspects?.map((sus, idx) => {
            const selectedStyle =
              idx === selectedSuspect ? 'border-secondary' : 'border-neutral'

            return (
              <li
                key={sus._id}
                onClick={() => setSelectedSuspect(idx)}
                className={cn(
                  'relative rounded-md w-full flex-col-bl aspect-square border border-4 p-2',
                  selectedStyle
                )}
              >
                <span className='relative z-10 badge badge-neutral'>
                  {sus.suspect_name}
                </span>
                <img
                  src={sus.image_url!}
                  alt={sus.suspect_name}
                  className='absolute object-cover full inset-0'
                />
              </li>
            )
          })}
        </ul>
      </div>
      {suspects && <NoteForm suspect={suspects[selectedSuspect]} />}
    </div>
  )
}

export default NotesPage

function NoteForm({ suspect }: { suspect: Doc<'suspects'> }) {
  const [hasExistingNote, setHasExistingNote] = useState(false)
  
  const existingNoteRef = useRef(null)
  const newNoteRef = useRef(null)

  const suspectNote = useQuery(api.notes.getFromSessionByUser, {
    suspect_id: suspect._id
  })
  
  const [existingNoteContent, setExistingNoteContent] = useState(suspectNote?.note)
  const updateExistingNote = useMutation(api.notes.update)
  const handleUpdateExisting = () => {
    updateExistingNote({
      note_id: suspectNote?._id!,
      note_content: existingNoteContent!
    })
  }
  
  
  const [newNoteContent, setNewNoteContent] = useState('Record your notes here...')
  const saveNewNote = useMutation(api.notes.create)
  const handleSaveNew = () => {
    if (newNoteRef.current !== null) {
      const noteContent = newNoteRef?.current['value']

      const savedNoteId = saveNewNote({
        suspect_id: suspect._id,
        note_content: noteContent
      })
      console.log('savedNoteId: ', savedNoteId)
    }
  }

  useEffect(() => {
    setHasExistingNote(!!suspectNote)
  }, [suspectNote])

  return hasExistingNote ? (
    <div className='NOTE_TEST flex-col-tl gap-4 w-full'>
      <div className='flex w-full justify-between items-center'>
        <h4 className='font-bold'>Notes on {suspect.suspect_name}</h4>
        <button onClick={handleUpdateExisting} className='btn btn-primary'>Save</button>
      </div>
      <textarea
        ref={existingNoteRef}
        value={existingNoteContent}
        onChange={(e) => setExistingNoteContent(e.target.value)}
        className='border border-accent w-full textarea textarea-bordered bg-transparent textarea-lg w-full aspect-square'
      />
    </div>
  ) : (
    <div className='NOTE_TEST flex-col-tl gap-4 w-full'>
      <div className='flex w-full justify-between items-center'>
        <h4 className='font-bold'>Notes on {suspect.suspect_name}</h4>
        <button onClick={handleSaveNew} className='btn btn-primary'>
          Save
        </button>
      </div>
      <textarea
        ref={newNoteRef}
        className='border border-secondary w-full textarea textarea-bordered bg-transparent textarea-lg w-full aspect-square'
        value={newNoteContent}
        onChange={(e) => setNewNoteContent(e.target.value)}
      />
    </div>
  )
}
