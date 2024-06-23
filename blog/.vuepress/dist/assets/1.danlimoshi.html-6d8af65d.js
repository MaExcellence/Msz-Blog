import{_ as n,o as s,c as a,b as e}from"./app-3bb1037e.js";const t={},p=e(`<h2 id="单例模式-singleton-pattern" tabindex="-1"><a class="header-anchor" href="#单例模式-singleton-pattern" aria-hidden="true">#</a> 单例模式（Singleton Pattern）</h2><p><strong>定义</strong>：确保一个类只有一个实例，而且自行实例化并向整个系统提供这个实例。</p><hr><p><strong>优点：</strong></p><p>● 由于单例模式在内存中只有一个实例，减少了内存开支，特别是一个对象需要频繁地创建、销毁时，而且创建或销毁时性能又无法优化，单例模式的优势就非常明显。</p><p>● 由于单例模式只生成一个实例，所以减少了系统的性能开销，当一个对象的产生需要比较多的资源时，如读取配置、产生其他依赖对象时，则可以通过在应用启动时直接产生一个单例对象，然后用永久驻留内存的方式来解决（在Java EE中采用单例模式时需要注意 JVM 垃圾回收机制）。</p><p>● 单例模式可以避免对资源的多重占用，例如一个写文件动作，由于只有一个实例存在内存中，避免对同一个资源文件的同时写操作。</p><p>● 单例模式可以在系统设置全局的访问点，优化和共享资源访问，例如可以设计一个单例类，负责所有数据表的映射处理。</p><hr><p><strong>缺点：</strong></p><p>● 单例模式一般没有接口，扩展很困难，若要扩展，除了修改代码基本上没有第二种途径可以实现。单例模式为什么不能增加接口呢？因为接口对单例模式是没有任何意义的，它要求“自行实例化”，并且提供单一实例、接口或抽象类是不可能被实例化的。当然，在特殊情况下，单例模式可以实现接口、被继承等，需要在系统开发中根据环境判断。</p><p>● 单例模式对测试是不利的。在并行开发环境中，如果单例模式没有完成，是不能进行测试的，没有接口也不能使用mock的方式虚拟一个对象。</p><p>● 单例模式与单一职责原则有冲突。一个类应该只实现一个逻辑，而不关心它是否是单例的，是不是要单例取决于环境，单例模式把“要单例”和业务逻辑融合在一个类中。</p><hr><p>单例模式是创建型模式。单例模式分为饿汉式单例和懒汉式单例，接下来我们对这两种类型做详细介绍。</p><p>● <strong>饿汉式</strong>：类加载就会导致该单实例对象被创建</p><p>● <strong>懒汉式</strong>：类加载不会导致该单实例对象被创建，而是首次使用该对象时才会创建</p><hr><p><strong>饿汉式</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//饿汉式--1.静态变量创建类的对象</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">//在成员位置创建该类的对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

说明：
​该方式在成员位置声明<span class="token class-name">Singleton</span>类型的静态变量，并创建<span class="token class-name">Singleton</span>类的对象instance。instance对象是随着类的加载而创建的。如果该对象足够大的话，而一直没有使用就会造成内存的浪费。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//恶汉式--2.在静态代码块中创建该类对象</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">//在成员位置创建该类的对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
说明：
​该方式在成员位置声明<span class="token class-name">Singleton</span>类型的静态变量，而对象的创建是在静态代码块中，也是对着类的加载而创建。所以和饿汉式的方式<span class="token number">1</span>基本上一样，当然该方式也存在内存浪费问题。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>懒汉式</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//懒汉式--1.线程不安全</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">//在成员位置创建该类的对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
说明：
​从上面代码我们可以看出该方式在成员位置声明<span class="token class-name">Singleton</span>类型的静态变量，并没有进行对象的赋值操作，那么什么时候赋值的呢？当调用<span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法获取<span class="token class-name">Singleton</span>类的对象的时候才创建<span class="token class-name">Singleton</span>类的对象，这样就实现了懒加载的效果。但是，如果是多线程环境，会出现线程安全问题。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//懒汉式--2.线程安全</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token comment">//在成员位置创建该类的对象</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">synchronized</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
说明：
​该方式也实现了懒加载效果，同时又解决了线程安全问题。但是在<span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span>方法上添加了<span class="token keyword">synchronized</span>关键字，导致该方法的执行效果特别低。从上面代码我们可以看出，其实就是在初始化instance的时候才会出现线程安全问题，一旦初始化完成就不存在了。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>优化：再来讨论一下懒汉模式中加锁的问题，对于 <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> 方法来说，绝大部分的操作都是读操作，读操作是线程安全的，所以我们没必让每个线程必须持有锁才能调用该方法，我们需要调整加锁的时机。由此也产生了一种新的实现模式：双重检查锁模式；

<span class="token comment">//懒汉式--3.双重检查方式</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span> 

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
    双重检查锁模式是一种非常好的单例实现模式，解决了单例、性能、线程安全问题，特别注意如果不加（volatile）关键字看上去完美无缺，其实是存在问题，在多线程的情况下，可能会出现空指针问题，出现问题的原因是JVM在实例化对象的时候会进行优化和指令重排序操作。要解决双重检查锁模式带来空指针异常的问题，只需要使用 volatile 关键字, volatile 关键字可以保证可见性和有序性。
    **/</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>
   
   <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//第一次判断，如果instance不为null，不进入抢锁阶段，直接返回实例</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">//抢到锁之后再次判断是否为null</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

说明：
​添加 <span class="token keyword">volatile</span> 关键字之后的双重检查锁模式是一种比较好的单例实现模式，能够保证在多线程的情况下线程安全也不会有性能问题。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//懒汉式--4.静态内部类方式</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonHolder</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

说明：
​静态内部类单例模式中实例由内部类创建，由于 <span class="token constant">JVM</span> 在加载外部类的过程中<span class="token punctuation">,</span> 是不会加载静态内部类的<span class="token punctuation">,</span> 只有内部类的属性<span class="token operator">/</span>方法被调用时才会被加载<span class="token punctuation">,</span> 并初始化其静态属性。静态属性由于被 <span class="token keyword">static</span> 修饰，保证只被实例化一次，并且严格保证实例化顺序。
​ 第一次加载<span class="token class-name">Singleton</span>类时不会去初始化<span class="token constant">INSTANCE</span>，只有第一次调用getInstance，虚拟机加载<span class="token class-name">SingletonHolder</span>
并初始化<span class="token constant">INSTANCE</span>，这样不仅能确保线程安全，也能保证 <span class="token class-name">Singleton</span> 类的唯一性。
​ 静态内部类单例模式是一种优秀的单例模式，是开源项目中比较常用的一种单例模式。在没有加任何锁的情况下，保证了多线程下的安全，并且没有任何性能影响和空间的浪费。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>枚举方式</strong></p><p>​ <strong>枚举类实现单例模式</strong>是极力<strong>推荐</strong>的单例实现模式，因为枚举类型是<strong>线程安全</strong>的，并且<strong>只会装载一次</strong>，设计者充分的利用了枚举的这个特性来实现单例模式，枚举的写法非常简单，而且枚举类型是所用单例实现中唯一一种<strong>不会被破坏</strong>的单例实现模式。</p><hr><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 枚举方式</span>
<span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>
    <span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
说明：
​ 枚举方式属于饿汉式方式。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>存在的问题：</strong></p><p>问题演示：</p><p><strong>破坏单例模式：</strong></p><p>使上面定义的单例类（Singleton）可以创建多个对象，枚举方式除外。有两种方式，分别是<strong>序列化</strong>和<strong>反射</strong>。</p><ul><li>序列化反序列化</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//========Singleton类：========</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonHolder</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//========Test类：========</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//往文件中写对象</span>
        <span class="token comment">//writeObject2File();</span>
        <span class="token comment">//从文件中读取对象</span>
        <span class="token class-name">Singleton</span> s1 <span class="token operator">=</span> <span class="token function">readObjectFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Singleton</span> s2 <span class="token operator">=</span> <span class="token function">readObjectFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//判断两个反序列化后的对象是否是同一个对象</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1 <span class="token operator">==</span> s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">readObjectFromFile</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//创建对象输入流对象</span>
        <span class="token class-name">ObjectInputStream</span> ois <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\Users\\\\Think\\\\Desktop\\\\a.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//第一个读取Singleton对象</span>
        <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">)</span> ois<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">writeObject2File</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//获取Singleton类的对象</span>
        <span class="token class-name">Singleton</span> instance <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//创建对象输出流</span>
        <span class="token class-name">ObjectOutputStream</span> oos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectOutputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\Users\\\\Think\\\\Desktop\\\\a.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//将instance对象写出到文件中</span>
        oos<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span>instance<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

​ 上面代码运行结果是<span class="token boolean">false</span>，表明序列化和反序列化已经破坏了单例设计模式。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>反射</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//========Singleton类：========</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//========Test类：========</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//获取Singleton类的字节码对象</span>
        <span class="token class-name">Class</span> clazz <span class="token operator">=</span> <span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">;</span>
        <span class="token comment">//获取Singleton类的私有无参构造方法对象</span>
        <span class="token class-name">Constructor</span> constructor <span class="token operator">=</span> clazz<span class="token punctuation">.</span><span class="token function">getDeclaredConstructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//取消访问检查</span>
        constructor<span class="token punctuation">.</span><span class="token function">setAccessible</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建Singleton类的对象s1</span>
        <span class="token class-name">Singleton</span> s1 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">)</span> constructor<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//创建Singleton类的对象s2</span>
        <span class="token class-name">Singleton</span> s2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">)</span> constructor<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//判断通过反射创建的两个Singleton对象是否是同一个对象</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>s1 <span class="token operator">==</span> s2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

​ 上面代码运行结果是<span class="token boolean">false</span>，表明序列化和反序列化已经破坏了单例设计模式
​ 注意：枚举方式不会出现这两个问题。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>问题的解决：</strong></p><p>1.序列化、反序列方式破坏单例模式的解决方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//在Singleton类中添加readResolve()方法，在反序列化时被反射调用，如果定义了这个方法，就返回这个方法的值，如果没有定义，则返回新new出来的对象。</span>
<span class="token comment">//========Singleton类：========</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">SingletonHolder</span> <span class="token punctuation">{</span>
        <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Singleton</span> <span class="token constant">INSTANCE</span> <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
    <span class="token doc-comment comment">/**
     * 下面是为了解决序列化反序列化破解单例模式
     */</span>
    <span class="token keyword">private</span> <span class="token class-name">Object</span> <span class="token function">readResolve</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">SingletonHolder</span><span class="token punctuation">.</span><span class="token constant">INSTANCE</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//举例：源码解析：ObjectInputStream类</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token class-name">Object</span> <span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span><span class="token punctuation">,</span> <span class="token class-name">ClassNotFoundException</span><span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token comment">// if nested read, passHandle contains handle of enclosing object</span>
    <span class="token keyword">int</span> outerHandle <span class="token operator">=</span> passHandle<span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token class-name">Object</span> obj <span class="token operator">=</span> <span class="token function">readObject0</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//重点查看readObject0方法</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>
    
<span class="token keyword">private</span> <span class="token class-name">Object</span> <span class="token function">readObject0</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> unshared<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token keyword">switch</span> <span class="token punctuation">(</span>tc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
            <span class="token keyword">case</span> <span class="token constant">TC_OBJECT</span><span class="token operator">:</span>
                <span class="token keyword">return</span> <span class="token function">checkResolve</span><span class="token punctuation">(</span><span class="token function">readOrdinaryObject</span><span class="token punctuation">(</span>unshared<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//重点查看readOrdinaryObject方法</span>
            <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
        depth<span class="token operator">--</span><span class="token punctuation">;</span>
        bin<span class="token punctuation">.</span><span class="token function">setBlockDataMode</span><span class="token punctuation">(</span>oldMode<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>    
<span class="token punctuation">}</span>
    
<span class="token keyword">private</span> <span class="token class-name">Object</span> <span class="token function">readOrdinaryObject</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> unshared<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token comment">//isInstantiable 返回true，执行 desc.newInstance()，通过反射创建新的单例类，</span>
    obj <span class="token operator">=</span> desc<span class="token punctuation">.</span><span class="token function">isInstantiable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> desc<span class="token punctuation">.</span><span class="token function">newInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">;</span> 
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token comment">// 在Singleton类中添加 readResolve 方法后 desc.hasReadResolveMethod() 方法执行结果为true</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> handles<span class="token punctuation">.</span><span class="token function">lookupException</span><span class="token punctuation">(</span>passHandle<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> desc<span class="token punctuation">.</span><span class="token function">hasReadResolveMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 通过反射调用 Singleton 类中的 readResolve 方法，将返回值赋值给rep变量</span>
        <span class="token comment">// 这样多次调用ObjectInputStream类中的readObject方法，继而就会调用我们定义的readResolve方法，所以返回的是同一个对象。</span>
        <span class="token class-name">Object</span> rep <span class="token operator">=</span> desc<span class="token punctuation">.</span><span class="token function">invokeReadResolve</span><span class="token punctuation">(</span>obj<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2.反射方式破解单例的解决方法</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Singleton</span> <span class="token punctuation">{</span>

    <span class="token comment">//私有构造方法</span>
    <span class="token keyword">private</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">/*
           反射破解单例模式需要添加的代码
        */</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">volatile</span> <span class="token class-name">Singleton</span> instance<span class="token punctuation">;</span>

    <span class="token comment">//对外提供静态方法获取该对象</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Singleton</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

        <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token class-name">Singleton</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>instance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Singleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

说明<span class="token operator">:</span>
​ 这种方式比较好理解。当通过反射方式调用构造方法进行创建创建时，直接抛异常。不运行此中操作。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用场景：JDK源码解析-Runtime类</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Runtime</span>类就是使用的单例设计模式。
通过源代码查看使用的是哪儿种单例模式
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Runtime</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Runtime</span> currentRuntime <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Runtime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Returns the runtime object associated with the current Java application.
     * Most of the methods of class <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Runtime</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> are instance
     * methods and must be invoked with respect to the current runtime object.
     *
     * <span class="token keyword">@return</span>  the <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>code</span><span class="token punctuation">&gt;</span></span><span class="token code-section"><span class="token line"><span class="token code language-java"><span class="token class-name">Runtime</span></span></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>code</span><span class="token punctuation">&gt;</span></span> object associated with the current
     *          Java application.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Runtime</span> <span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> currentRuntime<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/** Don&#39;t let anyone else instantiate this class */</span>
    <span class="token keyword">private</span> <span class="token class-name">Runtime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
    <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>
<span class="token punctuation">}</span>

<span class="token comment">//从上面源代码中可以看出Runtime类使用的是饿汉式（静态属性）方式来实现单例模式的。</span>
<span class="token comment">//使用Runtime类中的方法</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">RuntimeDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
        <span class="token comment">//获取Runtime类对象</span>
        <span class="token class-name">Runtime</span> runtime <span class="token operator">=</span> <span class="token class-name">Runtime</span><span class="token punctuation">.</span><span class="token function">getRuntime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//返回 Java 虚拟机中的内存总量。</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">totalMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//返回 Java 虚拟机试图使用的最大内存量。</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>runtime<span class="token punctuation">.</span><span class="token function">maxMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//GC（Garbage Collector）垃圾收集器，是可以由系统自动调用的垃圾释放功能，或者使用Runtime中的GC手动调用。</span>
        runtime<span class="token punctuation">.</span><span class="token function">gc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//创建一个新的进程执行指定的字符串命令，返回进程对象</span>
        <span class="token class-name">Process</span> process <span class="token operator">=</span> runtime<span class="token punctuation">.</span><span class="token function">exec</span><span class="token punctuation">(</span><span class="token string">&quot;ipconfig&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//获取命令执行后的结果，通过输入流获取</span>
        <span class="token class-name">InputStream</span> inputStream <span class="token operator">=</span> process<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> arr <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span> <span class="token operator">*</span> <span class="token number">1024</span><span class="token operator">*</span> <span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">int</span> b <span class="token operator">=</span> inputStream<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>arr<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span>b<span class="token punctuation">,</span><span class="token string">&quot;gbk&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,45),c=[p];function o(l,i){return s(),a("div",null,c)}const k=n(t,[["render",o],["__file","1.danlimoshi.html.vue"]]);export{k as default};
