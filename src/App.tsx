import {
  GlobalStyle,
  Horizontal,
  Hardware,
  ThreadsFS,
  MemoryTerminal,
} from './styles'

import {
  CPU,
  Memory,
  Threads,
  FileSystem,
  Terminal,
  USB,
  MotherBoard,
} from './components'

export function App() {
  return (
    <>
      <GlobalStyle />
      <Horizontal>
        <Hardware>
          <CPU />
          <USB />
          <MotherBoard />
        </Hardware>
        <ThreadsFS>
          <Threads />
          <FileSystem />
        </ThreadsFS>
        {/* <MemoryTerminal>
          <Memory />
          <Terminal />
        </MemoryTerminal> */}
      </Horizontal>
    </>
  )
}