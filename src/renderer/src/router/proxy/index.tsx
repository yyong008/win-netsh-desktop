import { Button, Space } from 'antd'
import { ReactElement, SetStateAction, useEffect, useState } from 'react'
import { ProTable } from '@ant-design/pro-components'
import AddProxyModal from '@renderer/components/AddProxyModal'

export default function ProxyRoutes(): React.ReactElement {
  const [list, setList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState('new')
  const [visiable, setVisiable] = useState(false)
  const [eData, setEData] = useState(null)

  const handleEditor = (record: any): void => {
    setMode('editor')
    setVisiable(true)
    setEData(record)
  }

  const handleDel = (record: any): void => {
    setIsLoading(true)
    const item = {
      fromAddr: record.fromAddr,
      fromPort: record.fromPort
    }
    window.api.remove(item, () => {
      handleList()
    })
    setIsLoading(false)
  }

  const proxy = [
    {
      title: 'fromAddr',
      dataIndex: 'fromAddr',
      key: 'fromAddr'
    },
    {
      title: 'fromPort',
      dataIndex: 'fromPort',
      key: 'fromPort'
    },
    {
      title: 'toAddr',
      dataIndex: 'toAddr',
      key: 'toAddr'
    },
    {
      title: 'toPort',
      dataIndex: 'toPort',
      key: 'toPort'
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'op',
      render: (_: unknown, record: { fromAddr: string; fromPort: string }): React.ReactElement => {
        return (
          <Space>
            <Button type="link" onClick={(): void => handleEditor(record)}>
              编辑
            </Button>
            <Button type="link" onClick={(): void => handleDel(record)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  const handleList = async (): Promise<void> => {
    setIsLoading(true)
    window.api.list((r: SetStateAction<never[]>) => {
      setList(r)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    handleList()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <div>
        <ProTable
          headerTitle="已有代理"
          search={false}
          loading={isLoading}
          columns={proxy}
          dataSource={list?.maps ?? []}
          toolBarRender={(): ReactElement[] => [
            <AddProxyModal
              key="add"
              setVisiable={setVisiable}
              mode={mode}
              eData={eData}
              visiable={visiable}
              handleList={handleList}
            />
          ]}
        />
      </div>
    </div>
  )
}
