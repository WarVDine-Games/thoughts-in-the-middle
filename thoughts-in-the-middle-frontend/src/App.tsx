import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { io } from 'socket.io-client'
import { CreateJoinScreen } from './components/CreateJoinScreen/CreateJoinScreen'

function App() {
  const [count, setCount] = useState(0)
  const socket = io('http://localhost:2019', {
    autoConnect: true,
    transports: ['websocket'],
  })

  return (
    <div>
      <CreateJoinScreen />
    </div>
  )
}

export default App
