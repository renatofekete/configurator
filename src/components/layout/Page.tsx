import Header from './Header'
import styles from './page.module.scss'

type PageProps = {
  children: React.ReactNode
}

function Page({ children }: PageProps) {
  return (
    <div className={styles.page}>
      <Header />
      {children}
    </div>
  )
}

export default Page
