// ToastHandler.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { useQuery } from 'convex/react-internal'
import { api } from '@/convex/_generated/api'
import { NotificationToast } from './notification-toast'

export const ToastHandler: React.FC = () => {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const user = useQuery(api.users.getFromSession)
  const invites = useQuery(api.invitations.getFromSessionByUser)
  const requests = useQuery(api.requests.getFromSessionByTeam)

  const reports = useQuery(api.clues.getAll)
  const { newReportDetected } = useDetectReportRelease()

  useEffect(() => {
    if (!user?.is_captain && Array.isArray(invites) && invites?.length > 0) {
      setShowToast(true)
      setToastMessage(
        `You have ${invites.length} pending invitation${
          invites.length > 1 ? 's' : ''
        }.`
      )
    } else if (
      user?.is_captain &&
      Array.isArray(requests) &&
      requests?.length > 0
    ) {
      setShowToast(true)
      setToastMessage(
        `You have ${requests?.length} pending request${
          requests?.length > 1 ? 's' : ''
        }.`
      )
    }

    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }, [invites, requests])

  useEffect(() => {
    if (newReportDetected) {
      setShowToast(true)
      setToastMessage('New evidence report available!')
    }

    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }, [newReportDetected])

  const closeToast = () => {
    setShowToast(false)
  }

  return (
    user &&
    showToast && (
      <NotificationToast message={toastMessage} onClose={closeToast} />
    )
  )
}

function useDetectReportRelease() {
  const [currReleased, setcurrReleased] = useState(0)
  const [newReportDetected, setNewReportDetected] = useState(false)

  // get reports.
  const reports = useQuery(api.clues.getAll)

  // get all released reports.
  const dbNumReleased = reports?.filter((rep) => rep.released).length

  useEffect(() => {
    // if number of released reports changes, set report detected.
    if (typeof dbNumReleased === 'number' && currReleased < dbNumReleased) {
      setNewReportDetected(true)
    }

    // update detection var to match db qty.
    if (typeof dbNumReleased === 'number') setcurrReleased(dbNumReleased)

    setTimeout(() => {
      setNewReportDetected(false)
    }, 2000)
  }, [dbNumReleased, reports])


  return { newReportDetected }
}
