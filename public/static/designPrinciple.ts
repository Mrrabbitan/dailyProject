export const eventEmitter = {
  data: {
    name: '发布-订阅模式',
    params: `优点1：对象之间解耦
    优点2：异步编程中，可以更松耦合的代码编写`,
    paramsDes: `缺点1：创建订阅者本身要消耗一定的时间和内存
    缺点2：虽然可以弱化对象之间的联系，多个发布者和订阅者嵌套一起的时候，程序难以跟踪维护`,
    return: '包含了各种event的缓存列表',
    attention: `发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发送改变时，所有依赖于它的对象都将得到状态改变的通知。
订阅者（Subscriber）把自己想订阅的事件注册（subscribe）到调度中心（Event Channel），当发布者（Publisher）发布该事件（publish event）到调度中心，也就是该事件触发时，由调度中心统一调用（fire event）订阅者注册到调度中心的处理逻辑代码。`,
    description: `1、创建一个对象；
2、在该对象上创建一个调度中心，实际上是一个缓存列表；
3、on 方法用来把函数 fn 都加到缓存列表中，也即订阅者注册事件到调度中心；
4、emit 方法取到 arguments 里第一个当做 event，根据 event 值去执行对应缓存列表中的函数（发布者发布事件到调度中心，调度中心处理代码）；
5、off 方法可以根据 event 的值取消订阅；
6、once 方法只监听一次，调用完毕后删除缓存函数（订阅一次）`,
  },
  example: `let eventEmitter= {
             ...
          }
 function user1 (content) {
    console.log('用户1订阅了:', content);
}

function user2 (content) {
    console.log('用户2订阅了:', content);
}

function user3 (content) {
    console.log('用户3订阅了:', content);
}

function user4 (content) {
    console.log('用户4订阅了:', content);
}

// 订阅
eventEmitter.on('article1', user1);
eventEmitter.on('article1', user2);
eventEmitter.on('article1', user3);

// 取消user2方法的订阅
eventEmitter.off('article1', user2);

eventEmitter.once('article2', user4)

// 发布
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article1', 'Javascript 发布-订阅模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');
eventEmitter.emit('article2', 'Javascript 观察者模式');

/*>>
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户1订阅了: Javascript 发布-订阅模式
    用户3订阅了: Javascript 发布-订阅模式
    用户4订阅了: Javascript 观察者模式
*/
`,
  handwriting: `let eventEmitter = {
    // 缓存列表
    list: {},
    // 订阅
    on (event, fn) {
        let _this = this;
        // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
        // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
        (_this.list[event] || (_this.list[event] = [])).push(fn);
        return _this;
    },
    // 监听一次
    once (event, fn) {
        // 先绑定，调用后删除
        let _this = this;
        function on () {
            _this.off(event, on);
            fn.apply(_this, arguments);
        }
        on.fn = fn;
        _this.on(event, on);
        return _this;
    },
    // 取消订阅
    off (event, fn) {
        let _this = this;
        let fns = _this.list[event];
        // 如果缓存列表中没有相应的 fn，返回false
        if (!fns) return false;
        if (!fn) {
            // 如果没有传 fn 的话，就会将 event 值对应缓存列表中的 fn 都清空
            fns && (fns.length = 0);
        } else {
            // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
            let cb;
            for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
                cb = fns[i];
                if (cb === fn || cb.fn === fn) {
                    fns.splice(i, 1);
                    break
                }
            }
        }
        return _this;
    },
    // 发布
    emit () {
        let _this = this;
        // 第一个参数是对应的 event 值，直接用数组的 shift 方法取出
        let event = [].shift.call(arguments),
            fns = _this.list[event];
        // 如果缓存列表里没有 fn 就返回 false
        if (!fns || fns.length === 0) {
            return false;
        }
        // 遍历 event 值对应的缓存列表，依次执行 fn
        fns.forEach(fn => {
            fn.apply(_this, arguments);
        });
        return _this;
    }
};`,
  image: false,
}

//single priceple

