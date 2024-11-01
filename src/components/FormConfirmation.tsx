import { useConfiguratorContext } from '../context/ConfiguratorContext'

function FormConfirmation() {
  const { configurator } = useConfiguratorContext()
  const { manufacturer, name, note, telephone, email } = configurator

  return (
    <div>
      <h4>Pregled i potvrda vašeg odabira</h4>
      <p>
        Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko želite
        promijeniti neki od podataka, vratite se na prethodni korak. Kada ste
        provjerili ispravnost svojih podataka, za slanje upita na servis
        pritisnite gumb “Pošalji”.
      </p>
      <div>
        <h4>Model vozila</h4>
        <p>{manufacturer}</p>
        <h4>Odabrane usluge</h4>
        <ul>
          <li>
            <p>Zamjena ulja i filtera</p> <p>65,00 €</p>
          </li>
          <li>
            <p>Servis klima uređaja</p> <p>40,00 €</p>
          </li>
          <li>
            <p>
              <span>Popust 20%:</span> -21,00 €
            </p>
          </li>
          <li>
            <p>
              <span>Ukupno:</span>84,00 €
            </p>
          </li>
        </ul>
        <h4>Kontakt podaci</h4>
        <p>Ime i prezime: {name}</p>
        <p>Email adresa: {email}</p>
        <p>Broj telefona: {telephone}</p>
        <p>Napomena: {note}</p>
      </div>
    </div>
  )
}

export default FormConfirmation
