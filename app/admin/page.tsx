import { ReportSection } from './reporting-section'
import { RoundsSection } from './rounds-section'

const AdminDashboard = () => {
  
  return (
    <div className='flex-col-tl gap-24 w-full'>
      <div className='INTRO flex-col-tl gap-2 w-full'>
        <h1 className='text-2xl font-bold'>Admin Dashboard</h1>
        <p>
          Welcome, Admin! Control the flow of the game from this panel. Round
          timers and report submissions, as well as team management can be
          handled on this page.
        </p>
      </div>
      <RoundsSection />
      <ReportSection />
    </div>
  )
}

export default AdminDashboard