export const solidSingle = {
  data: {
    name: '单一职责原则（Single Responsibility Principle）',
    params: '英文定义：There should never be more than one reason for a class to change',
    paramsDes: '中文释义：一个类，最好只负责一件事，只有一个引起它变化的原因。',
    return: '--',
    attention:
      '引起类变化的原因不能多于一个。高内聚、低耦合是软件设计追求的目标，而单一职责原则可以看做是高内聚、低耦合的引申。将职责定义为引起变化的原因，以提高内聚性，以此来减少引起变化的原因。单一职责通常意味着单一的功能，因此不要为类实现过多的功能点，以保证实体只有一个引起它变化的原因。',
    description: '在软件设计中，要真正用好单一职责原则并不简单，因为遵循这一原则最关键的地方在于职责的划分；而职责的划分是根据需求定的，同一个类（接口）的设计，在不同的需求里面，可能职责的划分并不一样',
  },
  example: `//假定现在有如下场景：国际手机运营商那里定义了生产手机必须要实现的接口，接口里面定义了一些手机的属性和行为，手机生产商如果要生产手机，必须要实现这些接口。
  /// <summary>
/// 充电电源类
/// </summary>
public class ElectricSource{
}

public interface IMobilePhone
{
    //运行内存
    string RAM { get; set; }

    //手机存储内存
    string ROM { get; set; }

    //CPU主频
    string CPU { get; set; }

    //屏幕大小
    int Size { get; set; }

    //手机充电接口
    void Charging(ElectricSource oElectricsource);

    //打电话
    void RingUp();

    //接电话
    void ReceiveUp();

    //上网
    void SurfInternet();
}

//具体的手机示例
public class MobilePhone:IMobilePhone
{
    public string RAM
    {
        get{throw new NotImplementedException();}
        set{throw new NotImplementedException();}
    }
    public string ROM
    {
        get{throw new NotImplementedException();}
        set{throw new NotImplementedException();}
    }
    public string CPU
    {
        get{throw new NotImplementedException();}
        set{throw new NotImplementedException();}
    }
    public int Size
    {
        get{throw new NotImplementedException();}
        set{throw new NotImplementedException();}
    }
    public void Charging(ElectricSource oElectricsource)
    {
        throw new NotImplementedException();
    }
    public void RingUp()
    {
        throw new NotImplementedException();
    }
    public void ReceiveUp()
    {
        throw new NotImplementedException();
    }
    public void SurfInternet()
    {
        throw new NotImplementedException();
    }
}
这种设计有没有问题呢？这是一个很有争议的话题。
单一职责原则要求一个接口或类只有一个原因引起变化，也就是一个接口或类只有一个职责，它就负责一件事情。
原则上来说，我们以手机作为单一职责去设计，也是有一定的道理的，因为我们接口里面都是定义的手机相关属性和行为，
引起接口变化的原因只可能是手机的属性或者行为发生变化，从这方面考虑，这种设计是有它的合理性的，
如果你能保证需求不会变化或者变化的可能性比较小，那么这种设计就是合理的。但实际情况我们知道，现代科技日新月异，
科技的进步促使着人们不断在手机原有基础上增加新的属性和功能。比如有一天，我们给手机增加了摄像头，
那么需要新增一个像素的属性，我们的接口和实现就得改吧，又有一天，我们增加移动办公的功能，那么我们的接口实现是不是也得改。
由于上面的设计没有细化到一定的粒度，导致任何一个细小的改动都会引起从上到下的变化，有一种“牵一发而动全身”的感觉。所以需要细化粒度，

下面来看看我们如何变更设计。
  `,
  handwriting: `//二次变更
  　　//手机属性接口
public interface IMobilePhoneProperty
{
    //运行内存
    string RAM { get; set; }

    //手机存储内存
    string ROM { get; set; }

    //CPU主频
    string CPU { get; set; }

    //屏幕大小
    int Size { get; set; }

    //摄像头像素
    string Pixel { get; set; }
}

//手机功能接口
public interface IMobilePhoneFunction
{
    //手机充电接口
    void Charging(ElectricSource oElectricsource);

    //打电话
    void RingUp();

    //接电话
    void ReceiveUp();

    //上网
    void SurfInternet();

    //移动办公
    void MobileOA();
}
实现类
//手机属性实现类
public class MobileProperty:IMobilePhoneProperty
{
    public string RAM
    {
        get{ throw new NotImplementedException();}
        set{ throw new NotImplementedException();}
    }
    public string ROM
    {
        get{ throw new NotImplementedException();}
        set{ throw new NotImplementedException();}
    }
    public string CPU
    {
        get{ throw new NotImplementedException();}
        set{throw new NotImplementedException();}
    }
    public int Size
    {
        get{throw new NotImplementedException();}
        set{throw new NotImplementedException();}
    }
    public string Pixel
    {
        get{throw new NotImplementedException();}
        set{throw new NotImplementedException();}
    }
}

//手机功能实现类
public class MobileFunction:IMobilePhoneFunction
{
    public void Charging(ElectricSource oElectricsource)
    {
        throw new NotImplementedException();
    }
    public void RingUp()
    {
        throw new NotImplementedException();
    }
    public void ReceiveUp()
    {
        throw new NotImplementedException();
    }
    public void SurfInternet()
    {
        throw new NotImplementedException();
    }
    public void MobileOA()
    {
        throw new NotImplementedException();
    }
}

//具体的手机实例
public class HuaweiMobile
{
    private IMobilePhoneProperty m_Property;
    private IMobilePhoneFunction m_Func;
    public HuaweiMobile(IMobilePhoneProperty oProperty, IMobilePhoneFunction oFunc)
    {
        m_Property = oProperty;
        m_Func = oFunc;
    }
}
对于上面题的问题，这种设计能够比较方便的解决，如果是增加属性，只需要修改IMobilePhoneProperty和MobileProperty即可；
如果是增加功能，只需要修改IMobilePhoneFunction和MobileFunction即可。貌似完胜第一种解决方案。
那么是否这种解决方案就完美了呢？答案还是看情况。原则上，我们将手机的属性和功能分开了，使得职责更加明确，
所有的属性都由IMobilePhoneProperty接口负责，所有的功能都由IMobilePhoneFunction接口负责，如果是需求的粒度仅仅到了属性和功能这一级，
这种设计确实是比较好的。反之，如果粒度再细小一些呢，那我们这种职责划分是否完美呢？
比如我们普通的老人机只需要一些最基础的功能，比如它只需要充电、打电话、接电话的功能，但是按照上面的设计，
它也要实现IMobilePhoneFunction接口，某一天，我们增加了一个新的功能玩游戏，那么我们就需要在接口上面增加一个方法PlayGame()。
可是我们老人机根本用不着实现这个功能，可是由于它实现了该接口，它的内部实现也得重新去写。从这点来说，以上的设计还是存在它的问题。

那么，我们如何继续细化接口粒度呢？`,
  extend1: `//手机基础属性接口
public interface IMobilePhoneBaseProperty
{
    //运行内存
    string RAM { get; set; }

    //手机存储内存
    string ROM { get; set; }

    //CPU主频
    string CPU { get; set; }

    //屏幕大小
    int Size { get; set; }
}

//手机扩展属性接口
public interface IMobilePhoneExtentionProperty
{
    //摄像头像素
    string Pixel { get; set; }
}

//手机基础功能接口
public interface IMobilePhoneBaseFunc
{
    //手机充电接口
    void Charging(ElectricSource oElectricsource);

    //打电话
    void RingUp();

    //接电话
    void ReceiveUp();
}

//手机扩展功能接口
public interface IMobilePhoneExtentionFunc
{
    //上网
    void SurfInternet();

    //移动办公
    void MobileOA();

    //玩游戏
    void PlayGame();
}
实现类和上面类似：
//手机基础属性实现
public class MobilePhoneBaseProperty : IMobilePhoneBaseProperty
{

    public string RAM
    {
        get{throw new NotImplementedException();}
        set{throw new NotImplementedException();}
    }

    public string ROM
    {
        get{throw new NotImplementedException();}
        set {throw new NotImplementedException();}
    }

    public string CPU
    {
        get{throw new NotImplementedException();}
        set{ throw new NotImplementedException();}
    }

    public int Size
    {
        get{ throw new NotImplementedException();}
        set{ throw new NotImplementedException();}
    }
}

//手机扩展属性实现
public class MobilePhoneExtentionProperty : IMobilePhoneExtentionProperty
{

    public string Pixel
    {
        get{ throw new NotImplementedException();}
        set{ throw new NotImplementedException();}
    }
}

//手机基础功能实现
public class MobilePhoneBaseFunc : IMobilePhoneBaseFunc
{
    public void Charging(ElectricSource oElectricsource)
    {
        throw new NotImplementedException();
    }

    public void RingUp()
    {
        throw new NotImplementedException();
    }

    public void ReceiveUp()
    {
        throw new NotImplementedException();
    }
}

//手机扩展功能实现
public class MobilePhoneExtentionFunc : IMobilePhoneExtentionFunc
{

    public void SurfInternet()
    {
        throw new NotImplementedException();
    }

    public void MobileOA()
    {
        throw new NotImplementedException();
    }

    public void PlayGame()
    {
        throw new NotImplementedException();
    }
}
此种设计能解决上述问题，细分到此粒度，这种方案基本算比较完善了。
能不能算完美？这个得另说。接口的粒度要设计到哪一步，取决于需求的变更程度，或者说取决于需求的复杂度。
  `,
  extend2: `应用实例
  //这是一个功能“超级强大”的函数
function aBigFunc(param){
    if(param == 0 ){
        //这里有一坨上百行的代码，执行任务   
    }else if(param == 1){
        //另一坨上百行的代码，执行任务
    }else if(param ==3){
        //又一坨代码，执行任务
    }else if{
        //最后一坨代码，执行任务
    }
}

//遵循单一原则后的修改
function doQuestA(){
    //执行任务A
}
function doQuest(){
    //执行任务
}
function doQuest(){
    //执行任务
}
function doQuest(){
    //执行任务
}

function doQuest(param){
    if(param==0)doQuestA();
    else if(param==1)doQuestB();
    else if(param==2)doQuestC();
    else if(param==3)doQuestD();
}
`,

  image: false,
}

