import { useState, useEffect } from 'react';

import { Container, Core, Text, Title } from './styles'
import { ICore } from '../../../electron/utils'

export function CPU() {
  const [cpu, setCpu] = useState<ICore[]>([])
  const [toggle, setToggle] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      setCpu(await window.Main.getCPU());
    })();
  }, [])

  return (
    <Container>
      <Title onClick={() =>setToggle(!toggle)}>{toggle ? "▶️" : "🔽"} Processadores</Title>
      {
        toggle ? cpu.map(core => {
          return (
            <Core key={core.id}>
              <Text>Core: {core.id}</Text>
              <Text>Modelo: {core.model}</Text>
              <Text>CPU MHz: {core.mhz}</Text>
              <Text>Cache: {core.cache}</Text>
            </Core>
          )
        }) :
          <></>
      }
    </Container>
  )
}

