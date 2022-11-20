import { useState, useEffect } from 'react';

import { Button } from '../Button'
import { Container, Image, Text } from './styles'
import { Core } from '../../../electron/utils'

export async function CPU() {
  function handleSayHello() {
    window.Main.sendMessage('Hello World');

    console.log('Message sent! Check main process log in terminal.')
  }

  let cpu: Core[] = [];

  useEffect(() => {
    (async () => {
      try {
        console.log("here")
        cpu = await window.Main.getCPU();
      } catch (err) {
        console.error(err);
      }
    })();
  }, [])

  const core = cpu[0]
  console.log(cpu)
  // alert(JSON.stringify(core))
  return (
    <Container>
      <Text>123</Text>

      <Text>Processadores</Text>
      <Text>Core: {core.id}</Text>
      <Text>Modelo: {core.model}</Text>
      <Text>CPU MHz: {core.mhz}</Text>
      <Text>Cache: {core.cache}</Text>
    </Container>
  )
}