//接口隔离原则
export const interfacePriceple = {
  data: {
    name: '接口隔离原则（Interface Segregation Principle）',
    params: '定义一：不应强行要求客户端依赖于他们不用的接口',
    paramsDes: '定义二：类之间的依赖应该建立在最小的接口之上',
    return: '--',
    attention: '客户端需要什么功能，就提供什么接口，对于客户端不需要的接口不应该强行要求其实现；类之间的依赖应该建立在最小的接口上面，这里最小的粒度取决于单一职责原则的划分',
    description: '接口的粒度要最小化，冗余最小的接口就是最符合接口隔离原则的接口',
  },
  example: `//state为几何体的状态参数集合，是一个json对象
const shapeInterface = (state) => ({
  type: 'shapeInterface',//接口名
  area: () => state.area(state),//计算面积
  volume: () => state.volume(state)//计算体积
})`,
  handwriting: `const shapeInterface = (state) =>{
      type:'shapeInterface'
      area:()=>state.area(state)
  }
const solidShapeInterface = (state) =>{
    type:'solidShapeInterface'
    volume:()=>state.area(state)
}
const cubo = (length) =>{
    const proto = {
        //属性
        type:'cubo',
        length,
        //方法
        area:(args) => args.length ** 2
        volumn:(args) => args.length ** 3
    }
    const basics = shapeInterface(proto)//实现计算面积的接口
    const complex = solidShapeInterface(proto)//实现计算体积的接口
    //利用object.assign组合出一个新的类，这个类上实现两种接口
    const composite = Object.assign({},basics,complex)
    //最后传入参数
    return Object.assign(Object.create(composite),{length})
}

//上面代码是一种相对较好的方法，能够计算面积，也能计算体积。但是要注意的是，
//如果想计算shape的面积与体积之和，而不是依靠改动已有shapeInterface或solidShapeInterface这两个接口，
//那又该怎么实现呢？你可以创建另一个接口，名字可以是manageShapeInterface，并在平面和立体的shape上都实现它，
这种方式的代码如下：

const manageShapeInterface = (fn) => ({
  type: 'manageShapeInterface',
  calculate: () => fn()
})
//平面圆
const circle = (radius) => {
  const proto = {
    radius,
    type: 'Circle',
    area: (args) => Math.PI * Math.pow(args.radius, 2)
  }
  const basics = shapeInterface(proto)
  const abstraccion = manageShapeInterface(() => basics.area())
  const composite = Object.assign({}, basics, abstraccion)
  return Object.assign(Object.create(composite), {radius})
}
//立方体
const cubo = (length) => {
  const proto = {
    length,
    type   : 'Cubo',
    area   : (args) => Math.pow(args.length, 2) * 6,
    volume : (args) => Math.pow(args.length, 3)
  }
  const basics  = shapeInterface(proto)
  const complex = solidShapeInterface(proto)
  //关键语句，传入一个函数，让该函数实现具体的逻辑
  const abstraccion = manageShapeInterface(
    () => basics.area() + complex.volume()
  )
  const composite = Object.assign({}, basics, abstraccion)
  return Object.assign(Object.create(composite), {length})
}`,
  image: false,
}

