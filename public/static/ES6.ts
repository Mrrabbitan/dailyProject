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
//deepClone ----------------------------
export const deepClone = {
  data: {
    name: '深拷贝',
    params: '比较典型的深拷贝就是JavaScript的“值类型”(7种数据类型），如 string，number，bigint，boolean，null，undefined，symbol ',
    paramsDes: '出于节省内存的考虑，JavaScript对“引用类型”(也即第8种数据类型)Object的拷贝默认是浅拷贝。',
    return: '新内存地址存放的新对象',
    attention: '深拷贝是指源对象与拷贝对象互相独立，其中任何一个对象的改动都不会对另外一个对象造成影响',
    description: 'JSON.parse/Object.assign/MessageChannel这三种方法的深拷贝都有缺陷，需要注意，生产环境还是建议使用loadash.cloneDeep()',
  },
  example: `//常用方法一
  JSON.parse()
  (() => {
    let a = { x: 1 }
    let b = JSON.parse(JSON.stringify(a))
    console.log(b)//>> {x:1}
    b.x = 2
    console.log(b)//>> {x:2}
    console.log(a)//>> {x:1}
})();
该方法是用JSON.stringify将对象序列化为字符串，然后在用JSON.parse将json字符串解析为对象，解析的时候会自己去构建新的内存地址存放新对象。
缺点：
//会忽略 undefined；
//会忽略symbol；
//如果对象的属性为Function，因为JSON格式字符串不支持Function，在序列化的时候会自动删除；
//诸如 Map, Set, RegExp, Date, ArrayBuffer 和其他内置类型在进行序列化时会丢失；
//不支持循环引用对象的拷贝。
//必须是JSON类型的数据才能够被深拷贝

//常用方法二
Object的内置方法assign
(() => {
    let a = { x: 1 }
    let b = Object.assign({},a);
    console.log(b)//>> {x:1}
    b.x = 2
    console.log(b)//>> {x:2}
    console.log(a)//>> {x:1}
})();
该方法是用Object.assign对对象进行拼接， 将后续对象的内容插入到第一个参数指定的对象，不会修改第一个参数之后的对象，而我们将第一个对象指定为一个匿名空对象，实现深拷贝。
 Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。
所以这种方法拷贝会有缺陷。
缺点：
//对象嵌套层次超过2层，就会出现浅拷贝的状况；
//非可枚举的属性无法被拷贝。

//常用方法三
使用MessageChannel
// 有undefined + 循环引用
let obj = {
  a: 1,
  b: {
    c: 2,
    d: 3,
  },
  f: undefined
}

obj.c = obj.b;
obj.e = obj.a;
obj.b.c = obj.c;
obj.b.d = obj.b;
obj.b.e = obj.b.c;

function deepCopy(obj) {
  return new Promise((resolve) => {
    const {port1, port2} = new MessageChannel();
    port2.onmessage = ev => resolve(ev.data);
    port1.postMessage(obj);
  });
}

deepCopy(obj).then((copy) => {// 异步的
    let copyObj = copy;
    console.log(copyObj, obj)
    console.log(copyObj == obj)
});
缺点：
//这个方法是异步的；
//拷贝有函数的对象时，还是会报错。
//且纯手动,类似暴力破解法，穷举法...`,
  handwriting: `递归版深拷贝，面试中最常见的写法
  function deepClone(obj){
    let result = {}
    let keys = object.keys()
    let key = null;
    let temp = null;
    for(let i =0;i<keys.length;i++){
      key = keys[i]
      temp = obj[key]
      if(temp && typeof temp ==='object'){
        result[key] = deepClone(temp)
      }else{
        result[key] = temp
      }
    }
    return result 
  }`,
  extend1: `//如果遇到调用自身的参数键值对怎么办
var obj = {
    name: 'coffe1891',
    sex: 'male'
};
obj['deefRef'] = obj;
//此时如果调用上面的deepCopy函数的话，会陷入一个死循环，从而导致堆栈溢出。
//解决这个问题也非常简单，只需要判断一个对象的字段是否引用了这个对象或这个对象的任意父级即可
代码如下

 function deepClone(obj,parent=null){
   let result = []
   let tempKey = null
   let tempValue = null
   let keys = object.keys()
   let _parent = parent

   while(_parent){
     if(_parent.originParent === obj){
       return _parent.currentParent
     }
     _parent = _parent.parent
  }

   for (let i = 0; i<keys.length; i++){
     tempKey = keys[i]
     tempValue = obj[tempKey]
     if(tempValue && tempValue === 'object'){
       result[tempKey] = deepClone(tempValue,{
         originParent = obj
         currentParent = result
         parent = parent
       })
     }else{
       result[tempKey] = tempValue
     }
   }
   
   return result;
 }`,
  extend2: `//非循环引用拷贝子对象
//现在我们把一个对象想像成一棵树：
//对象A有B,C,D三个子对象，其中子对象D中有个属性E引用了对象A下面的子对象B。
  var A = {
    B: {
        name: 'b'
    },
    C: {
        name: 'c'
    },
    D: {

    }
   };
   A.D.E = A.B;
此时 A.D.E 与 A.B 是相等的，因为他们引用了同一个对象：
console.log(A.B === A.D.E) //>> true

如果再调用刚才的DeepCopy函数深拷贝一份对象A的副本X：
var X = deepCopy(A);
console.log(X.B); //>> {name: "b"}
console.log(X.D.E);//>> {name: "b"}
console.log(X.B === X.D.E); //>> false

//虽然 X.B 和 X.D.E在字面意义上是相等的，但二者并不是引用的同一个对象，这点上来看对象 X和对象A还是有差异的。
//这种情况是因为 A.B 并不在 A.D.E 的父级对象链上，所以deepCopy函数就无法检测到A.D.E对A.B也是一种引用关系，所以deepCopy函数就将A.B深拷贝的结果赋值给了 X.D.E。

//知道原因那么解决方案就呼之欲出了：父级的引用是一种引用，非父级的引用也是一种引用，那么只要记录下对象A中的所有对象，并与新创建的对象一一对应即可。
代码如下
  function deepClone(obj){
    //创建一个hash表来保存相应已经创建过的内容
     let map = new weakMap()
     function dp(obj){
       let tempKey = null
       let tempValue = null
       let result = {}
       let existObj = null
       let keys = object.keys(obj)
       existObj = map.get(obj)
       if(existObj){
         return existObj
       }
       map.set(obj,result)
       for(let i = 0; i<keys.length;i++){
         tempKey = keys[i]
         tempValue = obj[tempKey]
         if(tempValue && tempValue === 'object'){
           result[tempKey] = dp(tempValue) 
         }else{
           result[tempKey] = tempValue
         }
         return result 
       }
     }
  }`,
  image: false,
}

