import React from 'react'

const BackgroundPage = () => {
  return (
    <div className='flex-col-tl gap-8'>
      <IntroSection />
      <VictimSection />
    </div>
  )
}

export default BackgroundPage

function IntroSection() {
  return (
    <div className='flex-col-tl gap-4'>
      <h1 className='text-2xl font-bold'>The Background Story</h1>
      <img
        className='w-full aspect-square object-cover saturate-0'
        src='/background-2.jpg'
        alt='evidence board'
      />
      <p>
        In the vibrant coastal city of Danang, an exclusive party has been
        organized at an atmospheric location known as the &quot;Dragon&#39;s
        Lair.&quot; The occasion is the celebration of the successful
        collaboration between Đen Vâu, the famous Vietnamese rapper, and Myles,
        the charismatic language teacher. The event is attended by a select
        group of individuals, each with their own secrets and motives.
      </p>
    </div>
  )
}

function VictimSection() {
  return (
    <div className='flex-col-tl gap-4'>
      <h1 className='text-xl font-bold'>The Victim</h1>
      <img
        className='w-full aspect-square object-cover saturate-0'
        src='/den.webp'
        alt='Den Vau the rapper'
      />
      <p>
        Đen Vâu, the famous Vietnamese rapper, was found dead during the party.
        The atmosphere quickly shifts from celebration to confusion and fear as
        the guests discover his lifeless body.
      </p>
    </div>
  )
}