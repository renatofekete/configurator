import styles from './button.module.scss'

type ButtonSizeByVariant =
  | { variant: 'primary'; size: 'big' | 'small' | 'icon' }
  | { variant: 'secondary' }
  | { variant: 'tertiary'; size: 's' | 'xs' }

type ButtonCmpProps = ButtonSizeByVariant & {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  text?: string
  icon?: React.ReactNode
}

function ButtonCmp({ handleClick, text, icon, variant, size }: ButtonCmpProps) {
  const buttonClass = `${styles.btn} ${styles[variant]} ${
    size ? styles[size] : styles.small
  }`

  return (
    <button className={buttonClass} onClick={handleClick}>
      {text && text} {icon && icon}
    </button>
  )
}

export default ButtonCmp
