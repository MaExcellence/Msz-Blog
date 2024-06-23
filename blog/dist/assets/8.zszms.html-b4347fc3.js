import{_ as n,o as s,c as a,a as t}from"./app-ad70bc3c.js";const p="/msz-blog/assets/1694869504117-a926cab6.png",e="/msz-blog/assets/1694869566242-23d89677.png",o="/msz-blog/assets/1694870171447-b84824d9.png",c={},l=t('<h1 id="装饰者模式-decorator-pattern" tabindex="-1"><a class="header-anchor" href="#装饰者模式-decorator-pattern" aria-hidden="true">#</a> <strong>装饰者模式（Decorator Pattern）</strong></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> <strong>1.概述</strong></h2><ul><li>在不改变现有对象结构的情况下，动态地给该对象增加一些职责（即增加其额外功能）的模式。</li></ul><p>先来看一个快餐店的例子：快餐店有炒面、炒饭等快餐，可以额外附加鸡蛋、火腿、培根这些配菜，当然加配菜需要额外加钱，每个配菜的价钱通常不太一样，那么计算总价就会显得比较麻烦。下面是使用继承方式的类图：</p><p><img src="'+p+'" alt="1694869504117"></p><p><strong>使用继承的方式存在的问题：</strong></p><ul><li>扩展性不好：如果要再加一种配料（火腿肠），我们就会发现需要给 FriedRice 和 FriedNoodles 分别定义一个子类。如果要新增一个快餐品类（炒河粉）的话，就需要定义更多的子类。</li><li>产生过多的子类</li></ul><hr><h2 id="_2-结构" tabindex="-1"><a class="header-anchor" href="#_2-结构" aria-hidden="true">#</a> <strong>2.结构</strong></h2><p>装饰者（Decorator）模式中的角色：</p><ul><li>抽象构件（Component）角色 ：定义一个抽象接口以规范准备接收附加责任的对象。</li><li>具体构件（Concrete Component）角色 ：实现抽象构件，通过装饰角色为其添加一些职责。</li><li>抽象装饰（Decorator）角色 ： 继承或实现抽象构件，并包含具体构件的实例，可以通过其子类扩展具体构件的功能。</li><li>具体装饰（ConcreteDecorator）角色 ：实现抽象装饰的相关方法，并给具体构件对象添加附加的责任。</li></ul><h2 id="_3-案例" tabindex="-1"><a class="header-anchor" href="#_3-案例" aria-hidden="true">#</a> <strong>3.案例</strong></h2><p>使用装饰者模式对快餐店案例进行改进，类图如下：</p><p><img src="'+e+`" alt="1694869566242"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 抽象构件角色：快餐类</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">FastFood</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">float</span> price<span class="token punctuation">;</span> <span class="token comment">// 价格</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> desc<span class="token punctuation">;</span> <span class="token comment">// 描述</span>


    <span class="token keyword">public</span> <span class="token class-name">FastFood</span><span class="token punctuation">(</span><span class="token keyword">float</span> price<span class="token punctuation">,</span> <span class="token class-name">String</span> desc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>price <span class="token operator">=</span> price<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>desc <span class="token operator">=</span> desc<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">float</span> <span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//具体构件角色：炒饭类、炒面类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FriedRice</span> <span class="token keyword">extends</span> <span class="token class-name">FastFood</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">FriedRice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">&quot;炒饭&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FriedNoodles</span> <span class="token keyword">extends</span> <span class="token class-name">FastFood</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">FriedNoodles</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span><span class="token number">12</span><span class="token punctuation">,</span> <span class="token string">&quot;炒面&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//抽象装饰者角色：配料类</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Garnish</span> <span class="token keyword">extends</span> <span class="token class-name">FastFood</span> <span class="token punctuation">{</span>
    <span class="token comment">// 声明快餐类的变量</span>
    <span class="token keyword">private</span> <span class="token class-name">FastFood</span> fastFood<span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token class-name">Garnish</span><span class="token punctuation">(</span><span class="token class-name">FastFood</span> fastFood<span class="token punctuation">,</span> <span class="token keyword">float</span> price<span class="token punctuation">,</span> <span class="token class-name">String</span> desc<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>price<span class="token punctuation">,</span> desc<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>fastFood <span class="token operator">=</span> fastFood<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//具体装饰者角色：鸡蛋配料类、培根配料类</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Egg</span> <span class="token keyword">extends</span> <span class="token class-name">Garnish</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Egg</span><span class="token punctuation">(</span><span class="token class-name">FastFood</span> fastFood<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>fastFood<span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">,</span> <span class="token string">&quot;鸡蛋&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
    <span class="token comment">// 计算价格</span>
    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">getFastFood</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">getFastFood</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Bacon</span> <span class="token keyword">extends</span> <span class="token class-name">Garnish</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Bacon</span><span class="token punctuation">(</span><span class="token class-name">FastFood</span> fastFood<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>fastFood<span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token string">&quot;培根&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    
      <span class="token comment">// 计算价格</span>
    <span class="token keyword">public</span> <span class="token keyword">float</span> <span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token function">getPrice</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">getFastFood</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token function">getFastFood</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//测试类：</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">//  点一份炒饭</span>
        <span class="token class-name">FastFood</span> food <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FriedRice</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>food<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;  &quot;</span> <span class="token operator">+</span> food<span class="token punctuation">.</span><span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;元&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 在上面的炒饭中加一个鸡蛋</span>
        food <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Egg</span><span class="token punctuation">(</span>food<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>food<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;  &quot;</span> <span class="token operator">+</span> food<span class="token punctuation">.</span><span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;元&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 再加一个鸡蛋</span>
        food <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Egg</span><span class="token punctuation">(</span>food<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>food<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;  &quot;</span> <span class="token operator">+</span> food<span class="token punctuation">.</span><span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;元&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 再加一个培根</span>
        food <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Bacon</span><span class="token punctuation">(</span>food<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>food<span class="token punctuation">.</span><span class="token function">getDesc</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;  &quot;</span> <span class="token operator">+</span> food<span class="token punctuation">.</span><span class="token function">cost</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;元&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-使用场景" tabindex="-1"><a class="header-anchor" href="#_4-使用场景" aria-hidden="true">#</a> <strong>4.使用场景</strong></h2><ul><li>当不能采用继承的方式对系统进行扩充或者采用继承不利于系统扩展和维护时。</li><li>在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责。</li><li>当对象的功能要求可以动态地添加，也可以再动态地撤销时。</li></ul><p>**注意：**不能采用继承的情况主要有两类：</p><ul><li>第一类是系统中存在大量独立的扩展，为支持每一种组合将产生大量的子类，使得子类数目呈爆炸性增长。</li><li>第二类是因为类定义不能继承（如 final 类）。</li></ul><hr><h2 id="_5-jdk源码解析" tabindex="-1"><a class="header-anchor" href="#_5-jdk源码解析" aria-hidden="true">#</a> <strong>5.JDK源码解析</strong></h2><p><strong>IO流中的包装类使用到了装饰者模式</strong>：BufferedInputStream，BufferedOutputStream，BufferedReader，BufferedWriter。</p><p>以 BufferedWriter 举例来说明，先看看如何使用 BufferedWriter：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 创建FileWriter对象</span>
<span class="token class-name">FileWriter</span> fw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">FileWriter</span><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\Users\\\\Think\\\\Desktop\\\\a.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 创建BufferedWriter对象</span>
<span class="token class-name">BufferedWriter</span> bw <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">BufferedWriter</span><span class="token punctuation">(</span>fw<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 写数据</span>
bw<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;hello Buffered&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
bw<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>使用起来感觉确实像是装饰者模式，接下来看它们的结构：</strong></p><p><img src="`+o+'" alt="1694870171447"></p><p><strong>BufferedWriter 使用装饰者模式对 Writer 子实现类进行了增强，添加了缓冲区，提高了写数据的效率。</strong></p><hr><h2 id="_6-代理和装饰者的区别" tabindex="-1"><a class="header-anchor" href="#_6-代理和装饰者的区别" aria-hidden="true">#</a> <strong>6.代理和装饰者的区别</strong></h2><p><strong>相同点：</strong></p><ul><li>都要实现与目标类相同的业务接口</li><li>在两个类中都要声明目标对象</li><li>都可以在不修改目标类的前提下增强目标方法</li></ul><p><strong>不同点：</strong></p><p><strong>1.目的不同</strong></p><ul><li>装饰者是为了增强目标对象</li><li>静态代理是为了保护和隐藏目标对象</li></ul><p>装饰者可以迭代增强，代理只能增强一次</p><p><strong>2.获取目标对象构建的地方不同</strong></p><ul><li>装饰者是由外界传递进来，可以通过构造方法传递</li><li>静态代理是在代理类内部创建，以此来隐藏目标对象</li></ul>',42),i=[l];function u(k,r){return s(),a("div",null,i)}const v=n(c,[["render",u],["__file","8.zszms.html.vue"]]);export{v as default};
