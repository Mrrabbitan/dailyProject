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
//-------------------
export const curry = {
  data: {
    name: 'currying(柯里化)',
    params: '将使用多个参数的函数转变为多个使用一个参数的函数',
    paramsDes: 'curry 的这种用途可以理解为：参数复用。本质上是降低通用性，提高适用性',
    return: '返回接受余下的参数而且替换为新函数的返回结果',
    attention: '柯里化是一种高阶函数用法。',
    description: '如果我们仅仅是把参数一个一个传进去，意义可能不大，但是如果我们是把柯里化后的函数传给其他函数比如 map ',
  },
  example: `function ajax(type, url, data) {
    let xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.send(data);
}

// 虽然 ajax 这个函数非常通用，但在重复调用的时候参数冗余
ajax('POST', 'www.test.com', "name=kevin")
ajax('POST', 'www.test2.com', "name=kevin")
ajax('POST', 'www.test3.com', "name=kevin")

// 利用 curry
let ajaxCurry = curry(ajax);

// 以 POST 类型请求数据
let post = ajaxCurry('POST');
post('www.test.com', "name=kevin");

// 以 POST 类型请求来自于 www.test.com 的数据
let postFromTest = post('www.test.com');
postFromTest("name=kevin"); `,
  handwriting: `//第一阶段
  const curry = function (fn) {
    let args = [].slice.call(arguments,1)
    return function(){
      const newArgs = args.concat([].slice.call(arguments))
      return fn.apply(this,newArgs)
    }
  }
  //用例 已经有柯里化的感觉了，但是还没有达到要求，不过我们可以把这个函数用作辅助函数，帮助我们写真正的 curry 函数
  function add(a, b) {
    return a + b;
}

var addCurry = curry(add, 1, 2);
addCurry() // 3



//第二阶段

const currying = function(fn,args){
  const length = fn.length;
  args = args || [];

  return function(){
    let _args = args.slice(0),
    arg, i;
    for(let i = 0; i<arguments.length; i++){
      arg = arguments[i];
      _args.push(arg);
    }
  if(_args.length<length){
    return currying.call(this, fn, _args);
  }
  else {
    return fn.apply(this, _args);
      }
  }
}

//用例


var fn = currying(function(a, b, c) {
    console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]

  }`,
  image: false,
}

export const promisify = {
  data: {
    name: 'util.promisify',
    params: 'fn(foo, onSuccessCallback, onErrorCallback)',
    paramsDes: 'nodeCallback 有两个条件：1. 回调函数在主函数中的参数位置必须是最后一个；2. 回调函数参数中的第一个参数必须是 error 。',
    return: 'new Promise()',
    attention: '通过 nodeCallback ，我们定义了一个能被 promisify 的函数的格式，即，满足 nodeCallback 形式的方法，我们可以通过 promisify 来让它变成一个返回 promise 的方法',
    description: 'Promisify，就是回调函数与 Promise 间的桥梁，就是“promise 化”，将一个不是promise的方法变成 promise',
  },
  example: `//nodejs中读取文件的常规操作
fs.readFile('filename',function(err,data){
  if(err){
    console.log(err)
  }else{
    console.log(data)
  }
})
//promisify之后的形式
const asyncReadFile = promisify(fs.readFile);
asyncReadFile('filename').then(data=>{
  console.log(data)
}).catch(err=>{
  console.log(err)
})`,
  handwriting: `//第一阶段,首先promisify需要返回一个function，function需要返回一个promise
const promisify = (func) =>{
  return function(){
    let res = this
    return new Promise(resolve=>{
      return func.call(res,...arguments)
    })
  }
}
//第二阶段，修改func的最后一个参数为callback
const promisify = (func) =>{
  return function(){
    let res = this 
    return new Promise(resolve=>{
       return func.call(res,...arguments,function(){
         resolve(arguments)
       })
    })
  }
}
//第三阶段，实现回调函数的第一个参数是error标记
const promisify = (func) =>{
  return function(){
    let res = this
    return new Promise((resolve,reject)=>{
      return func.call(res,...arguments,function(){
        let arr = Array.prototype.map.call(arguments,item=>item)
        let err = arr.shift()
        if(err){
          reject(err)
        }else{
          resolve(arr)
        }
      })
    })
  }
}
//第四阶段，可实现this的作用域自定义，同时仅有一个参数时不返回数组  
const promisify = (func) =>{
  return function(){
    let res = res || this
    return new Promise((reslove,reject)=>{
      return func.call(res,...arguments,function(){
        let arr = Array.prototype.map.call(arguments,item=>item)
        let err = arr.shift()
        if(err){
          reject(err)
        }else{
          arr = arr.length>1?arr:arr[0]
          resolve(arr)
        }
      })
    })
  }
}`,
  image: false,
}
