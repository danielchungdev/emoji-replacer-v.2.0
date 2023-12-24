import './App.css'
import { Navbar } from '@components/Navbar';
import { EmojiGrid } from '@components/EmojiGrid'

const App = (): JSX.Element => {

  return (
    <div>
      <div className='main-container'>
        <Navbar/>
        <EmojiGrid/>
      </div>
    </div>
  )
}

export default App
