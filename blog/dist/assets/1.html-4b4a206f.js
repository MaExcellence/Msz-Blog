import{_ as n,o as s,c as a,b as t}from"./app-1f8a5ff3.js";const p="/msz-blog/assets/1699192752147-5cb2f82e.png",o="/msz-blog/assets/1699193177784-892a9c2e.png",e="/msz-blog/assets/1699193212604-e6a3df4c.png",c="/msz-blog/assets/1699193270405-cc66bc64.png",l="/msz-blog/assets/1699193289129-b83fb55b.png",i="/msz-blog/assets/1699194513412-b27df467.png",u="/msz-blog/assets/1699194537565-1aef8350.png",k="/msz-blog/assets/1699194660923-3dbc6e62.png",r={},d=t('<h2 id="_1-socket回顾与i-o模型" tabindex="-1"><a class="header-anchor" href="#_1-socket回顾与i-o模型" aria-hidden="true">#</a> <strong>1. Socket回顾与I/O模型</strong></h2><h3 id="_1-1-socket-网络编程回顾" tabindex="-1"><a class="header-anchor" href="#_1-1-socket-网络编程回顾" aria-hidden="true">#</a> <strong>1.1 Socket 网络编程回顾</strong></h3><h4 id="_1-1-1-socket-概述" tabindex="-1"><a class="header-anchor" href="#_1-1-1-socket-概述" aria-hidden="true">#</a> <strong>1.1.1 Socket 概述</strong></h4><p>​ Socket，套接字就是两台主机之间逻辑连接的端点。TCP/IP协议是传输层协议，主要解决数据如何在网络中传输，而HTTP是应用层协议，主要解决如何包装数据。Socket是通信的基石，是支持TCP/IP协议的网络通信的基本操作单元。它是网络通信过程中端点的抽象表示，包含进行网络通信必须的五种信息：连接使用的协议、本地主机的IP地址、本地进程的协议端口、远程主机的IP地址、远程进程的协议端口。</p><h4 id="_1-1-2-socket-整体流程" tabindex="-1"><a class="header-anchor" href="#_1-1-2-socket-整体流程" aria-hidden="true">#</a> <strong>1.1.2 Socket 整体流程</strong></h4><p>​ Socket编程主要涉及到客户端和服务端两个方面，首先是在服务器端创建一个服务器套接字（ServerSocket），并把它附加到一个端口上，服务器从这个端口监听连接。端口号的范围是0到65536，但是0到1024是为特权服务保留的端口号，可以选择任意一个当前没有被其他进程使用的端口。</p><p>客户端请求与服务器进行连接的时候，根据服务器的域名或者IP地址，加上端口号，打开一个套接字。当服务器接受连接后，服务器和客户端之间的通信就像输入输出流一样进行操作。</p><p><img src="'+p+`" alt="1699192752147"></p><h4 id="_1-1-3-代码实现" tabindex="-1"><a class="header-anchor" href="#_1-1-3-代码实现" aria-hidden="true">#</a> <strong>1.1.3</strong> <strong>代码实现</strong></h4><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>server</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">InputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">OutputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span><span class="token class-name">ServerSocket</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span><span class="token class-name">Socket</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">ExecutorService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span>concurrent<span class="token punctuation">.</span></span><span class="token class-name">Executors</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ServerDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token comment">//1.创建一个线程池,如果有客户端连接就创建一个线程, 与之通信</span>
        <span class="token class-name">ExecutorService</span> executorService <span class="token operator">=</span> <span class="token class-name">Executors</span><span class="token punctuation">.</span><span class="token function">newCachedThreadPool</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//2.创建 ServerSocket 对象</span>
        <span class="token class-name">ServerSocket</span> serverSocket <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ServerSocket</span><span class="token punctuation">(</span><span class="token number">9999</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;服务器已启动&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//3.监听客户端</span>
            <span class="token class-name">Socket</span> socket <span class="token operator">=</span> serverSocket<span class="token punctuation">.</span><span class="token function">accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;有客户端连接&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//4.开启新的线程处理</span>
            executorService<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">Runnable</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token annotation punctuation">@Override</span>
                <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">run</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">handle</span><span class="token punctuation">(</span>socket<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">handle</span><span class="token punctuation">(</span><span class="token class-name">Socket</span> socket<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;线程ID:&quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token operator">+</span> <span class="token string">&quot; 线程名称:&quot;</span> <span class="token operator">+</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//从连接中取出输入流来接收消息</span>
            <span class="token class-name">InputStream</span> is <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> read <span class="token operator">=</span> is<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;客户端:&quot;</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> read<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//连接中取出输出流并回话</span>
            <span class="token class-name">OutputStream</span> os <span class="token operator">=</span> socket<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            os<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span><span class="token string">&quot;没钱&quot;</span><span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">finally</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token comment">//关闭连接</span>
                socket<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>客户端代码</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>client</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">InputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">OutputStream</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span><span class="token class-name">Socket</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Scanner</span></span><span class="token punctuation">;</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ClientDemo</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">//1.创建 Socket 对象</span>
            <span class="token class-name">Socket</span> s <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Socket</span><span class="token punctuation">(</span><span class="token string">&quot;127.0.0.1&quot;</span><span class="token punctuation">,</span> <span class="token number">9999</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//2.从连接中取出输出流并发消息</span>
            <span class="token class-name">OutputStream</span> os <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">getOutputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;请输入:&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">Scanner</span> sc <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Scanner</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>in<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">String</span> msg <span class="token operator">=</span> sc<span class="token punctuation">.</span><span class="token function">nextLine</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            os<span class="token punctuation">.</span><span class="token function">write</span><span class="token punctuation">(</span>msg<span class="token punctuation">.</span><span class="token function">getBytes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//3.从连接中取出输入流并接收回话</span>
            <span class="token class-name">InputStream</span> is <span class="token operator">=</span> s<span class="token punctuation">.</span><span class="token function">getInputStream</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token punctuation">]</span> b <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token keyword">byte</span><span class="token punctuation">[</span><span class="token number">1024</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> read <span class="token operator">=</span> is<span class="token punctuation">.</span><span class="token function">read</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;老板说:&quot;</span> <span class="token operator">+</span> <span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> read<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">trim</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//4.关闭</span>
            s<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-2-i-o-模型" tabindex="-1"><a class="header-anchor" href="#_1-2-i-o-模型" aria-hidden="true">#</a> <strong>1.2 I/O 模型</strong></h3><h4 id="_1-2-1-i-o-模型说明" tabindex="-1"><a class="header-anchor" href="#_1-2-1-i-o-模型说明" aria-hidden="true">#</a> <strong>1.2.1 I/O 模型说明</strong></h4><ol><li><p>I/O 模型简单的理解：就是用什么样的通道进行数据的发送和接收，很大程度上决定了程序通信的性能</p></li><li><p>Java 共支持 3 种网络编程模型/IO 模式：BIO(同步并阻塞)、NIO(同步非阻塞)、AIO(异步非阻塞)</p></li></ol><p><strong>阻塞与非阻塞</strong></p><blockquote><p>主要指的是访问IO的线程是否会阻塞（或处于等待）</p><p>线程访问资源，该资源是否准备就绪的一种处理方式</p></blockquote><p><img src="`+o+'" alt="1699193177784"></p><p><strong>同步和异步</strong></p><blockquote><p>主要是指的数据的请求方式</p><p>同步和异步是指访问数据的一种机制</p></blockquote><p><img src="'+e+'" alt="1699193212604"></p><h4 id="_1-2-2-bio-同步并阻塞" tabindex="-1"><a class="header-anchor" href="#_1-2-2-bio-同步并阻塞" aria-hidden="true">#</a> <strong>1.2.2 BIO( 同步并阻塞 )</strong></h4><p>Java BIO就是传统的 socket编程.</p><p>​ BIO(blocking I/O) ： 同步阻塞，服务器实现模式为一个连接一个线程，即客户端有连接请求时服务器端就需要启动一个线程进行处理，如果这个连接不做任何事情会造成不必要的线程开销，可以通过线程池机制改善(实现多个客户连接服务器)。</p><p><strong>工作机制</strong></p><p><img src="'+c+'" alt="1699193270405"></p><p>生活中的例子:</p><p><img src="'+l+'" alt="1699193289129"></p><p><strong>BIO 问题分析</strong></p><ol><li><p>每个请求都需要创建独立的线程，与对应的客户端进行数据 Read，业务处理，数据 Write</p></li><li><p>并发数较大时，需要创建大量线程来处理连接，系统资源占用较大</p></li><li><p>连接建立后，如果当前线程暂时没有数据可读，则线程就阻塞在 Read 操作上，造成线程资源浪费</p></li></ol><h4 id="_1-2-3-nio-同步非阻塞" tabindex="-1"><a class="header-anchor" href="#_1-2-3-nio-同步非阻塞" aria-hidden="true">#</a> <strong>1.2.3 NIO(同步非阻塞)</strong></h4><p>​ 同步非阻塞，服务器实现模式为一个线程处理多个请求(连接)，即客户端发送的连接请求都会注册到</p><p>多路复用器上，多路复用器轮询到连接有 I/O 请求就进行处理</p><p><img src="'+i+'" alt="1699194513412"></p><p>生活中的例子:</p><p><img src="'+u+'" alt="1699194537565"></p><h4 id="_1-2-4-aio-异步非阻塞" tabindex="-1"><a class="header-anchor" href="#_1-2-4-aio-异步非阻塞" aria-hidden="true">#</a> <strong>1.2.4 AIO( 异步非阻塞 )</strong></h4><p>AIO 引入异步通道的概念，采用了 Proactor 模式，简化了程序编写，有效的请求才启动线程，它的特点是先由操作系统完成后才通知服务端程序启动线程去处理，一般适用于连接数较多且连接时间较长的应用</p><blockquote><p>Proactor 模式是一个消息异步通知的设计模式，Proactor 通知的不是就绪事件，而是操作完成事</p><p>件，这也就是操作系统异步 IO 的主要模型。</p></blockquote><p>生活中的例子:</p><p><img src="'+k+'" alt="1699194660923"></p><p><strong>1.2.5 BIO、NIO、AIO</strong> <strong>适用场景分析</strong></p><ol><li><p>BIO(同步并阻塞) 方式适用于连接数目比较小且固定的架构，这种方式对服务器资源要求比较高，并发局限于应用中，JDK1.4以前的唯一选择，但程序简单易理解</p></li><li><p>NIO(同步非阻塞) 方式适用于连接数目多且连接比较短（轻操作）的架构，比如聊天服务器，弹幕系统，服务器间通讯等。编程比较复杂，JDK1.4 开始支持</p></li><li><p>AIO(异步非阻塞) 方式使用于连接数目多且连接比较长（重操作）的架构，比如相册服务器，充分调用 OS 参与并发操作， 编程比较复杂，JDK7 开始支持。</p></li></ol>',43),m=[d];function v(b,g){return s(),a("div",null,m)}const y=n(r,[["render",v],["__file","1.html.vue"]]);export{y as default};
