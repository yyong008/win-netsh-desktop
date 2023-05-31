import { Button } from 'antd'
import { ReactElement } from 'react'
import { Link } from 'react-router-dom'

export default function Route404(): ReactElement {
  return (
    <Link to={'/'}>
      <Button>返回</Button>
    </Link>
  )
}