//开放关闭原则
export const openClose = {
  data: {
    name: '开放关闭原则（Open Closed Principle）',
    params: '原则：软件实体（包括类、模块、功能等）应该对扩展开放，但是对修改关闭',
    paramsDes: '对扩展开放：模块通过扩展的方式去应对需求的变化',
    return: '对修改关闭：应该尽量在不修改源代码的基础上面扩展组件',
    attention:
      '接到需求变更的通知，通常方式可能就是修改模块的源代码，然而修改已经存在的源代码是存在很大风险的，尤其是项目上线运行一段时间后，开发人员发生变化，这种风险可能就更大。所以，为了避免这种风险，在面对需求变更时，我们一般不修改源代码，即所谓的对修改关闭',
    description:
      '通过扩展去应对需求变化，就要求我们必须要面向接口编程，或者说面向抽象编程。所有参数类型、引用传递的对象必须使用抽象（接口或者抽象类）的方式定义，不能使用实现类的方式定义；通过抽象去界定扩展，比如我们定义了一个接口A的参数，那么我们的扩展只能是接口A的实现类',
  },
  example: `//iceCreamMaker.js
  //这段代码，不编辑iceCreamFlavor数组就无法添加冰淇淋口味
let iceCreamFlavors = ['chocolate', 'vanilla'];//口味
let iceCreamMaker = {
  makeIceCream(flavor) {
    if (iceCreamFlavors.indexOf(flavor) > -1) {
      console.log('您选的口味有货，马上给您做冰激凌。');
    } else {
      console.log('哎呀，您选的口味我们没有。');
    }
  },
};
export default iceCreamMaker;`,
  handwriting: `//iceCreamMaker.js
//改进后我们可以在代码中的任何位置调用addFlavor函数，以便添加美味的冰淇淋口味，
而无需打开编辑iceCreamMaker.js文件。 确实是可靠的(solid)JavaScript
let iceCreamFlavors = ['chocolate', 'vanilla'];//口味
let iceCreamMaker = {
  makeIceCream(flavor) {
    if (iceCreamFlavors.indexOf(flavor) > -1) {
      console.log('您选的口味有货，马上给您做冰激凌。');
    } else {
      console.log('哎呀，您选的口味我们没有。');
    }
  },
  //增加口味
  addFlavor(flavor) {
    iceCreamFlavors.push(flavor);
  },
};
export default iceCreamMaker;`,
  image: false,
}

