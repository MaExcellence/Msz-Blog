import{_ as n,o as s,c as a,a as t}from"./app-ad70bc3c.js";const e="/msz-blog/assets/1698847685910-ecf51b47.png",i="/msz-blog/assets/1698847865078-91b8e0e4.png",p="/msz-blog/assets/1698848406566-7eed87bd.png",l="/msz-blog/assets/1698848422956-c6c26ee8.png",c="/msz-blog/assets/1698848655027-63b801cd.png",o={},u=t('<h2 id="_2-1-分布式链路追踪技术适用场景-问题场景" tabindex="-1"><a class="header-anchor" href="#_2-1-分布式链路追踪技术适用场景-问题场景" aria-hidden="true">#</a> <strong>2.1 分布式链路追踪技术适用场景（问题场景）</strong></h2><p><strong>场景描述</strong></p><p>为了支撑日益增长的庞⼤业务量，我们会使⽤微服务架构设计我们的系统，使得我们的系统不仅能够通过集群部署抵挡流量的冲击，又能根据业务进行灵活的扩展。</p><p>那么，在微服务架构下，⼀次请求少则经过三四次服务调⽤完成，多则跨越几十个甚至是上百个服务节点。那么问题接踵而来：</p><p>1）如何动态展示服务的调⽤链路？（⽐如A服务调⽤了哪些其他的服务---依赖关系）</p><p>2）如何分析服务调用链路中的瓶颈节点并对其进⾏调优？(比如A—&gt;B—&gt;C，C 服务处理时间特别长)</p><p>3）如何快速进⾏服务链路的故障发现？</p><p>这就是分布式链路追踪技术存在的目的和意义</p><ul><li><strong>分布式链路追踪技术</strong></li></ul><p>如果我们在⼀个请求的调⽤处理过程中，在各个链路节点都能够记录下⽇志，并最终将日志进行集中可视化展示，那么我们想监控调用链路中的⼀些指标就有希望了~比如，请求到达哪个服务实例？请求被处理的状态怎样？处理耗时怎样？这些都能够分析出来了...</p><p>分布式环境下基于这种想法实现的监控技术就是就是分布式链路追踪（全链路追踪）。</p><ul><li><strong>市场上的分布式链路追踪方案</strong></li></ul><p>分布式链路追踪技术已然成熟，产品也不少，国内外都有，比如</p><ul class="contains-task-list"><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> Spring Cloud Sleuth + Twitter Zipkin</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 阿⾥巴巴的“鹰眼”</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 大众点评的“CAT”</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 美团的“Mtrace”</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 京东的“Hydra”</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 新浪的“Watchman”</li><li class="task-list-item"><input class="task-list-item-checkbox" disabled="" type="checkbox"> 另外还有最近也被提到很多的Apache Skywalking。</li></ul><hr><h2 id="_2-2-分布式链路追踪技术核心思想" tabindex="-1"><a class="header-anchor" href="#_2-2-分布式链路追踪技术核心思想" aria-hidden="true">#</a> <strong>2.2</strong> <strong>分布式链路追踪技术核心思想</strong></h2><p>本质：记录日志，作为⼀个完整的技术，分布式链路追踪也有自己的理论和概念</p><p>微服务架构中，针对请求处理的调⽤链可以展现为⼀棵树，示意如下</p><p><img src="'+e+'" alt="1698847685910"></p><p>上图描述了⼀个常见的调用场景，⼀个请求通过网关服务路由到下游的微服务-1， 然后微服务-1，调用微服务-2，拿到结果后再调⽤微服务-3，最后组合微服务-2和微服务-3的结果，通过网关返回给用户</p><p>为了追踪整个调⽤链路，肯定需要记录⽇志，⽇志记录是基础，在此之上肯定有⼀些理论概念，当下主流的的分布式链路追踪技术/系统所基于的理念都来⾃于Google 的⼀篇论⽂《Dapper, a Large-Scale Distributed Systems Tracing Infrastructure》，这里面涉及到的核心理念是什么，我们来看下，还以前面的服务调用来说</p><p><img src="'+i+'" alt="1698847865078"></p><p>上图标识⼀个请求链路，⼀条链路通过TraceId唯⼀标识，span标识发起的请求信息，各span通过 parrentId关联起来</p><p><strong>Trace</strong>：服务追踪的追踪单元是从客户发起请求（request）抵达被追踪系统的边界开始，到被追踪系统向客户返回响应（response）为⽌的过程</p><p><strong>Trace ID</strong>：为了实现请求跟踪，当请求发送到分布式系统的⼊⼝端点时，只需要服务跟踪框架为该请求创建⼀个唯⼀的跟踪标识Trace ID，同时在分布式系统内部流转的时候，框架失踪保持该唯⼀标识，直到返回给请求方⼀个Trace由⼀个或者多个Span组成，每⼀个Span都有⼀个SpanId，Span中会记录 TraceId，同时还有⼀个叫做ParentId，指向了另外⼀个Span的SpanId，表明父子关系，其实本质表达了依赖关系 。</p><p><strong>Span ID</strong>：为了统计各处理单元的时间延迟，当请求到达各个服务组件时，也是通过⼀个唯⼀标识Span ID来标记它的开始，具体过程以及结束。对每⼀个Span来说，它必须有开始和结束两个节点，通过记录开始Span和结束Span的时间戳，就能统计出该Span的时间延迟，除了时间戳记录之外，它还可以包含⼀些其他元数据，比如时间名称、请求信息等。</p><p>每⼀个Span都会有⼀个唯⼀跟踪标识 Span ID,若⼲个有序的 span 就组成了⼀个trace。</p><p>Span可以认为是⼀个⽇志数据结构，在⼀些特殊的时机点会记录了⼀些⽇志信息，比如有时间戳、spanId、TraceId，parentIde等，Span中也抽象出了另外⼀个概念，叫做事件，核心事件如下 ：</p><ul><li>CS ：client send/start 客户端/消费者发出⼀个请求，描述的是⼀个span开始</li><li>SR: server received/start 服务端/⽣产者接收请求 SR-CS属于<strong>请求发送的网络延迟</strong></li><li>SS: server send/finish 服务端/⽣产者发送应答 SS-SR属于服务端消耗时间</li><li>CR：client received/finished 客户端/消费者接收应答 CR-SS表示回复需要的时间(响应的网络延迟)</li></ul><hr><p>Spring Cloud Sleuth （追踪服务框架）可以追踪服务之间的调⽤，Sleuth可以记录⼀个服务请求经过哪些服务、服务处理时长等，根据这些，我们能够理清各微服务间的调用关系及进行问题追踪分析。</p><p>耗时分析：通过 Sleuth 了解采样请求的耗时，分析服务性能问题（哪些服务调用比较耗时）</p><p>链路优化：发现频繁调⽤的服务，针对性优化等 Sleuth就是通过记录日志的方式来记录踪迹数据的</p><p><strong>注意：我们往往把Spring Cloud Sleuth 和 Zipkin ⼀起使用，把 Sleuth 的数据信息发送给 Zipkin 进行聚合，利用Zipkin 存储并展示数据。</strong></p><p><img src="'+p+'" alt="1698848406566"></p><p><img src="'+l+`" alt="1698848422956"></p><hr><h2 id="_2-3-sleuth-zipkin" tabindex="-1"><a class="header-anchor" href="#_2-3-sleuth-zipkin" aria-hidden="true">#</a> <strong>2.3 Sleuth + Zipkin</strong></h2><p>1）每⼀个需要被追踪踪迹的微服务工程都引入依赖坐标</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!--链路追踪--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-sleuth<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）每⼀个微服务都修改application.yml配置⽂件，添加日志级别</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>#分布式链路追踪
logging:
 level:
 org.springframework.web.servlet.DispatcherServlet: debug
 org.springframework.cloud.sleuth: debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请求到来时，我们在控制台可以观察到 Sleuth 输出的日志（全局 TraceId、SpanId 等）。</p><p><img src="`+c+`" alt="1698848655027"></p><p>这样的日志首先不容易阅读观察，另外日志分散在各个微服务服务器上，接下来我们使用zipkin统⼀聚合轨迹日志并进行存储展示。</p><p>3）结合 Zipkin 展示追踪数据</p><p>Zipkin 包括Zipkin Server和 Zipkin Client两部分，Zipkin Server是⼀个单独的服务，Zipkin Client就是具体的微服务</p><ul><li><strong>Zipkin Server 构建</strong></li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!--zipkin-server的依赖坐标--&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.zipkin.java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>zipkin-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.12.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">&gt;</span></span>
 <span class="token comment">&lt;!--排除掉log4j2的传递依赖，避免和springboot依赖的日志组件冲突--&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-boot-starter-log4j2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token comment">&lt;!--zipkin-server ui界⾯依赖坐标--&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.zipkin.java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>zipkin-autoconfigure-ui<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.12.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>入口启动类</strong></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">zipkin2<span class="token punctuation">.</span>server<span class="token punctuation">.</span>internal<span class="token punctuation">.</span></span><span class="token class-name">EnableZipkinServer</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableZipkinServer</span> <span class="token comment">// 开启Zipkin Server功能</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ZipkinServerApplication9411</span> <span class="token punctuation">{</span>
 <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
	<span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ZipkinServerApplication9411</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>application.yml</strong></li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>server:
 port: 9411
management:
 metrics:
  web:
   server:
    auto-time-requests: false # 关闭⾃动检测请求
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>Zipkin Client 构建</strong>（在具体微服务中修改）</li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token comment">&lt;!-- pom中添加 zipkin 依赖--&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-zipkin<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>application.yml 中添加对zipkin server的引用</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>spring:
 application:
  name: lagou-service-autodeliver
 zipkin:
  base-url: http://127.0.0.1:9411 # zipkin server的请求地址
  sender: # web 客户端将踪迹日志数据通过网络请求的方式传送到服务端，另外还有配置
 # kafka/rabbit 客户端将踪迹日志数据传递到mq进⾏中转
  type: web
 sleuth:
  sampler:
 # 采样率 1 代表100%全部采集 ，默认0.1 代表10% 的请求踪迹数据会被采集
 # ⽣产环境下，请求量非常大，没有必要所有请求的踪迹数据都采集分析，对于⽹络包括server端压力都是比较大的，可以配置采样率采集⼀定⽐例的请求的踪迹数据进行分析即可
    probability: 1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>另外，对于log⽇志，依然保持开启debug状态</p><ul><li>Zipkin server 页面方便我们查看服务调用依赖关系及⼀些性能指标和异常信息</li><li>追踪数据Zipkin持久化到mysql</li></ul><p><strong>MySql中创建名称为 zipkin 的数据库，并执行如下sql语句（官方提供）</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>--
-- Copyright 2015-2019 The OpenZipkin Authors
--
-- Licensed under the Apache License, Version 2.0 (the&quot;License&quot;); you may not use this file except
-- in compliance with the License. You may obtain a copy of the License at
--
-- http://www.apache.org/licenses/LICENSE-2.0
--
-- Unless required by applicable law or agreed to in writing, software distributed under the License
-- is distributed on an &quot;AS IS&quot; BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
-- or implied. See the License for the specific language governing permissions and limitations under
-- the License.
--
CREATE TABLE
IF
	NOT EXISTS zipkin_spans (
		\`trace_id_high\` BIGINT NOT NULL DEFAULT 0 COMMENT &#39;If non zero, this means the trace uses 128 bit traceIds instead of 64 bit&#39;,
		\`trace_id\` BIGINT NOT NULL,
		\`id\` BIGINT NOT NULL,
		\`name\` VARCHAR ( 255 ) NOT NULL,
		\`remote_service_name\` VARCHAR ( 255 ),
		\`parent_id\` BIGINT,
		\`debug\` BIT ( 1 ),
		\`start_ts\` BIGINT COMMENT &#39;Span.timestamp(): epoch micros used for endTs query and to implement TTL&#39;,
		\`duration\` BIGINT COMMENT &#39;Span.duration(): micros used for minDuration and maxDuration query&#39;,
		PRIMARY KEY ( \`trace_id_high\`, \`trace_id\`, \`id\` ) 
	) ENGINE = INNODB ROW_FORMAT = COMPRESSED CHARACTER 
	SET = utf8 COLLATE utf8_general_ci;
ALTER TABLE zipkin_spans ADD INDEX ( \`trace_id_high\`, \`trace_id\` ) COMMENT &#39;for getTracesByIds&#39;;
ALTER TABLE zipkin_spans ADD INDEX ( \`name\` ) COMMENT &#39;for getTraces and getSpanNames&#39;;
ALTER TABLE zipkin_spans ADD INDEX ( \`remote_service_name\` ) COMMENT &#39;for getTraces and getRemoteServiceNames&#39;;
ALTER TABLE zipkin_spans ADD INDEX ( \`start_ts\` ) COMMENT &#39;for getTraces ordering and range&#39;;

CREATE TABLE
IF
	NOT EXISTS zipkin_annotations (
		\`trace_id_high\` BIGINT NOT NULL DEFAULT 0 COMMENT &#39;If non zero, this means the trace uses 128 bit traceIds instead of 64 bit&#39;,
		\`trace_id\` BIGINT NOT NULL COMMENT &#39;coincides with zipkin_spans.trace_id&#39;,
		\`span_id\` BIGINT NOT NULL COMMENT &#39;coincides with zipkin_spans.id&#39;,
		\`a_key\` VARCHAR ( 255 ) NOT NULL COMMENT &#39;BinaryAnnotation.key or Annotation.value if type == -1&#39;,
		\`a_value\` BLOB COMMENT &#39;BinaryAnnotation.value(), which must be smaller than 64KB&#39;,
		\`a_type\` INT NOT NULL COMMENT &#39;BinaryAnnotation.type() or -1 if Annotation&#39;,
		\`a_timestamp\` BIGINT COMMENT &#39;Used to implement TTL;Annotation.timestamp or zipkin_spans.timestamp&#39;,
	\`endpoint_ipv4\` INT COMMENT &#39;Null when Binary/Annotation.endpoint is null&#39;,
	\`endpoint_ipv6\` BINARY ( 16 ) COMMENT &#39;Null when Binary/Annotation.endpoint is null, or no IPv6 address&#39;,
	\`endpoint_port\` SMALLINT COMMENT &#39;Null when Binary/Annotation.endpoint is null&#39;,
	\`endpoint_service_name\` VARCHAR ( 255 ) COMMENT &#39;Null when Binary/Annotation.endpoint is null&#39; 
) ENGINE = INNODB ROW_FORMAT = COMPRESSED CHARACTER 
SET = utf8 COLLATE utf8_general_ci;
ALTER TABLE zipkin_annotations ADD UNIQUE KEY ( \`trace_id_high\`, \`trace_id\`, \`span_id\`, \`a_key\`, \`a_timestamp\` ) COMMENT &#39;Ignore insert on duplicate&#39;;
ALTER TABLE zipkin_annotations ADD INDEX ( \`trace_id_high\`, \`trace_id\`, \`span_id\` ) COMMENT &#39;for joining with zipkin_spans&#39;;
ALTER TABLE zipkin_annotations ADD INDEX ( \`trace_id_high\`, \`trace_id\` ) COMMENT &#39;for getTraces/ByIds&#39;;
ALTER TABLE zipkin_annotations ADD INDEX ( \`endpoint_service_name\` ) COMMENT &#39;for getTraces and getServiceNames&#39;;
ALTER TABLE zipkin_annotations ADD INDEX ( \`a_type\` ) COMMENT &#39;for getTraces and autocomplete values&#39;;
ALTER TABLE zipkin_annotations ADD INDEX ( \`a_key\` ) COMMENT &#39;for getTraces and autocomplete values&#39;;
ALTER TABLE zipkin_annotations ADD INDEX ( \`trace_id\`, \`span_id\`, \`a_key\` ) COMMENT &#39;for dependencies job&#39;;

CREATE TABLE
IF
	NOT EXISTS zipkin_dependencies (
		\`day\` DATE NOT NULL,
		\`parent\` VARCHAR ( 255 ) NOT NULL,
		\`child\` VARCHAR ( 255 ) NOT NULL,
		\`call_count\` BIGINT,
		\`error_count\` BIGINT,
		PRIMARY KEY ( \`day\`, \`parent\`, \`child\` ) 
	) ENGINE = INNODB ROW_FORMAT = COMPRESSED CHARACTER 
	SET = utf8 COLLATE utf8_general_ci;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>pom文件引入相关依赖</strong></li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>io.zipkin.java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>zipkin-autoconfigure-storage-mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.12.3<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>mysql<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>mysql-connector-java<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.alibaba<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>druid-spring-boot-starter<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.1.10<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-tx<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-jdbc<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>修改配置文件，添加如下内容</strong></li></ul><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
 <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
 <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.jdbc.Driver
 <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/zipkin<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=utf-8&amp;useSSL=false&amp;allowMultiQueries=true</span>
 <span class="token key atrule">username</span><span class="token punctuation">:</span> root
 <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>
 <span class="token key atrule">druid</span><span class="token punctuation">:</span>
  <span class="token key atrule">initialSize</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">minIdle</span><span class="token punctuation">:</span> <span class="token number">10</span>
  <span class="token key atrule">maxActive</span><span class="token punctuation">:</span> <span class="token number">30</span>
  <span class="token key atrule">maxWait</span><span class="token punctuation">:</span> <span class="token number">50000</span>
<span class="token comment"># 指定zipkin持久化介质为mysql</span>
<span class="token key atrule">zipkin</span><span class="token punctuation">:</span>
 <span class="token key atrule">storage</span><span class="token punctuation">:</span>
 <span class="token key atrule">type</span><span class="token punctuation">:</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>启动类中注入事务管理器</strong></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Bean
public PlatformTransactionManager txManager(DataSource dataSource) {
 return new DataSourceTransactionManager(dataSource);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,67),d=[u];function r(k,v){return s(),a("div",null,d)}const m=n(o,[["render",r],["__file","62.html.vue"]]);export{m as default};
