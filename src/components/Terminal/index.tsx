import React, { useState, useEffect } from 'react';
import { XTerm } from 'xterm-for-react';

import { Container, RowContainer, Title } from './styles'
import { ICore } from '../../../electron/utils'
import { Button } from '../Button';

interface KeyEvent {
  key: string;
  domEvent: KeyboardEvent;
}
export function Terminal() {
  const [cpu, setCpu] = useState<ICore[]>([])
  const [line, setLine] = useState<string>('')
  const xtermRef = React.useRef<XTerm>(null);

  useEffect(() => {
    (async () => {
      setCpu(await window.Main.getCPU());
    })();

    xtermRef.current?.terminal.writeln('Terminal pronto!')
  }, [])

  const onData = (data: string) => {
    if (!(data || '').match(/[A-z]/g)) return
    xtermRef.current?.terminal.write(data)
    setLine(line + data)
  }

  const onKey = async ({ key, domEvent }: KeyEvent) => {
    console.log("key", key, domEvent)

    if (domEvent.key === 'Backspace' || key === "Delete") {
      const newLine = line.slice(0, -1)
      setLine(newLine)
      const cursor = xtermRef.current?.terminal.buffer.active!
      xtermRef.current?.terminal.select(cursor!.cursorY, cursor!.cursorX, 4)
      const terminalLine = xtermRef.current?.terminal.buffer.active.getLine(cursor!.cursorY)!
      // terminalLine.
      // console.log(xtermRef.current?.terminal.selectLines(cursor!.cursorY, cursor!.cursorY+1))
      xtermRef.current?.terminal.write('\r\n')
      return
    } else if (domEvent.key === 'Enter') {
      xtermRef.current?.terminal.writeln('\r')
      const result = await window.Main.executeInTerminal(line)
      if (result.error) {
        xtermRef.current?.terminal.writeln(result.output.replace(/(\r\n|\n|\r)/gm, ""))
      } else {
        xtermRef.current?.terminal.writeln(result.output)
      }
      setLine('')
      return
    }
  }

  return (
    <Container>
      <Title>Terminal</Title>
      <RowContainer>
        <XTerm ref={xtermRef} onData={onData} onKey={onKey} />
        <Button onClick={() => window.Main.openNewTerminal()}>Abrir Terminal Ubuntu</Button>
      </RowContainer>
    </Container>
  )
}

