import { useState, useEffect } from 'react';
import { generate } from 'short-uuid'

import { Container, Process, Processes, Text, Title } from './styles'
import { IProcess } from '../../../electron/utils'

export const generateKey = (pre: any) => {
  return `${pre}_${new Date().getTime()}`;
}

export function Threads() {
  const [processes, setProcesses] = useState<IProcess[]>([])

  useEffect(() => {
    const interval = setInterval(async () => {
      setProcesses(await window.Main.getProcesses());
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Title>Processos</Title>
      <br />
      <Processes>
        {processes.map(process => {
          return (
            <Process key={generate()}>
              <Text>{process.uid}</Text>
              <Text>{process.pid}</Text>
              <Text>{process.ppid}</Text>
              <Text>{process.dayOfMonth}/{process.month}</Text>
              <Text>{process.time}</Text>
              <Text>{process.command}</Text>
            </Process>
          )
        })}
      </Processes>
    </Container>
  )
}

