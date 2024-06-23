import{_ as n,o as s,c as a,b as e}from"./app-1f8a5ff3.js";const t="/msz-blog/assets/1698936290860-3650f302.png",p="/msz-blog/assets/1698937102174-e5f80f65.png",o="/msz-blog/assets/1698937117994-e675f02d.png",c="/msz-blog/assets/1698937784578-0736de99.png",i="/msz-blog/assets/1699027151075-b98ab199.png",l="/msz-blog/assets/1699028853923-da100316.png",u="/msz-blog/assets/1699029697589-5e35aefe.png",r={},k=e('<p>认证：验证⽤户的合法身份，⽐如输⼊⽤户名和密码，系统会在后台验证⽤户名</p><p>和密码是否合法，合法的前提下，才能够进⾏后续的操作，访问受保护的资源</p><h2 id="_3-1-微服务架构下统一认证场景" tabindex="-1"><a class="header-anchor" href="#_3-1-微服务架构下统一认证场景" aria-hidden="true">#</a> <strong>3.1 微服务架构下统一认证场景</strong></h2><p>分布式系统的每个服务都会有认证需求，如果每个服务都实现⼀套认证逻辑会非常冗余，考虑分布式系统共享性的特点，需要由独立的认证服务处理系统认证的请求。</p><p><img src="'+t+'" alt="1698936290860"></p><ul><li><strong>基于Session的认证方式</strong></li></ul><p>在分布式的环境下，基于session的认证会出现⼀个问题，每个应⽤服务都需要在session中存储⽤户身份信息，通过负载均衡将本地的请求分配到另⼀个应用，服务需要将session信息带过去，否则会重新认证。我们可以使用Session共享、 Session黏贴等方案。</p><p>Session方案也有缺点，比如基于cookie，移动端不能有效使用等</p><ul><li><strong>基于token的认证方式</strong></li></ul><p>基于token的认证⽅式，服务端不⽤存储认证数据，易维护扩展性强， 客户端可以把token 存在任意地方，并且可以实现web和app统⼀认证机制。其缺点也很明显，token由于自包含信息，因此⼀般数据量较⼤，⽽且每次请求 都需要传递，因此比较占带宽。另外，token的签名验签操作也会给cpu带来额外的处理负担。</p><hr><h2 id="_3-2-oauth2-开放授权协议-标准" tabindex="-1"><a class="header-anchor" href="#_3-2-oauth2-开放授权协议-标准" aria-hidden="true">#</a> 3.2 OAuth2 开放授权协议 / 标准</h2><h3 id="_3-2-1-oauth2-介绍" tabindex="-1"><a class="header-anchor" href="#_3-2-1-oauth2-介绍" aria-hidden="true">#</a> 3.2.1 OAuth2 介绍</h3><p>OAuth（开放授权）是⼀个开放协议/标准，允许⽤户授权第三⽅应⽤访问他们存储在另外的服务提供者上的信息，而不需要将⽤户名和密码提供给第三⽅应用或分享他们数据的所有内容。</p><p><strong>允许用户授权第三方应用访问他们存储在另外的服务提供者上的信息，而不需要将用户名和密码提供给第三方应用或分享他们数据的所有内容</strong></p><p>结合“使⽤QQ登录拉勾”这个场景拆分理解上述那句话</p><p>用户：我们自己</p><p>第三方应用：拉勾网</p><p>另外的服务提供者：QQ</p><p>OAuth2是OAuth协议的延续版本，但不向后兼容OAuth1即完全废止了OAuth1。</p><hr><h3 id="_3-3-2-oauth2-协议角色和流程" tabindex="-1"><a class="header-anchor" href="#_3-3-2-oauth2-协议角色和流程" aria-hidden="true">#</a> <strong>3.3.2 OAuth2 协议角色和流程</strong></h3><p>拉勾网要开发使用QQ登录这个功能的话，那么拉勾网是需要提前到QQ平台进行登记的（否则QQ凭什么陪着拉勾网玩授权登录这件事）</p><p>1）拉勾网——登记——&gt;QQ平台</p><p>2）QQ 平台会颁发⼀些参数给拉勾网，后续上线进行授权登录的时候（刚才打开授权页面）需要携带这些参数</p><p>client_id ：客户端id（QQ最终相当于⼀个认证授权服务器，拉勾网就相当于⼀个客户端了，所以会给⼀个客户端id），相当于账号</p><p>secret：相当于密码</p><p><img src="'+p+'" alt="1698937102174"></p><p><img src="'+o+'" alt="1698937117994"></p><ul><li>资源所有者（Resource Owner）：可以理解为用户自己</li><li>客户端（Client）：我们想登陆的网站或应用，比如拉勾网</li><li>认证服务器（Authorization Server）：可以理解为微信或者QQ</li><li>资源服务器（Resource Server）：可以理解为微信或者QQ</li></ul><hr><h3 id="_3-2-3-什么情况下需要使用oauth2" tabindex="-1"><a class="header-anchor" href="#_3-2-3-什么情况下需要使用oauth2" aria-hidden="true">#</a> 3.2.3 什么情况下需要使用OAuth2 ？</h3><p>第三⽅授权登录的场景：比如，我们经常登录⼀些网站或者应用的时候，可以选择使用第三⽅授权登录的方式，比如：微信授权登录、QQ授权登录、微博授权登录等，这是典型的 OAuth2 使用场景。</p><p>单点登录的场景：如果项⽬中有很多微服务或者公司内部有很多服务，可以专门做⼀个认证中心（充当认证平台角色），所有的服务都要到这个认证中心做认证，只做⼀次登录，就可以在多个授权范围内的服务中自由串行。</p><hr><h3 id="_3-2-4-oauth2-的颁发token授权方式" tabindex="-1"><a class="header-anchor" href="#_3-2-4-oauth2-的颁发token授权方式" aria-hidden="true">#</a> 3.2.4 OAuth2 的颁发Token授权方式</h3><p>1）授权码（authorization-code）</p><p>2）密码式（password）提供用户名+密码换取token令牌</p><p>3）隐藏式（implicit）</p><p>4）客户端凭证（client credentials）</p><p>授权码模式使用到了回调地址，是最复杂的授权⽅式，微博、微信、QQ等第三方登录就是这种模式。我们重点讲解<strong>接口对接</strong>中常使用的password密码模式（提供用户名+密码换取token）。</p><hr><h2 id="_3-3-spring-cloud-oauth2-jwt-实现" tabindex="-1"><a class="header-anchor" href="#_3-3-spring-cloud-oauth2-jwt-实现" aria-hidden="true">#</a> 3.3 Spring Cloud OAuth2 + JWT <strong>实现</strong></h2><h3 id="_3-3-1-spring-cloud-oauth2-介绍" tabindex="-1"><a class="header-anchor" href="#_3-3-1-spring-cloud-oauth2-介绍" aria-hidden="true">#</a> 3.3.1 Spring Cloud OAuth2 介绍</h3><p>Spring Cloud OAuth2 是 Spring Cloud 体系对OAuth2协议的实现，可以⽤来做多个微服务的统⼀认证（验证身份合法性）授权（验证权限）。通过向OAuth2服务（统⼀认证授权服务）发送某个类型的grant_type进⾏集中认证和授权，从而获得 access_token（访问令牌），而这个token是受其他微服务信任的。</p><p><strong>注意：使用 OAuth2 解决问题的本质是，引入了⼀个认证授权层，认证授权层连接了</strong></p><p><strong>资源的拥有者，在授权层里面，资源的拥有者可以给第三方应用授权去访问我们的某些受保护资源。</strong></p><h3 id="_3-3-2-spring-cloud-oauth2-构建微服务统一认证服务思路" tabindex="-1"><a class="header-anchor" href="#_3-3-2-spring-cloud-oauth2-构建微服务统一认证服务思路" aria-hidden="true">#</a> 3.3.2 Spring Cloud OAuth2 构建微服务统⼀认证服务思路</h3><p><img src="'+c+`" alt="1698937784578"></p><p><strong>注意：在我们统⼀认证的场景中，Resource Server其实就是我们的各种受保护的微服务，微服务中的各种API 访问接⼝就是资源，发起 http 请求的浏览器就是 Client</strong></p><p><strong>客户端（对应为第三方应用）</strong></p><h3 id="_3-3-3-搭建认证服务器-authorization-server" tabindex="-1"><a class="header-anchor" href="#_3-3-3-搭建认证服务器-authorization-server" aria-hidden="true">#</a> 3.3.3 搭建认证服务器（Authorization Server）</h3><p>认证服务器（Authorization Server），负责颁发token</p><p>新建项目lagou-cloud-oauth-server-9999</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>project</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0<span class="token punctuation">&quot;</span></span>
 <span class="token attr-name"><span class="token namespace">xmlns:</span>xsi</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://www.w3.org/2001/XMLSchema-instance<span class="token punctuation">&quot;</span></span>
 <span class="token attr-name"><span class="token namespace">xsi:</span>schemaLocation</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>http://maven.apache.org/POM/4.0.0
http://maven.apache.org/xsd/maven-4.0.0.xsd<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>parent</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>lagou-parent<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>com.lagou.edu<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>1.0-SNAPSHOT<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>parent</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>modelVersion</span><span class="token punctuation">&gt;</span></span>4.0.0<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>modelVersion</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>lagou-cloud-oauth2-server-9999<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
 <span class="token comment">&lt;!--导⼊Eureka Client依赖--&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-netflix-eureka-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token comment">&lt;!--导⼊spring cloud oauth2依赖--&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-oauth2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusions</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>exclusion</span><span class="token punctuation">&gt;</span></span>
 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.security.oauth.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-security-oauth2-autoconfigure<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusion</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>exclusions</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.security.oauth.boot<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-security-oauth2-autoconfigure<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.1.11.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.security.oauth<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-security-oauth2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>2.3.4.RELEASE<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
 <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9999</span>
<span class="token key atrule">Spring</span><span class="token punctuation">:</span>
 <span class="token key atrule">application</span><span class="token punctuation">:</span>
 <span class="token key atrule">name</span><span class="token punctuation">:</span> lagou<span class="token punctuation">-</span>cloud<span class="token punctuation">-</span>oauth<span class="token punctuation">-</span>server
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
 <span class="token key atrule">client</span><span class="token punctuation">:</span>
 <span class="token key atrule">serviceUrl</span><span class="token punctuation">:</span> <span class="token comment"># eureka server的路径</span>
 <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span>
http<span class="token punctuation">:</span>//lagoucloudeurekaservera<span class="token punctuation">:</span>8761/eureka/<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//lagoucloudeurekaserverb<span class="token punctuation">:</span>8762/eureka/ 
<span class="token comment">#把 eureka 集群中的所有 url 都填写了进来，也可以只写⼀台，因为各个 eureka server 可以同步注册表</span>
 <span class="token key atrule">instance</span><span class="token punctuation">:</span>
 <span class="token comment">#使⽤ip注册，否则会使⽤主机名注册了（此处考虑到对⽼版本的兼容，新版本经过实验都是ip）</span>
 <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
 <span class="token comment">#⾃定义实例显示格式，加上版本号，便于多版本管理，注意是ip-address，早期版本是ipAddress</span>
 <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.cloud.client.ipaddress<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>server.port<span class="token punctuation">}</span><span class="token punctuation">:</span>@project.version@
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>入口类无特殊之处</li><li>认证服务器配置类</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpMethod</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>authentication<span class="token punctuation">.</span></span><span class="token class-name">AuthenticationManager</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>configurers<span class="token punctuation">.</span></span><span class="token class-name">ClientDetailsServiceConfigurer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span></span><span class="token class-name">AuthorizationServerConfigurerAdapter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span></span><span class="token class-name">EnableAuthorizationServer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configurers<span class="token punctuation">.</span></span><span class="token class-name">AuthorizationServerEndpointsConfigurer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configurers<span class="token punctuation">.</span></span><span class="token class-name">AuthorizationServerSecurityConfigurer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>provider<span class="token punctuation">.</span>token<span class="token punctuation">.</span></span><span class="token class-name">AuthorizationServerTokenServices</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>provider<span class="token punctuation">.</span>token<span class="token punctuation">.</span></span><span class="token class-name">DefaultTokenServices</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>provider<span class="token punctuation">.</span>token<span class="token punctuation">.</span></span><span class="token class-name">TokenStore</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>provider<span class="token punctuation">.</span>token<span class="token punctuation">.</span>store<span class="token punctuation">.</span></span><span class="token class-name">InMemoryTokenStore</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
* 当前类为Oauth2 server的配置类（需要继承特定的⽗类
AuthorizationServerConfigurerAdapter）
*/</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableAuthorizationServer</span> <span class="token comment">// 开启认证服务器功能</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">OauthServerConfiger</span> <span class="token keyword">extends</span> <span class="token class-name">AuthorizationServerConfigurerAdapter</span> <span class="token punctuation">{</span>
    
 <span class="token annotation punctuation">@Autowired</span>
 <span class="token keyword">private</span> <span class="token class-name">AuthenticationManager</span> authenticationManager<span class="token punctuation">;</span>
 <span class="token doc-comment comment">/**
 * 认证服务器最终是以api接⼝的⽅式对外提供服务（校验合法性并⽣成令牌、校验令牌等）
 * 那么，以api接⼝⽅式对外的话，就涉及到接⼝的访问权限，我们需要在这⾥进⾏必要的配置
 * <span class="token keyword">@param</span> <span class="token parameter">security</span>
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
 */</span>
 <span class="token annotation punctuation">@Override</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthorizationServerSecurityConfigurer</span> security<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">configure</span><span class="token punctuation">(</span>security<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment">// 相当于打开endpoints 访问接⼝的开关，这样的话后期我们能够访问该接⼝</span>
 security
 <span class="token comment">// 允许客户端表单认证</span>
 <span class="token punctuation">.</span><span class="token function">allowFormAuthenticationForClients</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token comment">// 开启端口/oauth/token_key的访问权限（允许）</span>
 <span class="token punctuation">.</span><span class="token function">tokenKeyAccess</span><span class="token punctuation">(</span><span class="token string">&quot;permitAll()&quot;</span><span class="token punctuation">)</span>
 <span class="token comment">// 开启端口/oauth/check_token的访问权限（允许）</span>
 <span class="token punctuation">.</span><span class="token function">checkTokenAccess</span><span class="token punctuation">(</span><span class="token string">&quot;permitAll()&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
    
 <span class="token doc-comment comment">/**
 * 客户端详情配置，
 * ⽐如client_id，secret
 * 当前这个服务就如同QQ平台，拉勾⽹作为客户端需要qq平台进⾏登录授权认证等，提前需要到QQ平台注册，QQ平台会给拉勾网
 * 颁发client_id等必要参数，表明客户端是谁
 * <span class="token keyword">@param</span> <span class="token parameter">clients</span>
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
 */</span>
 <span class="token annotation punctuation">@Override</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">ClientDetailsServiceConfigurer</span> clients<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">configure</span><span class="token punctuation">(</span>clients<span class="token punctuation">)</span><span class="token punctuation">;</span>
 clients<span class="token punctuation">.</span><span class="token function">inMemory</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">// 客户端信息存储在什么地⽅，可以在内存中，可以在数据库⾥</span>
 <span class="token punctuation">.</span><span class="token function">withClient</span><span class="token punctuation">(</span><span class="token string">&quot;client_lagou&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 添加⼀个client配置,指定其client_id</span>
 <span class="token punctuation">.</span><span class="token function">secret</span><span class="token punctuation">(</span><span class="token string">&quot;abcxyz&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 指定客户端的密码/安全码</span>
 <span class="token punctuation">.</span><span class="token function">resourceIds</span><span class="token punctuation">(</span><span class="token string">&quot;autodeliver&quot;</span><span class="token punctuation">)</span> <span class="token comment">// 指定客户端所能访问资源id清单，此处的资源id是需要在具体的资源服务器上也配置⼀样</span>
 <span class="token comment">// 认证类型/令牌颁发模式，可以配置多个在这⾥，但是不⼀定都⽤，具体使⽤哪种⽅式颁发token，需要客户端调⽤的时候传递参数指定</span>
<span class="token punctuation">.</span><span class="token function">authorizedGrantTypes</span><span class="token punctuation">(</span><span class="token string">&quot;password&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;refresh_token&quot;</span><span class="token punctuation">)</span>
 <span class="token comment">// 客户端的权限范围，此处配置为all全部即可</span>
 <span class="token punctuation">.</span><span class="token function">scopes</span><span class="token punctuation">(</span><span class="token string">&quot;all&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
    
 <span class="token doc-comment comment">/**
 * 认证服务器是玩转token的，那么这⾥配置token令牌管理相关（token此时就是⼀个字符串，当下的token需要在服务器端存储，
 * 那么存储在哪⾥呢？都是在这⾥配置）
 * <span class="token keyword">@param</span> <span class="token parameter">endpoints</span>
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
 */</span>
 <span class="token annotation punctuation">@Override</span>
 <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthorizationServerEndpointsConfigurer</span> endpoints<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
 <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">configure</span><span class="token punctuation">(</span>endpoints<span class="token punctuation">)</span><span class="token punctuation">;</span>
 endpoints
 <span class="token punctuation">.</span><span class="token function">tokenStore</span><span class="token punctuation">(</span><span class="token function">tokenStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// 指定token的存储⽅法</span>
 <span class="token punctuation">.</span><span class="token function">tokenServices</span><span class="token punctuation">(</span><span class="token function">authorizationServerTokenServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// token服务的⼀个描述，可以认为是token⽣成细节的描述，⽐如有效时间多少等</span>
 <span class="token punctuation">.</span><span class="token function">authenticationManager</span><span class="token punctuation">(</span>authenticationManager<span class="token punctuation">)</span> <span class="token comment">//指定认证管理器，随后注⼊⼀个到当前类使⽤即可</span>
 <span class="token punctuation">.</span><span class="token function">allowedTokenEndpointRequestMethods</span><span class="token punctuation">(</span><span class="token class-name">HttpMethod</span><span class="token punctuation">.</span><span class="token constant">GET</span><span class="token punctuation">,</span><span class="token class-name">HttpMethod</span><span class="token punctuation">.</span><span class="token constant">POST</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>     
    
 <span class="token comment">/*
 该⽅法⽤于创建tokenStore对象（令牌存储对象）
 token以什么形式存储
 */</span>
 <span class="token keyword">public</span> <span class="token class-name">TokenStore</span> <span class="token function">tokenStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">InMemoryTokenStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token doc-comment comment">/**
 * 该⽅法⽤户获取⼀个token服务对象（该对象描述了token有效期等信息）
 */</span>
 <span class="token keyword">public</span> <span class="token class-name">AuthorizationServerTokenServices</span> <span class="token function">authorizationServerTokenServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// 使⽤默认实现</span>
 <span class="token class-name">DefaultTokenServices</span> defaultTokenServices <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">DefaultTokenServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 defaultTokenServices<span class="token punctuation">.</span><span class="token function">setSupportRefreshToken</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 是否开启令牌刷新</span>
 defaultTokenServices<span class="token punctuation">.</span><span class="token function">setTokenStore</span><span class="token punctuation">(</span><span class="token function">tokenStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment">// 设置令牌有效时间（⼀般设置为2个⼩时）</span>
 defaultTokenServices<span class="token punctuation">.</span><span class="token function">setAccessTokenValiditySeconds</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// access_token就是我们请求资源需要携带的令牌</span>
 <span class="token comment">// 设置刷新令牌的有效时间</span>
defaultTokenServices<span class="token punctuation">.</span><span class="token function">setRefreshTokenValiditySeconds</span><span class="token punctuation">(</span><span class="token number">259200</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//3天</span>
 <span class="token keyword">return</span> defaultTokenServices<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>     
     
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>关于三个configure⽅法</strong></p><ul><li><strong>configure(ClientDetailsServiceConfigurer clients)</strong></li></ul><p>⽤来配置客户端详情服务（ClientDetailsService），客户端详情信息在 这里进行初始化，你能够把客户端详情信息写死在这里或者是通过数据库来存储调取详情信息</p><ul><li><strong>configure(AuthorizationServerEndpointsConfigurer endpoints)</strong></li></ul><p>⽤来配置令牌（token）的访问端点和令牌服务(token services)</p><ul><li><strong>configure(AuthorizationServerSecurityConfigureroauthServer)</strong></li></ul><p>⽤来配置令牌端点的安全约束</p><p><strong>关于 TokenStore</strong></p><ul><li>InMemoryTokenStore</li></ul><p>默认采⽤，它可以完美的⼯作在单服务器上（即访问并发量 压⼒不⼤的情况下，并且它在失败的时候不会进⾏备份），⼤多数的项⽬都可以使⽤这个版本的实现来进⾏ 尝试，你可以在开发的时候使⽤它来进⾏管理，因为不会被保存到磁盘中，所以更易于调试。</p><ul><li>JdbcTokenStore</li></ul><p>这是⼀个基于JDBC的实现版本，令牌会被保存进关系型数据库。使⽤这个版本的实现时， 你可以在不同的服务器之间共享令牌信息，使⽤这个版本的时候请注意把&quot;spring-jdbc&quot;这个依赖加⼊到你的 classpath 当中。</p><ul><li>JwtTokenStore</li></ul><p>这个版本的全称是 JSON Web Token（JWT），它可以把令牌相关的数据进⾏编码（因此对于后端服务来说，它不需要进⾏存储，这将是⼀个重⼤优势），缺点就是这个令牌占⽤的空间会⽐较⼤，如果你加⼊了⽐较多⽤户凭证信息，JwtTokenStore 不会保存任何数据。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cglib<span class="token punctuation">.</span>proxy<span class="token punctuation">.</span></span><span class="token class-name">NoOp</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Bean</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token class-name"><span class="token namespace">importmorg<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>authentication<span class="token punctuation">.</span></span>AuthenticationManager</span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>authentication<span class="token punctuation">.</span>builders<span class="token punctuation">.</span></span><span class="token class-name">AuthenticationManagerBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span></span><span class="token class-name">WebSecurityConfigurerAdapter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>core<span class="token punctuation">.</span>userdetails<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>core<span class="token punctuation">.</span>userdetails<span class="token punctuation">.</span></span><span class="token class-name">UserDetails</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span>password<span class="token punctuation">.</span></span><span class="token class-name">NoOpPasswordEncoder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>crypto<span class="token punctuation">.</span>password<span class="token punctuation">.</span></span><span class="token class-name">PasswordEncoder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>

<span class="token doc-comment comment">/**
* 该配置类，主要处理⽤户名和密码的校验等事宜
*/</span>
<span class="token annotation punctuation">@Configuration</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SecurityConfiger</span> <span class="token keyword">extends</span> <span class="token class-name">WebSecurityConfigurerAdapter</span> <span class="token punctuation">{</span>
 <span class="token doc-comment comment">/**
 * 注册⼀个认证管理器对象到容器
 */</span>
 <span class="token annotation punctuation">@Bean</span>
 <span class="token annotation punctuation">@Override</span>
 <span class="token keyword">public</span> <span class="token class-name">AuthenticationManager</span> <span class="token function">authenticationManagerBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">authenticationManagerBean</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 <span class="token doc-comment comment">/**
 * 密码编码对象（密码不进⾏加密处理）
 * <span class="token keyword">@return</span>
 */</span>
 <span class="token annotation punctuation">@Bean</span>
 <span class="token keyword">public</span> <span class="token class-name">PasswordEncoder</span> <span class="token function">passwordEncoder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token class-name">NoOpPasswordEncoder</span><span class="token punctuation">.</span><span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
    
 <span class="token annotation punctuation">@Autowired</span>
 <span class="token keyword">private</span> <span class="token class-name">PasswordEncoder</span> passwordEncoder<span class="token punctuation">;</span>
 <span class="token doc-comment comment">/**
 * 处理⽤户名和密码验证事宜
 * 1）客户端传递username和password参数到认证服务器
 * 2）⼀般来说，username和password会存储在数据库中的⽤户表中
 * 3）根据⽤户表中数据，验证当前传递过来的⽤户信息的合法性
 */</span>
 <span class="token annotation punctuation">@Override</span>
 <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
 <span class="token comment">// 在这个⽅法中就可以去关联数据库了，当前我们先把⽤户信息配置在内存中</span>
 <span class="token comment">// 实例化⼀个⽤户对象(相当于数据表中的⼀条⽤户记录)</span>
 <span class="token class-name">UserDetails</span> user <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span><span class="token string">&quot;admin&quot;</span><span class="token punctuation">,</span><span class="token string">&quot;123456&quot;</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 auth<span class="token punctuation">.</span><span class="token function">inMemoryAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">withUser</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span>passwordEncoder<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试</p><p>获取token：http://localhost:9999/oauth/token?client_secret=abcxyz&amp;grant_</p><p>type=password&amp;username=admin&amp;password=123456&amp;client_id=client_lagou</p><p>endpoint：/oauth/token</p><p>获取token携带的参数</p><p>client_id：客户端id</p><p>client_secret：客户单密码</p><p>grant_type：指定使⽤哪种颁发类型，password</p><p>username：⽤户名</p><p>password：密码</p><ul><li><p><strong>资源服务器（希望访问被认证的微服务）Resource Server配置</strong></p></li><li><p>资源服务配置类</p></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Configuration</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>builders<span class="token punctuation">.</span></span><span class="token class-name">HttpSecurity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span></span><span class="token class-name">EnableWebSecurity</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>config<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">SessionCreationPolicy</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span></span><span class="token class-name">EnableResourceServer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span></span><span class="token class-name">ResourceServerConfigurerAdapter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>web<span class="token punctuation">.</span>configurers<span class="token punctuation">.</span></span><span class="token class-name">ResourceServerSecurityConfigurer</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>provider<span class="token punctuation">.</span>token<span class="token punctuation">.</span></span><span class="token class-name">RemoteTokenServices</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Configuration</span>
<span class="token annotation punctuation">@EnableResourceServer</span> <span class="token comment">// 开启资源服务器功能</span>
<span class="token annotation punctuation">@EnableWebSecurity</span> <span class="token comment">// 开启web访问安全</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ResourceServerConfigurer</span> <span class="token keyword">extends</span> <span class="token class-name">ResourceServerConfigurerAdapter</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 该⽅法⽤于定义资源服务器向远程认证服务器发起请求，进⾏token校验等事宜
     *
     * <span class="token keyword">@param</span> <span class="token parameter">resources</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">ResourceServerSecurityConfigurer</span> resources<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
<span class="token comment">//        super.configure(resources);</span>

        <span class="token comment">// 1、设置当前资源服务的资源id</span>
        resources<span class="token punctuation">.</span><span class="token function">resourceId</span><span class="token punctuation">(</span><span class="token string">&quot;autodeliver&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 2、定义token服务对象（token校验就应该靠token服务对象）</span>
        <span class="token class-name">RemoteTokenServices</span> remoteTokenServices <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">RemoteTokenServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 校验端点/接⼝设置</span>
        remoteTokenServices<span class="token punctuation">.</span><span class="token function">setCheckTokenEndpointUrl</span><span class="token punctuation">(</span><span class="token string">&quot;http://localhost:9999/oauth/check_token&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        remoteTokenServices<span class="token punctuation">.</span><span class="token function">setClientId</span><span class="token punctuation">(</span><span class="token string">&quot;client_lagou&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        remoteTokenServices<span class="token punctuation">.</span><span class="token function">setClientSecret</span><span class="token punctuation">(</span><span class="token string">&quot;abcxyz&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        resources<span class="token punctuation">.</span><span class="token function">tokenServices</span><span class="token punctuation">(</span>remoteTokenServices<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 场景：⼀个服务中可能有很多资源（API接⼝）
     * 某⼀些API接⼝，需要先认证，才能访问
     * 某⼀些API接⼝，压根就不需要认证，本来就是对外开放的接⼝
     * 我们就需要对不同特点的接⼝区分对待（在当前configure⽅法中完成），设置是否需要经过认证
     *
     * <span class="token keyword">@param</span> <span class="token parameter">http</span>
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Exception</span></span>
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">HttpSecurity</span> http<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
<span class="token comment">//        super.configure(http);</span>
        http
                <span class="token comment">// 设置session的创建策略（根据需要创建即可）</span>
                <span class="token punctuation">.</span><span class="token function">sessionManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">sessionCreationPolicy</span><span class="token punctuation">(</span><span class="token class-name">SessionCreationPolicy</span><span class="token punctuation">.</span><span class="token constant">IF_REQUIRED</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">and</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">authorizeRequests</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/autoDeliver/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">// autodeliver为前缀的请求需要认证</span>
                <span class="token punctuation">.</span><span class="token function">antMatchers</span><span class="token punctuation">(</span><span class="token string">&quot;/demo/**&quot;</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token comment">// demo为前缀的请求需要认证</span>
                <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">permitAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">// 其他请求不认证</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>思考：当我们第⼀次登陆之后，认证服务器颁发token并将其存储在认证服务器中，后期我们访问资源服务器时会携带token，资源服务器会请求认证服务器验证token有效性，如果资源服务器有很多，那么认证服务器压⼒会</p><p>很⼤.......</p><p>另外，资源服务器向认证服务器check_token，获取的也是⽤户信息 UserInfo，能否把⽤户信息存储到令牌中，让客户端⼀直持有这个令牌，令牌的验证也在资源服务器进行，这样避免和认证服务器频繁的交互......</p><p>我们可以考虑使用 JWT 进行改造，使⽤JWT机制之后资源服务器不需要访问认证服务器......</p><hr><h3 id="_3-3-4-jwt-改造统一认证授权中心的令牌存储机制" tabindex="-1"><a class="header-anchor" href="#_3-3-4-jwt-改造统一认证授权中心的令牌存储机制" aria-hidden="true">#</a> <strong>3.3.4 JWT 改造统⼀认证授权中心的令牌存储机制</strong></h3><p><strong>JWT令牌介绍</strong></p><p>通过上边的测试我们发现，当资源服务和授权服务不在⼀起时资源服务使用 RemoteTokenServices 远程请求授权 服务验证token，如果访问量较大将会影响系统的性能。</p><p>解决上边问题： 令牌采⽤JWT格式即可解决上边的问题，⽤户认证通过会得到⼀个 JWT令牌，JWT令牌中已经包括了用户相关的信 息，客户端只需要携带JWT访问资源服务，资源服务根据事先约定的算法自行完成令牌校验，无需每次都请求认证 服务完成授权。</p><p>1）什么是JWT？</p><p>JSON Web Token（JWT）是⼀个开放的⾏业标准（RFC 7519），它定义了⼀种简介的、自包含的协议格式，用于 在通信双⽅传递json对象，传递的信息经过数字签名可以被验证和信任。JWT可以使⽤HMAC算法或使⽤RSA的公 钥/私钥对来签名，防止被篡改。</p><p>2）JWT令牌结构</p><p>JWT令牌由三部分组成，每部分中间使⽤点（.）分隔，比如：xxxxx.yyyyy.zzzzz</p><ul><li><strong>Header</strong></li></ul><p>头部包括令牌的类型（即JWT）及使⽤的哈希算法（如HMAC SHA256或 RSA），例如</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token punctuation">{</span>
 <span class="token string">&quot;alg&quot;</span><span class="token operator">:</span> <span class="token string">&quot;HS256&quot;</span><span class="token punctuation">,</span>
 <span class="token string">&quot;typ&quot;</span><span class="token operator">:</span> <span class="token string">&quot;JWT&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将上边的内容使用Base64Url编码，得到⼀个字符串就是JWT令牌的第⼀部分。</p><ul><li><strong>Payload</strong></li></ul><p>第⼆部分是负载，内容也是⼀个json对象，它是存放有效信息的地⽅，它可以存放jwt提供的现成字段，比如：iss（签发者）,exp（过期时间戳）, sub（⾯向的⽤户）等，也可⾃定义字段。 此部分不建议存放敏感信息，因为此部分可以解码还原原始内容。 最后将第⼆部分负载使⽤Base64Url编码，得到⼀个字符串就是JWT令牌的第⼆部分。 ⼀个例⼦：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token punctuation">{</span>
 <span class="token string">&quot;sub&quot;</span><span class="token operator">:</span> <span class="token string">&quot;1234567890&quot;</span><span class="token punctuation">,</span>
 <span class="token string">&quot;name&quot;</span><span class="token operator">:</span> <span class="token string">&quot;John Doe&quot;</span><span class="token punctuation">,</span>
 <span class="token string">&quot;iat&quot;</span><span class="token operator">:</span> <span class="token number">1516239022</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>Signature</strong></li></ul><p>第三部分是签名，此部分用于防止jwt内容被篡改。 这个部分使用base64url将前两部分进⾏编码，编码后使⽤点（.）连接组成字符串，最后使用header中声明签名算法进行签名。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token function">HMACSHA256</span><span class="token punctuation">(</span>
 <span class="token function">base64UrlEncode</span><span class="token punctuation">(</span>header<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;.&quot;</span> <span class="token operator">+</span>
 <span class="token function">base64UrlEncode</span><span class="token punctuation">(</span>payload<span class="token punctuation">)</span><span class="token punctuation">,</span>
 secret<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>base64UrlEncode(header)：jwt令牌的第⼀部分。</p><p>base64UrlEncode(payload)：jwt令牌的第⼆部分。</p><p>secret：签名所使⽤的密钥。</p><p><strong>认证服务器端 JWT 改造(改造主配置类)</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">/*
 该⽅法⽤于创建tokenStore对象（令牌存储对象）
 token以什么形式存储
  */</span>
 <span class="token keyword">public</span> <span class="token class-name">TokenStore</span> <span class="token function">tokenStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
 <span class="token comment">//return new InMemoryTokenStore();</span>
 <span class="token comment">// 使⽤jwt令牌</span>
 <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">JwtTokenStore</span><span class="token punctuation">(</span><span class="token function">jwtAccessTokenConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>

 <span class="token doc-comment comment">/**
 * 返回jwt令牌转换器（帮助我们⽣成jwt令牌的）
 * 在这⾥，我们可以把签名密钥传递进去给转换器对象
 * <span class="token keyword">@return</span>
 */</span>
 <span class="token keyword">public</span> <span class="token class-name">JwtAccessTokenConverter</span> <span class="token function">jwtAccessTokenConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token class-name">JwtAccessTokenConverter</span> jwtAccessTokenConverter <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">JwtAccessTokenConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 jwtAccessTokenConverter<span class="token punctuation">.</span><span class="token function">setSigningKey</span><span class="token punctuation">(</span>sign_key<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 签名密钥</span>
 jwtAccessTokenConverter<span class="token punctuation">.</span><span class="token function">setVerifier</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MacSigner</span><span class="token punctuation">(</span>sign_key<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 验证时使⽤的密钥，和签名密钥保持⼀致</span>
 <span class="token keyword">return</span> jwtAccessTokenConverter<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>修改 JWT 令牌服务方法</p><p><img src="`+i+`" alt="1699027151075"></p><p><strong>资源服务器校验 JWT 令牌</strong></p><p>不需要和远程认证服务器交互，添加本地tokenStore</p><div class="language-JAVA line-numbers-mode" data-ext="JAVA"><pre class="language-JAVA"><code>package com.lagou.edu.config;
import org.springframework.context.annotation.Configuration;
import
org.springframework.security.config.annotation.web.builders.HttpSecurity;
import
org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import
org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.jwt.crypto.sign.MacSigner;
import org.springframework.security.jwt.crypto.sign.RsaVerifier;
import org.springframework.security.jwt.crypto.sign.SignatureVerifier;
import
org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import
org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import
org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import
org.springframework.security.oauth2.provider.token.RemoteTokenServices;
import
org.springframework.security.oauth2.provider.token.TokenStore;
import
org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import
org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableResourceServer // 开启资源服务器功能
@EnableWebSecurity // 开启web访问安全
public class ResourceServerConfiger extends ResourceServerConfigurerAdapter {
 private String sign_key = &quot;lagou123&quot;; // jwt签名密钥
/**
 * 该⽅法⽤于定义资源服务器向远程认证服务器发起请求，进⾏token校验等事宜
 * @param resources
 * @throws Exception
 */
 @Override
 public void configure(ResourceServerSecurityConfigurer resources) throws Exception {
 /*// 设置当前资源服务的资源id
 resources.resourceId(&quot;autodeliver&quot;);
 // 定义token服务对象（token校验就应该靠token服务对象）
 RemoteTokenServices remoteTokenServices = new RemoteTokenServices();
 // 校验端点/接⼝设置
 
remoteTokenServices.setCheckTokenEndpointUrl(&quot;http://localhost:9999/oauth/check_token&quot;);
 // 携带客户端id和客户端安全码
 remoteTokenServices.setClientId(&quot;client_lagou&quot;);
 remoteTokenServices.setClientSecret(&quot;abcxyz&quot;);
 // 别忘了这⼀步
 resources.tokenServices(remoteTokenServices);*/
 // jwt令牌改造
 
resources.resourceId(&quot;autodeliver&quot;).tokenStore(tokenStore()).stateless(true);// ⽆状态设置
 }
 /**
 * 场景：⼀个服务中可能有很多资源（API接⼝）
 * 某⼀些API接⼝，需要先认证，才能访问
 * 某⼀些API接⼝，压根就不需要认证，本来就是对外开放的接⼝
 * 我们就需要对不同特点的接⼝区分对待（在当前configure⽅法中完成），设置是否需要经过认证
 * @param http
 * @throws Exception
 */
 @Override
 public void configure(HttpSecurity http) throws Exception {
 http // 设置session的创建策略（根据需要创建即可）
 .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
 .and()
 .authorizeRequests()
 .antMatchers(&quot;/autodeliver/**&quot;).authenticated() //autodeliver为前缀的请求需要认证
 .antMatchers(&quot;/demo/**&quot;).authenticated() // demo为前缀的请求需要认证
 .anyRequest().permitAll(); // 其他请求不认证
 }
    
 /*
 该⽅法⽤于创建tokenStore对象（令牌存储对象）
 token以什么形式存储
 */
 public TokenStore tokenStore(){
 //return new InMemoryTokenStore();
 // 使⽤jwt令牌
 return new JwtTokenStore(jwtAccessTokenConverter());
 }
    
 /**
 * 返回jwt令牌转换器（帮助我们⽣成jwt令牌的）
 * 在这⾥，我们可以把签名密钥传递进去给转换器对象
 * @return
 */
 public JwtAccessTokenConverter jwtAccessTokenConverter() {
 JwtAccessTokenConverter jwtAccessTokenConverter = new JwtAccessTokenConverter();
 jwtAccessTokenConverter.setSigningKey(sign_key); // 签名密钥
 jwtAccessTokenConverter.setVerifier(new MacSigner(sign_key)); // 验证时使⽤的密钥，和签名密钥保持⼀致
return jwtAccessTokenConverter;
 }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-5-从数据库加载-oauth2-客户端信息" tabindex="-1"><a class="header-anchor" href="#_3-3-5-从数据库加载-oauth2-客户端信息" aria-hidden="true">#</a> <strong>3.3.5</strong> <strong>从数据库加载 Oauth2 客户端信息</strong></h3><ul><li>创建数据表并初始化数据（表名及字段保持固定）</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for oauth_client_details
-- ----------------------------
DROP TABLE IF EXISTS \`oauth_client_details\`;
CREATE TABLE \`oauth_client_details\` (
 \`client_id\` varchar(48) NOT NULL,
 \`resource_ids\` varchar(256) DEFAULT NULL,
 \`client_secret\` varchar(256) DEFAULT NULL,
 \`scope\` varchar(256) DEFAULT NULL,
 \`authorized_grant_types\` varchar(256) DEFAULT NULL,
 \`web_server_redirect_uri\` varchar(256) DEFAULT NULL,
 \`authorities\` varchar(256) DEFAULT NULL,
 \`access_token_validity\` int(11) DEFAULT NULL,
 \`refresh_token_validity\` int(11) DEFAULT NULL,
 \`additional_information\` varchar(4096) DEFAULT NULL,
 \`autoapprove\` varchar(256) DEFAULT NULL,
 PRIMARY KEY (\`client_id\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- ----------------------------
-- Records of oauth_client_details
-- ----------------------------
BEGIN;
INSERT INTO \`oauth_client_details\` VALUES (&#39;client_lagou123&#39;,
&#39;autodeliver,resume&#39;, &#39;abcxyz&#39;, &#39;all&#39;, &#39;password,refresh_token&#39;,
NULL, NULL, 7200, 259200, NULL, NULL);
COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>配置数据源</strong></li></ul><div class="language-MYSQL line-numbers-mode" data-ext="MYSQL"><pre class="language-MYSQL"><code>server:
 port: 9999
Spring:
 application:
 name: lagou-cloud-oauth-server
 datasource:
 driver-class-name: com.mysql.jdbc.Driver
 url: jdbc:mysql://localhost:3306/oauth2?useUnicode=true&amp;characterEncoding=utf-8&amp;useSSL=false&amp;allowMultiQueries=true
 username: root
 password: 123456
 druid:
 initialSize: 10
 minIdle: 10
 maxActive: 30
 maxWait: 50000
eureka:
 client:
 serviceUrl: # eureka server的路径
 defaultZone:
http://lagoucloudeurekaservera:8761/eureka/,http://lagoucloudeureka
serverb:8762/eureka/ #把 eureka 集群中的所有 url 都填写了进来，也可以只写⼀台，因为各个 eureka server 可以同步注册表
 instance:
 #使⽤ip注册，否则会使⽤主机名注册了（此处考虑到对⽼版本的兼容，新版本经过实验都是ip）
 prefer-ip-address: true
 #⾃定义实例显示格式，加上版本号，便于多版本管理，注意是ip-address，早期版本是ipAddress
 instance-id: \${spring.cloud.client.ipaddress}:\${spring.application.name}:\${server.port}:@project.version@
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>认证服务器主配置类改造</li></ul><div class="language-JAVA line-numbers-mode" data-ext="JAVA"><pre class="language-JAVA"><code>@Autowired
 private DataSource dataSource;
 /**
 * 客户端详情配置，
 * ⽐如client_id，secret
 * 当前这个服务就如同QQ平台，拉勾⽹作为客户端需要qq平台进⾏登录授权认证等，提前需要到QQ平台注册，QQ平台会给拉勾⽹
 * 颁发client_id等必要参数，表明客户端是谁
 * @param clients
 * @throws Exception
 */

 @Override
 public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
 super.configure(clients);
 // 从内存中加载客户端详情改为从数据库中加载客户端详情
clients.withClientDetails(createJdbcClientDetailsService());
 }

 @Bean
 public JdbcClientDetailsService createJdbcClientDetailsService() {
 JdbcClientDetailsService jdbcClientDetailsService = new JdbcClientDetailsService(dataSource);
 return jdbcClientDetailsService;
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-6-从数据库验证用户合法性" tabindex="-1"><a class="header-anchor" href="#_3-3-6-从数据库验证用户合法性" aria-hidden="true">#</a> <strong>3.3.6 从数据库验证用户合法性</strong></h3><ul><li>创建数据表users（表名不需固定），初始化数据</li></ul><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS \`users\`;
CREATE TABLE \`users\` (
 \`id\` int(11) NOT NULL AUTO_INCREMENT,
 \`username\` char(10) DEFAULT NULL,
 \`password\` char(100) DEFAULT NULL,
 PRIMARY KEY (\`id\`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO \`users\` VALUES (4, &#39;lagou-user&#39;, &#39;iuxyzds&#39;);
COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>操作数据表的JPA配置以及针对该表的操作的Dao接⼝此处省略....</p></li><li><p>开发UserDetailsService接⼝的实现类，根据用户名从数据库加载⽤户信息</p></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>service</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>dao<span class="token punctuation">.</span></span><span class="token class-name">UsersRepository</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>pojo<span class="token punctuation">.</span></span><span class="token class-name">Users</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span></span><span class="token class-name">Autowired</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>core<span class="token punctuation">.</span>userdetails<span class="token punctuation">.</span></span><span class="token class-name">User</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>core<span class="token punctuation">.</span>userdetails<span class="token punctuation">.</span></span><span class="token class-name">UserDetails</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>core<span class="token punctuation">.</span>userdetails<span class="token punctuation">.</span></span><span class="token class-name">UserDetailsService</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>core<span class="token punctuation">.</span>userdetails<span class="token punctuation">.</span></span><span class="token class-name">UsernameNotFoundException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Service</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">ArrayList</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Service</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">JdbcUserDetailsService</span> <span class="token keyword">implements</span> <span class="token class-name">UserDetailsService</span> <span class="token punctuation">{</span>
 <span class="token annotation punctuation">@Autowired</span>
 <span class="token keyword">private</span> <span class="token class-name">UsersRepository</span> usersRepository<span class="token punctuation">;</span>
 <span class="token doc-comment comment">/**
 * 根据username查询出该⽤户的所有信息，封装成UserDetails类型的对象返回，⾄于密码，框架会⾃动匹配
 * <span class="token keyword">@param</span> <span class="token parameter">username</span>
 * <span class="token keyword">@return</span>
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">UsernameNotFoundException</span></span>
 */</span>
 <span class="token annotation punctuation">@Override</span>
 <span class="token keyword">public</span> <span class="token class-name">UserDetails</span> <span class="token function">loadUserByUsername</span><span class="token punctuation">(</span><span class="token class-name">String</span> username<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">UsernameNotFoundException</span> <span class="token punctuation">{</span>
 <span class="token class-name">Users</span> users <span class="token operator">=</span> usersRepository<span class="token punctuation">.</span><span class="token function">findByUsername</span><span class="token punctuation">(</span>username<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">User</span><span class="token punctuation">(</span>users<span class="token punctuation">.</span><span class="token function">getUsername</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>users<span class="token punctuation">.</span><span class="token function">getPassword</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用自定义的用户详情服务对象</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Autowired</span>
<span class="token keyword">private</span> <span class="token class-name">JdbcUserDetailsService</span> jdbcUserDetailsService<span class="token punctuation">;</span>
<span class="token doc-comment comment">/**
* 处理⽤户名和密码验证事宜
* 1）客户端传递username和password参数到认证服务器
* 2）⼀般来说，username和password会存储在数据库中的⽤户表中
* 3）根据⽤户表中数据，验证当前传递过来的⽤户信息的合法性
*/</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">configure</span><span class="token punctuation">(</span><span class="token class-name">AuthenticationManagerBuilder</span> auth<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Exception</span> <span class="token punctuation">{</span>
 <span class="token comment">// 在这个⽅法中就可以去关联数据库了，当前我们先把⽤户信息配置在内存中</span>
 <span class="token comment">// 实例化⼀个⽤户对象(相当于数据表中的⼀条⽤户记录)</span>
 <span class="token comment">/*UserDetails user = new User(&quot;admin&quot;,&quot;123456&quot;,new ArrayList&lt;&gt;());
 auth.inMemoryAuthentication()
 .withUser(user).passwordEncoder(passwordEncoder);*/</span>
 
auth<span class="token punctuation">.</span><span class="token function">userDetailsService</span><span class="token punctuation">(</span>jdbcUserDetailsService<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">passwordEncoder</span><span class="token punctuation">(</span>passwordEncoder<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-3-7-基于-oauth2-的-jwt-令牌信息扩展" tabindex="-1"><a class="header-anchor" href="#_3-3-7-基于-oauth2-的-jwt-令牌信息扩展" aria-hidden="true">#</a> <strong>3.3.7</strong> <strong>基于 Oauth2 的 JWT 令牌信息扩展</strong></h3><p>OAuth2帮我们⽣成的JWT令牌载荷部分信息有限，关于⽤户信息只有⼀个 user_name，有些场景下我们希望放⼊⼀些扩展信息项，⽐如，之前我们经常向 session中存⼊userId，或者现在我希望在JWT的载荷部分存⼊当时请求令牌的客户端IP，客户端携带令牌访问资源服务时，可以对⽐当前请求的客户端真实IP和令牌中存放的客户端IP是否匹配，不匹配拒绝请求，以此进⼀步提⾼安全性。那么如何在 OAuth2环境下向JWT令牌中存如扩展信息？</p><ul><li>认证服务器⽣成JWT令牌时存⼊扩展信息（⽐如clientIp）继承DefaultAccessTokenConverter类，重写convertAccessToken⽅法存入扩展信息</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">OAuth2AccessToken</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>provider<span class="token punctuation">.</span></span><span class="token class-name">OAuth2Authentication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>provider<span class="token punctuation">.</span>token<span class="token punctuation">.</span></span><span class="token class-name">DefaultAccessTokenConverter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>context<span class="token punctuation">.</span>request<span class="token punctuation">.</span></span><span class="token class-name">RequestContextHolder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>context<span class="token punctuation">.</span>request<span class="token punctuation">.</span></span><span class="token class-name">ServletRequestAttributes</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LagouAccessTokenConvertor</span> <span class="token keyword">extends</span> <span class="token class-name">DefaultAccessTokenConverter</span> <span class="token punctuation">{</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">convertAccessToken</span><span class="token punctuation">(</span><span class="token class-name">OAuth2AccessToken</span> token<span class="token punctuation">,</span><span class="token class-name">OAuth2Authentication</span> authentication<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token comment">// 获取到request对象</span>
 <span class="token class-name">HttpServletRequest</span> request <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">ServletRequestAttributes</span><span class="token punctuation">)</span>
<span class="token punctuation">(</span><span class="token class-name">RequestContextHolder</span><span class="token punctuation">.</span><span class="token function">getRequestAttributes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token comment">// 获取客户端ip（注意：如果是经过代理之后到达当前服务的话，那么这种⽅式获取的并不是真实的浏览器客户端ip）</span>
 <span class="token class-name">String</span> remoteAddr <span class="token operator">=</span> request<span class="token punctuation">.</span><span class="token function">getRemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> stringMap <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">)</span>
<span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">convertAccessToken</span><span class="token punctuation">(</span>token<span class="token punctuation">,</span> authentication<span class="token punctuation">)</span><span class="token punctuation">;</span>
 stringMap<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;clientIp&quot;</span><span class="token punctuation">,</span>remoteAddr<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token keyword">return</span> stringMap<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将自定义的转换器对象注入</p><p><img src="`+l+`" alt="1699028853923"></p><h3 id="_3-3-8-资源服务器取出-jwt-令牌扩展信息" tabindex="-1"><a class="header-anchor" href="#_3-3-8-资源服务器取出-jwt-令牌扩展信息" aria-hidden="true">#</a> <strong>3.3.8</strong> <strong>资源服务器取出</strong> <strong>JWT</strong> <strong>令牌扩展信息</strong></h3><p>资源服务器也需要⾃定义⼀个转换器类，继承DefaultAccessTokenConverter，重写extractAuthentication提取⽅法，把载荷信息设置到认证对象的details属性中。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu<span class="token punctuation">.</span>config</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>common<span class="token punctuation">.</span></span><span class="token class-name">OAuth2AccessToken</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>provider<span class="token punctuation">.</span></span><span class="token class-name">OAuth2Authentication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span>
<span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>oauth2<span class="token punctuation">.</span>provider<span class="token punctuation">.</span>token<span class="token punctuation">.</span></span><span class="token class-name">DefaultAccessTokenConverter</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>stereotype<span class="token punctuation">.</span></span><span class="token class-name">Component</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>context<span class="token punctuation">.</span>request<span class="token punctuation">.</span></span><span class="token class-name">RequestContextHolder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>context<span class="token punctuation">.</span>request<span class="token punctuation">.</span></span><span class="token class-name">ServletRequestAttributes</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>servlet<span class="token punctuation">.</span>http<span class="token punctuation">.</span></span><span class="token class-name">HttpServletRequest</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token class-name">Map</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@Component</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">LagouAccessTokenConvertor</span> <span class="token keyword">extends</span> <span class="token class-name">DefaultAccessTokenConverter</span> <span class="token punctuation">{</span>
 <span class="token annotation punctuation">@Override</span>
 <span class="token keyword">public</span> <span class="token class-name">OAuth2Authentication</span> <span class="token function">extractAuthentication</span><span class="token punctuation">(</span><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token operator">?</span><span class="token punctuation">&gt;</span></span> map<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token class-name">OAuth2Authentication</span> oAuth2Authentication <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">extractAuthentication</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>
 oAuth2Authentication<span class="token punctuation">.</span><span class="token function">setDetails</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 将map放⼊认证对象中，认证对象在controller中可以拿到</span>
 <span class="token keyword">return</span> oAuth2Authentication<span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将⾃定义的转换器对象注⼊</p><p><img src="`+u+`" alt="1699029697589"></p><p>业务类⽐如Controller类中，可以通过 SecurityContextHolder.getContext().getAuthentication()获取到认证对象，进⼀步获取到扩展信息</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">Object</span> details <span class="token operator">=</span>
<span class="token class-name">SecurityContextHolder</span><span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAuthentication</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getDetails</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>获取到扩展信息后，就可以做其他的处理了，⽐如根据userId进⼀步处理，或者根据clientIp处理，或者其他都是可以的了。</p><h3 id="_3-3-9-其他" tabindex="-1"><a class="header-anchor" href="#_3-3-9-其他" aria-hidden="true">#</a> <strong>3.3.9</strong> <strong>其他</strong></h3><p>关于JWT令牌我们需要注意</p><ul><li>JWT令牌就是⼀种可以被验证的数据组织格式，它的玩法很灵活，我们这⾥是基于Spring Cloud Oauth2 创建、校验JWT令牌</li><li>我们也可以自己写⼯具类⽣成、校验JWT令牌</li><li>JWT令牌中不要存放过于敏感的信息，因为我们知道拿到令牌后，我们可以解码看到载荷部分的信息</li><li>JWT令牌每次请求都会携带，内容过多，会增加⽹络带宽占用</li></ul>`,149),d=[k];function v(m,b){return s(),a("div",null,d)}const h=n(r,[["render",v],["__file","63.html.vue"]]);export{h as default};
