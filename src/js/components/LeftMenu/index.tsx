import React from 'react'
import { Menu } from 'antd'
import { AppstoreOutlined, MenuUnfoldOutlined, MenuFoldOutlined, PieChartOutlined, DesktopOutlined, ContainerOutlined, MailOutlined } from '@ant-design/icons'
const { SubMenu } = Menu

export const LeftMenuComponent: React.FC = () => {
  return (
    <>
      <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
        <SubMenu key="sub1" icon={<PieChartOutlined />} title="ES6">
          <Menu.Item key="1">filter</Menu.Item>
          <Menu.Item key="2">promise</Menu.Item>
          <Menu.Item key="3">promise.all</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<DesktopOutlined />} title="ES7">
          {/* <Menu.Item key="2">promise</Menu.Item> */}
        </SubMenu>
        <SubMenu key="sub3" icon={<ContainerOutlined />} title="ES8">
          {/* <Menu.Item key="3">promise.all</Menu.Item> */}
        </SubMenu>
        <SubMenu key="sub4" icon={<MailOutlined />} title="ES9">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<AppstoreOutlined />} title="ES10">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    </>
  )
}