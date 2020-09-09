import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from 'antd'
import { AppstoreOutlined, MenuUnfoldOutlined, MenuFoldOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined } from '@ant-design/icons'
import { TabAction } from '../../../store/reducer'
import * as dataAll from '../../../../public/static/ES6'
import * as httpAll from '../../../../public/static/Http'
const { SubMenu } = Menu

export const LeftMenuComponent: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <>
      <Menu defaultSelectedKeys={['6', 'filter']} mode="inline" theme="dark">
        <SubMenu key="6" icon={<PieChartOutlined />} title="ES6">
          <Menu.Item
            key="filter"
            onClick={(e) => {
              dispatch({ type: TabAction.filter, data: dataAll['filter'] })
            }}
          >
            filter
          </Menu.Item>
          <Menu.Item
            key="promise"
            onClick={(e) => {
              dispatch({ type: TabAction.promise, data: dataAll['promise'] })
            }}
          >
            promise
          </Menu.Item>
          <Menu.Item
            key="promiseAll"
            onClick={() => {
              dispatch({ type: TabAction.promiseAll, data: dataAll['promiseAll'] })
            }}
          >
            promise.all
          </Menu.Item>
        </SubMenu>
        <SubMenu key="7" icon={<DesktopOutlined />} title="ES7">
          {/* <Menu.Item key="2">promise</Menu.Item> */}
        </SubMenu>
        <SubMenu key="8" icon={<ContainerOutlined />} title="ES8">
          {/* <Menu.Item key="3">promise.all</Menu.Item> */}
        </SubMenu>
        <SubMenu key="9" icon={<MailOutlined />} title="ES9"></SubMenu>
        <SubMenu key="10" icon={<AppstoreOutlined />} title="ES10"></SubMenu>
        <SubMenu key="11" icon={<AppstoreOutlined />} title="ES11"></SubMenu>
        <SubMenu key="Http" icon={<AppstoreOutlined />} title="Http协议">
          <SubMenu key="domain" title="跨域问题">
            <Menu.Item
              key="JSONP"
              onClick={() => {
                dispatch({ type: TabAction.JSONP, data: httpAll['JSONP'] })
              }}
            >
              JSONP
            </Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </>
  )
}
