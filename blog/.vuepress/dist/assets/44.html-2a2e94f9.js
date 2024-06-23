import{_ as a,o as e,c as t,b as s,a as n}from"./app-3bb1037e.js";const p="/assets/1698157470783-bc4dfb20.png",o="/assets/1698160312893-fff0698d.png",i="/assets/1698160337449-b504a00c.png",c="/assets/1698160349949-14ff44ee.png",l="/assets/1698160363129-45662ea3.png",u="/assets/1698160388497-d9a35537.png",r="/assets/1698160400699-b598b6b5.png",d="/assets/1698160418184-2f2c27db.png",k="/assets/1698160488013-b012e7e7.png",m="/assets/1698160488013-b012e7e7.png",v="/assets/1698160513480-9255f757.png",g="/assets/1698160531919-51301a59.png",b="/assets/1698160547456-49b257ed.png",h="/assets/1698160557965-fa8a778a.png",y="/assets/1698160588981-d872b5cc.png",f="/assets/1698160611292-6bfdb8d1.png",_="/assets/1698160622053-22a201b2.png",F="/assets/1698160655856-dd8f6baf.png",w="/assets/1698160739851-88a464e8.png",x="/assets/1698160755063-eaaa0ace.png",C="/assets/1698160766494-0479d314.png",R="/assets/1698160782747-f65c11c4.png",S={},j=s('<p>问题：</p><p>服务消费者调用服务提供者的时候使用RestTemplate技术</p><p><img src="'+p+'" alt="1698157470783"></p><p>存在不便之处</p><p>1）拼接url</p><p>2）restTmplate.getForObJect 这两处代码都比较模板化，能不能不让我我们来写这种模板化的东西</p><p>另外来说，拼接url非常的low，拼接字符串，拼接参数，很low还容易出错</p><hr><h2 id="_4-1-feign简介" tabindex="-1"><a class="header-anchor" href="#_4-1-feign简介" aria-hidden="true">#</a> <strong>4.1 Feign简介</strong></h2><p>Feign<strong>是Netflix开发的⼀个轻量级RESTful的HTTP服务客户端（用它来发起请求，远程调用的）</strong>，是以Java接口注解的方式调用Http请求，而不用像Java中通过封装 HTTP请求报文的方式直接调用，Feign被广泛应用在Spring Cloud 的解决方案中。</p><p>类似于Dubbo，服务消费者拿到服务提供者的接口，然后像调⽤本地接口方法⼀样去调用，实际发出的是远程的请求。</p>',11),q=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"1.Feign可帮助我们更加便捷，优雅的调用HTTP API：不需要我们去拼接url然后呢调用 restTemplate 的api，在SpringCloud中，使用Feign非常简单，创建⼀个接口（在消费者--服务调用方这⼀端），并在接口上添加⼀些注解，代码就完成了"),n("p",null,"2.SpringCloud对Feign进行了增强，使Feign支持了SpringMVC注解（OpenFeign）")],-1),B=s(`<p><strong>本质：封装了</strong> Http 调用流程，更符合<strong>面向接口化</strong>的编程习惯，类似于<strong>Dubbo</strong>的服务调用</p><p>Dubbo的调用方式其实就是很好的面向接口编程</p><hr><h2 id="_4-2-feign配置应用" tabindex="-1"><a class="header-anchor" href="#_4-2-feign配置应用" aria-hidden="true">#</a> <strong>4.2 Feign配置应用</strong></h2><p>在服务调用者工程（消费）创建接口（添加注解）</p><p>（效果）Feign = RestTemplate+Ribbon+Hystrix</p><ul><li>服务消费者工程（自动投递微服务）中引⼊Feign依赖（或者分类工程）</li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-openfeign<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>服务消费者⼯程（⾃动投递微服务）启动类使⽤注解@EnableFeignClients添加 Feign⽀持</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>web<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span></span><span class="token class-name">ServletRegistrationBean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>client<span class="token punctuation">.</span>circuitbreaker<span class="token punctuation">.</span></span><span class="token class-name">EnableCircuitBreaker</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>client<span class="token punctuation">.</span>discovery<span class="token punctuation">.</span></span><span class="token class-name">EnableDiscoveryClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>client<span class="token punctuation">.</span>loadbalancer<span class="token punctuation">.</span></span><span class="token class-name">LoadBalanced</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>openfeign<span class="token punctuation">.</span></span><span class="token class-name">EnableFeignClients</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>client<span class="token punctuation">.</span></span><span class="token class-name">RestTemplate</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span> <span class="token comment">// 开启服务发现</span>
<span class="token annotation punctuation">@EnableFeignClients</span> <span class="token comment">// 开启Feign</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">AutodeliverFeignApplication8092</span> <span class="token punctuation">{</span>
 <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">AutodeliverFeignApplication8092</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**注意：**此时去掉Hystrix熔断的⽀持注解@EnableCircuitBreaker即可包括引⼊的依赖，因为Feign会自动引⼊</p><ul><li>创建Feign接口</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>openfeign<span class="token punctuation">.</span></span><span class="token class-name">FeignClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">PathVariable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMapping</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">RequestMethod</span></span><span class="token punctuation">;</span>

<span class="token comment">// name：调⽤的服务名称，和服务提供者yml⽂件中spring.application.name保持⼀致</span>
<span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>name<span class="token operator">=</span><span class="token string">&quot;lagou-service-resume&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ResumeFeignClient</span> <span class="token punctuation">{</span>
 <span class="token comment">//调用的请求路径</span>
 <span class="token annotation punctuation">@RequestMapping</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;/resume/openstate/{userId}&quot;</span><span class="token punctuation">,</span>method<span class="token operator">=</span><span class="token class-name">RequestMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">)</span>
 <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">findResumeOpenState</span><span class="token punctuation">(</span><span class="token annotation punctuation">@PathVariable</span><span class="token punctuation">(</span>value <span class="token operator">=</span><span class="token string">&quot;userId&quot;</span><span class="token punctuation">)</span> <span class="token class-name">Long</span> userId<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>**注意：**1）@FeignClient注解的name属性用于指定要调用的服务提供者名称，和服务提供者yml⽂件中spring.application.name保持⼀致</p><p>2）接口中的接口方法，就好比是远程服务提供者Controller中的Hander⽅法（只不过如同本地调用了），那么在进行参数绑定的时，可以使用@PathVariable、@RequestParam、@RequestHeader等，这也是OpenFeign对SpringMVC注解的支持，但是需要注意value必须设置，否则会抛出异常</p><ul><li>使用接口中方法完成远程调用（注入接口即可，实际注入的是接口的实现）</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">ResumeFeignClient</span> resumeFeignClient<span class="token punctuation">;</span>
<span class="token annotation punctuation">@Test</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">testFeignClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token class-name">Integer</span> resumeOpenState <span class="token operator">=</span> resumeFeignClient<span class="token punctuation">.</span><span class="token function">findResumeOpenState</span><span class="token punctuation">(</span><span class="token number">1545132l</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">&quot;=======&gt;&gt;&gt;resumeOpenState：&quot;</span> <span class="token operator">+</span> resumeOpenState<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-3-feign对负载均衡的支持" tabindex="-1"><a class="header-anchor" href="#_4-3-feign对负载均衡的支持" aria-hidden="true">#</a> <strong>4.3 Feign对负载均衡的支持</strong></h2><p>Feign 本身已经集成了Ribbon依赖和自动配置，因此我们不需要额外引⼊依赖，可以通过 ribbon.xx 来进行全局配置,也可以通过服务名.ribbon.xx 来对指定服务进行</p><p>细节配置配置（参考之前，此处略）Feign默认的请求处理超时时长1s，有时候我们的业务确实执行的需要⼀定时间，那么这个时候，我们就需要调整请求处理超时时长，Feign自己有超时设置，如果配置Ribbon的超时，则会以Ribbon的为准。</p><p><strong>Ribbon设置</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment">#针对的被调⽤⽅微服务名称,不加就是全局⽣效</span>
<span class="token key atrule">lagou-service-resume</span><span class="token punctuation">:</span>
 <span class="token key atrule">ribbon</span><span class="token punctuation">:</span>
 <span class="token comment">#请求连接超时时间</span>
 <span class="token comment">#ConnectTimeout: 2000</span>
 <span class="token comment">#请求处理超时时间</span>
 <span class="token comment">#ReadTimeout: 5000</span>
 <span class="token comment">#对所有操作都进⾏重试</span>
 <span class="token key atrule">OkToRetryOnAllOperations</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
 <span class="token comment">####根据如上配置，当访问到故障请求的时候，它会再尝试访问⼀次当前实例（次数由MaxAutoRetries配置），</span>
 <span class="token comment">####如果不⾏，就换⼀个实例进⾏访问，如果还不⾏，再换⼀次实例访问（更换次数由MaxAutoRetriesNextServer配置），</span>
 <span class="token comment">####如果依然不⾏，返回失败信息。</span>
 <span class="token key atrule">MaxAutoRetries</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment">#对当前选中实例重试次数，不包括第⼀次调⽤</span>
 <span class="token key atrule">MaxAutoRetriesNextServer</span><span class="token punctuation">:</span> <span class="token number">0</span> <span class="token comment">#切换实例的重试次数</span>
 <span class="token key atrule">NFLoadBalancerRuleClassName</span><span class="token punctuation">:</span> com.netflix.loadbalancer.RoundRobinRule <span class="token comment">#负载策略调整 </span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-4-feign对熔断器的支持" tabindex="-1"><a class="header-anchor" href="#_4-4-feign对熔断器的支持" aria-hidden="true">#</a> <strong>4.4 Feign对熔断器的支持</strong></h2><p>1）在Feign客户端⼯程配置文件（application.yml）中开启Feign对熔断器的支持</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code># 开启<span class="token class-name">Feign</span>的熔断功能
feign<span class="token operator">:</span>
 hystrix<span class="token operator">:</span>
 enabled<span class="token operator">:</span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Feign的超时时长设置那其实就上⾯Ribbon的超时时长设置 Hystrix超时设置（就按照之前Hystrix设置的方式就OK了）</p><p>注意：</p><p>1）开启Hystrix之后，Feign中的方法都会被进⾏⼀个管理了，⼀旦出现问题就进入对应的回退逻辑处理</p><p>2）针对超时这⼀点，当前有两个超时时间设置（Feign/hystrix），熔断的时候是根据这两个时间的最小值来进行的，即处理时⻓超过最短的那个超时时间了就熔断进入回退降级逻辑。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">hystrix</span><span class="token punctuation">:</span>
 <span class="token key atrule">command</span><span class="token punctuation">:</span>
  <span class="token key atrule">default</span><span class="token punctuation">:</span>
   <span class="token key atrule">execution</span><span class="token punctuation">:</span>
    <span class="token key atrule">isolation</span><span class="token punctuation">:</span>
     <span class="token key atrule">thread</span><span class="token punctuation">:</span>
       <span class="token comment">##########################################Hystrix的超时时长设置</span>
       <span class="token key atrule">timeoutInMilliseconds</span><span class="token punctuation">:</span> <span class="token number">15000</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）自定义FallBack处理类（需要实现FeignClient接口）</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>controller<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
* 降级回退逻辑需要定义⼀个类，实现FeignClient接⼝，实现接⼝中的方法
*/</span>
<span class="token annotation punctuation">@Component</span> <span class="token comment">// 别忘了这个注解，还应该被扫描到</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ResumeFallback</span> <span class="token keyword">implements</span> <span class="token class-name">ResumeServiceFeignClient</span> <span class="token punctuation">{</span>
 <span class="token annotation punctuation">@Override</span>
 <span class="token keyword">public</span> <span class="token class-name">Integer</span> <span class="token function">findDefaultResumeState</span><span class="token punctuation">(</span><span class="token class-name">Long</span> userId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token operator">-</span><span class="token number">6</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）在@FeignClient注解中关联2）中自定义的处理类</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@FeignClient</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;lagou-service-resume&quot;</span><span class="token punctuation">,</span>fallback <span class="token operator">=</span><span class="token class-name">ResumeFallback</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>path <span class="token operator">=</span> <span class="token string">&quot;/resume&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 使⽤fallback的时候，类上的@RequestMapping的url前缀限定，改成配置在@FeignClient的path属性中</span>
<span class="token comment">//@RequestMapping(&quot;/resume&quot;)</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ResumeServiceFeignClient</span> <span class="token punctuation">{</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-5-feign对请求压缩和响应压缩的支持" tabindex="-1"><a class="header-anchor" href="#_4-5-feign对请求压缩和响应压缩的支持" aria-hidden="true">#</a> <strong>4.5 Feign对请求压缩和响应压缩的支持</strong></h2><p>Feign 支持对请求和响应进⾏GZIP压缩，以减少通信过程中的性能损耗。通过下面的参数 即可开启请求与响应的压缩功能：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>feign<span class="token operator">:</span>
 compression<span class="token operator">:</span>
  request<span class="token operator">:</span>
    enabled<span class="token operator">:</span> <span class="token boolean">true</span> # 开启请求压缩
    mime<span class="token operator">-</span>types<span class="token operator">:</span> text<span class="token operator">/</span>html<span class="token punctuation">,</span>application<span class="token operator">/</span>xml<span class="token punctuation">,</span>application<span class="token operator">/</span>json # 设置压缩的数据类型，此处也是默认值
    min<span class="token operator">-</span>request<span class="token operator">-</span>size<span class="token operator">:</span> <span class="token number">2048</span> # 设置触发压缩的⼤⼩下限，此处也是默认值
  response<span class="token operator">:</span>
   enabled<span class="token operator">:</span> <span class="token boolean">true</span> # 开启响应压缩
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-6-feign的日志级别配置" tabindex="-1"><a class="header-anchor" href="#_4-6-feign的日志级别配置" aria-hidden="true">#</a> <strong>4.6 Feign的日志级别配置</strong></h2><p>Feign是http请求客户端，类似于咱们的浏览器，它在请求和接收响应的时候，可以打印出比较详细的⼀些日志信息（响应头，状态码等等）</p><p>如果我们想看到Feign请求时的日志，我们可以进⾏配置，默认情况下Feign的⽇志没有开启。</p><ol><li>开启Feign日志功能及级别</li></ol><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// Feign的⽇志级别（Feign请求过程信息）</span>
<span class="token comment">// NONE：默认的，不显示任何⽇志----性能最好</span>
<span class="token comment">// BASIC：仅记录请求⽅法、URL、响应状态码以及执⾏时间----⽣产问题追踪</span>
<span class="token comment">// HEADERS：在BASIC级别的基础上，记录请求和响应的header</span>
<span class="token comment">// FULL：记录请求和响应的header、body和元数据----适⽤于开发及测试环境定位问题</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">FeignConfig</span> <span class="token punctuation">{</span>
 <span class="token annotation punctuation">@Bean</span>
 <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span> <span class="token function">feignLevel</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 	<span class="token keyword">return</span> <span class="token class-name">Logger<span class="token punctuation">.</span>Level</span><span class="token punctuation">.</span><span class="token constant">FULL</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>配置log日志级别为debug</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">logging</span><span class="token punctuation">:</span>
 <span class="token key atrule">level</span><span class="token punctuation">:</span>
   <span class="token comment"># Feign⽇志只会对⽇志级别为debug的做出响应</span>
   <span class="token key atrule">com.lagou.edu.controller.service.ResumeServiceFeignClient</span><span class="token punctuation">:</span> debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_4-7-feign核心源码剖析" tabindex="-1"><a class="header-anchor" href="#_4-7-feign核心源码剖析" aria-hidden="true">#</a> <strong>4.7 Feign核心源码剖析</strong></h2><p>思考⼀个问题：只定义了接⼝，添加上@FeignClient，真的没有实现的话，能完成远程请求么？</p><p>不能，考虑是做了代理了。</p><p>1）先断点验证⼀下这个方法，确实是个代理对象啊！</p><p><img src="`+o+'" alt="1698160312893"></p><p>2）从@EnableFeignClients 正向切入</p><p><img src="'+i+'" alt="1698160337449"></p><p><img src="'+c+'" alt="1698160349949"></p><p><img src="'+l+'" alt="1698160363129"></p><p>接下来，我们主要追踪下另外⼀行主要的代码registerFeignClients(metadata, registry);</p><p><img src="'+u+'" alt="1698160388497"></p><p><img src="'+r+'" alt="1698160400699"></p><p>注册客户端，给每⼀个客户端生成代理对象</p><p><img src="'+d+'" alt="1698160418184"></p><p><strong>所以，下⼀步，关注FeignClientFactoryBean这个⼯⼚Bean的getObject方法， 根据经验，这个方法会返回我们的代理对象</strong></p><p>接下来，FeignClientFactoryBean.getObject方法</p><p><img src="'+k+'" alt="1698160488013"></p><p><img src="'+m+'" alt="1698160500432"></p><p><img src="'+v+'" alt="1698160513480"></p><p>org.springframework.cloud.openfeign.HystrixTargeter#target</p><p><img src="'+g+'" alt="1698160531919"></p><p><img src="'+b+'" alt="1698160547456"></p><p><img src="'+h+'" alt="1698160557965"></p><ul><li>请求进来时候，是进⼊增强逻辑的，所以接下来我们要关注增强逻辑部分， FeignInvocationHandler</li></ul><p><img src="'+y+'" alt="1698160588981"></p><p>SynchronousMethodHandler#invoke</p><p><img src="'+f+'" alt="1698160611292"></p><p><img src="'+_+'" alt="1698160622053"></p><p>AbstractLoadBalancerAwareClient#executeWithLoadBalancer()</p><p><img src="'+F+'" alt="1698160655856"></p><p>进⼊submit方法，我们进⼀步就会发现使⽤Ribbon在做负载均衡了</p><p><img src="'+w+'" alt="1698160739851"></p><p><img src="'+x+'" alt="1698160755063"></p><p><img src="'+C+'" alt="1698160766494"></p><p>最终请求的发起使⽤的是HttpURLConnection</p><p><img src="'+R+'" alt="1698160782747"></p>',84),A=[j,q,B];function T(H,I){return e(),t("div",null,A)}const M=a(S,[["render",T],["__file","44.html.vue"]]);export{M as default};
