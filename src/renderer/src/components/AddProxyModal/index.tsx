import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'
import React, { useEffect } from 'react'

export default function AddProxyModal({
  setVisiable,
  visiable,
  handleList,
  mode,
  eData
}): React.ReactElement {
  const [form] = Form.useForm<{ name: string; company: string }>()
  useEffect(() => {
    if (mode === 'editor') {
      form.setFieldsValue(eData)
    }
  }, [mode, eData])
  return (
    <ModalForm<{
      name: string
      company: string
    }>
      title="创建代理"
      trigger={<Button type="primary">添加代理</Button>}
      open={visiable}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          setVisiable(false)
        }
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        if (mode === 'editor') {
          window.api.change(eData, values, () => {
            handleList()
            message.info('修改成功')
            setVisiable(false)
          })
        } else {
          window.api.add(values, () => {
            handleList()
            message.info('创建成功')
            setVisiable(false)
          })
        }

        return true
      }}
    >
      <ProFormText width="md" name="fromAddr" label="fromAddr （）" />
      <ProFormText width="md" name="fromPort" label="fromPort （）" />
      <ProFormText width="md" name="toAddr" label="toAddr（）" />
      <ProFormText width="md" name="toPort" label="toPort（）" />
    </ModalForm>
  )
}
