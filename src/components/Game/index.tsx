import { useState, useCallback } from 'react'

import {
  GameScreen,
  GameButton,
  GameTable,
  Title,
  ChooseSection,
  ChooseButton,
} from './styled'

type TTurn = null | 'O' | 'X'

function Game() {
  const [turn, setTurn] = useState<TTurn>(null)

  const chooseFirstTurn = useCallback(
    (selectedTurn: TTurn) => () => {
      setTurn(selectedTurn)
    },
    []
  )

  if (!turn) {
    return (
      <GameScreen>
        <Title>{'¿Quien comienza?'}</Title>
        <ChooseSection>
          <ChooseButton onClick={chooseFirstTurn('O')}>{'O'}</ChooseButton>
          <ChooseButton onClick={chooseFirstTurn('X')}>{'X'}</ChooseButton>
        </ChooseSection>
      </GameScreen>
    )
  }

  return (
    <GameScreen>
      <GameTable>
        <GameButton>{turn}</GameButton>
        <GameButton>{turn}</GameButton>
        <GameButton>{turn}</GameButton>
        <GameButton>{turn}</GameButton>
        <GameButton>{turn}</GameButton>
        <GameButton>{turn}</GameButton>
        <GameButton>{turn}</GameButton>
        <GameButton>{turn}</GameButton>
        <GameButton>{turn}</GameButton>
      </GameTable>
    </GameScreen>
  )
}

export default Game
