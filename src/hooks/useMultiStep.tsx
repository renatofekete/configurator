import { ReactElement, useState } from 'react'

type multiStepProps = {
  component: ReactElement
  nextButton?: string
  handleBeforeNext?: () => boolean
}

function useMultiStep(steps: multiStepProps[]) {
  const [step, setStep] = useState(0)

  const currentElement = steps[step].component

  function next() {
    if (steps[step].handleBeforeNext && !steps[step].handleBeforeNext()) return
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
          Nazad
        </button>
        {steps[step].nextButton && (
          <button onClick={next} disabled={step === steps.length - 1}>
            {steps[step].nextButton}
          </button>
        )}
      </>
    )
  }

  return { step, buttons, currentElement }
}

export default useMultiStep
