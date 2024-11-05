import styles from './info.module.scss'

type InfoProps = {
  title: string
  content: string
  icon: JSX.Element
}

function Info({ title, content, icon }: InfoProps) {
  return (
    <div className={styles.info}>
      {icon}
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  )
}

export default Info
