import React from 'react'
require('./index.less')
import { DescriptionComponents } from '../components/Description/list'
import { LeftMenuComponent } from '../components/LeftMenu'

export const ContentComponents: React.FC = () => {
  return (
    <div className={'content'}>
      <div className={'contentLeft'}>
        <LeftMenuComponent></LeftMenuComponent>
      </div>
      <div className={'contentRight'}>
        <DescriptionComponents></DescriptionComponents>
      </div>
    </div>
  )
}
