import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { message } from 'antd'
interface CopyClipboardIn {
  data: string
}
export const CopyClipboard: React.FC<CopyClipboardIn> = (props) => {
  return (
    <CopyToClipboard
      text={props?.data}
      onCopy={(e: string, result: boolean) => {
        result ? message.success({ content: '已复制' }) : message.warning({ content: '复制失败' })
      }}
    >
      <div className="copyExtend1">复制代码</div>
    </CopyToClipboard>
  )
}
