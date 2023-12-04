import './App.css'
import { ActionButton } from '@components/ActionButton';
import { EmojiButton } from '@components/EmojiButton';
import { Navbar } from '@components/Navbar';

const App = (): JSX.Element => {

  return (
    <div>
      <div className='main-container'>
        <Navbar/>
        <div className='main-content'>
          <ActionButton/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
          <EmojiButton emoji='🔥' name='fire' delimiter=':'/>
        </div>
      </div>
    </div>
  )
}

export default App
