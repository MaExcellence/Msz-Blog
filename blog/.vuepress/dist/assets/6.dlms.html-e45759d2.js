import{_ as n,o as s,c as a,b as e}from"./app-3bb1037e.js";const t="/assets/1694785646215-01b44a15.png",p={},c=e('<h1 id="代理模式-proxy-pattern" tabindex="-1"><a class="header-anchor" href="#代理模式-proxy-pattern" aria-hidden="true">#</a> <strong>代理模式（Proxy Pattern）</strong></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> <strong>1.概述</strong></h2><p>当访问对象不适合或者不能直接引用目标对象，可以提供一个代理以控制对该对象的访问，代理对象作为访问对象和目标对象之间的中介。</p><p>Java 中的代理按照代理类生成时机不同又分为<strong>静态代理</strong>和<strong>动态代理</strong>；</p><p><strong>静态代理</strong>代理类<strong>在编译期就生成</strong>，而动态代理代理类则是<strong>在 Java 运行时动态生成</strong>；</p><p>动态代理又有 <strong>JDK 代理</strong> 和 <strong>CGLib 代理</strong>两种。</p><hr><h2 id="_2-结构" tabindex="-1"><a class="header-anchor" href="#_2-结构" aria-hidden="true">#</a> <strong>2.结构</strong></h2><p>代理（Proxy）模式分为三种角色：</p><ul><li>抽象主题类： 通过接口或抽象类声明真实主题和代理对象实现的业务方法。</li><li>真实主题类： 实现了抽象主题中的具体业务，是代理对象所代表的真实对象，是最终要引用的对象。</li><li>代理类 ： 提供了与真实主题相同的接口，其内部含有对真实主题的引用，它可以访问、控制或扩展真实主题的功能。</li></ul><p>例如:</p><p>买电脑时，是通过“地方电脑厂商”代理“联想”和“戴尔”进行电脑的销售。</p><p>“卖电脑的规范”就是抽象主题类，“联想” 和“戴尔”就是真实主题类，”地方电脑厂商“ 就是代理类。</p><hr><h2 id="_3-静态代理" tabindex="-1"><a class="header-anchor" href="#_3-静态代理" aria-hidden="true">#</a> <strong>3.静态代理</strong></h2><p>【例】火车站卖票</p><p>​ 如果要买火车票的话，需要去火车站买票，坐车到火车站，排队等一系列的操作，显然比较麻烦。而火车站在多个地方都有代售点，我们去代售点买票就方便很多了。这个例子其实就是典型的代理模式，火车站是目标对象，代售点是代理对象。类图如下：</p><p><img src="'+t+`" alt="1694785646215"></p><p>代码如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//卖火车票的接口类：
public interface SellTickets {
    void sell();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//火车站类：火车票具有卖票功能，实现 SellTickets 接口
public class TrainStation implements SellTickets {
    public void sell() {
        System.out.println(&quot;火车站卖票&quot;);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//代售点类：代理火车站，进行卖票操作，同时对该方法做了点增强（收取费用）</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProxyPoint</span> <span class="token keyword">implements</span> <span class="token class-name">SellTickets</span> <span class="token punctuation">{</span>
    <span class="token comment">// 火车站类对象</span>
    <span class="token keyword">private</span> <span class="token class-name">TrainStation</span> trainStation  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrainStation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;代售点收取一些服务费用&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        trainStation<span class="token punctuation">.</span><span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//测试类：</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建代售点类对象</span>
        <span class="token class-name">ProxyPoint</span> proxyPoint <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProxyPoint</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 调用方法进行卖票</span>
        proxyPoint<span class="token punctuation">.</span><span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span><span class="token operator">--</span>
从上面代码中可以看出测试类直接访问的是 <span class="token class-name">ProxyPoint</span> 类对象，也就是说 <span class="token class-name">ProxyPoint</span> 作为访问对象和目标对象的中介。
同时也对 sell 方法进行了增强（代理点收取一些服务费用）。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-动态代理" tabindex="-1"><a class="header-anchor" href="#_4-动态代理" aria-hidden="true">#</a> <strong>4.动态代理</strong></h2><p>我们使用动态代理实现上面案例，先说说 JDK 提供的动态代理。</p><p><strong>JDK 动态代理</strong></p><p>Java 中提供了一个动态代理类 Proxy，Proxy 并不是我们上述所说的代理对象的类，而是提供了一个创建代理对象的静态方法（newProxyInstance 方法）来获取代理对象。</p><p><strong>注：JDK 动态代要求必须定义接口，因为它只能对接口进行代理。</strong></p><p><strong>代码如下：</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//卖火车票的接口类：同静态代理。</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">SellTickets</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//火车站类：火车票具有卖票功能，实现 SellTickets 接口，同静态代理。</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TrainStation</span> <span class="token keyword">implements</span> <span class="token class-name">SellTickets</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;火车站卖票&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//获取代理对象的工厂类：</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProxyFactory</span> <span class="token punctuation">{</span>
    <span class="token comment">// 目标对象</span>
    <span class="token keyword">private</span> <span class="token class-name">TrainStation</span> station <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrainStation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 获取代理对象</span>
    <span class="token keyword">public</span> <span class="token class-name">SellTickets</span> <span class="token function">getProxyObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 返回代理对象</span>
        <span class="token comment">/*
            ClassLoader loader: 类加载器,用于加载代理类,可以通过目标对象获取类加载器
            Class&lt;?&gt;[] interfaces: 代理类实现的接口的字节码对象
            InvocationHandler h: 代理对象调用处理程序
        */</span>
        <span class="token class-name">SellTickets</span> proxyObject <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SellTickets</span><span class="token punctuation">)</span> <span class="token class-name">Proxy</span><span class="token punctuation">.</span><span class="token function">newProxyInstance</span><span class="token punctuation">(</span>
                station<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 类加载器,用于加载代理类</span>
                station<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getInterfaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token comment">// 代理类实现的接口的字节码对象</span>
                <span class="token keyword">new</span> <span class="token class-name">InvocationHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token doc-comment comment">/**
                     <span class="token keyword">@param</span> <span class="token parameter">proxy</span> 代理对象, 和proxyObject是同一个对象,在invoke方法中基本不用
                     @param method 对接口中的方法进行封装的method对象
                     @param args 调用方法的实际参数
                     @return 方法的返回值
                     */</span>
                    <span class="token annotation punctuation">@Override</span>
                    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Object</span> proxy<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;代售点收取一定的服务费用(jdk动态代理 )&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token comment">// 执行目标对象的方法</span>
                        <span class="token class-name">Object</span> obj <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>station<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">return</span> obj<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> proxyObject<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//测试类：</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取代理对象</span>
        <span class="token comment">// 1, 创建代理工厂对象</span>
        <span class="token class-name">ProxyFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProxyFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 2, 使用factory对象的方法获取代理对象</span>
        <span class="token class-name">SellTickets</span> proxyObject <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">getProxyObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 3, 调用代理对象的方法</span>
        proxyObject<span class="token punctuation">.</span><span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_5-jdk-动态代理分析" tabindex="-1"><a class="header-anchor" href="#_5-jdk-动态代理分析" aria-hidden="true">#</a> <strong>5.JDK 动态代理分析</strong></h2><p>思考以下问题：</p><p>ProxyFactory 是代理类吗？</p><p>ProxyFactory 不是代理模式中所说的代理类，而是程序在运行过程中动态的在内存中生成的代理类。</p><p>通过阿里巴巴开源的 Java 诊断工具（Arthas【阿尔萨斯】）查看代理类的结构：（去除其他代码）</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 程序运行过程中动态生成的代理类</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> $<span class="token class-name">Proxy0</span> <span class="token keyword">extends</span> <span class="token class-name">Proxy</span> <span class="token keyword">implements</span> <span class="token class-name">SellTickets</span> <span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Method</span> m3<span class="token punctuation">;</span>


    <span class="token keyword">public</span> $<span class="token class-name">Proxy0</span><span class="token punctuation">(</span><span class="token class-name">InvocationHandler</span> invocationHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>invocationHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">static</span> <span class="token punctuation">{</span>
      m3 <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.itheima.proxy.dynamic.jdk.SellTickets&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token string">&quot;sell&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      <span class="token keyword">return</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>h<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> m3<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从上面的类中，我们可以看到以下几个信息：</p><ul><li>代理类 <strong>$Proxy0</strong> 实现了 SellTickets 接口，这也就印证了真实类和代理类实现同样的接口。</li><li>代理类 $Proxy0 将我们提供了的匿名内部类对象传递给了父类。</li></ul><p><strong>动态代理的执行流程是什么样？</strong></p><p>摘取整个流程的重点代码：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 程序运行过程中动态生成的代理类</span>
<span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">class</span> $<span class="token class-name">Proxy0</span> <span class="token keyword">extends</span> <span class="token class-name">Proxy</span> <span class="token keyword">implements</span> <span class="token class-name">SellTickets</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name">Method</span> m3<span class="token punctuation">;</span>

    <span class="token keyword">public</span> $<span class="token class-name">Proxy0</span><span class="token punctuation">(</span><span class="token class-name">InvocationHandler</span> invocationHandler<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>invocationHandler<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">static</span> <span class="token punctuation">{</span>
        m3 <span class="token operator">=</span> <span class="token class-name">Class</span><span class="token punctuation">.</span><span class="token function">forName</span><span class="token punctuation">(</span><span class="token string">&quot;com.itheima.proxy.dynamic.jdk.SellTickets&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getMethod</span><span class="token punctuation">(</span><span class="token string">&quot;sell&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token class-name">Class</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
      
    <span class="token comment">// ② 根据多态的特性，执行的是代理类 $Proxy0 中的 sell() 方法</span>
    <span class="token keyword">public</span> <span class="token keyword">final</span> <span class="token keyword">void</span> <span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// ③ 代理类 $Proxy0 中的 sell() 方法中又调用了 InvocationHandler 接口的子实现类对象的 invoke 方法</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>h<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> m3<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// Java提供的动态代理相关类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Proxy</span> <span class="token keyword">implements</span> <span class="token class-name"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span>Serializable</span> <span class="token punctuation">{</span>
    <span class="token keyword">protected</span> <span class="token class-name">InvocationHandler</span> h<span class="token punctuation">;</span>
     
    <span class="token keyword">protected</span> <span class="token class-name">Proxy</span><span class="token punctuation">(</span><span class="token class-name">InvocationHandler</span> h<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>h <span class="token operator">=</span> h<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// 代理工厂类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ProxyFactory</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">TrainStation</span> station <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TrainStation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">SellTickets</span> <span class="token function">getProxyObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SellTickets</span> sellTickets <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">SellTickets</span><span class="token punctuation">)</span> <span class="token class-name">Proxy</span><span class="token punctuation">.</span><span class="token function">newProxyInstance</span><span class="token punctuation">(</span>station<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getClassLoader</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                station<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getInterfaces</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token keyword">new</span> <span class="token class-name">InvocationHandler</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// ④ invoke 方法通过反射执行了真实对象所属类 TrainStation 中的 sell() 方法</span>
                    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">invoke</span><span class="token punctuation">(</span><span class="token class-name">Object</span> proxy<span class="token punctuation">,</span> <span class="token class-name">Method</span> method<span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
                        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;代理点收取一些服务费用(JDK动态代理方式)&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token class-name">Object</span> result <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">invoke</span><span class="token punctuation">(</span>station<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token keyword">return</span> result<span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> sellTickets<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// 测试访问类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取代理对象</span>
        <span class="token class-name">ProxyFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ProxyFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token comment">// ① 在测试类中通过代理对象调用 sell() 方法</span>
        <span class="token class-name">SellTickets</span> proxyObject <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">getProxyObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        proxyObject<span class="token punctuation">.</span><span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>执行流程如下：</strong></p><p>​ ① 在测试类中通过代理对象调用 sell() 方法</p><p>​ ② 根据多态的特性，执行的是代理类 $Proxy0 中的 sell() 方法</p><p>​ ③ 代理类 $Proxy0 中的 sell() 方法中又调用了 InvocationHandler 接口的子实现类对象的 invoke 方法</p><p>​ ④ invoke 方法通过反射执行了真实对象所属类 TrainStation 中的 sell() 方法</p><p><strong>注意：</strong></p><p>​ 上面的案例中，如果没有定义 SellTickets 接口，只定义了 TrainStation 火车站类。则 JDK 代理无法使用；</p><p>​ <strong>因为 JDK 动态代理要求必须定义接口，它只能对接口进行代理。</strong></p><p><strong>CGLIB 动态代理</strong></p><p>​ CGLIB 是一个功能强大，高性能的代码生成包，它可以为没有实现接口的类提供代理，为 JDK 的动态代理提供了很好的补充。</p><p>​ CGLIB 是第三方提供的包，所以需要引入依赖：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;cglib&lt;/groupId&gt;
    &lt;artifactId&gt;cglib&lt;/artifactId&gt;
    &lt;version&gt;2.2.2&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>代码如下：<strong>CGLIB 动态代理可以不代理接口，直接代理类。</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//火车站类：火车票具有卖票功能，实现 SellTickets 接口，同静态代理。</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TrainStation</span> <span class="token keyword">implements</span> <span class="token class-name">SellTickets</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">sell</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;火车站卖票&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//代理工厂类：用来获取代理对象

**
 * 代理对象工厂, 用来获取代理对象
 */
public class ProxyFactory implements MethodInterceptor {
    // 火车站对象
    private TrainStation station = new TrainStation();
    // 获取代理对象
    public TrainStation getProxyObject() {
        // 创建Enhancer对象,类似于JDK代理中的Proxy类
        Enhancer enhancer = new Enhancer();
        // 设置父类的字节码对象(指定父类)
        enhancer.setSuperclass(TrainStation.class);
        // 设置回调函数
        enhancer.setCallback(this);
        // 创建代理对象
        TrainStation proxyObject = (TrainStation) enhancer.create();
        return proxyObject;
    }


    /**
     @param o 代理对象
     @param method 真实对象中的方法的Method实例
     @param objects 实际参数
     @param methodProxy 代理对象中的方法的method实例
     @return 方法执行结果
     */
    @Override
    public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {
        System.out.println(&quot;代售点收取一定的服务费用(Cglib代理)&quot;);
        // 要调用目标对象的方法
        Object invoke = method.invoke(station, objects);
        return invoke;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_6-三种代理的对比" tabindex="-1"><a class="header-anchor" href="#_6-三种代理的对比" aria-hidden="true">#</a> <strong>6.三种代理的对比</strong></h2><p><strong>两种动态代理的对比：JDK 代理 和 CGLib 代理</strong></p><ul><li>CGLib 动态代理，底层采用 ASM 字节码生成框架，使用字节码技术生成代理类，在 JDK1.6 之前比使用 JDK 动态代理的效率要高。唯一需要注意的是，<strong>CGLib 不能对声明为 final 的类或者方法进行代理</strong>，因为CGLib 的原理是动态生成被代理类的子类。</li><li>JDK1.6、JDK1.7、JDK1.8 逐步对 JDK 动态代理优化之后，在调用次数较少的情况下，JDK 代理效率高于 CGLib 代理效率；只有当进行大量调用的时候，JDK1.6 和 JDK1.7 比 CGLib 代理效率低一点，但是到 JDK1.8 的时候，JDK 代理效率高于 CGLib 代理。</li><li>所以，JDK1.8 以后，<strong>如果有接口就使用 JDK 动态代理，没有接口就使用 CGLib 代理。</strong></li></ul><p><strong>动态代理和静态代理的对比：</strong></p><ul><li>动态代理与静态代理相比较，最大的好处是接口中声明的所有方法都被转移到调用处理器一个集中的方法中处理 (InvocationHandler.invoke)。这样，在接口方法数量比较多的时候，我们可以进行灵活处理，而不需要像静态代理那样每一个方法进行中转。</li><li>如果接口增加一个方法，静态代理模式除了所有实现类需要实现这个方法外，所有代理类也需要实现此方法，增加了代码维护的复杂度，而动态代理不会出现该问题。</li></ul><h2 id="_7-优缺点" tabindex="-1"><a class="header-anchor" href="#_7-优缺点" aria-hidden="true">#</a> <strong>7.优缺点</strong></h2><p><strong>优点：（<strong>保护、增强、解耦</strong>）</strong></p><ul><li>代理模式在客户端与目标对象之间起到一个中介作用和保护目标对象的作用；</li><li>代理对象可以扩展目标对象的功能；</li><li>代理模式能将客户端与目标对象分离，在一定程度上降低了系统的耦合度；</li></ul><p><strong>缺点：</strong></p><ul><li>增加了系统的复杂度；</li></ul><hr><h2 id="_8-使用场景" tabindex="-1"><a class="header-anchor" href="#_8-使用场景" aria-hidden="true">#</a> <strong>8.使用场景</strong></h2><p>代理模式最常用的一个应用场景就是，在业务系统中开发一些非功能性需求，比如：<strong>监控、统计、鉴权、限流、事务、幂等、日志</strong>。我们将这些附加功能与业务功能解耦，放到代理类中统一处理，让程序员只需要关注业务方面的开发。实际上，前面举的搜集接口请求信息的例子，就是这个应用场景的一个典型例子。</p><p>如果你熟悉 Java 语言和 Spring 开发框架，这部分工作都是可以在 Spring AOP 切面中完成的。前面我们也提到，Spring AOP 底层的实现原理就是基于动态代理。</p><p><strong>1.远程（Remote）代理（RPC 的思想）</strong></p><ul><li>本地服务通过网络请求远程服务。为了实现本地到远程的通信，我们需要实现网络通信，处理其中可能的异常。为良好的代码设计和可维护性，我们将网络通信部分隐藏起来，只暴露给本地服务一个接口，通过该接口即可访问远程服务提供的功能，而不必过多关心通信部分的细节。</li></ul><p><strong>2.防火墙（Firewall）代理（VPN 的思想）</strong></p><ul><li>当你将浏览器配置成使用代理功能时，防火墙就将你的浏览器的请求转给互联网；当互联网返回响应时，代理服务器再把它转给你的浏览器。</li></ul><p><strong>3.保护（Protect or Access）代理</strong></p><ul><li>控制对一个对象的访问，如果需要，可以给不同的用户提供不同级别的使用权限。</li></ul>`,82),o=[c];function l(i,u){return s(),a("div",null,o)}const d=n(p,[["render",l],["__file","6.dlms.html.vue"]]);export{d as default};
