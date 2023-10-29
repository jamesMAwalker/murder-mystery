import React from "react";

const BackgroundPage = () => {
  return (
    <div className="flex-col-tl gap-8">
      <IntroSection />
      <VictimSection />
    </div>
  );
};

export default BackgroundPage;

function IntroSection() {
  return (
    <div className='flex-col-tl gap-4'>
      <h1 className='text-2xl font-bold'>
        The Slain Influencer and{' '}
        <span className='text-warning'>The Haunted Cham Ruins</span>
      </h1>
      <img
        className='w-full aspect-square lg:aspect-[20/7] lg:object-center object-cover saturate-0'
        src='/background-2.jpg'
        alt='evidence board'
      />
      <p>
        In the vibrant coastal city of Danang, an exclusive party has been
        organized at an atmospheric location known as the &ldquo;Dragon&rsquo;s
        Lair.&rdquo; The occasion is the celebration of the successful
        collaboration between Đen Vâu, the famous Vietnamese rapper, and Myles,
        the charismatic teacher and rising star in the language teaching sector.
      </p>
      <p>
        You find yourself in the midst of a murder investigation of The Slain
        Influencer at the Cham Ruins in Central Vietnam. You are the
        videographer for a famous TikTok Influencer who investigates haunted
        areas. You have a deep history of working together to explore famous
        haunted places in Vietnam. At some point in the recent past, the Rival
        approached you and tried to bribe you, to sabotage the Influencer&#39;s
        videos. You rejected these advances. During your time at the ruins, the
        groundskeeper has been very difficult to work with, not being supportive
        and refusing to help out or even get in the way of potential videos. The
        Influencer even asked to borrow some incense which the groundskeeper
        refused to do, despite obviously having some in his shack. You have long
        harbored secret love of the influencer, and recently confessed these
        feelings to her, only to have your heart broken with a brutal and
        callous rejection. You&#39;ve stormed off and wrote a letter to the
        influencer venting your upset emotions which you keep in a box in the
        large chamber. Probably you were never going to give it to the
        Influencer but you haven&#39;t made up your mind yet. You have access to
        the Influencer&#39;s cloud storage and can see that she&#39;s uploaded
        one final video.
      </p>
    </div>
  )
}

function VictimSection() {
  return (
    <div className='flex-col-tl gap-4'>
      <h1 className='text-xl font-bold'>The Victim</h1>
      <img
        className='w-full aspect-square lg:aspect-[20/7] lg:object-top object-cover saturate-0'
        src='https://res.cloudinary.com/jameswalker-work/image/upload/v1698586325/murder-mystery/tiktok_vdg7ca.jpg'
        alt='tiktok influencer'
      />
      <p>
        A famous international TikTok Influencer - Known for their viral TikTok
        videos about haunted places.
      </p>
    </div>
  )
}
