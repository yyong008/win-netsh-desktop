import type { SegmentedValue } from 'antd/es/segmented'

// cores
import { useState } from 'react'

// components
import { Segmented } from 'antd'
import { ProCard } from '@ant-design/pro-components'

// custom:components
import PresetList from '@renderer/components/PresetList'
import SearchTable from '@renderer/components/searchList'
import AddFireWall from '@renderer/components/AddFireWall'

export default function ExportRoute(): React.ReactElement {
  const [tag, setTag] = useState<SegmentedValue>('添加')
  return (
    <div style={{ padding: '20px', marginBottom: 0 }}>
      <div style={{ padding: '20px 0px', margin: '0 auto' }}>
        <Segmented
          options={['添加', '搜索', '预制']}
          onChange={(tag: SegmentedValue): void => {
            setTag(tag)
          }}
        />
      </div>
      {tag === '添加' ? (
        <ProCard style={{ height: '100%' }}>
          <div>添加防火墙(按名称)</div>
          <AddFireWall />
        </ProCard>
      ) : null}
      {tag === '预制' ? (
        <ProCard style={{ height: '100%' }}>
          <PresetList />
        </ProCard>
      ) : null}
      {tag === '搜索' ? (
        <ProCard style={{ height: '100%' }}>
          <SearchTable />
        </ProCard>
      ) : null}
    </div>
  )
}
