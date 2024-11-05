import './App.scss'
import ConfigWrapper from './components/ConfigWrapper'
import Page from './components/layout/Page'
import { ConfiguratorProvider } from './context/ConfiguratorContext'

function App() {
  return (
    <>
      <Page>
        <ConfiguratorProvider>
          <ConfigWrapper />
        </ConfiguratorProvider>
      </Page>
    </>
  )
}

export default App
