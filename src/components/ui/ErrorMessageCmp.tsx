import styles from './errormessage.module.scss'

type ErrorMessageCmpProps = {
  errorMessage: string
}
function ErrorMessageCmp({ errorMessage }: ErrorMessageCmpProps) {
  return <p className={styles.error}>{errorMessage}</p>
}

export default ErrorMessageCmp
