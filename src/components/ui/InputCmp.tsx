import styles from './input.module.scss'
import ErrorMessageCmp from './ErrorMessageCmp'

type InputCmpProps = {
  name: string
  value: string
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  placeholder?: string
  type?: string
  label?: string
  as?: 'input' | 'textarea'
  errorMessage?: string
}

function InputCmp({
  type = 'text',
  name,
  value,
  handleChange,
  label,
  placeholder,
  as = 'input',
  errorMessage,
}: InputCmpProps) {
  return (
    <div className={`${styles.input} ${errorMessage ? styles.error : ''}`}>
      {label && <label>{label}</label>}
      {as === 'input' ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      )}
      {errorMessage && <ErrorMessageCmp errorMessage={errorMessage} />}
    </div>
  )
}

export default InputCmp
