import styles from './button.module.scss'

type ButtonSizeByVariant =
  | { variant: 'primary'; size: 'big' | 'small' | 'icon' }
  | { variant: 'secondary' }
  | { variant: 'tertiary'; size: 's' | 'xs' }

type ButtonCmpProps = ButtonSizeByVariant & {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  text?: string
  icon?: React.ReactNode
  disabled?: boolean
}

function ButtonCmp({
  handleClick,
  text,
  icon,
  variant,
  size,
  disabled,
}: ButtonCmpProps) {
  const buttonClass = `${styles.btn} ${styles[variant]} ${
    size ? styles[size] : styles.small
  }`

  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled}>
      {text && text} {icon && icon}
    </button>
  )
}

export default ButtonCmp
