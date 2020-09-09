export const filter = {
  data: {
    name: 'Array.prototype.filter()',
    params: 'callback(元素的值、元素的索引、被遍历的数组本身)',
    paramsDes: '针对数组进行测试，测试通过保留该元素。否则不保留',
    return: '一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。',
    attention:
      '如果为 filter 提供一个 thisArg 参数，则它会被作为 callback 被调用时的 this 值。否则，callback 的 this 值在非严格模式下将是全局对象，严格模式下为 undefined。callback 函数最终观察到的 this 值是根据通常函数所看到的 this 的规则确定的。',
    description:
      'filter 为数组中的每个元素调用一次 callback 函数，并利用所有使得 callback 返回 true 或等价于 true 的值的元素创建一个新数组。callback 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 callback 测试的元素会被跳过，不会被包含在新数组中。callback 被调用时传入三个参数',
  },
  example: `function isBigEnough(element) {
              return element >= 10;
          }
 const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
// filtered is [12, 130, 44] `,
  handwriting: `Array.prototype.filter=function(fn,context){
    if(typeof fn != 'function'){
      throw new TypeError('this is not a function')
    }
    let arr = this 
    let result = []
    for(let i =0;i<arr.length;i++){
      let temp = fn.call(context,arr[i],arr,i)
      if(temp){
        result.push(arr[i])
      }
    }
    return result
  }`,
  image: false,
}
//------------------------
export const promise = {
  data: {
    name: 'Promise',
    params: 'executor',
    paramsDes:
      'executor是带有 resolve 和 reject 两个参数的函数 。Promise构造函数执行时立即调用executor 函数， resolve 和 reject 两个函数作为参数传递给executor（executor 函数在Promise构造函数返回所建promise实例对象前被调用）。resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）。executor 内部通常会执行一些异步操作，一旦异步操作执行完毕(可能成功/失败)，要么调用resolve函数来将promise状态改成fulfilled，要么调用reject 函数将promise的状态改为rejected。如果在executor函数中抛出一个错误，那么该promise 状态为rejected。executor函数的返回值被忽略。',
    return: 'executor函数的返回值被忽略。Promise.prototype.then 和  Promise.prototype.catch 方法返回promise 对象， 所以它们可以被链式调用。',
    attention: 'Promise.length 其值总是为 1 (构造器参数的数目). Promise.prototype 表示 Promise 构造器的原型.',
    description:
      'pending 状态的 Promise 对象可能会变为fulfilled 状态并传递一个值给相应的状态处理方法，也可能变为失败状态（rejected）并传递失败信息。当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法（handlers ）就会被调用（then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当Promise状态为fulfilled时，调用 then 的 onfulfilled 方法，当Promise状态为rejected时，调用 then 的 onrejected 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争）。',
  },
  example: `let myFirstPromise = new Promise( function(resolve, reject) {...} /* executor */  )
    myFirstPromise.then(function(successMessage){
      ...
    })

  function myAsyncFunction(url){
    return new Promise((resolve,reject)=>{
      const xhr = new XmlHttpRequest();
      xhr.open('GET',url);
      xhr.onload=()=>resolve(xhr.responseText);
      xhr.onerror=()=>reject(xhr.statusText)
      xhr.send()
    })
  }
  
`,
  handwriting: `class myPromise{
    succeed = null
    failed = null
    state = pending
    
    constructor(fn){
      fn(this.resolved.bind(this),this.rejected.bind(this))
    }

    resolve(result){
      setTimeout(()=>{
        this.state = 'resolved'
        this.succeed(result)
      })
    }

    reject(reason){
      setTimeout(()=>{
        this.state = 'rejected'
        this.failed(reason)
      })
    }
  }
  
  myPromise.prototype.then = function(isSuccess,isFail){
    const t =this
    return new myPromise(function(resolve,reject){
      setTimeout(()=>{
        if(t.state='resolved'){
          resolve(isSuccess(t.succeed))
        }
        if(t.state='rejected'){
          reject(isFail(t.failed))
        }
      })
    })
  }
  `,

  image: false,
}

//promise.all
export const promiseAll = {
  data: {
    name: 'Promise.all',
    params: 'iterable(一个可迭代对象，如 Array 或 String)',
    paramsDes: '参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败的原因是第一个失败 promise 的结果',
    return:
      '如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise.如果传入的参数不包含任何 promise，则返回一个异步完成（asynchronously resolved）Promise.其它情况下返回一个处理中（pending）的Promise。这个返回的 promise 之后会在所有的 promise 都完成或有一个 promise 失败时异步地变为完成或失败',
    attention: '由于异步执行的影响，promise的返回顺序无法确定.在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组，它包含所有的传入迭代参数对象的值（也包括非 promise 值）',
    description: 'Promise.all 的异步性（当且仅当传入的可迭代对象是空时，为同步）,Promise.all 在任意一个传入的 promise 失败时返回失败(返回的虽然很快但为异步)',
  },
  example: `var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
}); 

Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); // [3, 1337, "foo"] 
}); `,
  handwriting: `Promise.all = function(arr){
      if(!Array.isArray(arr)){
        throw new TypeError('arguments is not an arr')
      }

      let length = arr.length;
      let result = []
      let resultNumber = 0
      return new Promise((resolved,rejected)=>{
        for(let i of arr){
          i.then(data=>{
            resultNumber++;
            result.push(data)
            if(resultNumber === length){
              return resolved(result)
            }
          }).catch((error)=>{
            return reject(error)
          })
        }
      })
  }`,

  extend1: `//借助promise.all实现async await的并发
  const sleep = (time=2000) => new Promise(resolve=>{
    setTimeout(resolve,time)
  })
  async function getColumn(id){
    await sleep(2000)
    const url = '**'
    const response(url)
    return await response.json()
  }
  const showInfo = async()=>{
    const [firstEle,secondEle] =await Promise.all([
      getColumn(1)
      getColumn(2)
    ])
  }
  showInfo()`,
  extend2: `//借助Array.prototype.reduce实现promise.all的同步
  const tasks = getTaskArray();
  return tasks.reduce((promiseChain,currentTask)=>{
    return promiseChain.then(chainResults=>{
      currentTask.then(currentResult=>{
        return  [...chainResults,currentResult]
      })
    })
  },Promise.resolve([])).then(arrofResults)=>{
    //Do with all results
  }`,
  extend3: `promise.all = function(params){
    //将promise.all转变为同步的形式输出，输入的Promise[]顺序与输出的顺序一致
    if(!Array.isArray(params)){
      throw new TypeError("this is not Array")
    }
    let result = []
    let len = params.length
    for(let [index,i] of params.entries()){
      i.then((resolve,reject)=>{
        let temp = {}
        temp["result"] = i
        temp["index"] = index 
        result.push(temp)
        if(len === result.length){
          return resolve{result.sort((a,b)=>a.index-b.index).map((arr)=>arr.result)}
        }
      }).catch(e=>{
        return reject(e)
      })
    }
  }`,

  image: false,
}
