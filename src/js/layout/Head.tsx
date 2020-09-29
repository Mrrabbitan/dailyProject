import React, { useRef, useState } from 'react'
import { HeatMapOutlined, GithubOutlined, ZhihuOutlined, WechatOutlined, SmileOutlined } from '@ant-design/icons'
require('./index.less')
export const HeadComponent: React.FC = () => {
  const rec = useRef(0)
  const mark = useRef(1)
  const [markShown, setMarkShown] = useState(false)

  const showHideMark = () => {
    if (markShown === true) {
      setMarkShown(false)
      rec.current.style.opacity = 0
      mark.current.style.opacity = 0
      rec.current.style.transition = 'all .3s'
      mark.current.style.transition = 'all .3s'
      setTimeout(() => {
        rec.current.style.display = 'none'
        mark.current.style.display = 'none'
      }, 300)
    } else {
      setMarkShown(true)
      rec.current.style.display = 'block'
      mark.current.style.display = 'block'
      rec.current.style.transition = 'all .3s'
      mark.current.style.transition = 'all .3s'
      rec.current.style.opacity = 1
      mark.current.style.opacity = 1
    }
  }
  return (
    <>
      <div className={'headerTop'}>
        <HeatMapOutlined />
        <span>&nbsp;</span>
        <b>内参</b>~HardCode~
        <span className={'headerRight'}>
          <span className="weixinSpan" onClick={showHideMark}>
            <WechatOutlined alt="加群微信TODO" />
            <span className="rectangle" ref={rec}></span>
            <span className="popoverImg" ref={mark}></span>
          </span>
          <span>
            <a href="https://github.com/Mrrabbitan" target="blank">
              <GithubOutlined alt="github" />
            </a>
          </span>
          <span>
            <a href="https://www.zhihu.com/people/an-zeng-ping" target="blank">
              <ZhihuOutlined alt="知乎专栏" />
            </a>
          </span>
          <span>
            <a href="https://anzp.gitee.io/andhblog/" target="blank">
              <SmileOutlined alt="个人主页" />
            </a>
          </span>
        </span>
      </div>
    </>
  )
}
