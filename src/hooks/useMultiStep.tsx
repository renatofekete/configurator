import { ReactElement, useState } from 'react'
import ButtonCmp from '../components/ui/ButtonCmp'

type multiStepProps = {
  component: ReactElement
  nextButton?: string
  handleBeforeNext?: () => boolean | Promise<boolean>
  isNextDisabled?: boolean
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
          <ButtonCmp handleClick={back} text='Nazad' variant='secondary' />
        )}
        {steps[step].nextButton && (
          <ButtonCmp
            handleClick={next}
            text={steps[step].nextButton}
            variant='primary'
            size='small'
            disabled={steps[step].isNextDisabled}
          />
        )}
      </>
    )
  }

  return { step, buttons, currentElement }
}

export default useMultiStep
