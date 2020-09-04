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

  image: true,
}
