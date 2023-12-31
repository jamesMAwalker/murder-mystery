'use client'
/*
  TODO: Build this Page
  # I decided to build this page first before deciding how to structure the back end code for creating notes.
   # My current thought is that we don't need to categorize notes by round. Instead we should organize notes by character (suspect). All notes will be in relevance to some character's whereabouts, motivations, associated objects, etc.
  # How should we display suspects? I'll first try a dropdown with images, but also considering a 4 column grid, or possible a series of stacked tabs. In any case, it should be compact enough to allow the notes content to be at least 50% of the vertical viewport. This way users still understand where they are in the app.
*/

import { useEffect, useRef, useState } from 'react'
import { useConvexAuth, useMutation, useQuery } from 'convex/react-internal'
import { useSelectedSuspect } from '../(context)/suspect.context'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'

import { cn } from '@/lib/utils'
import { GENERAL_NOTE } from './data'
import { SectionLoader } from '../(components)/ui-components/loaders'

const NotesPage = ({ params }: any) => {
  // get suspects.
  const suspects = useQuery(api.suspects.getAll)

  // handle displayed notes (by suspect).
  const { selectedSuspectId } = useSelectedSuspect()
  const [selectedSuspect, setSelectedSuspect] = useState<
    string | null | undefined
  >(suspects?.at(0)?._id)

  useEffect(() => {
    if (Array.isArray(suspects)) {
      setSelectedSuspect(suspects[0]._id)
    }
  }, [suspects])

  const suspect = suspects?.find((s) => s._id === selectedSuspect)!

  return (
    <div className='flex-col-tl lg:h-full gap-10'>
      <div className='HEADING flex-col-tl gap-4'>
        <h1 className='text-2xl font-bold'>Detective&apos;s Notes</h1>
        <p>
          Collect details from each of the suspects and record your thoughts
          here.
        </p>
      </div>

      <div className='full flex-col-tl gap-4'>
        <h2>Choose a Suspect</h2>
        {Array.isArray(suspects) ? (
          <ul className='w-full grid grid-cols-3 lg:grid-cols-6 gap-4'>
            {[...suspects, GENERAL_NOTE]?.map((sus, idx) => {
              const selectedStyle = sus._id === selectedSuspect

              return (
                <li
                  key={sus._id}
                  onClick={() => setSelectedSuspect(sus._id)}
                  className={cn(
                    'SUSPECT_PORTRAIT relative rounded-md w-full flex-col-bl aspect-square border border-4 p-2',
                    selectedStyle ? 'border-secondary' : 'border-neutral'
                  )}
                >
                  <span
                    className={cn(
                      'relative z-10 badge badge-neutral',
                      selectedStyle ? 'badge-secondary' : 'badge-neutral'
                    )}
                  >
                    {sus.suspect_name}
                  </span>
                  <img
                    src={sus.image_url!}
                    alt={sus.suspect_name}
                    className='absolute object-cover full inset-0 rounded-sm'
                  />
                </li>
              )
            })}
          </ul>
        ) : (
          <SectionLoader classes='items-start' />
        )}
      </div>
      {selectedSuspect && suspect ? (
        <NoteForm
          suspect={suspect}
          selectedSuspectId={selectedSuspectId}
          selectedSuspect={selectedSuspect}
        />
      ) : (
        <SectionLoader classes='items-start' />
      )}
    </div>
  )
}

export default NotesPage

function NoteForm({
  suspect,
  selectedSuspect,
  selectedSuspectId
}: {
  suspect: Doc<'suspects'>
  selectedSuspect: string | null
  selectedSuspectId: string | null
}) {
  const suspectNote = useQuery(api.notes.getFromSessionByUser, {
    suspect_id: suspect?._id
  })

  // notification controls.
  const [showNotification, setShowNotification] = useState(false)
  const handleShowNotification = () => {
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  // control "if existing" state.
  const [hasExistingNote, setHasExistingNote] = useState(false)
  useEffect(() => {
    if (!suspectNote?.note) {
      setExistingNoteContent('')
    } else {
      setExistingNoteContent(suspectNote.note)
    }
  }, [suspectNote?.note, selectedSuspect])

  // existing note controls.
  const [existingNoteContent, setExistingNoteContent] = useState<string>('')
  const updateExistingNote = useMutation(api.notes.update)
  const handleUpdateExisting = () => {
    updateExistingNote({
      note_id: suspectNote?._id!,
      note_content: existingNoteContent!
    })
    handleShowNotification()
  }

  useEffect(() => {
    console.log('existingNoteContent changed: ', existingNoteContent)
  }, [existingNoteContent])

  // new note controls.
  const [newNoteContent, setNewNoteContent] = useState<string | null>(null)
  const saveNewNote = useMutation(api.notes.create)
  const handleSaveNew = () => {
    saveNewNote({
      suspect_id: suspect._id,
      note_content: newNoteContent || ''
    })
    ;(document?.activeElement as HTMLTextAreaElement)?.blur() // unfocus input so it shifts from create to update
    handleShowNotification()
  }

  const handleSaveAction = (isNew: boolean) => {
    if (isNew) {
      console.log('creating new note!')
      handleSaveNew()
    } else {
      console.log('saving udpated note!')
      handleUpdateExisting()
    }
  }

  // display either existing note or placeholder input
  useEffect(() => {
    setHasExistingNote(!!suspectNote)
  }, [suspectNote, suspect.suspect_name, selectedSuspect, selectedSuspectId])

  return (
    <div className='flex-col-tl relative w-full'>
      <div className='NOTE_EXISTING flex-col-tl gap-4 w-full'>
        <div className='flex w-full justify-between items-end relative'>
          <h4 className='font-bold'>
            Notes on{' '}
            <span className='text-secondary'>{suspect.suspect_name}</span>
          </h4>
          <div className='flex items-end justify-center gap-4'>
            {showNotification && (
              <p className='text-primary font-bold'>Note Saved.</p>
            )}
            <button
              onClick={() => handleSaveAction(!hasExistingNote)}
              className='btn btn-primary'
            >
              Save
            </button>
          </div>
        </div>
        <textarea
          placeholder='Record your notes here...'
          value={existingNoteContent}
          onChange={(e) => setExistingNoteContent(e.target.value)}
          className='border border-secondary focus:border-primary focus:!bg-slate-900 w-full textarea textarea-bordered bg-transparent textarea-lg w-full aspect-square lg:aspect-video'
        />
      </div>
    </div>
  )
}
