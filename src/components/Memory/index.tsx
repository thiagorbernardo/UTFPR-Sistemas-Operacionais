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

  const calculatePercentage = (partial: number, total: number) => {
    if (!partial || !total) return 0;
    return ((100 * partial) / total).toFixed(2);
  }

  const roundMemory = (mem: number) => {
    return (mem / 1024).toFixed(2);
  }

  console.log('-------')
  console.log(memory)

  // console.log(calculatePercentage(memory.cached, memory.memTotal))
  // console.log(calculatePercentage(memory.memTotal - memory.memFree - memory.cached, memory.memTotal))
  // console.log(calculatePercentage(memory.memFree, memory.memTotal))
  // console.log('-------')

  // total - free - cached = used
  // used // cache // free

  return (
    <Container>
      <Title>Memória</Title>
      <RowSpaced>
        <a>Usado (GB)</a>
        <a>Cache (GB)</a>
        <a>Livre (GB)</a>
      </RowSpaced>
      <MemoryContainer>
        <MemoryUsed width={calculatePercentage(memory.memUsed, memory.memTotal)} color={'#E32227'} />
        <MemoryUsed width={calculatePercentage(memory.memCache, memory.memTotal)} color={'#D1D100'} />
        <MemoryUsed width={calculatePercentage(memory.memFree, memory.memTotal)} color={'#1A7CFA'} />
      </MemoryContainer>
      <RowSpaced>
        <a>{roundMemory(memory.memUsed)} GB</a>
        <a>{roundMemory(memory.memCache)} GB</a>
        <a>{roundMemory(memory.memFree)} GB</a>
      </RowSpaced>
      <br />
      <Text>Swap Usado x Swap Total</Text>
      <MemoryContainer>
        <MemoryUsed width={calculatePercentage(memory.swapUsed, memory.swapTotal)} color={'#E32227'}/>
      </MemoryContainer>
      <RowSpaced>
        <a>{roundMemory(memory.swapUsed)} GB</a>
        <a>{roundMemory(memory.swapTotal)} GB</a>
      </RowSpaced>
    </Container>
  )
}

