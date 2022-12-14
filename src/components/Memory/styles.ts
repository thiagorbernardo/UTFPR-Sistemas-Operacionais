import styled from 'styled-components'

export const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
  text-align: center;
  /* width: 50%; */
`

export const Container = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 180px;
`

export const Text = styled.a`
  margin-top: 8px;
  font-size: 16px;
`
export const InvisibleText = styled.a`
  visibility: hidden;
`

export const Title = styled.ul`
  margin-top: 2px;
  margin-bottom: 10px;
  font-size: 18px;
  user-select: none;
`

export const MemoryContainer = styled.div`
  background-color: grey ;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  display: flex;
`

export const RowSpaced = styled.div`
  display: flex;
  align-items: space-evenly;
  justify-content: space-between;
  width: 100%;
`

export const MemoryUsed = styled.div.attrs((props: { width: string, color: string }) => ({
  width: props.width,
  color: props.color,
}))`
  background-color: ${(props) => props.color};
  width: ${props => props.width}%;
  height: 100%;
`;