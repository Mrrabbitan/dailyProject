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
}
