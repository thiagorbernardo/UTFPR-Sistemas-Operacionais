import styled from 'styled-components'

export const Container = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
`

export const RowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  button {
    margin-left: 30px;
  }
`


export const Text = styled.li`
  margin-top: 8px;
  font-size: 16px;
`
export const Title = styled.ul`
  margin-top: 2px;
  margin-bottom: 10px;
  font-size: 18px;
  user-select: none;
`