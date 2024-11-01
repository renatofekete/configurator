import Intro from './Intro'
import useMultiStep from '../hooks/useMultiStep'
import Form from './Form'
import FormConfirmation from './FormConfirmation'
import ThankYou from './ThankYou'

function ConfigWrapper() {
  const { step, buttons, currentElement } = useMultiStep([
    <Intro />,
    <Form />,
    <FormConfirmation />,
    <ThankYou />,
  ])

  return (
    <>
      <div>{step}</div>
      <div>{buttons()}</div>
      {currentElement}
    </>
  )
}

export default ConfigWrapper
