import styles from './badge.module.scss'

type BadgeCmpProps = {
  text: string
  icon: JSX.Element
  handleClick?: () => void
}

function BadgeCmp({ text, icon, handleClick }: BadgeCmpProps) {
  return (
    <div className={styles.badge}>
      {text} <span onClick={handleClick}>{icon}</span>
    </div>
  )
}

export default BadgeCmp
