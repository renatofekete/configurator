import { ReactElement, useState } from 'react'

type multiStepProps = {
  component: ReactElement
  nextButton?: string
  handleBeforeNext?: () => boolean | Promise<boolean>
}

function useMultiStep(steps: multiStepProps[]) {
  const [step, setStep] = useState(0)

  const currentElement = steps[step].component

  async function next() {
    if (steps[step].handleBeforeNext) {
      const canProceed = await steps[step].handleBeforeNext()
      if (!canProceed) return
    }

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
        {step > 1 && step < steps.length - 1 && (
          <button onClick={back}>Nazad</button>
        )}
        {steps[step].nextButton && (
          <button onClick={next}>{steps[step].nextButton}</button>
        )}
      </>
    )
  }

  return { step, buttons, currentElement }
}

export default useMultiStep