//里氏替换原则

export const lspPriceple = {
  data: {
    name: '里氏替换原则（Liskov Substitution Principle）',
    params: '原则一：任何基类可以出现的地方，子类一定可以出现。',
    paramsDes: '原则二：子类对象能够替换父类对象，而程序逻辑不变',
    return: 'LSP是继承复用的基石，只有当衍生类可以替换掉基类，软件单位的功能不受到影响时，基类才能真正被复用，而衍生类也能够在基类的基础上增加新的行为。',
    attention:
      '尽量不要从可实例化的父类中继承，而是要使用基于抽象类和接口的继承。里氏替换原则是针对继承而言的，如果继承是为了实现代码重用，也就是为了共享方法，那么共享的父类方法就应该保持不变，不能被子类重新定义。子类只能通过新添加方法来扩展功能，父类和子类都可以实例化，而子类继承的方法和父类是一样的，父类调用方法的地方，子类也可以调用同一个继承得来的，逻辑和父类一致的方法',
    description:
      '如果继承的目的是为了多态，而多态的前提就是子类覆盖并重新定义父类的方法，为了符合LSP，我们应该将父类定义为抽象类，并定义抽象方法，让子类重新定义这些方法，当父类是抽象类时，父类就是不能实例化，所以也不存在可实例化的父类对象在程序里。也就不存在子类替换父类实例（根本不存在父类实例了）时逻辑不一致的可能',
  },
  example: `//父类
  class Shape{
      ...
  }

//子类
  class Rectangle extends Shape{
      ...
  }

  class Square extends Shape{
      ...
  }

  class Circle extends Shape{
      ...
  }`,
  handwriting: `//父类
class Shape {
  get area() {
    return 0;
  }
}

//子类
class Rectangle extends Shape {
  constructor(length, width) {
    super();
    this.length = length;
    this.width = width;
  }  get area() {
    return this.length * this.width;
  }
}
//子类
class Square extends Shape {
  constructor(length) {
    super();
    this.length = length;
  }  get area() {
    return this.length ** 2;
  }
}
//子类
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }  get area() {
    return Math.PI * (this.radius ** 2);
  }
}`,
  image: false,
}

