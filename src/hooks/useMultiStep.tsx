import { ReactElement, useState } from 'react'

function useMultiStep(steps: ReactElement[]) {
  const [step, setStep] = useState(0)

  const currentElement = steps[step]

  function next() {
    setStep((i) => {
      if (i >= steps.length - 1) return i
      return i + 1
    })
  }

  function back() {
    setStep((i) => {
      if (i <= 0) return i
      return i - 1
    })
  }

  function buttons() {
    return (
      <>
        <button onClick={back} disabled={step === 0}>
          Back
        </button>
        <button onClick={next} disabled={step === steps.length - 1}>
          Next
        </button>
      </>
    )
  }

  return { step, buttons, currentElement }
}

export default useMultiStep
