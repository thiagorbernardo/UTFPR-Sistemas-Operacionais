import { useState, useEffect } from 'react';

import { Container, Core, Text, Title } from './styles'
import { IMotherBoard } from '../../../electron/utils/motherBoard';

export function MotherBoard() {
  const [motherBoard, setUsb] = useState<IMotherBoard[]>([])
  const [toggle, setToggle] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      setUsb(await window.Main.getMotherBoard());
    })();
  }, [])

  return (
    <Container>
      <Title onClick={() =>setToggle(!toggle)}>{toggle ? "▶️" : "🔽"} Placa Mãe</Title>
      {
        toggle ? motherBoard.map(core => {
          return (
            <Core key={1}>
              <Text>Manufacturer: {core.manufac}</Text>
              <Text>Product Name: {core.prodName}</Text>
            </Core>
          )
        }) :
          <></>
      }
    </Container>
  )
}

