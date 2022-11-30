import { useState, useEffect } from 'react';

import { Container, Core, Text, Title } from './styles'
import { ICore } from '../../../electron/utils'

export function Memory() {
  const [cpu, setCpu] = useState<ICore[]>([])

  useEffect(() => {
    (async () => {
      setCpu(await window.Main.getCPU());
    })();
  }, [])

  return (
    <Container>
      <Title>Memória</Title>
      <Text>exemplo</Text>
    </Container>
  )
}

