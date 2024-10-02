let worker: Worker
function setupTimerWorker() {
  const blob = new Blob([
    `setInterval(function () {
        postMessage(1)
      }, 1000)
    `,
  ])

  const url = window.URL.createObjectURL(blob)
  worker = new Worker(url)
}

export const accurateSecondTimer = (callback: () => void) => {
  if (!worker) setupTimerWorker()
    worker.addEventListener('message', callback)
  return () => worker.removeEventListener('message', callback)
}
