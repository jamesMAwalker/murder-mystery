'use client';

import React from 'react'
import { useQuery, useMutation } from 'convex/react'

import { api } from '@/convex/_generated/api'


export function ReportSection() {
  const reports = useQuery(api.clues.getAll)

  const releaseReport = useMutation(api.clues.release)

  function handleReleaseReport() {
    // releaseReport()
  }

    // const longPress = useLongPress(handleResetGame, { delay: 1000 })

  return (
    <div className='w-full rounded-md flex-col-tl gap-8'>
      <h2 className='text-xl font-bold'>Manage Reports</h2>
      <ul className='w-full flex-col-tl gap-4'>
        {reports?.map((report) => {
          return (
            <li
              className='flex-col-tl p-4 rounded-md gap-4 w-full border border-warning'
              key={report?._id}
            >
              <div className='TEXT_CONTENT flex-col-tl gap-2'>
                <label className='text-sm tracking-widest uppercase'>
                  Report #{report.order}
                </label>
                <h4 className='font-bold text-lg'>{report.title}</h4>
                <p>{report.content}</p>
              </div>
              <button className='w-full btn btn-warning'>Release Report (Long Press)</button>
              <button className='w-full btn btn-warning btn-outline'>
                Retract Report
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
