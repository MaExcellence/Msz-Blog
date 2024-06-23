import{_ as o,r as p,o as g,c as e,b as t,d as r,e as a,a as n}from"./app-ad70bc3c.js";const h={},d=n('<h1 id="一-七大设计原则" tabindex="-1"><a class="header-anchor" href="#一-七大设计原则" aria-hidden="true">#</a> 一.七大设计原则</h1><h2 id="_1-单一职责原则" tabindex="-1"><a class="header-anchor" href="#_1-单一职责原则" aria-hidden="true">#</a> <strong>1.单一职责原则</strong></h2><p>​ 单一责任原则(SRP)，它规定程序中的每个模块、类或函数都应该对该程序功能的单个部分负责，并且应该封装该部分。</p><hr><p><strong>单一职责好处：</strong></p><p>​ <strong>1.类的复杂性降低，实现什么职责都有清晰明确的定义；</strong></p><p>​ <strong>2.可读性提高；</strong></p><p>​ <strong>3.可维护性提高；</strong></p><p>​ **4.变更引起的风险降低；**变更是必不可少的，接口的单一职责做的好的话，一个接口修改只对相应的实现类有影响，与其他的接口无影响，这个是对项目有非常大的帮助。</p><hr><p><strong>注意：</strong> 单一职责原则 提出了一个编写程序的标准，用“职责”或“变化原因”来衡量接口或类设计是否优良，但是“职责”和“变化原因”都是不可度量的，因项目而异，因环境而异。</p><h2 id="_2-里氏替换原则" tabindex="-1"><a class="header-anchor" href="#_2-里氏替换原则" aria-hidden="true">#</a> <strong>2.里氏替换原则</strong></h2><p>​ 里氏替换原则（LSP）提出：<strong>继承必须确保超类所拥有的性质在子类中仍然成立</strong>。</p><p>​ <strong>主要阐述了有关</strong> <strong>继承</strong> <strong>的一些原则</strong>，也就是什么时候应该使用继承，什么时候不应该使用继承，以及其中蕴含的原理。里氏替换原是继承复用的基础，它反映了基类与子类之间的关系，是对开闭原则的补充，是对实现抽象化的具体步骤的规范。</p><hr><p><strong>里氏替换原则的主要作用如下:</strong></p><p>​ <strong>1.里氏替换原则是实现开闭原则的重要方式之一。</strong></p><p>​ <strong>2.它克服了继承中重写父类造成的可复用性变差的缺点。</strong></p><p>​ <strong>3.它是动作正确性的保证。即类的扩展不会给已有的系统引入新的错误，降低了代码出错的可能性。</strong></p><p>​ <strong>4.加强程序的健壮性，同时变更时可以做到非常好的兼容性，提高程序的维护性、可扩展性，降低需求变更时引入的风险。</strong></p><hr><p><strong>重写和重载需要注意的地方:</strong></p><p>​ <strong>1.子类中方法的前置条件必须与超类中被覆盖的方法的前置条件相同或者更宽松;</strong></p><p>​ <strong>2.覆盖或实现父类的方法是输出结果可以被缩小</strong>。</p><p>父类的一个方法返回值是一个类型T，子类相同方法 (重载 或 重写) 返回值为 S，那么里氏替换法则就要求 S 必须小于等于 T，也就是说要么 S 和 T 是同一个类型，要么 S 是 T 的子类，为什么呢？分两种情况，如果是重写，方法的输入参数父类子类是相同的，两个方法的范围值 S 小于等于 T，这个是重写的要求，这个才是重中之重，子类重写父类的方法，</p><p>天经地义；如果是重载，则要求方法的输入参数不相同，在里氏替换法则要求下就是子类的输入参数大于等于父类的输入参数，那就是说你写的这个方法是不会被调用到的。</p><h2 id="_3-依赖倒置原则" tabindex="-1"><a class="header-anchor" href="#_3-依赖倒置原则" aria-hidden="true">#</a> <strong>3.依赖倒置原则</strong></h2><p><strong>依赖倒置原则（DIP）的原始定义为：</strong></p><p>​ <strong>1.高层模块不应该依赖低层模块，两者都应该依赖其抽象；</strong></p><p>​ <strong>2.抽象不应该依赖细节;</strong></p><p>​ <strong>3.细节应该依赖抽象;</strong></p><hr><p>​ 每一个逻辑的实现都是由原子逻辑组成的，不可分割的原子逻辑就是低层模块(一般是接口，抽象类)，原子逻辑的组装就是高层模块。在Java语言中，抽象就是指接口和或抽象类，两者都不能被直接实例化。细节就是实现类，实现接口或继承抽象类而产生的类就是细节，可以被直接实例化。下面是依赖倒置原则在Java语言中的表现：</p><p><strong>1.模块间的依赖通过抽象发生，实现类之间不发生直接的依赖关系，其依赖关系是通过接口或抽象类产生的;</strong></p><p><strong>2.接口或抽象类不依赖于实现类;</strong></p><p><strong>3.实现类依赖于接口或抽象类;</strong></p><hr><p><strong>其核心思想是</strong>：要面向接口编程，不要面向实现编程。依赖倒置原则是实现开闭原则的重要途径之一，它降低了客户与实现模块之间的耦合。</p><hr><p><strong>更为精简的定义：面向接口编程(Object-Oriented Design, OOD)。</strong></p><hr><p><strong>DIP的好处作用：</strong> 采用依赖倒置原则可以减少类间的耦合性，提高系统的稳定性，降低并行开发引起的风险，提高代码的可读性和可维护性。</p><h2 id="_4-接口隔离原则" tabindex="-1"><a class="header-anchor" href="#_4-接口隔离原则" aria-hidden="true">#</a> <strong>4.接口隔离原则</strong></h2><p>​ ●接口隔离原则（ISP）要求程序员尽量将臃肿庞大的接口拆分成更小的和更具体的接口，让接口中只包含客户感兴趣的方法。</p><hr><p><strong>定义：</strong></p><p>​ <strong>1.客户端不应该被迫依赖于它不使用的方法；</strong></p><p>​ <strong>2.一个类对另一个类的依赖应该建立在最小的接口上；</strong></p><p>**含义：**要为各个类建立它们需要的专用接口，而不要试图去建立一个很庞大的接口供所有依赖它的类去调用。</p><hr><p>​ <strong>接口隔离原则</strong>和<strong>单一职责</strong>都是为了提高类的内聚性、降低它们之间的耦合性，体现了封装的思想，但两者是<strong>不同</strong>的：</p><p>​ <strong>1.单一职责原则注重的是职责，而接口隔离原则注重的是对接口依赖的隔离。</strong></p><p>​ <strong>2.单一职责原则主要是约束类，它针对的是程序中的实现和细节；接口隔离原则主要约束接口，主要针对抽象和程序整体框架的构建。</strong></p><hr><p><strong>优点：</strong></p><p>接口隔离原则是为了约束接口、降低类对接口的依赖性，遵循接口隔离原则有以下 5 个优点:</p><p>​ <strong>1.将臃肿庞大的接口分解为多个粒度小的接口，可以预防外来变更的扩散，提高系统的灵活性和可维护性。</strong></p><p>​ <strong>2.接口隔离提高了系统的内聚性，减少了对外交互，降低了系统的耦合性。</strong></p><p>​ <strong>3.如果接口的粒度大小定义合理，能够保证系统的稳定性；但是，如果定义过小，则会造成接口数量过多，使设计复杂化；如果定义太大，灵活性降低，无法提供定制服务，给整体项目带来无法预料的风险。</strong></p><p>​ <strong>4.使用多个专门的接口还能够体现对象的层次，因为可以通过接口的继承，实现对总接口的定义。</strong></p><p>​ <strong>5.能减少项目工程中的代码冗余。过大的大接口里面通常放置许多不用的方法，当实现这个接口的时候，被迫设计冗余的代码。</strong></p><hr><p><strong>实现:</strong></p><p>在具体应用接口隔离原则时，应该根据以下几个规则来衡量。</p><p>​ <strong>1.接口尽量小，但是要有限度。一个接口只服务于一个子模块或业务逻辑。根据接口隔离原则拆分接口时，必须首先满足单一职责原则。</strong></p><p>​ <strong>2.为依赖接口的类定制服务。只提供调用者需要的方法，屏蔽不需要的方法。</strong></p><p>​ <strong>3.了解环境，拒绝盲从。每个项目或产品都有选定的环境因素，环境不同，接口拆分的标准就不同深入了解业务逻辑。已经被污染了的接口，尽量去修改，若变更的风险较大，则采用适配器模式进行转化处理。</strong></p><p>​ <strong>4.提高内聚，减少对外交互。使接口用最少的方法去完成最多的事情。</strong></p><h2 id="_5-迪米特法则" tabindex="-1"><a class="header-anchor" href="#_5-迪米特法则" aria-hidden="true">#</a> <strong>5.迪米特法则</strong></h2><p><strong>迪米特法则（LoD）</strong>，又名为最小知识原则（The Least Knowledge Principle）；</p><p><strong>定义</strong>：每个模块（unit）只应该了解那些与它关系密切的模块（units: only units“closely” related to the current unit）的有限知识（knowledge）。或者说，每个模块只和自己的朋友“说话”（talk），不和陌生人 “说话”（talk）；( <strong>一个对象 应该 对 其它对象 , 保持最少的了解</strong> )</p><p>简单理解就是，<strong>不该有直接依赖关系的类之间，不要有依赖；有依赖关系的类之间，尽量只依赖必要的接口（也就是定义中的“有限知识”）</strong>。</p><hr><p><strong>●迪米特原则优点: 降低了 类 之间的耦合;</strong></p><p><strong>●代码实现的层面最佳做法:</strong> 尽量不要对外公开太多的 public 方法, 和 public 变量, 尽量内敛 , 多使用 private / protected 权限;</p><p><strong>●迪米特原则 的核心观念:</strong> 就是 类 之间的解耦 , 解耦 是有一定程度的 , 尽量做到 弱耦合 , 耦合程度越低 , 类的复用率 才能提高 ;</p><hr><p><strong>注意：</strong></p><p>​ 1.使用迪米特原则要适度,如果过分使用迪米特原则,会产生大量中介类,导致系统变复杂,增加维护难度;</p><p>​ 2.使用迪米特原则要权衡利弊,既要做到结构清晰,又要做到<strong>低耦合</strong>和<strong>高内聚</strong>;</p><hr><p><strong>such as：</strong></p><p>如果存在一个方法, 既可以放在 A 类中, 又可以放在 B 类中;</p><p>这种情况下, 如果一个方法可以放在本类中, 既不增加类间关系, 也没有对本类产生负面影响, 就可以放到本类中;</p><p>方法中, 如果 参数, 返回值, 使用了其它类, 导致了 import 导入了一个依赖, 这就增加了类间的关系;</p><p>迪米特原则强调 只和朋友交流,不和陌生人说话;</p><p>这里的朋友指的是: 出现在 成员变量, 方法的 输入, 输出参数中的类, 称为成员朋友类, 出现在方法体内部的类 ,不属于朋友类;</p><p>也就是说类 A, 我使用了 类 A 中的方法, 或成员, 尽量避免导致本类 import 导入新的类;</p><h2 id="_6-开闭原则" tabindex="-1"><a class="header-anchor" href="#_6-开闭原则" aria-hidden="true">#</a> <strong>6.开闭原则</strong></h2>',89),i=t("strong",null,"开闭原则",-1),c={href:"https://so.csdn.net/so/search?q=%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1&spm=1001.2101.3001.7020",target:"_blank",rel:"noopener noreferrer"},l=t("strong",null,"它是最重要的面向对象设计原则",-1),_=n('<p>该原则<strong>定义</strong>如下：<strong>软件实体应当对扩展开放(对提供方)，对修改关闭(对使用方)</strong>。当软件需要变化时，尽量通过扩展软件实体的行为来实现变化，而不是通过修改已有的代码来实现变化。</p><h2 id="_7-合成复用原则" tabindex="-1"><a class="header-anchor" href="#_7-合成复用原则" aria-hidden="true">#</a> <strong>7.合成复用原则</strong></h2><p>​ 合成复用原则(CRP)：<strong>尽量使用对象组合，而不是继承来达到复用的目的。</strong></p><p>​ 合成复用原则就是在一个新的对象里通过关联关系（包括组合关系和聚合关系）来使用一些 已有的对象，使之成为新对象的一部分；新对象通过委派调用已有对象的方法达到复用功能 的目的。简言之：复用时要尽量使用组合/聚合关系（关联关系），少用继承。</p><hr><p>​ 在面向对象设计中，可以通过两种方法在不同的环境中复用已有的设计和实现，即通过组合/ 聚合关系或通过继承，但首先应该考虑使用组合/聚合，组合/聚合可以使系统更加灵活，降低 类与类之间的耦合度，一个类的变化对其他类造成的影响相对较少；其次才考虑继承，在使 用继承时，需要严格遵循里氏代换原则，有效使用继承会有助于对问题的理解，降低复杂 度，而滥用继承反而会增加系统构建和维护的难度以及系统的复杂度，因此需要慎重使用继 承复用。</p><hr><p>​ 通过继承来进行复用的主要问题在于继承复用会破坏系统的封装性，因为继承会将基类的实 现细节暴露给子类，由于基类的内部细节通常对子类来说是可见的，所以这种复用又称“白 箱”复用，如果基类发生改变，那么子类的实现也不得不发生改变；从基类继承而来的实现是 静态的，不可能在运行时发生改变，没有足够的灵活性；而且继承只能在有限的环境中使用 （如类没有声明为不能被继承）。</p><hr><p>一般而言，如果两个类之间是“Has-A”的关系应使用组合或聚合，如果是“Is-A”关系可使用继 承。“Is-A&quot;是严格的分类学意义上的定义，意思是一个类是另一个类的&quot;一种”；而&quot;Has-A&quot;则不 同，它表示某一个角色具有某一项责任。</p>',10);function u(f,x){const s=p("ExternalLinkIcon");return g(),e("div",null,[d,t("p",null,[r("​ "),i,r("(OCP)，它是"),t("a",c,[r("面向对象"),a(s)]),r("的可复用设计的第一块基石，"),l,r("。")]),_])}const m=o(h,[["render",u],["__file","qidashejiyuanze.html.vue"]]);export{m as default};
