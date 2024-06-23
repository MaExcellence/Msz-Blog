import{_ as n,o as s,c as a,a as t}from"./app-ad70bc3c.js";const e="/msz-blog/assets/1698757482036-142621d1.png",p="/msz-blog/assets/1698759618649-38bb85f3.png",l={},c=t('<h2 id="_6-1-分布式配置中心应用场景" tabindex="-1"><a class="header-anchor" href="#_6-1-分布式配置中心应用场景" aria-hidden="true">#</a> <strong>6.1</strong> <strong>分布式配置中心应用场景</strong></h2><p>往往，我们使⽤配置⽂件管理⼀些配置信息，⽐如application.yml **单体应⽤架构，**配置信息的管理、维护并不会显得特别麻烦，⼿动操作就可以，因为就⼀个⼯程；</p><p>**微服务架构，**因为我们的分布式集群环境中可能有很多个微服务，我们不可能⼀个⼀个去修改配置然后重启⽣效，在⼀定场景下我们还需要在运⾏期间动态调整配置信息，⽐如：根据各个微服务的负载情况，动态调整数据源连接池大小，我们希望配置内容发⽣变化的时候，微服务可以自动更新。</p><p>场景总结如下：</p><p>1）集中配置管理，⼀个微服务架构中可能有成百上千个微服务，所以集中配置管理是很重要的（⼀次修改、到处⽣效）</p><p>2）不同环境不同配置，比如数据源配置在不同环境（开发dev,测试test,⽣产prod） 中是不同的</p><p>3）运行期间可动态调整。例如，可根据各个微服务的负载情况，动态调整数据源连接池大小等配置修改后可⾃动更新</p><p>4）如配置内容发生变化，微服务可以自动更新配置。那么，我们就需要对配置文件进行<strong>集中式管理</strong>，这也是分布式配置中心的作用。</p><hr><h2 id="_6-2-spring-cloud-config" tabindex="-1"><a class="header-anchor" href="#_6-2-spring-cloud-config" aria-hidden="true">#</a> <strong>6.2 Spring Cloud Config</strong></h2><h3 id="_6-2-1-config-简介" tabindex="-1"><a class="header-anchor" href="#_6-2-1-config-简介" aria-hidden="true">#</a> <strong>6.2.1 Config 简介</strong></h3><p>Spring Cloud Config是⼀个分布式配置管理方案，包含了 Server端和 Client端两个部分。</p><p><img src="'+e+`" alt="1698757482036"></p><ul><li><p>Server 端：提供配置⽂件的存储、以接口的形式将配置⽂件的内容提供出去，通过使用@EnableConfigServer注解在 Spring boot 应用中非常简单的嵌入</p></li><li><p>Client 端：通过接口获取配置数据并初始化自己的应用</p></li></ul><hr><h3 id="_6-2-2-config-分布式配置应用" tabindex="-1"><a class="header-anchor" href="#_6-2-2-config-分布式配置应用" aria-hidden="true">#</a> <strong>6.2.2 Config 分布式配置应用</strong></h3><p>说明： Config Server 是集中式的配置服务，用于集中管理应用程序各个环境下的配置。 默认使用 Git 存储配置文件内容，也可以 SVN 。</p><p>比如，我们要对“简历微服务”的application.yml进⾏管理（区分开发环境、测试环境、生产环境）</p><p>1）登录码云，创建项⽬lagou-config-repo</p><p>2）上传yml配置⽂件，命名规则如下：</p><p>{application}-{profile}.yml 或者 {application}-{profile}.properties 其中，application为应⽤名称，profile指的是环境（⽤于区分开发环境，测试环境、生产环境等）</p><p>示例：lagou-service-resume-dev.yml、lagou-service-resume-test.yml、lagou-service-resume-prod.yml</p><p>3）构建Config Server统⼀配置中心</p><p>新建SpringBoot工程，引⼊依赖坐标（需要注册⾃⼰到Eureka）</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token prolog">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span>
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
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>lagou-config1<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
 <span class="token comment">&lt;!--eureka client 客户端依赖引⼊--&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-netflix-eurekaclient<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
     
 <span class="token comment">&lt;!--config配置中⼼服务端--&gt;</span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-config-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>project</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>配置启动类，使用注解@EnableConfigServer开启配置中心服务器功能</strong></p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">package</span> <span class="token namespace">com<span class="token punctuation">.</span>lagou<span class="token punctuation">.</span>edu</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span></span><span class="token class-name">SpringApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>autoconfigure<span class="token punctuation">.</span></span><span class="token class-name">SpringBootApplication</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>client<span class="token punctuation">.</span>discovery<span class="token punctuation">.</span></span><span class="token class-name">EnableDiscoveryClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>config<span class="token punctuation">.</span>server<span class="token punctuation">.</span></span><span class="token class-name">EnableConfigServer</span></span><span class="token punctuation">;</span>

<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableDiscoveryClient</span>
<span class="token annotation punctuation">@EnableConfigServer</span> <span class="token comment">// 开启配置服务器功能</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">ConfigApp9006</span> <span class="token punctuation">{</span>
 <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
 	<span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">ConfigApp9003</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>args<span class="token punctuation">)</span><span class="token punctuation">;</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>application.yml配置</strong></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
 <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">9006</span>
<span class="token comment">#注册到Eureka服务中⼼</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
 <span class="token key atrule">client</span><span class="token punctuation">:</span>
 <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
 <span class="token comment"># 注册到集群，就把多个Eurekaserver地址使⽤逗号连接起来即可；注册到单实例（⾮集群模式），那就写⼀个就ok</span>
 <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span>
http<span class="token punctuation">:</span>//LagouCloudEurekaServerA<span class="token punctuation">:</span>8761/eureka<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//LagouCloudEurekaServerB<span class="token punctuation">:</span>8762/eureka
 <span class="token key atrule">instance</span><span class="token punctuation">:</span>
 <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment">#服务实例中显示ip，⽽不是显示主机名（兼容⽼的eureka版本）</span>
 <span class="token comment"># 实例名称： 192.168.1.103:lagou-service-resume:8080，我们可以⾃定义它</span>
 <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.cloud.client.ipaddress<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>server.port<span class="token punctuation">}</span><span class="token punctuation">:</span>@project.version@
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
 <span class="token key atrule">application</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> lagou<span class="token punctuation">-</span>service<span class="token punctuation">-</span>autodeliver
 <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
 <span class="token key atrule">config</span><span class="token punctuation">:</span>
 <span class="token key atrule">server</span><span class="token punctuation">:</span>
 <span class="token key atrule">git</span><span class="token punctuation">:</span>
 <span class="token key atrule">uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/5173098004/lagou<span class="token punctuation">-</span>config<span class="token punctuation">-</span>repo.git
<span class="token comment">#配置git服务地址</span>
 <span class="token key atrule">username</span><span class="token punctuation">:</span> 517309804@qq.com <span class="token comment">#配置git⽤户名</span>
 <span class="token key atrule">password</span><span class="token punctuation">:</span> yingdian12341 <span class="token comment">#配置git密码</span>
 <span class="token key atrule">search-paths</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> lagou<span class="token punctuation">-</span>config<span class="token punctuation">-</span>repo
 <span class="token comment"># 读取分⽀</span>
 <span class="token key atrule">label</span><span class="token punctuation">:</span> master
<span class="token comment">#针对的被调⽤⽅微服务名称,不加就是全局⽣效</span>
<span class="token comment">#lagou-service-resume:</span>
<span class="token comment"># ribbon:</span>
<span class="token comment"># NFLoadBalancerRuleClassName:</span>
com.netflix.loadbalancer.RoundRobinRule <span class="token comment">#负载策略调整</span>
<span class="token comment"># springboot中暴露健康检查等断点接⼝</span>
<span class="token key atrule">management</span><span class="token punctuation">:</span>
 <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
 <span class="token key atrule">web</span><span class="token punctuation">:</span>
 <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
 <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">&quot;*&quot;</span>
 <span class="token comment"># 暴露健康接⼝的细节</span>
 <span class="token key atrule">endpoint</span><span class="token punctuation">:</span>
 <span class="token key atrule">health</span><span class="token punctuation">:</span>
 <span class="token key atrule">show-details</span><span class="token punctuation">:</span> always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>测试访问：http://localhost:9006/master/lagou-service-resume-dev.yml，查看到配置⽂件内容</p><p>4）<strong>构建Client客户端（在已有简历微服务基础上）已有工程中添加依赖坐标</strong></p><p><strong>已有工程中添加依赖坐标</strong></p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-config-client<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>application.yml修改为bootstrap.yml配置⽂件</strong></p><p>bootstrap.yml是系统级别的，优先级⽐application.yml⾼，应⽤启动时会检查这个配置⽂件，在这个配置⽂件中指定配置中⼼的服务地址，会⾃动拉取所有应⽤配置并且启用。</p><p>（主要是把与统⼀配置中⼼连接的配置信息放到bootstrap.yml）</p><p>注意：需要统⼀读取的配置信息，从集中配置中⼼获取 bootstrap.yml</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
 <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">8080</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
 <span class="token key atrule">application</span><span class="token punctuation">:</span>
 <span class="token key atrule">name</span><span class="token punctuation">:</span> lagou<span class="token punctuation">-</span>service<span class="token punctuation">-</span>resume
 <span class="token key atrule">datasource</span><span class="token punctuation">:</span>
 <span class="token key atrule">driver-class-name</span><span class="token punctuation">:</span> com.mysql.jdbc.Driver
 <span class="token key atrule">url</span><span class="token punctuation">:</span> jdbc<span class="token punctuation">:</span>mysql<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>3306/lagou<span class="token punctuation">?</span>useUnicode=true<span class="token important">&amp;characterEncoding=utf8</span>
 <span class="token key atrule">username</span><span class="token punctuation">:</span> root
 <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token number">123456</span>
 <span class="token key atrule">jpa</span><span class="token punctuation">:</span>
 <span class="token key atrule">database</span><span class="token punctuation">:</span> MySQL
 <span class="token key atrule">show-sql</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
 <span class="token key atrule">hibernate</span><span class="token punctuation">:</span>
 <span class="token key atrule">naming</span><span class="token punctuation">:</span>
 <span class="token key atrule">physical-strategy</span><span class="token punctuation">:</span>
org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
<span class="token comment">#避免将驼峰命名转换为下划线命名</span>
 <span class="token key atrule">cloud</span><span class="token punctuation">:</span>
 <span class="token comment"># config客户端配置,和ConfigServer通信，并告知ConfigServer希望获取的配置信息在哪个⽂件中</span>
 <span class="token key atrule">config</span><span class="token punctuation">:</span>
 <span class="token key atrule">name</span><span class="token punctuation">:</span> lagou<span class="token punctuation">-</span>service<span class="token punctuation">-</span>resume <span class="token comment">#配置⽂件名称</span>
 <span class="token key atrule">profile</span><span class="token punctuation">:</span> dev <span class="token comment">#后缀名称</span>
 <span class="token key atrule">label</span><span class="token punctuation">:</span> master <span class="token comment">#分⽀名称</span>
 <span class="token key atrule">uri</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span><span class="token number">9006</span> <span class="token comment">#ConfigServer配置中心地址</span>
<span class="token comment">#注册到Eureka服务中⼼</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
 <span class="token key atrule">client</span><span class="token punctuation">:</span>
 <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
 <span class="token comment"># 注册到集群，就把多个Eurekaserver地址使⽤逗号连接起来即可；注册到单实例（⾮集群模式），那就写⼀个就ok</span>
 <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span>
http<span class="token punctuation">:</span>//LagouCloudEurekaServerA<span class="token punctuation">:</span>8761/eureka<span class="token punctuation">,</span>http<span class="token punctuation">:</span>//LagouCloudEurekaServerB<span class="token punctuation">:</span>8762/eureka
 <span class="token key atrule">instance</span><span class="token punctuation">:</span>
 <span class="token key atrule">prefer-ip-address</span><span class="token punctuation">:</span> <span class="token boolean important">true</span> <span class="token comment">#服务实例中显示ip，⽽不是显示主机名（兼容⽼的eureka版本）</span>
 <span class="token comment"># 实例名称： 192.168.1.103:lagou-service-resume:8080，我们可以⾃定义它</span>
 <span class="token key atrule">instance-id</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>spring.cloud.client.ipaddress<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>spring.application.name<span class="token punctuation">}</span><span class="token punctuation">:</span>$<span class="token punctuation">{</span>server.port<span class="token punctuation">}</span><span class="token punctuation">:</span>@project.version@
 <span class="token comment"># ⾃定义Eureka元数据</span>
 <span class="token key atrule">metadata-map</span><span class="token punctuation">:</span>
 <span class="token key atrule">cluster</span><span class="token punctuation">:</span> cl1
 <span class="token key atrule">region</span><span class="token punctuation">:</span> rn1
<span class="token key atrule">management</span><span class="token punctuation">:</span>
 <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
 <span class="token key atrule">web</span><span class="token punctuation">:</span>
 <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
 <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">&quot;*&quot;</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="_6-3-config-配置手动刷新" tabindex="-1"><a class="header-anchor" href="#_6-3-config-配置手动刷新" aria-hidden="true">#</a> <strong>6.3 Config 配置手动刷新</strong></h2><p>不用重启微服务，只需要⼿动的做⼀些其他的操作（访问⼀个地址/refresh）刷新，之后再访问即可此时，客户端取到了配置中心的值，但当我们修改GitHub上面的值时，服务端 （Config Server）能实时获取最新的值，但客户端（Config Client）读的是缓存，</p><p>⽆法实时获取最新值。Spring Cloud已 经为我们解决了这个问题，那就是客户端使用post去触发refresh，获取最新数据。</p><p>1）Client客户端添加依赖springboot-starter-actuator（已添加）</p><p>2）Client客户端bootstrap.yml中添加配置（暴露通信端点）</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">management</span><span class="token punctuation">:</span>
 <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
 <span class="token key atrule">web</span><span class="token punctuation">:</span>
 <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
 <span class="token key atrule">include</span><span class="token punctuation">:</span> refresh
 
也可以暴露所有的端⼝
<span class="token key atrule">management</span><span class="token punctuation">:</span>
 <span class="token key atrule">endpoints</span><span class="token punctuation">:</span>
 <span class="token key atrule">web</span><span class="token punctuation">:</span>
 <span class="token key atrule">exposure</span><span class="token punctuation">:</span>
 <span class="token key atrule">include</span><span class="token punctuation">:</span> <span class="token string">&quot;*&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）Client客户端使⽤到配置信息的类上添加@RefreshScope</p><p>4）⼿动向Client客户端发起POST请求，http://localhost:8080/actuator/refresh， 刷新配置信息</p><p><strong>注意：手动刷新方式避免了服务重启（流程：Git 改配置 —&gt;for 循环脚本⼿动刷新每个微服务）</strong></p><p>思考：可否使用⼴播机制，⼀次通知，处处生效，方便大范围配置刷新？</p><hr><h2 id="_6-4-config-配置自动更新" tabindex="-1"><a class="header-anchor" href="#_6-4-config-配置自动更新" aria-hidden="true">#</a> <strong>6.4 Config 配置自动更新</strong></h2><p>实现⼀次通知处处生效拉勾内部做分布式配置，用的是zk（存储+通知），zk中数据变更，可以通知各个监听的客户端，客户端收到通知之后可以做出相应的操作（内存级别的数据直接生效，对于数据库连接信息、连接池等信息变化更新的，那么会在通知逻辑中进行处理，比如重新初始化连接池）</p><p>在微服务架构中，我们可以结合消息总线（Bus）实现分布式配置的⾃动更新（Spring Cloud Config+Spring Cloud Bus）</p><h3 id="_6-4-1-消息总线-bus" tabindex="-1"><a class="header-anchor" href="#_6-4-1-消息总线-bus" aria-hidden="true">#</a> <strong>6.4.1 消息总线 Bus</strong></h3><p>所谓消息总线Bus，即我们经常会使⽤MQ消息代理构建⼀个共⽤的Topic，通过这个Topic连接各个微服务实例，MQ⼴播的消息会被所有在注册中⼼的微服务实例监听和消费。<strong>换言之就是通过⼀个主题连接各个微服务，打通脉络</strong>。</p><p>Spring Cloud Bus（基于MQ的，⽀持RabbitMq/Kafka） 是Spring Cloud中的消息总线方案，Spring Cloud Config + Spring Cloud Bus 结合可以实现配置信息的自动更新。</p><p><img src="`+p+`" alt="1698759618649"></p><h3 id="_6-4-2-spring-cloud-config-spring-cloud-bus-实现自动刷新" tabindex="-1"><a class="header-anchor" href="#_6-4-2-spring-cloud-config-spring-cloud-bus-实现自动刷新" aria-hidden="true">#</a> <strong>6.4.2 Spring Cloud Config+Spring Cloud Bus</strong> <strong>实现自动刷新</strong></h3><p>MQ消息代理，我们还选择使⽤RabbitMQ，ConfigServer和ConfigClient都添加都消息总线的⽀持以及与RabbitMq的连接信息</p><p>1）Config Server服务端添加消息总线⽀持</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-bus-amqp<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2）ConfigServer添加配置</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>spring:
 rabbitmq:
 host: 127.0.0.1
 port: 5672
 username: guest
 password: guest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3）微服务暴露端口</p><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code>management:
 endpoints:
 web:
 exposure:
 include: bus-refresh
 
建议暴露所有的端⼝
management:
 endpoints:
 web:
 exposure:
 include: &quot;*&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4）重启各个服务，更改配置之后，向配置中心服务端发送post请求 http://localhost:9003/actuator/bus-refresh，各个客户端配置即可自动刷新 。</p><p>在广播模式下实现了⼀次请求，处处更新，如果我只想定向更新呢？</p><p>在发起刷新请求的时候http://localhost:9006/actuator/bus-refresh/lagou-service-resume:8081</p><p>即为最后面跟上要定向刷新的实例的 <strong>服务名:端口号</strong>即可</p>`,69),o=[c];function i(u,r){return s(),a("div",null,o)}const k=n(l,[["render",i],["__file","46.html.vue"]]);export{k as default};
