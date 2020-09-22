import React, { useEffect } from 'react'
import { Descriptions, Badge, Collapse } from 'antd'
import { useSelector } from 'react-redux'
import { UnControlled as CodeMirror } from 'react-codemirror2'
require('codemirror/lib/codemirror.css')
require('codemirror/mode/javascript/javascript')
require('./list.less')
const { filter } = require('../../../../public/static/ES6.ts')
const { Panel } = Collapse
import GitalkComponent from 'gitalk/dist/gitalk-component'
import 'gitalk/dist/gitalk.css'

export const DescriptionComponents: React.FC = (props) => {
  const getActionType = useSelector((state) => state?.tabStateReducer)

  const extend1Ele = (
    <Panel header={'extend1'} key="3">
      <CodeMirror
        options={{
          mode: 'javascript',
          lineNumbers: true,
        }}
        value={getActionType?.data?.extend1}
      ></CodeMirror>
    </Panel>
  )
  const extend2Ele = (
    <Panel header={'extend2'} key="4">
      <CodeMirror
        options={{
          mode: 'javascript',
          lineNumbers: true,
        }}
        value={getActionType?.data?.extend2}
      ></CodeMirror>
    </Panel>
  )
  const extend3Ele = (
    <Panel header={'extend3'} key="6">
      <CodeMirror
        options={{
          mode: 'javascript',
          lineNumbers: true,
        }}
        value={getActionType?.data?.extend3}
      ></CodeMirror>
    </Panel>
  )

  return (
    <div>
      <Descriptions title={getActionType?.data?.data?.name ?? filter.data.name} column={1} bordered>
        <Descriptions.Item label="Name">{getActionType?.data?.data?.name ?? filter.data.name}</Descriptions.Item>
        <Descriptions.Item label="Params">{getActionType?.data?.data?.params ?? filter.data.params}</Descriptions.Item>
        <Descriptions.Item label="Params Des">{getActionType?.data?.data?.paramsDes ?? filter.data.paramsDes}</Descriptions.Item>
        <Descriptions.Item label="Return">{getActionType?.data?.data?.return ?? filter.data.return}</Descriptions.Item>
        {/*<Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item> */}
        <Descriptions.Item label="Attention">{getActionType?.data?.data?.attention ?? filter.data.attention}</Descriptions.Item>
        <Descriptions.Item label="Config Info">{getActionType?.data?.data?.description ?? filter.data.description}</Descriptions.Item>
      </Descriptions>
      <Collapse defaultActiveKey={[1]}>
        <Panel header="Using Example" key="1">
          <CodeMirror
            options={{
              mode: 'javascript',
              lineNumbers: true,
            }}
            value={getActionType?.data?.example ?? filter.example}
          ></CodeMirror>
        </Panel>
        <Panel header="ES6+ HandWriting" key="2">
          <CodeMirror
            options={{
              mode: 'javascript',
              lineNumbers: true,
            }}
            value={getActionType?.data?.handwriting ?? filter.handwriting}
          ></CodeMirror>
        </Panel>
        {getActionType?.data?.extend1 && extend1Ele}
        {getActionType?.data?.extend2 && extend2Ele}
        {getActionType?.data?.extend3 && extend3Ele}
        <Panel header="ES5 HandWriting TODO" key="5" disabled></Panel>
      </Collapse>
      <GitalkComponent
        options={{
          clientID: '85d8fb68617f517e354f',
          clientSecret: 'b622902d5973fd914f5a2be0663628d44e3a06e9',
          repo: 'anzpnavy.github.io',
          owner: 'anzpnavy',
          admin: ['anzpnavy'],
          id: location.pathname, // Ensure uniqueness and length less than 50
          distractionFreeMode: false, // Facebook-like distraction free mode
        }}
      ></GitalkComponent>
    </div>
  )
}
