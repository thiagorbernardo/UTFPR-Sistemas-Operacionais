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
  Terminal
} from './components'

export function App() {
  return (
    <>
      <GlobalStyle />
      <Horizontal>
        <Hardware>
          <CPU />
        </Hardware>
        <ThreadsFS>
          <Threads />
          <FileSystem />
        </ThreadsFS>
        <MemoryTerminal>
          <Memory />
          <Terminal />
        </MemoryTerminal>
      </Horizontal>
    </>
  )
}