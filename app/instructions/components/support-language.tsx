'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export const SupportLanguagePage = () => {
  const activeRound = useQuery(api.phased_rounds.getActiveRound)

  const [activeTab, setActiveTab] = useState(activeRound?.round_number ?? 0)

  return (
    <div className='flex-col-tl gap-4'>
      <div className='flex-col-tl gap-2'>
        <p>
          If you aren&#34;t sure what to say during each of the rounds, you can
          use some of the tips below to help you get started.
        </p>
      </div>
      <div className='tabs'>
        {['Mingle', 'Interview', 'Discussion'].map((tab, idx) => {
          const isActive = idx === activeTab

          return (
            <a
              onClick={() => setActiveTab(idx)}
              className={cn(
                'tab tab-bordered',
                isActive && 'tab-active text-accent'
              )}
              key={tab}
            >
              {tab}
            </a>
          )
        })}
      </div>
      {activeTab === 0 && <MinglePage />}
      {activeTab === 1 && <InterviewPage />}
      {activeTab === 2 && <DiscussionPage />}
    </div>
  )
}

function MinglePage() {
  return (
    <>
      <h3 className='text-xl font-bold text-accent'>Mingle Questions</h3>
      <div className='flex-col-tl gap-2'>
        <p className='text-accent italic'>Work or Study</p>
        <ol className='list-decimal ml-6'>
          <li>Do you work or study?</li>
          <li>What are your responsibilities?</li>
          <li>Why did you choose to do that type of work (or that job)?</li>
          <li>Is there some other kind of work you would rather do?</li>
          <li>What do you like/dislike about your job?</li>
        </ol>
        <p className='text-accent italic'>Hobbies</p>
        <ol className='list-decimal ml-6'>
          <li>Do you have a hobby?</li>
          <li>What equipment do you need for it?</li>
          <li>Do you think hobbies should be shared with other people?</li>
          <li>Why do you think people have hobbies?</li>
        </ol>
      </div>
    </>
  )
}

function InterviewPage() {
  return (
    <>
      <h3 className='text-xl font-bold text-accent'>
        Interview & Speaking Tips
      </h3>
      <div className='flex-col-tl gap-2'>
        <h3 className='font-bold italic text-warning'>
          A murder has happened and all are suspect, even you. Detail your
          alibi.
        </h3>
        <p>You should say:</p>
        <ol className='list-disc ml-6'>
          <li>Where you were</li>
          <li>Who you were with</li>
          <li>What you did</li>
        </ol>
        <p>Also explain when you last saw Dan.</p>
      </div>
      <div className='flex-col-tl gap-2'>
        <h3 className='text-xl font-bold text-accent'>
          Detective&#39;s Top Tips
        </h3>
        <p>
          As with most English texts, it&#39;s a good idea to structure your
          answers to these questions with the classical three parts:
        </p>
        <ul className='flex-col-tl gap-6'>
          <li className='flex-col-tl'>
            <h6 className='text-accent italic'>Introduction</h6>
            <p>
              Suggested language: Today I&#39;d like to talk about…. I chose
              this topic because…
            </p>
          </li>
          <li className='flex-col-tl'>
            <h6 className='text-accent italic'>Body</h6>
            <p>Use past continuous to set the scene.</p>
            <p>
              Past simple will be most of your story, and be in chronological
              order (i.e., the first action told happens first in time, the
              second action told happens second in time, and so on.)
            </p>
          </li>
          <li className='flex-col-tl'>
            <h6 className='text-accent italic'>Conclusion</h6>
            <p>
              a good way to finish is to talk about what you would do
              differently if you could do it again.
            </p>
          </li>
        </ul>
        <p>Also explain when you last saw Dan.</p>
      </div>
    </>
  )
}

function DiscussionPage() {
  return (
    <>
      <div className='flex-col-tl gap-2'>
        <h3 className='text-xl font-bold text-accent'>Discussion Tips</h3>
        <p>
          During your team meetings you can use these key words to guide your
          discussion.
        </p>
      </div>
      <ul className='flex-col-tl gap-6'>
        <li className='grid grid-cols-2 gap-2 items-center justify-center  border border-accent rounded-md p-4'>
          <h6 className='text-accent font-bold'>Speculate</h6>
          <div className='chat chat-end flex-col-tl gap-2 '>
            <p className='chat-bubble'>It&#39; likely that...</p>
            <p className='chat-bubble'>I&#39;m pretty sure that...</p>
          </div>
        </li>
        <li className='grid grid-cols-2 gap-2 items-center justify-center  border border-accent rounded-md p-4'>
          <h6 className='text-accent font-bold'>Compare</h6>
          <div className='chat chat-end flex-col-tl gap-2 '>
            <p className='chat-bubble'>[suspect 1] is (far) more…</p>
            <p className='chat-bubble'>
              [Sus 1] is … while on the other hand [Sus 2] is…
            </p>
            <p className='chat-bubble'>
              If we compare [Sus 1] and [Sus 2] then…
            </p>
          </div>
        </li>
        <li className='grid grid-cols-2 gap-2 items-center justify-center  border border-accent rounded-md p-4'>
          <h6 className='text-accent font-bold'>Reasons / Explanations</h6>
          <div className='chat chat-end flex-col-tl gap-2 '>
            <p className='chat-bubble'>One reason for this is…</p>
            <p className='chat-bubble'>Another reason is…</p>
            <p className='chat-bubble'>
              This is (could/might be) because/due to…
            </p>
          </div>
        </li>
        <li className='grid grid-cols-2 gap-2 items-center justify-center  border border-accent rounded-md p-4'>
          <h6 className='text-accent font-bold'>Agree and Disagree</h6>
          <div className='chat chat-end flex-col-tl gap-2 '>
            <p className='chat-bubble'>I definitely agree that…</p>
            <p className='chat-bubble'>I definitely agree that…</p>
            <p className='chat-bubble'>
              I&#39;m not sure I agree with that because…
            </p>
          </div>
        </li>
        <li className='grid grid-cols-2 gap-2 items-center justify-center  border border-accent rounded-md p-4'>
          <h6 className='text-accent font-bold'>Expressing uncertainty</h6>
          <div className='chat chat-end flex-col-tl gap-2 '>
            <p className='chat-bubble'>I ’m not sure but I think it’s…</p>
            <p className='chat-bubble'>
              It’s difficult to say, but I know many…
            </p>
            <p className='chat-bubble'>I can’t say for sure, but I think…</p>
          </div>
        </li>
      </ul>
    </>
  )
}
