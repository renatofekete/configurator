import { useConfiguratorContext } from '../context/ConfiguratorContext'

function Form() {
  const { configurator, setConfigurator } = useConfiguratorContext()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setConfigurator((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form>
      <h4>Odaberite proizvođaća vašeg vozila</h4>
      <h4>Odaberite jednu ili više usluga koju trebate</h4>
      <div>
        <div>ukupno: 0 €</div>
        <div>imam kupon</div>
      </div>
      <h4>Vaši podaci</h4>
      <div>
        <label>
          Ime i prezime:
          <input
            type='text'
            name='name'
            value={configurator.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Broj telefona:
          <input
            type='tel'
            name='telephone'
            value={configurator.telephone}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Email adresa:
          <input
            type='email'
            name='email'
            value={configurator.email}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Napomena (opcionalno):
          <textarea
            name='note'
            value={configurator.note}
            onChange={handleChange}
          ></textarea>
        </label>
      </div>
    </form>
  )
}

export default Form
