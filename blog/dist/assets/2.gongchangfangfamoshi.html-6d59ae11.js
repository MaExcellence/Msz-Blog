import{_ as n,o as s,c as a,b as e}from"./app-1f8a5ff3.js";const p="/msz-blog/assets/1694611155726-4b5aaa18.png",t="/msz-blog/assets/1694614734312-196831d0.png",c={},o=e('<h2 id="_1-简单工厂模式" tabindex="-1"><a class="header-anchor" href="#_1-简单工厂模式" aria-hidden="true">#</a> <strong>1.简单工厂模式</strong></h2><p>​ 简单工厂不是一种设计模式，反而比较像是一种编程习惯。</p><hr><p><strong>结构</strong></p><p>简单工厂包含如下角色：</p><ul><li>抽象产品：定义了产品的规范，描述了产品的主要特性和功能。</li><li>具体产品：实现或者继承抽象产品的子类。</li><li>具体工厂：提供了创建产品的方法，调用者通过该方法来获取产品。</li></ul><hr><p>下例中，抽象产品是咖啡抽象类，具体产品是美式咖啡和拿铁咖啡：</p><p><strong>实现</strong></p><p>使用简单工厂对上面案例进行改进，类图如下：</p><p><img src="'+p+`" alt="1694611155726"></p><p>代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//抽象产品：咖啡抽象类 Coffee</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Coffee</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取咖啡名称</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 加糖</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addSugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;加糖&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 加奶</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addMilk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;加奶&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//具体产品：</span>

<span class="token comment">//美式咖啡</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AmericanCoffee</span> <span class="token keyword">extends</span> <span class="token class-name">Coffee</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;美式咖啡&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 拿铁咖啡</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LatteCoffee</span> <span class="token keyword">extends</span> <span class="token class-name">Coffee</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;拿铁咖啡&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//简单工厂类：用来生产咖啡</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleCoffeeFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 声明Coffee类型的变量，根据不同类型创建不同的coffee子类对象</span>
        <span class="token class-name">Coffee</span> coffee <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;american&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AmericanCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;latte&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LatteCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;对不起，您所点的咖啡没有&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> coffee<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//客户端，咖啡店：使用简单工厂来生产咖啡		</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeStore</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">orderCoffee</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 生产咖啡的简单工厂</span>
        <span class="token class-name">SimpleCoffeeFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SimpleCoffeeFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 调用生产咖啡的方法</span>
        <span class="token class-name">Coffee</span> coffee <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createCoffee</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 加配料</span>
        coffee<span class="token punctuation">.</span><span class="token function">addMilk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        coffee<span class="token punctuation">.</span><span class="token function">addSugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> coffee<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 在以上代码中，工厂处理创建对象的细节，一旦有了 SimpleCoffeeFactory，CoffeeStore 类中的 orderCoffee() 就变成此对象的客户，后期如果需要 Coffee 对象直接从工厂中获取即可，这样也就解除了和 Coffee 实现类的耦合。但是又产生了新的耦合，CoffeeStore 对象和 SimpleCoffeeFactory 工厂对象的耦合，工厂对象和商品对象的耦合。后期如果再加新品种的咖啡，我们需要修改 SimpleCoffeeFactory 的代码，违反了开闭原则。工厂类的客户端可能有很多，比如创建美团外卖等，这样只需要修改工厂类的代码，省去其他的修改操作。</p><hr><p><strong>优缺点：</strong></p><p>**优点：**封装了创建对象的过程，可以通过参数直接获取对象。把对象的创建和业务逻辑层分开，这样以后就避免了修改客户代码，如果要实现新产品直接修改工厂类，而不需要在原代码中修改，这样就降低了客户代码修改的可能性，更加容易扩展。</p><p>**缺点：**增加新产品时还是需要修改工厂类的代码，违背了“开闭原则”。</p><hr><p><strong>扩展(静态工厂 - static)</strong></p><p>​ 在开发中也有一部分人将工厂类中的创建对象的功能定义为静态的，这就是静态工厂模式，它也不属于 23 种设计模式。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SimpleCoffeeFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 声明Coffee类型的变量，根据不同类型创建不同的coffee子类对象</span>
        <span class="token class-name">Coffee</span> coffee <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;american&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AmericanCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;latte&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            coffee <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LatteCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;对不起，您所点的咖啡没有&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> coffee<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//咖啡店</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeStore</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">orderCoffee</span><span class="token punctuation">(</span><span class="token class-name">String</span> type<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 生产咖啡的简单工厂</span>
        <span class="token comment">//SimpleCoffeeFactory factory = new SimpleCoffeeFactory();</span>
        <span class="token comment">// 调用生产咖啡的方法</span>
        <span class="token comment">//Coffee coffee = factory.createCoffee(type);</span>
        <span class="token class-name">Coffee</span> coffee <span class="token operator">=</span> <span class="token class-name">SimpleCoffeeFactory</span><span class="token punctuation">.</span><span class="token function">createCoffee</span><span class="token punctuation">(</span>type<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 加配料</span>
        coffee<span class="token punctuation">.</span><span class="token function">addMilk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        coffee<span class="token punctuation">.</span><span class="token function">addSugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> coffee<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-工厂方法模式" tabindex="-1"><a class="header-anchor" href="#_2-工厂方法模式" aria-hidden="true">#</a> 2.工厂方法模式</h2><p><strong>简单工厂模式违背了开闭原则，使用工厂方法模式可以完全遵循开闭原则。</strong></p><hr><p><strong>概念:</strong></p><p>​ 定义一个用于创建对象的接口（工厂），让其子类决定实例化哪个产品类对象。</p><p>​ 工厂方法模式使一个产品类的实例化延迟到其工厂的子类。</p><hr><p><strong>结构:</strong></p><p>工厂方法模式的主要角色：</p><ul><li>抽象工厂（Abstract Factory）：提供了创建产品的接口，调用者通过它访问具体工厂的工厂方法来创建产品。</li><li>具体工厂（ConcreteFactory）：主要是实现抽象工厂中的抽象方法，完成具体产品的创建。</li><li>抽象产品（Product）：定义了产品的规范，描述了产品的主要特性和功能。</li><li>具体产品（ConcreteProduct）：实现了抽象产品角色所定义的接口，由具体工厂来创建，它同具体工厂之间一一对应。</li></ul><hr><p><strong>实现:</strong></p><p>使用工厂方法模式对上例进行改进，类图如下：</p><p><img src="`+t+`" alt="1694614734312"></p><p>代码如下：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//抽象产品：咖啡抽象类 Coffee</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">Coffee</span> <span class="token punctuation">{</span>
    <span class="token comment">// 获取咖啡名称</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 加糖</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addSugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;加糖&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 加奶</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">addMilk</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;加奶&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//具体产品：</span>

<span class="token comment">//美式咖啡</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AmericanCoffee</span> <span class="token keyword">extends</span> <span class="token class-name">Coffee</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;美式咖啡&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 拿铁咖啡</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LatteCoffee</span> <span class="token keyword">extends</span> <span class="token class-name">Coffee</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string">&quot;拿铁咖啡&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//抽象工厂</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">CoffeeFactory</span> <span class="token punctuation">{</span>
    <span class="token comment">// 创建咖啡对象的方法</span>
    <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//具体工厂</span>

<span class="token doc-comment comment">/**
 * 美式咖啡工厂，专门用来生产美式咖啡
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AmericanCoffeeFactory</span> <span class="token keyword">implements</span> <span class="token class-name">CoffeeFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">AmericanCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token doc-comment comment">/**
 * 拿铁咖啡工厂，专门用来生产拿铁咖啡
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LatteCoffeeFactory</span> <span class="token keyword">implements</span> <span class="token class-name">CoffeeFactory</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">LatteCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//咖啡店类：</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CoffeeStore</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">CoffeeFactory</span> factory<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setFactory</span><span class="token punctuation">(</span><span class="token class-name">CoffeeFactory</span> factory<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>factory <span class="token operator">=</span> factory<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 点咖啡功能</span>
    <span class="token keyword">public</span> <span class="token class-name">Coffee</span> <span class="token function">orderCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Coffee</span> coffee <span class="token operator">=</span> factory<span class="token punctuation">.</span><span class="token function">createCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 加配料</span>
        coffee<span class="token punctuation">.</span><span class="token function">addMilk</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        coffee<span class="token punctuation">.</span><span class="token function">addSugar</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> coffee<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//客户端使用</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Client</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 创建咖啡店对象</span>
        <span class="token class-name">CoffeeStore</span> store <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CoffeeStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 创建对象, 使用不同的工厂创建不同的产品</span>
        <span class="token comment">// CoffeeFactory factory = new AmericanCoffeeFactory();</span>
        <span class="token class-name">CoffeeFactory</span> factory <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LatteCoffeeFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        store<span class="token punctuation">.</span><span class="token function">setFactory</span><span class="token punctuation">(</span>factory<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 点咖啡</span>
        <span class="token class-name">Coffee</span> coffee <span class="token operator">=</span> store<span class="token punctuation">.</span><span class="token function">orderCoffee</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>coffee<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​ 根据以上代码可知，要增加产品类时也要增加相应地工厂类，从而不需要修改工厂类的代码，这样就满足了开闭原则。工厂方法模式是简单工厂模式的进一步抽象，不仅保持了简单工厂模式的优点，而且克服了它的缺点。</p><hr><p><strong>优缺点</strong></p><p><strong>优点：</strong></p><ul><li>用户只需要知道具体工厂的名称就可得到所要的产品，无须知道产品的具体创建过程。</li><li>在系统增加新的产品时只需要添加具体产品类和对应的具体工厂类，无须对原工厂进行任何修改，满足开闭原则。</li></ul><p><strong>缺点：</strong></p><ul><li>每增加一个产品就要增加一个具体产品类和一个对应的具体工厂类，增加了系统的复杂度。</li></ul>`,54),l=[o];function i(u,k){return s(),a("div",null,l)}const r=n(c,[["render",i],["__file","2.gongchangfangfamoshi.html.vue"]]);export{r as default};
