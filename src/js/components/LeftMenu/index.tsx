import React from 'react'
import { useDispatch } from 'react-redux'
import { Menu } from 'antd'
import { AppstoreOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined } from '@ant-design/icons'
import { TabAction } from '../../../store/reducer'
import * as dataAll from '../../../../public/static/ES6'
import * as httpAll from '../../../../public/static/Http'
import * as princeple from '../../../../public/static/designPrinciple'
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
          <Menu.Item
            key="curry"
            onClick={() => {
              dispatch({ type: TabAction.curry, data: dataAll['curry'] })
            }}
          >
            curry
          </Menu.Item>
          <Menu.Item
            key="promisify"
            onClick={() => {
              dispatch({ type: TabAction.promisify, data: dataAll['promisify'] })
            }}
          >
            util.promisify
          </Menu.Item>
          <Menu.Item
            key="deepClone"
            onClick={() => {
              dispatch({ type: TabAction.deepClone, data: dataAll['deepClone'] })
            }}
          >
            deepClone
          </Menu.Item>
          <Menu.Item
            key="restSpread"
            onClick={() => {
              dispatch({ type: TabAction.restSpread, data: dataAll['restSpread'] })
            }}
          >
            Rest&&Spread
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
        <SubMenu key="设计模式" icon={<AppstoreOutlined />} title="设计模式">
          <Menu.Item
            key="eventEmitter"
            onClick={() => {
              dispatch({ type: TabAction.eventEmitter, data: princeple['eventEmitter'] })
            }}
          >
            发布-订阅模式
          </Menu.Item>
          <Menu.Item
            key="solidSingle"
            onClick={() => {
              dispatch({ type: TabAction.eventEmitter, data: princeple['solidSingle'] })
            }}
          >
            单一职责原则
          </Menu.Item>
          <Menu.Item
            key="openClose"
            onClick={() => {
              dispatch({ type: TabAction.openClose, data: princeple['openClose'] })
            }}
          >
            开放封闭原则
          </Menu.Item>
          <Menu.Item
            key="lspPriceple"
            onClick={() => {
              dispatch({ type: TabAction.lspPriceple, data: princeple['lspPriceple'] })
            }}
          >
            里氏替换原则
          </Menu.Item>
          <Menu.Item
            key="interfacePriceple"
            onClick={() => {
              dispatch({ type: TabAction.interfaceSegeration, data: princeple['interfacePriceple'] })
            }}
          >
            接口隔离原则
          </Menu.Item>
          <Menu.Item
            key="dependencyInversion"
            onClick={() => {
              dispatch({ type: TabAction.dependencyInversion, data: princeple['dependencyInversion'] })
            }}
          >
            依赖倒置原则
          </Menu.Item>
        </SubMenu>
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
