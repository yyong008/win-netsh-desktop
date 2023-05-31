import React from 'react'
import { Button } from 'antd'

export default function ExportButton({ name, localport }): React.ReactElement {
  const handleExport = () => {
    window.api.exportLocalporstPort({ localport, name }, () => {
      console.log('执行完成')
    })
  }

  return (
    <Button onClick={handleExport}>
      暴露端口: {name} - {localport}
    </Button>
  )
}