//rest与spread操作符
export const restSpread = {
  data: {
    name: 'Spread&Rest',
    params: 'spread和rest运算符都是"...+变量/参数"的形式',
    paramsDes: '当被用于迭代器中时，它是 spread 操作符；主要形式是...[Array],表示对数组展开;当被用于定义函数的参数时，是 rest 操作符：rest的出现，让已经不被推荐使用的arguments彻底寿终正寝了',
    return: '--',
    attention: 'spread操作符可以不放在最后，作为参数的rest操作符必须放为最后一个参数',
    description: 'rest主要是将函数的多个参数转化成数组，而且只能放在函数参数的最后一个位置，否则，比如（array,...items,other）会报错。',
  },
  example: `1.//添加属性
//克隆一个对象，同时向(浅)拷贝对象添加附加属性。
//在这个示例中，user 被(浅)拷贝，password 属性被添加到 userWithPass 中。
const user = { id: 100, name: 'Howard Moon'}
const userWithPass = { ...user, password: 'Password!' }
user //>> { id: 100, name: 'Howard Moon' }
userWithPass //>> { id: 100, name: 'Howard Moon', password: 'Password!' }

2.//对象合并
将两个对象合并到一个新对象中。
const part1 = { id: 100, name: 'Howard Moon' }
const part2 = { id: 100, password: 'Password!' }

const user1 = { ...part1, ...part2 }
//>> { id: 100, name: 'Howard Moon', password: 'Password!' }
对象也可以使用以下语法合并：
const partial = { id: 100, name: 'Howard Moon' }
const user = { ...partial, id: 100, password: 'Password!' }

user //>> { id: 100, name: 'Howard Moon', password: 'Password!' }

3.//排除对象属性
可以结合使用 rest 运算符删除属性。 在下面这个例子里，password 被删除 ，其余的属性作为 rest 返回。
const noPassword = ({ password, ...rest }) => rest
const user = {
  id: 100,
  name: 'coffe1891',
  password: 'Password!'
}
noPassword(user) //>> { id: 100, name: 'coffe1891' }

4.//动态排除对象属性
const user = {
  id: 100,
  name: 'coffe1891',
  password: 'Password!'
}

const removeProperty = (props)=({props:_,...rest})=> rest

const removePassword = removeProperty('password');
const removeid  = removeProperty('id');

removePassword(user1) //>> { id: 100, name: 'coffe1891' }
removeId(user1) //>> { name: 'coffe1891', password: 'Password!' }

5.//对属性进行排序
有时性质并不按照我们需要的顺序排列。 使用一些技巧，我们可以将属性推到列表的顶部，或者将它们移到底部。若要将 id 移动到第一个位置，在扩展对象之前将 id: undefined 添加到新的 Object 最前面。
const user3 = {
  password: 'Password!',
  name: 'Naboo',
  id: 300
}

const organize = object => ({ id: undefined, ...object })
//                            -------------
//                          /
//  move id to the first property

organize(user3)
//>> { id: 300, password: 'Password!', name: 'Naboo' }
若要将 password 移到最后一个属性，请从对象中解构 password。然后在使用 Rest 操作符后重新设置 password 属性。
const user3 = {
  password: 'Password!',
  name: 'Naboo',
  id: 300
}

const organize = ({ password, ...object }) =>
  ({ ...object, password })
//              --------
//             /
// move password to last property

organize(user3)
//>> { name: 'Naboo', id: 300, password: 'Password!' }
`,

  handwriting: `//实现[...8] === [1,2,3,4,5,6,7,8]
  Number.prototype[symbol.iterator] = function * (){
    let i = 1;
    let value = this.valueOf()
    while(i <= value){
      yield y++
    }
  }
  `,
  image: false,
}
