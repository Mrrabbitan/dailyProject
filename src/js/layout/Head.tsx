import React from 'react'
import { HeatMapOutlined } from '@ant-design/icons'
const style = require('./index.less')
export const HeadComponent: React.FC = () => {
  return (
    <>
      <div className={'headerTop'}>
        <HeatMapOutlined />
        <span>&nbsp;</span>
        <b>内参</b>~HardCode~
      </div>
    </>
  )
}
