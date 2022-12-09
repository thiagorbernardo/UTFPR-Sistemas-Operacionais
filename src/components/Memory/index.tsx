import { useState, useEffect } from 'react';

import { Container, MemoryContainer, MemoryUsed, Text, Title, RowSpaced } from './styles'
import { IMemory } from '../../../electron/utils'

export function Memory() {
  const [memory, setMemory] = useState<IMemory>({} as any)

  useEffect(() => {
    const interval = setInterval(async () => {
      setMemory(await window.Main.getMemory());
    }, 50);
  
    return () => clearInterval(interval);
  }, []);

  const calculatePercentage = (free: number, total: number) => {
    if (!free || !total) return 0;
    return (((total - free) / total) * 100).toFixed(2);
  }

  const roundMemory = (mem: number) => {
    return (mem / 1024 / 1024).toFixed(2);
  }

  // console.log("memory")
  // console.log(memory)

  return (
    <Container>
      <Title>Memória</Title>
      <Text>Usado x Total</Text>
      <MemoryContainer>
        <MemoryUsed width={calculatePercentage(memory.memFree, memory.memTotal)} />
      </MemoryContainer>
      <RowSpaced>
        <a>{roundMemory(memory.memTotal - memory.memFree)} GB</a>
        <a>{roundMemory(memory.memTotal)} GB</a>
      </RowSpaced>
      <br />
      <Text>Swap Usado x Swap Total</Text>
      <MemoryContainer>
        <MemoryUsed width={calculatePercentage(memory.swapFree, memory.swapTotal)} />
      </MemoryContainer>
      <RowSpaced>
        <a>{roundMemory(memory.swapTotal - memory.swapFree)} GB</a>
        <a>{roundMemory(memory.swapTotal)} GB</a>
      </RowSpaced>
      <br />
      <br />
      <a>Cache: {roundMemory(memory.cached)} GB</a>
    </Container>
  )
}

