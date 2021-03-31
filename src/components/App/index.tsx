import { useState, useCallback } from 'react'

import Game from '../Game'
import { Container, StartSection, Welcome, StartButton } from './styles'

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false)

  const startGame = useCallback(() => setGameStarted(true), [])

  if (gameStarted) {
    return (
      <Container>
        <Game />
      </Container>
    )
  }

  return (
    <>
      <Container>
        <Welcome>{'Bienvenido a tic-tac-toe!'}</Welcome>
      </Container>

      <Container>
        <StartSection>
          <StartButton onClick={startGame}>{'Comenzar a jugar'}</StartButton>
        </StartSection>
      </Container>
    </>
  )
}

export default App
