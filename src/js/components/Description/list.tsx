import React from 'react'
import { Descriptions, Badge, Collapse } from 'antd'
const CodeMirror = require('react-codemirror')
require('codemirror/lib/codemirror.css')
require('./list.less')
const { filter } = require('../../../../public/static/ES7.ts')
const { Panel } = Collapse

export const DescriptionComponents: React.FC = () => {
  return (
    <div>
      <Descriptions title={filter.data.name} column={1} bordered>
        <Descriptions.Item label="Api Name">{filter.data.name}</Descriptions.Item>
        <Descriptions.Item label="Api Params">{filter.data.params}</Descriptions.Item>
        <Descriptions.Item label="Api Params Des">{filter.data.paramsDes}</Descriptions.Item>
        <Descriptions.Item label="Return">{filter.data.return}</Descriptions.Item>
        {/*<Descriptions.Item label="Usage Time" span={2}>
          2019-04-24 18:00:00
        </Descriptions.Item>
        <Descriptions.Item label="Status" span={3}>
          <Badge status="processing" text="Running" />
        </Descriptions.Item>
        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
        <Descriptions.Item label="Discount">$20.00</Descriptions.Item> */}
        <Descriptions.Item label="Attention">{filter.data.attention}</Descriptions.Item>
        <Descriptions.Item label="Config Info">{filter.data.description}</Descriptions.Item>
      </Descriptions>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="Using Example" key="1">
          <CodeMirror value={filter.example}></CodeMirror>
        </Panel>
        <Panel header="ES6+ HandWriting" key="2">
          <CodeMirror value={filter.handwriting}></CodeMirror>
        </Panel>
        <Panel header="ES5 HandWriting TODO" key="3" disabled></Panel>
      </Collapse>
    </div>
  )
}
