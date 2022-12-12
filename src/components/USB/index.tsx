import { useState, useEffect } from 'react';

import { Container, Core, Text, Title } from './styles'
import { IUsb } from '../../../electron/utils/usb';

export function USB() {
  const [usb, setUsb] = useState<IUsb[]>([])
  const [toggle, setToggle] = useState<boolean>(false)

  useEffect(() => {
    (async () => {
      setUsb(await window.Main.getUsb());
    })();
  }, [])

  return (
    <Container>
      <Title onClick={() =>setToggle(!toggle)}>{toggle ? "▶️" : "🔽"} USBs</Title>
      {
        toggle ? usb.map(core => {
          return (
            <Core key={core.id}>
              <Text>Bus: {core.bus}</Text>
              <Text>Device: {core.device}</Text>
              <Text>ID: {core.id}</Text>
              <Text>Nome: {core.desc}</Text>
            </Core>
          )
        }) :
          <></>
      }
    </Container>
  )
}

