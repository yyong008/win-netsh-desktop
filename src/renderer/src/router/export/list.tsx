import { ProCard, ProTable } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'

export default function ExportList(): React.ReactElement {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const handleList = (): void => {
    setLoading(true)
    window.api.getFirewallByName('all', (res: any[]): void => {
      const _res: unknown[] = res.map((r) => {
        const rr: any = {}
        r.forEach((t: any) => {
          rr[t[0]] = t[1]
        })

        return rr
      })
      setList(_res)
      setLoading(false)
    })
  }

  const columns = [
    {
      title: 'Rule Name',
      dataIndex: 'Rule Name',
      key: 'Rule Name'
    },
    {
      title: 'Enabled',
      dataIndex: 'Enabled',
      key: 'Enabled'
    },
    {
      title: 'Direction',
      dataIndex: 'Direction',
      key: 'Direction'
    },
    {
      title: 'Profiles',
      dataIndex: 'Profiles',
      key: 'Profiles'
    },
    {
      title: 'Grouping',
      dataIndex: 'Grouping',
      key: 'Grouping'
    },
    {
      title: 'LocalIP',
      dataIndex: 'LocalIP',
      key: 'LocalIP'
    },
    {
      title: 'RemoteIP',
      dataIndex: 'RemoteIP',
      key: 'RemoteIP'
    },
    {
      title: 'Protocol',
      dataIndex: 'Protocol',
      key: 'Protocol'
    },
    {
      title: 'LocalPort',
      dataIndex: 'LocalPort',
      key: 'LocalPort'
    },
    {
      title: 'RemotePort',
      dataIndex: 'RemotePort',
      key: 'RemotePort'
    },
    {
      title: 'Edge traversal',
      dataIndex: 'Edge traversal',
      key: 'Edge traversal'
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action'
    }
  ]

  useEffect(() => {
    handleList()
  }, [])

  return (
    <ProCard>
      <ProTable
        headerTitle="所有入站规则"
        search={false}
        loading={loading}
        columns={columns}
        dataSource={list}
      />
    </ProCard>
  )
}
