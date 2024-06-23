import{_ as n,o as s,c as a,a as t}from"./app-ad70bc3c.js";const p="/msz-blog/assets/1694696820616-484fd9f9.png",e="/msz-blog/assets/1694697279792-a9117030.png",c={},o=t('<h2 id="原型模式-prototype-pattern" tabindex="-1"><a class="header-anchor" href="#原型模式-prototype-pattern" aria-hidden="true">#</a> <strong>原型模式（Prototype Pattern）</strong></h2><h3 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> <strong>1.概述</strong></h3><p>​ 用一个已经创建的实例作为原型，通过复制该原型对象来创建一个和原型对象相同的新对象。</p><hr><h3 id="_2-原型模式的优点" tabindex="-1"><a class="header-anchor" href="#_2-原型模式的优点" aria-hidden="true">#</a> 2.原型模式的优点</h3><p>​ ● 性能优良</p><p>​ 原型模式是在内存二进制流的拷贝，要比直接new一个对象性能好很多，特别是要在一个循环体内产生大量的对象时，原型模式可以更好地体现其优点。</p><p>​ ● 逃避构造函数的约束</p><p>​ 这既是它的优点也是缺点，直接在内存中拷贝，构造函数是不会执行的。优点就是减少了约束，缺点也是减少了约束，需要大家在实际应用时考虑。</p><hr><h3 id="_3-结构" tabindex="-1"><a class="header-anchor" href="#_3-结构" aria-hidden="true">#</a> <strong>3.结构</strong></h3><p>原型模式<strong>包含如下角色</strong>：</p><ul><li>抽象原型类：规定了具体原型对象必须实现的的 clone() 方法。</li><li>具体原型类：实现抽象原型类的 clone() 方法，它是可被复制的对象。</li><li>访问类：使用具体原型类中的 clone() 方法来复制新的对象。</li></ul><p>接口类图如下：</p><p><img src="'+p+`" alt="1694696820616"></p><hr><h3 id="_4-实现" tabindex="-1"><a class="header-anchor" href="#_4-实现" aria-hidden="true">#</a> <strong>4.实现</strong></h3><p>原型模式的克隆分为浅克隆和深克隆。</p><ul><li>浅克隆：创建一个新对象，新对象的属性和原对象完全相同，对于非基本类型属性，仍指向原有属性所指向的对象的内存地址。</li><li>深克隆：创建一个新对象，属性中引用的其他对象也会被克隆，不再指向原有对象地址。</li></ul><p><strong>浅克隆类似“快捷方式”，深克隆才是真正的“复制文件”。</strong></p><p>​ Java 中的 Object 类中提供了 clone() 方法来实现浅克隆。</p><p>​ Java 中的 Cloneable 接口是上面类图中的抽象原型类，而实现了 Cloneable 接口的子实现类就是具体的原型类。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//Realizetype：具体的原型类</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Realizetype</span> <span class="token keyword">implements</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>


    <span class="token keyword">public</span> <span class="token class-name">Realizetype</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;具体的原型对象创建完成！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">Realizetype</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;具体原型复制成功！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">Realizetype</span><span class="token punctuation">)</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//PrototypeTest：测试访问类</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">PrototypeTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Realizetype</span> r1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Realizetype</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 原型对象</span>
        <span class="token class-name">Realizetype</span> r2 <span class="token operator">=</span> r1<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 克隆出来的对象</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;对象r1和r2是同一个对象？&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>r1 <span class="token operator">==</span> r2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

运行结果：clone 原型对象的时候，不会调用构造方法，因为该对象不是通过 <span class="token keyword">new</span> 创建的
具体的原型对象创建完成！
具体原型复制成功！
对象r1和r2是同一个对象？<span class="token boolean">false</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_5-案例" tabindex="-1"><a class="header-anchor" href="#_5-案例" aria-hidden="true">#</a> <strong>5.案例</strong></h3><p>【例】使用原型模式生成 “三好学生” 奖状。</p><p>​ 同一学校的 “三好学生” 奖状除了获奖人姓名不同，其他都相同，可以使用原型模式复制多个“三好学生”奖状出来，然后修改奖状上的名字即可。</p><p>类图如下：</p><p><img src="`+e+`" alt="1694697279792"></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 奖状类
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Citation</span> <span class="token keyword">implements</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span> <span class="token comment">// 奖状上的名字</span>


    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name <span class="token operator">+</span> <span class="token string">&quot;同学：在2020学年第一学期中表现优秀，被评为三好学生。特发此状！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Citation</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">Citation</span><span class="token punctuation">)</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">//注意 要使用clone方法，类的成员变量上不要增加final关键字。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 测出访问类
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CitationTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>
        <span class="token class-name">Citation</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Citation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c1<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 复制奖状</span>
        <span class="token class-name">Citation</span> c2 <span class="token operator">=</span> c1<span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c2<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将奖状的名字改为李四</span>


        c1<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c2<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="_6-使用场景" tabindex="-1"><a class="header-anchor" href="#_6-使用场景" aria-hidden="true">#</a> <strong>6.使用场景</strong></h3><p>● 资源优化场景</p><p>​ 类初始化需要消化非常多的资源，这个资源包括数据、硬件资源等。</p><p>● 性能和安全要求的场景</p><p>​ 通过new产生一个对象需要非常繁琐的数据准备或访问权限，则可以使用原型模式。</p><p>● 一个对象多个修改者的场景</p><p>​ 一个对象需要提供给其他对象访问，而且各个调用者可能都需要修改其值时，可以考虑使用原型模式拷贝多个对象供调用者使用。</p><p>​ 在实际项目中，原型模式很少单独出现，一般是和工厂方法模式一起出现，通过clone的</p><p>方法创建一个对象，然后由工厂方法提供给调用者。原型模式已经与Java融为一体，大家可以随手拿来使用。</p><hr><h3 id="_7-拓展" tabindex="-1"><a class="header-anchor" href="#_7-拓展" aria-hidden="true">#</a> 7.拓展</h3><p><strong>引用对象的浅克隆</strong></p><p>将上面的“三好学生”奖状的案例中 Citation 类的 name 属性修改为 Student 类型的属性。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 学生类
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 奖状类
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Citation</span> <span class="token keyword">implements</span> <span class="token class-name">Cloneable</span> <span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Student</span> stu<span class="token punctuation">;</span> <span class="token comment">// 这是个引用对象</span>


    <span class="token keyword">void</span> <span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>stu<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;同学：在2020学年第一学期中表现优秀，被评为三好学生。特发此状！&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Citation</span> <span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">CloneNotSupportedException</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">Citation</span><span class="token punctuation">)</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 测试</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CitationTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 原型对象</span>
        <span class="token class-name">Citation</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Citation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> stu1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c1<span class="token punctuation">.</span><span class="token function">setStu</span><span class="token punctuation">(</span>stu1<span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 复制奖状并修改名字</span>
        <span class="token class-name">Citation</span> c2 <span class="token operator">=</span> <span class="token class-name"><span class="token namespace">c1<span class="token punctuation">.</span></span>Clone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> stu2 <span class="token operator">=</span> c2<span class="token punctuation">.</span><span class="token function">getStu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stu2<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 判断stu1对象和stu2对象是否是同一个对象</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;st1和stu2是否同一个对象？&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>stu1 <span class="token operator">==</span> stu2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        c1<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c2<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

运行结果：stu1 和 stu2 是同一个对象
st1和stu2是否同一个对象？<span class="token boolean">true</span>
李四同学：在<span class="token number">2020</span>学年第一学期中表现优秀，被评为三好学生。特发此状！
李四同学：在<span class="token number">2020</span>学年第一学期中表现优秀，被评为三好学生。特发此状！

stu1 和 stu2 是同一个对象，就会产生将 stu1 中 name 属性值改为 “李四”，两个 <span class="token class-name">Citation</span> 对象中显示的都是李四。
这就是浅克隆的效果，对具体原型类（<span class="token class-name">Citation</span>）中的引用类型的属性进行引用的复制。

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>这种情况需要使用深克隆，而进行深克隆需要使用对象流</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>例子：  <span class="token class-name">Student</span> 和 <span class="token class-name">Citation</span> 都要实现序列化接口
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CitationTest1</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token class-name">Citation</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Citation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;西安&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c1<span class="token punctuation">.</span><span class="token function">setStu</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建对象输出流对象</span>
        <span class="token class-name">ObjectOutputStream</span> oos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectOutputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileOutputStream</span><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\Users\\\\Think\\\\Desktop\\\\b.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//将c1对象写出到文件中</span>
        oos<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span>c1<span class="token punctuation">)</span><span class="token punctuation">;</span>
        oos<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//创建对象出入流对象</span>
        <span class="token class-name">ObjectInputStream</span> ois <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">FileInputStream</span><span class="token punctuation">(</span><span class="token string">&quot;C:\\\\Users\\\\Think\\\\Desktop\\\\b.txt&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//读取对象</span>
        <span class="token class-name">Citation</span> c2 <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Citation</span><span class="token punctuation">)</span> ois<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//获取c2奖状所属学生对象</span>
        <span class="token class-name">Student</span> stu1 <span class="token operator">=</span> c2<span class="token punctuation">.</span><span class="token function">getStu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stu1<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">//判断stu对象和stu1对象是否是同一个对象</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;stu和stu1是同一个对象？&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>stu <span class="token operator">==</span> stu1<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        c1<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c2<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>实现 1：文件流 + 对象流</strong></p><p><strong>学生类（Student）同上，但是要实现 Serializable 接口</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 学生类
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>奖状类（Citation）实现 Serializable 接口，定义一个 deepClone 方法，通过文件输出流流和对象流实现深克隆。</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 1 所有对象都实现序列化的接口
// 2 自定义一个深度克隆方法deepClone, 通过文件流和对象流的方式实现对象的深度拷贝
public Citation deepClone() throws Exception {
  try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(&quot;a.txt&quot;));
       ObjectInputStream ois = new ObjectInputStream(new FileInputStream(&quot;a.txt&quot;));) {
    oos.writeObject(this);
    Citation citation = (Citation) ois.readObject();
    return citation;
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><strong>实现 2：字节数组流 + 对象流</strong></p><p><strong>学生类（Student）同上，但是要实现 Serializable 接口。</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 学生类
 */</span>
<span class="token annotation punctuation">@Data</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>奖状类（Citation）实现 Serializable 接口，定义一个 deepClone 方法，通过文件输出流流和对象流实现深克隆。</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 1 所有对象都实现序列化的接口</span>
<span class="token comment">// 2 自定义一个深度克隆方法deepClone, 通过字节数组流和对象流的方式实现对象的深度拷贝</span>
<span class="token keyword">public</span> <span class="token class-name">Citation</span> <span class="token function">deepClone2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">(</span><span class="token class-name">ByteArrayOutputStream</span> bos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">ObjectOutputStream</span> oos <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectOutputStream</span><span class="token punctuation">(</span>bos<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    oos<span class="token punctuation">.</span><span class="token function">writeObject</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ByteArrayInputStream</span> bis <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ByteArrayInputStream</span><span class="token punctuation">(</span>bos<span class="token punctuation">.</span><span class="token function">toByteArray</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">ObjectInputStream</span> ois <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ObjectInputStream</span><span class="token punctuation">(</span>bis<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token class-name">Citation</span><span class="token punctuation">)</span> ois<span class="token punctuation">.</span><span class="token function">readObject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>测试</strong></p><p>以上两种方法都可以实现深克隆：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">CitationTest</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">// 原型对象</span>
        <span class="token class-name">Citation</span> c1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Citation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> stu1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c1<span class="token punctuation">.</span><span class="token function">setStu</span><span class="token punctuation">(</span>stu1<span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 复制奖状并修改名字</span>
        <span class="token class-name">Citation</span> c2 <span class="token operator">=</span> c1<span class="token punctuation">.</span><span class="token function">deepClone</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">Student</span> stu2 <span class="token operator">=</span> c2<span class="token punctuation">.</span><span class="token function">getStu</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        stu2<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 判断stu1对象和stu2对象是否是同一个对象</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;st1和stu2是否同一个对象？&quot;</span> <span class="token operator">+</span> <span class="token punctuation">(</span>stu1 <span class="token operator">==</span> stu2<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


        c1<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        c2<span class="token punctuation">.</span><span class="token function">show</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
————————————————
运行结果：
st1和stu2是否同一个对象？<span class="token boolean">false</span>
张三同学：在<span class="token number">2020</span>学年第一学期中表现优秀，被评为三好学生。特发此状！
李四同学：在<span class="token number">2020</span>学年第一学期中表现优秀，被评为三好学生。特发此状！
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,65),l=[o];function i(u,k){return s(),a("div",null,l)}const r=n(c,[["render",i],["__file","4.yxms.html.vue"]]);export{r as default};
