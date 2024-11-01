import styles from './header.module.scss'

function Header() {
  return (
    <div className={styles.header}>
      <h1>Konfigurator servisa</h1>
      <nav>
        <ul>
          <li>
            <a href='#'>Izračunajte trošak servisa</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Header
