import{_ as n,o as s,c as a,b as e}from"./app-3bb1037e.js";const t="/assets/1694945351710-f47c5ac0.png",p="/assets/1694945418774-31950353.png",i="/assets/1694945455579-6b2cc585.png",o="/assets/1694945741693-7fbc6dcc.png",c="/assets/1694945771398-8e341fc8.png",l={},u=e('<h1 id="组合模式-composite-pattern" tabindex="-1"><a class="header-anchor" href="#组合模式-composite-pattern" aria-hidden="true">#</a> <strong>组合模式（Composite Pattern）</strong></h1><h2 id="_1-概述" tabindex="-1"><a class="header-anchor" href="#_1-概述" aria-hidden="true">#</a> <strong>1.概述</strong></h2><p>又名部分<strong>整体模式</strong>，是用于把一组相似的对象当作一个单一的对象。组合模式依据树形结构来组合对象，用来表示部分以及整体层次。这种类型的设计模式属于结构型模式，它创建了对象组的树形结构。</p><p><img src="'+t+'" alt="1694945351710"></p><p>上图可以看做是一个文件系统，这样的结构称之为树形结构。在树形结构中可以通过调用某个方法来遍历整个树，当找到某个叶子节点后，就可以对叶子节点进行相关的操作。可以将这颗树理解成一个大的容器，容器里面包含很多的成员对象，这些成员对象即可是容器对象也可以是叶子对象。但是由于容器对象和叶子对象在功能上面的区别，使得在使用的过程中必须要区分容器对象和叶子对象，但是这样就会给客户带来不必要的麻烦，作为客户，始终希望能够一致的对待容器对象和叶子对象。</p><hr><h2 id="_2-结构" tabindex="-1"><a class="header-anchor" href="#_2-结构" aria-hidden="true">#</a> <strong>2.结构</strong></h2><p>组合模式主要包含三种角色：</p><ul><li>抽象根节点（Component）：定义系统各层次对象的共有方法和属性，可以预先定义一些默认行为和属性。</li><li>树枝节点（Composite）：定义树枝节点的行为，存储子节点，组合树枝节点和叶子节点形成一个树形结构。</li><li>叶子节点（Leaf）：叶子节点对象，其下再无分支，是系统层次遍历的最小单位。</li></ul><hr><h2 id="_3-案例实现" tabindex="-1"><a class="header-anchor" href="#_3-案例实现" aria-hidden="true">#</a> <strong>3.案例实现</strong></h2><p>【例】软件菜单</p><p>如下图，我们在访问别的一些管理系统时，经常可以看到类似的菜单。一个菜单可以包含菜单项（菜单项是指不再包含其他内容的菜单条目），也可以包含带有其他菜单项的菜单，因此使用组合模式描述菜单就很恰当，我们的需求是针对一个菜单，打印出其包含的所有菜单以及菜单项的名称。</p><p><img src="'+p+'" alt="1694945418774"></p><p>类图如下：</p><p><img src="'+i+`" alt="1694945455579"></p><p>不管是菜单还是菜单项，都应该继承自统一的接口，这里将这个统一的接口称为菜单组件。</p><p>这里的 MenuComponent 定义为抽象类，因为有一些共有的属性和行为要在该类中实现，Menu 和 MenuItem 类就可以只覆盖自己感兴趣的方法，而不用搭理不需要或者不感兴趣的方法，举例来说，Menu 类可以包含子菜单，因此需要覆盖 add()、remove()、getChild() 方法，但是MenuItem 就不应该有这些方法。这里给出的默认实现是抛出异常，可以根据自己的需要改写默认实现。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 菜单组件：属于抽象根节点
 */</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">MenuComponent</span> <span class="token punctuation">{</span>
    <span class="token comment">// 菜单组件的名称</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token comment">// 菜单组件的层级</span>
    <span class="token keyword">protected</span> <span class="token keyword">int</span> level<span class="token punctuation">;</span>
    <span class="token comment">// 添加子菜单</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">MenuComponent</span> menuComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 移除子菜单</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">MenuComponent</span> menuComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 获取指定的子菜单</span>
    <span class="token keyword">public</span> <span class="token class-name">MenuComponent</span> <span class="token function">getChild</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">UnsupportedOperationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 获取菜单或者菜单项的名称</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 打印菜单名称的方法（包含子菜单和字菜单项）</span>
    <span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//Menu 类实现了除了getName方法的其他所有方法，因为Menu类具有添加菜单，移除菜单和获取子菜单的功能。</span>

<span class="token doc-comment comment">/**
 * 菜单类：属于树枝节点
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Menu</span> <span class="token keyword">extends</span> <span class="token class-name">MenuComponent</span> <span class="token punctuation">{</span>
    <span class="token comment">// 菜单可以有多个子菜单或者子菜单项</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MenuComponent</span><span class="token punctuation">&gt;</span></span> menuComponentList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>


    <span class="token keyword">public</span> <span class="token class-name">Menu</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> level<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>level <span class="token operator">=</span> level<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token class-name">MenuComponent</span> menuComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        menuComponentList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>menuComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">remove</span><span class="token punctuation">(</span><span class="token class-name">MenuComponent</span> menuComponent<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        menuComponentList<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>menuComponent<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">MenuComponent</span> <span class="token function">getChild</span><span class="token punctuation">(</span><span class="token keyword">int</span> index<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> menuComponentList<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>index<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 打印菜单名称</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> level<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;--&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>


        <span class="token comment">// 打印子菜单或者子菜单项名称</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">MenuComponent</span> component <span class="token operator">:</span> menuComponentList<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            component<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">//MenuItem 是菜单项，不能再有子菜单，所以添加菜单，移除菜单和获取子菜单的功能并不能实现。</span>
<span class="token doc-comment comment">/**
 * 菜单项类：属于叶子节点
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MenuItem</span> <span class="token keyword">extends</span> <span class="token class-name">MenuComponent</span> <span class="token punctuation">{</span>


    <span class="token keyword">public</span> <span class="token class-name">MenuItem</span><span class="token punctuation">(</span><span class="token class-name">String</span> name<span class="token punctuation">,</span> <span class="token keyword">int</span> level<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>level <span class="token operator">=</span> level<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>


    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 打印菜单项的名称</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> level<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">print</span><span class="token punctuation">(</span><span class="token string">&quot;--&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//测试类：
public class Client {
    public static void main(String[] args) {
        // 创建二级菜单树
        MenuComponent menu1 = new Menu(&quot;菜单管理&quot;, 2);
        menu1.add(new MenuItem(&quot;页面访问&quot;, 3));
        menu1.add(new MenuItem(&quot;展开菜单&quot;, 3));
        menu1.add(new MenuItem(&quot;编辑菜单&quot;, 3));
        menu1.add(new MenuItem(&quot;删除菜单&quot;, 3));
        menu1.add(new MenuItem(&quot;新增菜单&quot;, 3));


        MenuComponent menu2 = new Menu(&quot;权限管理&quot;, 2);
        menu2.add(new MenuItem(&quot;页面访问&quot;, 3));
        menu2.add(new MenuItem(&quot;提交保存&quot;, 3));


        MenuComponent menu3 = new Menu(&quot;角色管理&quot;, 2);
        menu3.add(new MenuItem(&quot;页面访问&quot;, 3));
        menu3.add(new MenuItem(&quot;新增角色&quot;, 3));
        menu3.add(new MenuItem(&quot;修改角色&quot;, 3));


        // 创建一级菜单
        MenuComponent component = new Menu(&quot;系统管理&quot;, 1);


        // 将二级菜单添加到一级菜单中
        component.add(menu1);
        component.add(menu2);
        component.add(menu3);


        // 打印菜单名称(如果有子菜单一块打印)
        component.print();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-组合模式的分类" tabindex="-1"><a class="header-anchor" href="#_4-组合模式的分类" aria-hidden="true">#</a> <strong>4.组合模式的分类</strong></h2><p>在使用组合模式时，根据抽象构件类的定义形式，我们可将组合模式分为<strong>透明组合模式</strong>和<strong>安全组合模式</strong>。</p><p><strong>透明组合模式：</strong></p><ul><li>透明组合模式中，抽象根节点角色中声明了所有用于管理成员对象的方法，比如在示例中 MenuComponent 声明了 add、remove 、getChild 方法，这样做的好处是确保所有的构件类都有相同的接口。透明组合模式也是组合模式的标准形式。</li><li>透明组合模式的缺点是不够安全，因为叶子对象和容器对象在本质上是有区别的，叶子对象不可能有下一个层次的对象，即不可能包含成员对象，因此为其提供 add()、remove() 等方法是没有意义的，这在编译阶段不会出错，但在运行阶段如果调用这些方法可能会出错（如果没有提供相应的错误处理代码）</li></ul><p><img src="`+o+'" alt="1694945741693"></p><p><strong>安全组合模式</strong>：</p><ul><li>在安全组合模式中，在抽象构件角色中没有声明任何用于管理成员对象的方法，而是在树枝节点 Menu 类中声明并实现这些方法。</li><li>安全组合模式的缺点是不够透明，因为叶子构件和容器构件具有不同的方法，且容器构件中那些用于管理成员对象的方法没有在抽象构件类中定义，因此客户端不能完全针对抽象编程，必须有区别地对待叶子构件和容器构件。</li></ul><p><img src="'+c+'" alt="1694945771398"></p><hr><h2 id="_5-优点" tabindex="-1"><a class="header-anchor" href="#_5-优点" aria-hidden="true">#</a> <strong>5.优点</strong></h2><ul><li>组合模式可以清楚地定义分层次的复杂对象，表示对象的全部或部分层次，它让客户端忽略了层次的差异，方便对整个层次结构进行控制。</li><li>客户端可以一致地使用一个组合结构或其中单个对象，不必关心处理的是单个对象还是整个组合结构，简化了客户端代码。</li><li>在组合模式中增加新的树枝节点和叶子节点都很方便，无须对现有类库进行任何修改，符合 “开闭原则”。</li><li>组合模式为树形结构的面向对象实现提供了一种灵活的解决方案，通过叶子节点和树枝节点的递归组合，可以形成复杂的树形结构，但对树形结构的控制却非常简单。</li></ul><hr><h2 id="_6-使用场景" tabindex="-1"><a class="header-anchor" href="#_6-使用场景" aria-hidden="true">#</a> <strong>6.使用场景</strong></h2><ul><li>组合模式正是应树形结构而生，所以组合模式的使用场景就是出现树形结构的地方。</li></ul><blockquote><p>比如：文件目录显示，多级目录呈现等树形结构数据的操作。</p></blockquote>',38),d=[u];function r(m,k){return s(),a("div",null,d)}const b=n(l,[["render",r],["__file","11.zhms.html.vue"]]);export{b as default};
