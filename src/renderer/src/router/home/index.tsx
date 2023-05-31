// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
import { useEffect, useState } from 'react'
import { Col, Row, Table } from 'antd'
import { ProCard } from '@ant-design/pro-components'
import type { IfacesObj } from 'src/preload/netsh'

const HomeRoute = (): React.ReactElement => {
  const [loading, setLoading] = useState(false)
  const [ips, setIps] = useState<IfacesObj>({
    ipv4: [],
    ipv6: []
  })

  const getIpv4Ipv6 = (): void => {
    const data = window.api.getIps()
    setIps(data)
    setLoading(false)
  }
  const columns = [
    {
      title: '网络名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address'
    }
  ]
  useEffect(() => {
    setLoading(true)
    getIpv4Ipv6()
  }, [])

  return (
    <ProCard
      loading={loading}
      style={{
        padding: 20
      }}
    >
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Table caption="ipv4" columns={columns} dataSource={ips.ipv4} pagination={false} />
        </Col>
        <Col span={12}>
          <Table
            caption="ipv6"
            columns={columns}
            dataSource={ips.ipv6}
            pagination={false}
            rowKey="id"
          />
        </Col>
      </Row>
    </ProCard>
  )
}

export default HomeRoute
