import styled from 'styled-components'

export const Horizontal = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export const ThreadsFS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  // justify-content: center;
  width: 32%;
  height: 100%;
  /* border-color: red; */
  /* border-style: solid; */
`

export const Hardware = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
/* justify-content: center; */
width: 28%;
/* border-color: red; */
/* border-style: solid; */
`

export const MemoryTerminal = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
/* justify-content: center; */
width: 40%;
/* border-color: red; */
/* border-style: solid; */
`

export const Threads = ThreadsFS
export const FileSystem = ThreadsFS
export const Memory = ThreadsFS
export const Terminal = ThreadsFS