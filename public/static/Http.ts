export const JSONP = {
  data: {
    name: 'JSONP(是一种发送JSON数据而无需担心跨域问题的方法)',
    params: '使用脚本标签而不是XMLHttpRequest对象来请求文件',
    paramsDes: '由于跨域策略，XMLHttpRequest遵循同源策略,从另一个域请求文件可能会导致问题。从另一个域请求外部脚本不会出现此问题。',
    return: 'new Promise()',
    attention: 'script 执行完了，成为无用元素，记得清除。由于script标签的特性，JSONP仅支持发送get请求',
    description: '虽然XMLHttpRequest对象遵循同源政策，但是script标签不一样，它可以通过 src 填上目标地址从而发出 GET 请求，实现跨域请求并拿到响应。这也就是 JSONP 的原理。',
  },
  example: `const jsonp =()=>{
    handwriting context;
  }
  jsonp({
  url: 'http://localhost:3000',
  params: { 
    a: 1,
    b: 2
  }
}).then(data => {
  // 拿到数据进行处理
  console.log(data); // 数据包
})
  `,
  handwriting: `const jsonp=({url,params,callback})=>{
    const getUrl =()=>{
      let dataParams = ''
      for(let i of params){
        dataParams+ = i
      }
      dataParams+='callback='+callback
      return \${url}?\${dataParams}
    }
    return new Promise((resolve,reject)=>{
      let scriptEle = document.createElement('script')
      scriptEle.src = getUrl()
      document.body.appendChild(scriptEle);
      //全局绑定下回调，以供后面调用
      window[callback] = (data)=>{
        resolve(data)
        //记得随时清除已经添加的script标签，script调用后就变为无用元素
        document.body.removeChild(scriptEle);
      }
  })
  }`,
  image: false,
}
