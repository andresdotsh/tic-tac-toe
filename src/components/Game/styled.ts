import styled from 'styled-components'

export const GameScreen = styled.div`
  width: 320px;
`

export const Title = styled.div`
  text-align: center;
  font-size: 20px;
  padding: 40px 0;
`

export const ChooseSection = styled.div`
  display: flex;
  justify-content: space-evenly;
`

export const ChooseButton = styled.button`
  width: 100px;
  height: 100px;
  font-size: 60px;
`

export const GameTable = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  align-items: center;
  justify-items: center;
`

export const GameButton = styled.button`
  width: 90%;
  height: 90%;
  font-size: 60px;
`
