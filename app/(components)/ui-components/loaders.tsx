import { cn } from '@/lib/utils'

export const SectionLoader = ({ classes }: { classes?: string }) => {
  return (
    <div
      className={cn(
        'flex justify-start animate-pulse full bg-slate-400/10 rounded-md p-4',
        classes
      )}
    >
      <span className='loading loading-ring loading-lg scale-50 origin-left' />
    </div>
  )
}

export const SingleLoader = ({ classes }: { classes?: string }) => {
  return (
    <div className={cn('h-auto w-auto', classes)}>
      <span className='loading loading-ring loading-lg scale-50' />
    </div>
  )
}
