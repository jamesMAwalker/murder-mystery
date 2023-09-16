'use client'

import { useState, useRef, SyntheticEvent } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useCollectFormData } from '../(hooks)/utility/useCollectFormData'

const RegisterPage = () => {
  const { isLoaded, signUp, setActive } = useSignUp()

  const { formRef, getData } = useCollectFormData()

  const verificationRef = useRef(null)
  const [isPendingVerification, setIsPendingVerification] = useState(false)

  const onPressVerify = (e: SyntheticEvent) => {
    e.preventDefault()

    console.log('verifying...')
  }

  const inputs = [{ label: 'email' }, { label: 'name' }, { label: 'password' }]

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const data = getData()
    console.log('data: ', data);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className='flex flex-col items-start justify-start gap-4 rounded-md '
      >
        {inputs.map(({ label }) => {
          return (
            <input
              key={label}
              type='text'
              placeholder={label}
              className='input input-bordered w-full max-w-xs'
            />
          )
        })}
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      {isPendingVerification && (
        <form onSubmit={onPressVerify} className='flex flex-col items-start justify-start gap-4 rounded-md'>
          <input
            className='input input-bordered w-full max-w-xs'
            placeholder='Enter verification code...'
            ref={verificationRef}
          />
          <button className="btn" type='submit'>
            Submit Verification Code
          </button>
        </form>
      )}
    </div>
  )
}

export default RegisterPage
