import { useConfiguratorContext } from '../context/ConfiguratorContext'
import { calculateTotalPrice, format } from '../utils/price'

import styles from './formConfirmation.module.scss'

function FormConfirmation() {
  const { configurator } = useConfiguratorContext()
  const {
    manufacturerId,
    fullName,
    note,
    phoneNumber,
    email,
    serviceIds,
    manufacturerList,
    servicesList,
    coupon,
  } = configurator

  const car = manufacturerList.find((car) => car.id === manufacturerId)?.name

  const selectedServices = servicesList.filter((service) => {
    return serviceIds.includes(service.id.toString())
  })

  const price = calculateTotalPrice(servicesList, serviceIds, coupon)

  return (
    <div className={styles.confirmation}>
      <h4>Pregled i potvrda vašeg odabira</h4>
      <p>
        Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko želite
        promijeniti neki od podataka, vratite se na prethodni korak. Kada ste
        provjerili ispravnost svojih podataka, za slanje upita na servis
        pritisnite gumb “Pošalji”.
      </p>
      <div className={styles.info}>
        <h5>Model vozila</h5>
        <p>{car}</p>
        <h5>Odabrane usluge</h5>
        <ul className={styles.services}>
          {selectedServices.map((service) => (
            <li key={service.id}>
              <p>
                <span>{service.name}</span> <span>{format(service.price)}</span>
              </p>
            </li>
          ))}
        </ul>
        <section className={styles.price}>
          <div>
            <span>Popust {coupon}%:</span>
            <span>-{format(price.discount)} </span>
          </div>
          <div>
            <span>Ukupno:</span>
            <span>{price.discountedPrice}</span>
          </div>
        </section>
        <section className={styles.contact}>
          <h5>Kontakt podaci</h5>
          <div>
            <p>Ime i prezime:</p> {fullName}
          </div>
          <div>
            <p>Email adresa:</p> {email}
          </div>
          <div>
            <p>Broj telefona:</p> {phoneNumber}
          </div>
          {note && (
            <div>
              <p>Napomena:</p> {note}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default FormConfirmation
