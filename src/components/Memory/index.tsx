import { useState, useEffect } from 'react';

import { Container, MemoryContainer, MemoryUsed, InvisibleText, Title, RowSpaced, Horizontal } from './styles'
import { ICPULoad, IDisk, IMemory } from '../../../electron/utils'

export function Memory() {
  const [memory, setMemory] = useState<IMemory>({} as any)
  const [cpus, setCPUs] = useState<ICPULoad[]>([])
  const [disk, setDisk] = useState<IDisk>({} as any)

  useEffect(() => {
    const interval = setInterval(async () => {
      setMemory(await window.Main.getMemory());
      setCPUs(await window.Main.getCPUUsage());
      setDisk(await window.Main.getDiskUsage());
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

  // console.log('-------')
  // console.log(memory)

  return (
    <>
      <Horizontal>
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
        </Container>

        <Container>
          <Title>Swap</Title>
          <RowSpaced>
            <a>Swap Usado (GB)</a>
            <a>Swap Total (GB)</a>
          </RowSpaced>
          <MemoryContainer>
            <MemoryUsed width={calculatePercentage(memory.swapUsed, memory.swapTotal)} color={'#E32227'} />
          </MemoryContainer>
          <RowSpaced>
            <a>{roundMemory(memory.swapUsed)} GB</a>
            <a>{roundMemory(memory.swapTotal)} GB</a>
          </RowSpaced>
        </Container>

        {
          cpus[0] ? <Container>

            <Title>CPU</Title>
            <RowSpaced>
              <InvisibleText>a</InvisibleText>
            </RowSpaced>
            <MemoryContainer>
              <MemoryUsed width={cpus[0].usr} color={'#1A7CFA'} />
              <MemoryUsed width={cpus[0].sys} color={'#E32227'} />
            </MemoryContainer>
            <RowSpaced>
              <a>Usuário: {cpus[0].usr}%</a>
              <a>Sistema: {cpus[0].sys}%</a>
              <a>Não Usado: {cpus[0].idle}%</a>
            </RowSpaced>
          </Container>
            : <></>
        }
        <Container>
          <Title>Disco</Title>
          <RowSpaced>
            <InvisibleText>a</InvisibleText>
          </RowSpaced>
          <MemoryContainer>
            <MemoryUsed width={calculatePercentage(disk.used, disk.total)} color={'#E32227'} />
          </MemoryContainer>
          <RowSpaced>
            <a>Usado: {disk.used} GB</a>
            <a>Disponível: {disk.free} GB</a>
            <a>Total: {disk.total} GB</a>
          </RowSpaced>
        </Container>
      </Horizontal>
    </>
  )
}