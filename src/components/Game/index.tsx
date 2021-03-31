import { useState, useCallback, useMemo } from 'react'

import {
  GameScreen,
  GameButton,
  GameTable,
  Title,
  Subtitle,
  ChooseSection,
  ChooseButton,
  ResetSection,
  ResetButton,
} from './styled'

type TTurn = null | 'O' | 'X'

interface IGameMetaData {
  isFinished: boolean
  winner: string | null
}

const TABLE_SIZE: number = 3
const WINS_O = 'O'.repeat(TABLE_SIZE)
const WINS_X = 'X'.repeat(TABLE_SIZE)

const getInitialGameData = () => {
  return Array.from(Array(TABLE_SIZE), () => Array(TABLE_SIZE).fill(''))
}

function Game() {
  const [turn, setTurn] = useState<TTurn>(null)
  const [gameData, setGameData] = useState(getInitialGameData)

  const chooseFirstTurn = useCallback(
    (selectedTurn: TTurn) => () => {
      setTurn(selectedTurn)
    },
    []
  )

  const { winner, isFinished } = useMemo<IGameMetaData>(() => {
    let _filledQuantity = 0
    let _diagonalA: string = ''
    let _diagonalB: string = ''
    let _auxDiagB: number = TABLE_SIZE
    const _rows: string[] = []
    const _columns: string[] = Array(TABLE_SIZE).fill('')

    gameData.forEach((rowData, rowIndex) => {
      _auxDiagB -= 1
      _rows.push(rowData.join(''))

      rowData.forEach((columnData, columnIndex) => {
        _columns[columnIndex] += columnData

        if (rowIndex === columnIndex) {
          _diagonalA += columnData
        }

        if (columnIndex === _auxDiagB) {
          _diagonalB += columnData
        }

        if (columnData) {
          _filledQuantity += 1
        }
      })
    })

    const allLines = [..._rows, ..._columns, _diagonalA, _diagonalB]
    const winnerLine = allLines.find(
      (line) => line === WINS_O || line === WINS_X
    )

    return {
      winner: winnerLine ? winnerLine[0] : null,
      isFinished: _filledQuantity === TABLE_SIZE * TABLE_SIZE,
    }
  }, [gameData])

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
      <Title>{'O vs X'}</Title>

      {!winner && !isFinished ? (
        <Subtitle>{`Es el turno de ${turn}`}</Subtitle>
      ) : (
        <Subtitle>
          {winner ? `Ha ganado ${winner}!` : 'Ha habido un empate'}
        </Subtitle>
      )}

      <GameTable>
        {gameData.map((rowData, rowIndex) =>
          rowData.map((columnData, columnIndex) => (
            <GameButton
              key={`xy-${rowIndex}-${columnIndex}`}
              disabled={!!winner || isFinished}
              onClick={() => {
                if (!columnData) {
                  setGameData((prevGameData) => {
                    const newGameData = [...prevGameData]
                    newGameData[rowIndex][columnIndex] = turn
                    return newGameData
                  })
                  setTurn((prevTurn) => (prevTurn === 'O' ? 'X' : 'O'))
                }
              }}
            >
              {columnData}
            </GameButton>
          ))
        )}
      </GameTable>

      <ResetSection>
        <ResetButton
          onClick={() => {
            setGameData(getInitialGameData())
            setTurn(null)
          }}
        >
          {'Reiniciar juego'}
        </ResetButton>
      </ResetSection>
    </GameScreen>
  )
}

export default Game
