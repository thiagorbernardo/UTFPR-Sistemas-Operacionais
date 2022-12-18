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
  CPUUsage
} from './components'

export function App() {
  return (
    <>
      <GlobalStyle />
      <Memory />
      {/* <CPUUsage /> */}
      <Horizontal>
        <Hardware>
          <CPU />
          <USB />
          <MotherBoard />
        </Hardware>
        <ThreadsFS>
          <Threads />
          <Terminal />
        </ThreadsFS>
        {/* <MemoryTerminal>
        </MemoryTerminal> */}
      </Horizontal>
    </>
  )
}