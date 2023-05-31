import { useState } from 'react'
import { Button, Form } from 'antd'
import { ProForm, ProFormText, ProTable } from '@ant-design/pro-components'

export default function SearchTable(): React.ReactElement {
  const [searchList, setSearchList] = useState([])
  const [form] = Form.useForm()

  const handleClick = () => {
    const formData = form.getFieldsValue()
    const { name } = formData

    window.api.getFirewallByName(name, (res) => {
      const _res = res.map((r) => {
        const rr = {}
        r.forEach((t) => {
          rr[t[0]] = t[1]
        })

        return rr
      })
      setSearchList(_res)
    })
  }

  const c = [
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
    },
    {
      title: '操作',
      render(_, record) {
        return (
          <div>
            <Button type="link">编辑</Button>
            <Button type="link">删除</Button>
          </div>
        )
      }
    }
  ]

  return (
    <div style={{ padding: '20px', marginBottom: 0 }}>
      <div>
        <div>
          <ProForm form={form} submitter={false}>
            <ProFormText name="name" addonAfter={<Button onClick={handleClick}>搜索</Button>} />
          </ProForm>
        </div>
        <ProTable headerTitle="搜索列表" search={false} columns={c} dataSource={searchList} />
      </div>
    </div>
  )
}
