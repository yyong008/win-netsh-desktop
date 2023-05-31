import { ProTable } from '@ant-design/pro-components'
import ExportButton from '../ExportButton'

export default function PresetList() {
  const c = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'localport',
      dataIndex: 'localport',
      key: 'localport'
    },
    {
      title: '操作',
      dataIndex: 'localport',
      render: (_, record) => {
        return (
          <div>
            <ExportButton name={record.name} localport={record.localport}></ExportButton>
          </div>
        )
      }
    }
  ]
  return (
    <>
      <ProTable
        search={false}
        headerTitle="预制列表"
        dataSource={[
          { name: 'Stable Diffusion Web UI', localport: 7860 },
          { name: 'Create React App/Next.js/Remix', localport: 3000 },
          { name: 'Vue/Nuxt', localport: 8000 },
          { name: 'Vite', localport: 5173 }
        ]}
        columns={c}
      />
    </>
  )
}