//依赖倒置原则

export const dependencyInversion = {
  data: {
    name: '依赖倒置原则(Dependence Inversion Principle)',
    params: '原则1：程序要依赖于抽象，不要依赖于具体实现',
    paramsDes: '原则2：高层次模块不应该依赖低层次模块，它们都应该依赖于抽象',
    return: '依赖倒置”是粗粒度的软件设计原则；“控制反转”是遵守依赖倒置这个原则而提出来的一种设计模式；而“依赖注入”属于更细粒度的实现“控制反转”的手段。这3者都是为了一个目的：代码更加的“高内聚,低耦合”',
    attention:
      '何为高层次，何为低层次：任何一个组织机构一定有架构的设计有职能的划分。按照职能的重要性，自然就有高低层次之分。并且，随着模块的粒度划分不同高层次与低层次模块会进行变动，也许某一模块相对于另外一模块它是低层次的，但是相对于其他模块它可能又是高层次的',
    description: '抽象：抽象如其名字一样，是一件很抽象的事物。抽象往往是相对于具体而言的，具体也可以被称为细节，当然也被称为具象',
  },
  example: `//渣男炼成记
//小明今年20岁上大二，喜欢漂亮女孩，经过长达半年的马拉松式追求，终于俘获了聪明美丽的女孩小羽儿的芳心。
//两人天天腻歪在一起，一起上自习、吃饭、看电影、甚至kiss……更多的内容少儿不宜。总之，有个女朋友的感觉太好啦，
//小明已经彻底离不开小羽儿。代码实现如下：
/**
 * 小羽儿
 */
class XiaoYuEr {
   constructor() {
      this.name = "小羽儿";
   }
   study(){}
   eat(){}
   watchMovie(){}
   kiss(){}
}

/**
 * 小明
 */
class XiaoMing {
   girlfriend = new XiaoYuEr();
   constructor() {
      this.name = "小明";
   }

   study() {
      console.log('\${this.name}和\${this.girlfriend.name}在上自习');
      this.girlfriend.study();
   }
   eat() {
      console.log('\${this.name}和\${this.girlfriend.name}在吃饭');
      this.girlfriend.eat();
   }
   watchMovie() {
      console.log('\${this.name}和\${this.girlfriend.name}在看电影);
      this.girlfriend.watchMovie();
   }
   kiss() {
      console.log('\${this.name}和\${this.girlfriend.name}在接吻');
      this.girlfriend.kiss();
   }
}

let xiaoming = new XiaoMing();
xiaoming.study(); //>>小明和小羽儿在上自习
xiaoming.eat(); //>>小明和小羽儿在吃饭
xiaoming.watchMovie(); //>>小明和小羽儿在看电影
xiaoming.kiss(); //>>小明和小羽儿在接吻`,
  handwriting: `//幸福的日子持续了一年，小羽儿的父母想送她去美国留学，小明万般不舍，但是无奈贫贱不能移，
//只能看着女朋友离自己而去。伤心了几个月，好在小明长得酷酷的又有才气，很快有个漂亮的女孩小萌的喜欢上了他。于是
/**
 * 小萌
 */
class XiaoMeng {
   constructor() {
      this.name = "小萌";
   }
   study(){}
   eat(){}
   watchMovie(){}
   kiss(){}
}

/**
 * 小明
 */
class XiaoMing {
   girlfriend = new XiaoMeng(); //因为换了女朋友，小明要在心里把女友换成了小萌，
                                //里外都要换，代价是昂贵的
   constructor() {
      this.name = "小明";
   }

   study() {
      console.log('\${this.name}和\${this.girlfriend.name}在上自习');
      this.girlfriend.study();
   }
   eat() {
      console.log('\${this.name}和\${this.girlfriend.name}在吃饭');
      this.girlfriend.eat();
   }
   watchMovie() {
      console.log('\${this.name}和\${this.girlfriend.name}在看电影);
      this.girlfriend.watchMovie();
   }
   kiss() {
      console.log('\${this.name}和\${this.girlfriend.name}在接吻');
      this.girlfriend.kiss();
   }
}

let xiaoming = new XiaoMing();
xiaoming.study(); //>>小明和小萌在上自习
xiaoming.eat(); //>>小明和小萌在吃饭
xiaoming.watchMovie(); //>>小明和小萌在看电影
xiaoming.kiss(); //>>小明和小萌在接吻`,

  extend1: `//有了新女友，小明很快走出了郁郁寡欢的日子。梅开二度看似美好，但其实小明没有那么爱小萌，
//这段恋情很快就结束了。然后某天，小明突然明白了，原来自己只是害怕孤独，需要有个大学女生陪伴自己上自习、
//吃饭、看电影……而已，至于具体是哪个女孩他并不特别在意。
/**
 * 大学女生
 */
class CollegeGirl {
   constructor() {
      this.name = "大学女生";
   }
   study(){}
   eat(){}
   watchMovie(){}
   kiss(){}
}

class Girl1 extends CollegeGirl {
   constructor() {
      super();
      this.name = "小花";
   }
}
class Girl2 extends CollegeGirl {
   constructor() {
      super();
      this.name = "小蓝";
   }
}
class Girl3 extends CollegeGirl {
   constructor() {
      super();
      this.name = "小红";
   }
}
class Girl4 extends CollegeGirl {
   constructor() {
      super();
      this.name = "小美";
   }
}
class Girl5 extends CollegeGirl {
   constructor() {
      super();
      this.name = "小丫";
   }
}
class Girl6 extends CollegeGirl {
   constructor() {
      super();
      this.name = "小晴";
   }
}
class Girl7 extends CollegeGirl {
   constructor() {
      super();
      this.name = "小珂";
   }
}

/**
 * 小明
 */
class XiaoMing {
   constructor(collegeGirl) {
      this.name = "小明";
      this.girlfriend = collegeGirl;
   }

  study() {
      console.log('\${this.name}和\${this.girlfriend.name}在上自习');
      this.girlfriend.study();
   }
   eat() {
      console.log('\${this.name}和\${this.girlfriend.name}在吃饭');
      this.girlfriend.eat();
   }
   watchMovie() {
      console.log('\${this.name}和\${this.girlfriend.name}在看电影);
      this.girlfriend.watchMovie();
   }
   kiss() {
      console.log('\${this.name}和\${this.girlfriend.name}在接吻');
      this.girlfriend.kiss();
   }
}

/**
 * 小明祈祷老天爷让自己摆脱孤独，老天爷感其诚，每天都安排不同大学女生给他
 */
function showMeCollegeGirl() {
   let now = new Date().getUTCDay() % 7;
   switch (now) {
      case 1:
         return new Girl1();
      case 2:
         return new Girl2();
      case 3:
         return new Girl3();
      case 4:
         return new Girl4();
      case 5:
         return new Girl5();
      case 6:
         return new Girl6();
      case 0:
         return new Girl7();
   }

}

let xiaoming = new XiaoMing(showMeCollegeGirl());//将依赖的对象注入构造函数
//小明每天和不同女孩一起，过起了没羞没臊的渣男生活
xiaoming.study(); 
xiaoming.eat(); 
xiaoming.watchMovie(); 
xiaoming.kiss(); 

//小明从依赖具体的女孩小羽儿，转为依赖抽象的大学女生。这样之后，小明内心不用更换了女朋友的位置，
//因此没有心理包袱，感觉很轻松。然后第108行在构造函数里传递（注入）了具体的大学女生，这就叫做依赖(于)注入(DI，Dependency Injection)。
//并且小明把选择女友的这种“控制权”让渡给了老天爷(由JS引擎全局作用域的showMeCollegeGirl函数来分配女孩)，这叫做控制反转(IoC，Inversion of Control)
`,
  image: false,
}
