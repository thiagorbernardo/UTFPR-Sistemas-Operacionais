import { useState, useEffect } from 'react';

import { Container, MemoryContainer, MemoryUsed, Text, Title, RowSpaced, Horizontal } from './styles'
import { ICPULoad, } from '../../../electron/utils'

export function CPUUsage() {
  const [cpus, setCPUs] = useState<ICPULoad[]>([])

  useEffect(() => {
    const interval = setInterval(async () => {
      setCPUs(await window.Main.getCPUUsage());
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Horizontal>
      <Container>
        <Title>CPUs</Title>
        {
          cpus.map((cpu, index) => {
            return <MemoryContainer>
              <MemoryUsed width={cpu.usr} color={'#1A7CFA'} />
              <MemoryUsed width={cpu.sys} color={'#E32227'} />
              {/* <MemoryUsed width={cpu[0].usr} color={'#D1D100'} /> */}
            </MemoryContainer>
          })
        }
      </Container>
    </Horizontal>
  )
}

