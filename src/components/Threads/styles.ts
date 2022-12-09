import styled from 'styled-components'

export const Container = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  overflow: scroll;
  flex: 2;
`

export const Processes = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-height: 400px;
`

export const Process = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export const Text = styled.a`
  margin-top: 8px;
  font-size: 16px;
  margin-right: 10px;

  :nth-child(1){
    color: red;
  }
  :nth-child(2){
    color: green;
  }
  :nth-child(3){
    color: blue;
  }
  :nth-child(4){
    color: purple;
  }
  :nth-child(5){
    color: grey;
  }
`
export const Title = styled.ul`
  margin-top: 2px;
  margin-bottom: 10px;
  font-size: 18px;
  user-select: none;
`