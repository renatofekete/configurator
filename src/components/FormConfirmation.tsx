import { useConfiguratorContext } from '../context/ConfiguratorContext'
import { calculateTotalPrice } from '../utils/price'

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
        <p>{car}</p>
        <h4>Odabrane usluge</h4>
        <ul>
          {selectedServices.map((service) => (
            <li key={service.id}>
              <p>
                <span>{service.name}</span> - {service.price} €
              </p>
            </li>
          ))}
          <li>
            <p>
              <span>Popust {coupon}%:</span> - {price.discount} €
            </p>
          </li>
          <li>
            <p>
              <span>Ukupno:</span>
              {price.discountedPrice} €
            </p>
          </li>
        </ul>
        <h4>Kontakt podaci</h4>
        <p>Ime i prezime: {fullName}</p>
        <p>Email adresa: {email}</p>
        <p>Broj telefona: {phoneNumber}</p>
        <p>Napomena: {note}</p>
      </div>
    </div>
  )
}

export default FormConfirmation
