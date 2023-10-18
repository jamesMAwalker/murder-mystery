export function secondsToMinutesAndSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)

  const seconds = totalSeconds - minutes * 60

  return { minutes, seconds }
}