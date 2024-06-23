import{_ as n,o as s,c as a,a as e}from"./app-ad70bc3c.js";const p="/msz-blog/assets/1694961384883-5fa1d576.png",t="/msz-blog/assets/1694961445398-6e5bf22f.png",c={},o=e('<h1 id="命令模式-command-pattern" tabindex="-1"><a class="header-anchor" href="#命令模式-command-pattern" aria-hidden="true">#</a> <strong>命令模式（Command Pattern）</strong></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> <strong>1.概述</strong></h2><p><strong>命令模式</strong>：将一个请求封装为一个对象，使发出请求的责任和执行请求的责任分割开。这样两者之间通过命令对象进行沟通，这样方便将命令对象进行存储、传递、调用、增加与管理。</p><p>日常生活中，我们出去吃饭都会遇到下面的场景。</p><p><img src="'+p+'" alt="1694961384883"></p><hr><h2 id="_2-结构" tabindex="-1"><a class="header-anchor" href="#_2-结构" aria-hidden="true">#</a> <strong>2.结构</strong></h2><p>命令模式包含以下主要角色：</p><ul><li>抽象命令类（Command）角色： 定义命令的接口，声明执行的方法。</li><li>具体命令（Concrete Command）角色：具体的命令，实现命令接口；通常会持有接收者，并调用接收者的功能来完成命令要执行的操作。</li><li>实现者 / 接收者（Receiver）角色： 接收者，真正执行命令的对象。任何类都可能成为一个接收者，只要它能够实现命令要求实现的相应功能。</li><li>调用者 / 请求者（Invoker）角色： 要求命令对象执行请求，通常会持有命令对象，可以持有很多的命令对象。这个是客户端真正触发命令并要求命令执行相应操作的地方，也就是说相当于使用命令对象的入口。</li></ul><hr><h2 id="_3-案例实现" tabindex="-1"><a class="header-anchor" href="#_3-案例实现" aria-hidden="true">#</a> <strong>3.案例实现</strong></h2><p>分析命令模式的角色在该案例中由谁来充当：</p><ul><li>服务员： 就是<strong>调用者角色</strong>，由她来发起命令。</li><li>资深大厨： 就是<strong>接收者角色</strong>，真正命令执行的对象。</li><li>订单： 命令中包含订单。</li></ul><p>类图如下：</p><p><img src="'+t+`" alt="1694961445398"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//抽象命令类：</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Command</span> <span class="token punctuation">{</span>
    <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//具体命令类：</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OrderCommand</span> <span class="token keyword">implements</span> <span class="token class-name">Command</span> <span class="token punctuation">{</span>
    <span class="token comment">// 持有接收者对象</span>
    <span class="token keyword">private</span> <span class="token class-name">SeniorChef</span> seniorChef<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">Order</span> order<span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token class-name">OrderCommand</span><span class="token punctuation">(</span><span class="token class-name">SeniorChef</span> seniorChef<span class="token punctuation">,</span> <span class="token class-name">Order</span> order<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>seniorChef <span class="token operator">=</span> seniorChef<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>order <span class="token operator">=</span> order<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getDiningTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;桌的订单：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> foodDir <span class="token operator">=</span> order<span class="token punctuation">.</span><span class="token function">getFoodDir</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> keys <span class="token operator">=</span> foodDir<span class="token punctuation">.</span><span class="token function">keySet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> foodName <span class="token operator">:</span> keys<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            seniorChef<span class="token punctuation">.</span><span class="token function">makeFood</span><span class="token punctuation">(</span>foodName<span class="token punctuation">,</span> foodDir<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>foodName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>order<span class="token punctuation">.</span><span class="token function">getDiningTable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;桌的饭准备完毕！！！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * 订单类
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Order</span> <span class="token punctuation">{</span>
    <span class="token comment">// 餐桌号码</span>
    <span class="token keyword">private</span> <span class="token keyword">int</span> diningTable<span class="token punctuation">;</span>
    <span class="token comment">// 所下的餐品及份数</span>
    <span class="token keyword">private</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span><span class="token class-name">Integer</span><span class="token punctuation">&gt;</span></span> foodDir <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//接收者：资深大厨</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SeniorChef</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">makeFood</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span><span class="token keyword">int</span> num<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>num <span class="token operator">+</span> <span class="token string">&quot;份&quot;</span> <span class="token operator">+</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//请求者：服务员</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Waiter</span> <span class="token punctuation">{</span>
    <span class="token comment">// 持有多个命令对象</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Command</span><span class="token punctuation">&gt;</span></span> commands <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setCommand</span><span class="token punctuation">(</span><span class="token class-name">Command</span> cmd<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 将cmd对象存储到list集合中</span>
        commands<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>cmd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 发起命令功能: 喊 订单来了</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">orderUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;美女服务员：大厨，新订单来了。。。。&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Command</span> command <span class="token operator">:</span> commands<span class="token punctuation">)</span> <span class="token punctuation">{</span>
           <span class="token keyword">if</span><span class="token punctuation">(</span>command <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
               command<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//测试类：</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建第一个订单对象</span>
        <span class="token class-name">Order</span> order1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Order</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        order1<span class="token punctuation">.</span><span class="token function">setDiningTable</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        order1<span class="token punctuation">.</span><span class="token function">setFood</span><span class="token punctuation">(</span><span class="token string">&quot;西红柿鸡蛋面&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        order1<span class="token punctuation">.</span><span class="token function">setFood</span><span class="token punctuation">(</span><span class="token string">&quot;小杯可乐&quot;</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 创建第二个订单对象</span>
        <span class="token class-name">Order</span> order2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Order</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        order2<span class="token punctuation">.</span><span class="token function">setDiningTable</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        order2<span class="token punctuation">.</span><span class="token function">setFood</span><span class="token punctuation">(</span><span class="token string">&quot;尖椒肉丝盖饭&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        order2<span class="token punctuation">.</span><span class="token function">setFood</span><span class="token punctuation">(</span><span class="token string">&quot;小杯雪碧&quot;</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 创建厨师对象</span>
        <span class="token class-name">SeniorChef</span> seniorChef <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SeniorChef</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建命令对象</span>
        <span class="token class-name">OrderCommand</span> cmd1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderCommand</span><span class="token punctuation">(</span>seniorChef<span class="token punctuation">,</span> order1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">OrderCommand</span> cmd2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OrderCommand</span><span class="token punctuation">(</span>seniorChef<span class="token punctuation">,</span> order2<span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 创建调用者（服务员对象）</span>
        <span class="token class-name">Waiter</span> invoker <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Waiter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        invoker<span class="token punctuation">.</span><span class="token function">setCommand</span><span class="token punctuation">(</span>cmd1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        invoker<span class="token punctuation">.</span><span class="token function">setCommand</span><span class="token punctuation">(</span>cmd2<span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 让服务员发起命令</span>
        invoker<span class="token punctuation">.</span><span class="token function">orderUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
————————————————
美女服务员：大厨，新订单来了。。。。
<span class="token number">1</span>桌的订单：
<span class="token number">1</span>份西红柿鸡蛋面
<span class="token number">2</span>份小杯可乐
<span class="token number">1</span>桌的饭准备完毕！！！
<span class="token number">2</span>桌的订单：
<span class="token number">1</span>份尖椒肉丝盖饭
<span class="token number">1</span>份小杯雪碧
<span class="token number">2</span>桌的饭准备完毕！！！

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-优缺点" tabindex="-1"><a class="header-anchor" href="#_4-优缺点" aria-hidden="true">#</a> <strong>4.优缺点</strong></h2><p><strong>优点：</strong></p><ul><li>降低系统的耦合度。命令模式能将调用操作的对象与实现该操作的对象解耦。</li><li>增加或删除命令非常方便。采用命令模式增加与删除命令不会影响其他类，它满足 “开闭原则”，对扩展比较灵活。</li><li>可以实现宏命令。<strong>命令模式可以与组合模式结合</strong>，将多个命令装配成一个组合命令，即宏命令。</li><li>方便实现 Undo 和 Redo 操作。<strong>命令模式可以与后面介绍的备忘录模式结合</strong>，实现命令的撤销与恢复。</li></ul><p><strong>缺点：</strong></p><ul><li>使用命令模式可能会导致某些系统有过多的具体命令类。</li><li>系统结构更加复杂。</li></ul><hr><h2 id="_5-使用场景" tabindex="-1"><a class="header-anchor" href="#_5-使用场景" aria-hidden="true">#</a> <strong>5.使用场景</strong></h2><p>系统需要将请求调用者和请求接收者解耦，使得调用者和接收者不直接交互。</p><p>系统需要在不同的时间指定请求、将请求排队和执行请求。</p><p>系统需要支持命令的撤销 (Undo) 操作和恢复 (Redo) 操作。</p><hr><h2 id="_6-jdk-源码-runnable" tabindex="-1"><a class="header-anchor" href="#_6-jdk-源码-runnable" aria-hidden="true">#</a> <strong>6.JDK 源码 - Runnable</strong></h2><p><strong>Runable 是一个典型命令模式，Runnable 担当命令的角色，Thread 充当的是调用者，start 方法就是其执行方法</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">ThreadGroup</span> group<span class="token punctuation">;</span>

<span class="token comment">// 命令接口(抽象命令角色)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token comment">// 调用者</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Thread</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Runnable</span> target<span class="token punctuation">;</span>
    
    <span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>threadStatus <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalThreadStateException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        group<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">boolean</span> started <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token function">start0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            started <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>started<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    group<span class="token punctuation">.</span><span class="token function">threadStartFailed</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ignore<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">private</span> <span class="token keyword">native</span> <span class="token keyword">void</span> <span class="token function">start0</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>会调用一个 native 方法 start0()，调用系统方法，开启一个线程。而接收者是对程序员开放的，可以自己定义接收者。</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 jdk Runnable 命令模式
  TurnOffThread：属于具体命令
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">TurnOffThread</span> <span class="token keyword">implements</span> <span class="token class-name">Runnable</span><span class="token punctuation">{</span>
     <span class="token keyword">private</span> <span class="token class-name">Receiver</span> receiver<span class="token punctuation">;</span>
    
     <span class="token keyword">public</span> <span class="token class-name">TurnOffThread</span><span class="token punctuation">(</span><span class="token class-name">Receiver</span> receiver<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token keyword">this</span><span class="token punctuation">.</span>receiver <span class="token operator">=</span> receiver<span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
     <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
         receiver<span class="token punctuation">.</span><span class="token function">turnOFF</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 测试类
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Demo</span> <span class="token punctuation">{</span>
     <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
         <span class="token class-name">Receiver</span> receiver <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Receiver</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">TurnOffThread</span> turnOffThread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TurnOffThread</span><span class="token punctuation">(</span>receiver<span class="token punctuation">)</span><span class="token punctuation">;</span>
         <span class="token class-name">Thread</span> thread <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Thread</span><span class="token punctuation">(</span>turnOffThread<span class="token punctuation">)</span><span class="token punctuation">;</span>
         thread<span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
     <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38),l=[o];function i(u,d){return s(),a("div",null,l)}const k=n(c,[["render",i],["__file","14.mlms.html.vue"]]);export{k as default};
