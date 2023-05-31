import { Button, Input, Space, message } from 'antd'
import { useState } from 'react'

export default function AddFireWall(): React.ReactElement {
  const [name, setName] = useState('[WinNetshDestop]:')
  const [port, setPort] = useState('')
  const [protocol, setProtocol] = useState('TCP')

  const handleAdd = (): void => {
    window.api.exportAddLocalporstPort(
      {
        name,
        port,
        protocol
      },
      () => {
        message.info('防火墙添加规则成功！')
      }
    )
  }
  return (
    <Space size="large" direction="vertical" style={{ width: '100%', margin: '40px 0px 0px 40px' }}>
      <Input
        placeholder="请输入名称"
        value={name}
        onChange={(v) => {
          setName(v.target.value)
        }}
      />
      <Input
        placeholder="请输入端口"
        value={port}
        onChange={(v) => {
          setPort(v.target.value)
        }}
      />
      <Input
        placeholder="请输入协议"
        value={protocol}
        onChange={(v) => {
          setProtocol(v.target.value)
        }}
      />
      <Button block type="primary" onClick={handleAdd}>
        提交
      </Button>
    </Space>
  )
}
