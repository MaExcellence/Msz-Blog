import{_ as l,o as i,c as e,a as o}from"./app-ad70bc3c.js";const n="/msz-blog/assets/666668-7a3dc95c.png",a="/msz-blog/assets/1701700769395-345dfddd.png",t="/msz-blog/assets/1701704010599-36066744.png",s="/msz-blog/assets/1701780708440-acecf99d.png",r="/msz-blog/assets/1701781731119-15f8908e.png",p="/msz-blog/assets/1701781852372-1f3ca4ae.png",d="/msz-blog/assets/1701781911595-d8d9fcd3.png",g="/msz-blog/assets/1701787395084-ee76b65e.png",u="/msz-blog/assets/1701789076570-ceb15d38.png",c="/msz-blog/assets/1701789776064-bb5d56b5.png",b="/msz-blog/assets/1701790856139-2c170a02.png",h="/msz-blog/assets/1701790943950-0db4a79a.png",m="/msz-blog/assets/1701791219216-46ec96f5.png",f="/msz-blog/assets/1701791569150-86675be6.png",B="/msz-blog/assets/1701791733776-edb4f6fe.png",S="/msz-blog/assets/1701791767478-f18d7d5d.png",L="/msz-blog/assets/1701791896130-51f5fc40.png",_="/msz-blog/assets/1701792203155-40ac8fc6.png",M={},y=o('<h2 id="第1节-mysql-体系架构" tabindex="-1"><a class="header-anchor" href="#第1节-mysql-体系架构" aria-hidden="true">#</a> 第1节 MySQL 体系架构</h2><p>服务器进程对客户端进程发送的请求做了什么处理，才能产生最后的处理结果呢？这里以查询请求为例展示：</p><p><img src="'+n+'" alt="1701700769395"></p><p>下面具体展开看一下：</p><p><img src="'+a+`" alt="1701700769395"></p><p><strong>分析(可以将其细分为)：</strong></p><ul><li>连接层（connectors）</li><li>服务层（Connection Pool；Management Services &amp; Utilities；SQL Interface；Parser；Optimizer；Caches &amp; Buffers）</li><li>引擎层（Pluggable Storage Engines）</li><li>存储层（File system；Files &amp; Logs）</li></ul><h3 id="第一层-连接层" tabindex="-1"><a class="header-anchor" href="#第一层-连接层" aria-hidden="true">#</a> 第一层：连接层</h3><p><strong>1、Connectors 客户端连接层</strong></p><p>​ 1.系统（客户端）访问 MySQL 服务器前，做的第一件事就是建立 TCP 连接。</p><p>​ 2.经过三次握手建立连接成功后，MySQL服务器对 TCP 传输过来的账号密码做身份认证、权限获取。</p><p>​ 3.用户名或密码不对，会收到一个Access denied for user错误，客户端程序结束执行。</p><p>​ 4.用户名密码认证通过，会从权限表查出账号拥有的权限与连接关联，之后的权限判断逻辑，都将依赖于此时读到的权限</p><p>​ 5.TCP 连接收到请求后，必须要分配给一个线程专门与这个客户端的交互。所以还会有个线程池，去走后面的流程。每一个连接从线程池中获取线程，省去了创建和销毁线程的开销。</p><h3 id="第二层-服务层" tabindex="-1"><a class="header-anchor" href="#第二层-服务层" aria-hidden="true">#</a> 第二层：服务层</h3><p><strong>1.Connection Pool 连接池</strong></p><ul><li>主要负责存储和管理客户端与数据库的连接信息，连接池里的一个线程负责管理一个客户端到数据库的连接信息。</li><li>负责监听对 MySQL Server 的各种请求，接收TCP连接请求，转发所有连接请求到线程管理模块。每一个连接上 MySQL Server 的客户端请求都会被分配（或创建）一个连接线程为其单独服务。而连接线程的主要工作就是负责 MySQL Server 与客户端的通信，接受客户端的命令请求，传递 Server 端的结果信息等。</li><li>线程池则负责管理维护这些连接线程。包括线程的创建，线程的 cache 等。每一个连接都从线程池中获取线程，省去了创建和销毁线程的开销。</li></ul><p><strong>2.SQL Interface SQL接口</strong></p><ul><li>接收用户的SQL命令，并且返回用户需要查询的结果。比如SELECT ... FROM就是调用SQLInterface。</li><li>MySQL支持DML（数据操作语言）、DDL（数据定义语言）、存储过程、视图、触发器、自定义函数等多种SQL语言接口。</li></ul><p><strong>3.Parser 解析器</strong></p><ul><li>在解析器中对SQL语句进行语法分析、语义分析。将SQL语句分解成数据结构，并将这个结构传递到后续步骤，以后SQL语句的传递和处理就是基于这个结构的。如果在分解构成中遇到错误，那么就说明这个SQL语句是不合理的。</li><li>在SQL命令传递到解析器的时候会被解析器验证和解析，并为其创建语法树，并根据数据字典丰富查询语法树，会验证该客户端是否具有执行该查询的权限。创建好语法树后，MySQL还会对SQl查询进行语法上的优化，进行查询重写。</li></ul><p><strong>4.Optimizer 查询优化器</strong></p><ul><li>SQL语句在语法解析之后、查询之前会使用查询优化器确定SQL语句的执行路径，生成一个《执行计划》。</li><li>这个执行计划表明应该《使用哪些索引》进行查询（全表检索还是使用索引检索），表之间的连接顺序如何，最后会按照执行计划中的步骤调用存储引擎提供的方法来真正的执行查询，并将查询结果返回给用户。</li><li>它使用“ 选取-投影-连接 ”策略进行查询。例如：</li></ul><p>SELECT id,name FROM student WHERE gender = &#39;女&#39;;</p><p>这个SELECT查询先根据WHERE语句进行《选取》，而不是将表全部查询出来以后再进行gender过滤。这个SELECT查询先根据id和name进行属性《投影》，而不是将属性全部取出以后再进行过滤，将这两个查询条件《连接》起来生成最终查询结果。</p><p><strong>5.Caches &amp; Buffers 查询缓存组件</strong></p><ul><li>MySQL内部维持着一些Cache和Buffer，比如Query Cache用来缓存一条SELECT语句的执行结果，如果能够在其中找到对应的查询结果，那么就不必再进行查询解析、优化和执行的整个过程了，直接将结果反馈给客户端。</li><li>这个缓存机制是由一系列小缓存组成的。比如表缓存，记录缓存，key缓存，权限缓存等 。</li><li>这个查询缓存可以在《不同客户端之间共享》。</li><li>从MySQL 5.7.20开始，不推荐使用查询缓存，并在 MySQL 8.0中删除。</li></ul><h3 id="第三层-引擎层" tabindex="-1"><a class="header-anchor" href="#第三层-引擎层" aria-hidden="true">#</a> 第三层：引擎层</h3><ul><li>插件式存储引擎层（Storage Engines），真正的负责了MySQL中数据的存储和提取，对物理服务器级别维护的底层数据执行操作，服务器通过API与存储引擎进行通信。不同的存储引擎具有的功能不同，这样我们可以根据自己的实际需要进行选取。</li></ul><h3 id="第四层-存储层" tabindex="-1"><a class="header-anchor" href="#第四层-存储层" aria-hidden="true">#</a> 第四层：存储层</h3><p>​ 所有的数据，数据库、表的定义，表的每一行的内容，索引，都是存在 文件系统 上，以 文件 的方式存在的，并完成与存储引擎的交互。主要包含日志文件，数据文件，配置文件，pid 文件，socket 文件等。当然有些存储引擎比如InnoDB，也支持不使用文件系统直接管理裸设备，但现代文件系统的实现使得这样做没有必要了。在文件系统之下，可以使用本地磁盘，可以使用 DAS、NAS、SAN等各种存储系统。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>SELECT id,name FROM student WHERE gender = &#39;女&#39;; 

小故事： 

如果我问你9+8×16-3×2×17的值是多少，你可能会用计算器去算一下，最终结果35。如果再问你一遍9+8×16- 
3×2×17的值是多少，你还用再傻呵呵的再算一遍吗？我们刚刚已经算过了，直接说答案就好了。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>日志文件</strong></p><ul><li><p>错误日志（Error log）</p><p>默认开启，show variables like &#39;%log_error%&#39;</p></li><li><p>通用查询日志（General query log）</p><p>记录一般查询语句，show variables like &#39;%general%&#39;;</p></li><li><p>二进制日志（binary log）</p><p>记录了对MySQL数据库执行的更改操作，并且记录了语句的发生时间、执行时长；但是它不</p><p>记录select、show等不修改数据库的SQL。主要用于数据库恢复和主从复制。</p><p>show variables like &#39;%log_bin%&#39;; //是否开启</p><p>show variables like &#39;%binlog%&#39;; //参数查看</p><p>show binary logs;//查看日志文件</p></li><li><p>慢查询日志（Slow query log）</p><p>记录所有执行时间超时的查询SQL，默认是10秒。</p><p>show variables like &#39;%slow_query%&#39;; //是否开启</p><p>show variables like &#39;%long_query_time%&#39;; //时长</p></li></ul><p><strong>配置文件</strong></p><ul><li>用于存放MySQL所有的配置信息文件，比如my.cnf、my.ini等。</li></ul><p><strong>数据文件</strong></p><ul><li>db.opt 文件：记录这个库的默认使用的字符集和校验规则。</li><li>frm 文件：存储与表相关的元数据（meta）信息，包括表结构的定义信息等，每一张表都会有一个frm 文件。</li><li>MYD 文件：MyISAM 存储引擎专用，存放 MyISAM 表的数据（data)，每一张表都会有一个 .MYD 文件。</li><li>MYI 文件：MyISAM 存储引擎专用，存放 MyISAM 表的索引相关信息，每一张 MyISAM 表对应一个 .MYI 文件。</li><li>ibd文件和 IBDATA 文件：存放 InnoDB 的数据文件（包括索引）。InnoDB 存储引擎有两种表空间方式：独享表空间和共享表空间。独享表空间使用 .ibd 文件来存放数据，且每一张 InnoDB 表对应一个 .ibd 文件。共享表空间使用 .ibdata 文件，所有表共同使用一个（或多个，自行配置）.ibdata 文件。</li><li>ibdata1 文件：系统表空间数据文件，存储表元数据、Undo日志等 。</li><li>ib_logfile0、ib_logfile1 文件：Redo log 日志文件。</li></ul><p><strong>pid 文件</strong></p><ul><li>pid 文件是 mysqld 应用程序在 Unix/Linux 环境下的一个进程文件，和许多其他 Unix/Linux 服务端程序一样，它存放着自己的进程 id。</li></ul><p><strong>socket 文件</strong></p><ul><li>socket 文件也是在 Unix/Linux 环境下才有的，用户在 Unix/Linux 环境下客户端连接可以不通过 TCP/IP 网络而直接使用 Unix Socket 来连接 MySQL。</li></ul><hr><h2 id="第2节-mysql-运行机制" tabindex="-1"><a class="header-anchor" href="#第2节-mysql-运行机制" aria-hidden="true">#</a> 第2节 MySQL 运行机制</h2><p><img src="`+t+'" alt="1701704010599"></p><p><strong>①建立连接（Connectors&amp;Connection Pool）</strong></p><p>​ 通过客户端/服务器通信协议与MySQL建立连接。MySQL 客户端与服务端的通信方式是 “ 半双工 ”。对于每一个 MySQL 的连接，时刻都有一个线程状态来标识这个连接正在做什么。</p><p>通讯机制：</p><ul><li>全双工：能同时发送和接收数据，例如平时打电话。</li><li>半双工：指的某一时刻，要么发送数据，要么接收数据，不能同时。例如早期对讲机</li><li>单工：只能发送数据或只能接收数据。例如单行道</li></ul><p>线程状态：</p><p>show processlist; //查看用户正在运行的线程信息，root用户能查看所有线程，其他用户只能看自己的</p><ul><li><p>id：线程ID，可以使用kill xx；</p></li><li><p>user：启动这个线程的用户</p></li><li><p>Host：发送请求的客户端的IP和端口号</p></li><li><p>db：当前命令在哪个库执行</p></li><li><p>Command：该线程正在执行的操作命令</p><ul><li>Create DB：正在创建库操作</li><li>Drop DB：正在删除库操作</li><li>Execute：正在执行一个PreparedStatement</li><li>Close Stmt：正在关闭一个PreparedStatement</li><li>Query：正在执行一个语句</li><li>Sleep：正在等待客户端发送语句</li><li>Quit：正在退出</li><li>Shutdown：正在关闭服务器</li><li>Time：表示该线程处于当前状态的时间，单位是秒</li></ul></li><li><p>State：线程状态</p><ul><li>Updating：正在搜索匹配记录，进行修改</li><li>Sleeping：正在等待客户端发送新请求</li><li>Starting：正在执行请求处理</li><li>Checking table：正在检查数据表</li><li>Closing table : 正在将表中数据刷新到磁盘中</li><li>Locked：被其他查询锁住了记录</li><li>Sending Data：正在处理Select查询，同时将结果发送给客户端</li></ul></li><li><p>Info：一般记录线程执行的语句，默认显示前100个字符。想查看完整的使用show full processlist;</p></li></ul><hr><p><strong>②查询缓存（Cache&amp;Buffer）</strong></p><p>​ 这是MySQL的一个可优化查询的地方，如果开启了查询缓存且在查询缓存过程中查询到完全相同的SQL语句，则将查询结果直接返回给客户端；如果没有开启查询缓存或者没有查询到完全相同的 SQL 语句则会由解析器进行语法语义解析，并生成“解析树”。</p><ul><li>缓存Select查询的结果和SQL语句</li><li>执行Select查询时，先查询缓存，判断是否存在可用的记录集，要求是否完全相同（包括参数值），这样才会匹配缓存数据命中。</li><li>即使开启查询缓存，以下SQL也不能缓存 <ul><li>查询语句使用SQL_NO_CACHE</li><li>查询的结果大于query_cache_limit设置</li><li>查询中有一些不确定的参数，比如now()</li></ul></li><li>show variables like &#39;%query_cache%&#39;; //查看查询缓存是否启用，空间大小，限制等</li><li>show status like &#39;Qcache%&#39;; //查看更详细的缓存参数，可用缓存空间，缓存块，缓存多少等</li></ul><hr><p><strong>③解析器（Parser）</strong></p><p>​ 解析器将客户端发送的SQL进行语法解析，生成&quot;解析树&quot;。预处理器根据一些MySQL 规则进一步检查“解析树”是否合法，例如这里将检查数据表和数据列是否存在，还会解析名字和别名，看看它们是否有歧义，最后生成新的“解析树”。</p><hr><p><strong>④查询优化器（Optimizer）</strong></p><p>​ 根据“解析树”生成最优的执行计划。MySQL使用很多优化策略生成最优的执行计划，可以分为两类：静态优化（编译时优化）、动态优化（运行时优化）。</p><ul><li><p>等价变换策略</p><ul><li>5=5 and a&gt;5 改成 a &gt; 5</li><li>a &lt; b and a=5 改成b&gt;5 and a=5</li><li>基于联合索引，调整条件位置等</li></ul></li><li><p>优化count、min、max等函数</p><ul><li>InnoDB引擎min函数只需要找索引最左边</li><li>InnoDB引擎max函数只需要找索引最右边</li><li>MyISAM引擎count(*)，不需要计算，直接返回</li></ul></li><li><p>提前终止查询</p><ul><li>使用了limit查询，获取limit所需的数据，就不在继续遍历后面数据</li></ul></li><li><p>in的优化</p><ul><li>MySQL对in查询，会先进行排序，再采用二分法查找数据。比如where id in (2,1,3)，变成 in (1,2,3)</li></ul></li></ul><hr><p><strong>⑤查询执行引擎负责执行 SQL 语句</strong></p><p>​ 此时查询执行引擎会根据 SQL 语句中表的存储引擎类型，以及对应的API接口与底层存储引擎缓存或者物理文件的交互，得到查询结果并返回给客户端。若开启用查询缓存，这时会将SQL 语句和结果完整地保存到查询缓存（Cache&amp;Buffer）中，以后若有相同的 SQL 语句执行则直接返回结果。</p><ul><li>如果开启了查询缓存，先将查询结果做缓存操作</li><li>返回结果过多，采用增量模式返回</li></ul><hr><h2 id="第3节-mysql-存储引擎" tabindex="-1"><a class="header-anchor" href="#第3节-mysql-存储引擎" aria-hidden="true">#</a> 第3节 MySQL 存储引擎</h2><p>​ 存储引擎在MySQL的体系架构中位于第三层，负责MySQL中的数据的存储和提取，是与文件打交道的子系统，它是根据MySQL提供的文件访问层抽象接口定制的一种文件访问机制，这种机制就叫作存储引擎。</p><p>​ 使用<strong>show engines</strong>命令，就可以查看当前数据库支持的引擎信息。</p><p><img src="'+s+'" alt="1701780708440"></p><p>在5.5版本之前默认采用MyISAM存储引擎，从5.5开始采用InnoDB存储引擎。</p><ul><li>InnoDB：支持事务，具有提交，回滚和崩溃恢复能力，事务安全</li><li>MyISAM：不支持事务和外键，访问速度快</li><li>Memory：利用内存创建表，访问速度非常快，因为数据在内存，而且默认使用Hash索引，但是一旦关闭，数据就会丢失</li><li>Archive：归档类型引擎，仅能支持insert和select语句</li><li>Csv：以CSV文件进行数据存储，由于文件限制，所有列必须强制指定not null，另外CSV引擎也不支持索引和分区，适合做数据交换的中间表</li><li>BlackHole: 黑洞，只进不出，进来消失，所有插入数据都不会保存</li><li>Federated：可以访问远端MySQL数据库中的表。一个本地表，不保存数据，访问远程表内容。</li><li>MRG_MyISAM：一组MyISAM表的组合，这些MyISAM表必须结构相同，Merge表本身没有数据，对Merge操作可以对一组MyISAM表进行操作。</li></ul><h3 id="_3-1-innodb-和-myisam-对比" tabindex="-1"><a class="header-anchor" href="#_3-1-innodb-和-myisam-对比" aria-hidden="true">#</a> 3.1 InnoDB 和 MyISAM 对比</h3><p>InnoDB和MyISAM是使用MySQL时最常用的两种引擎类型，我们重点来看下两者区别。</p><ul><li><p>事务和外键</p><ul><li>InnoDB支持事务和外键，具有安全性和完整性，适合大量insert或update操作</li><li>MyISAM不支持事务和外键，它提供高速存储和检索，适合大量的select查询操作</li></ul></li><li><p>锁机制</p><ul><li>InnoDB支持行级锁，锁定指定记录。基于索引来加锁实现。</li><li>MyISAM支持表级锁，锁定整张表。</li></ul></li><li><p>索引结构</p><ul><li>InnoDB使用聚集索引（聚簇索引），索引和记录在一起存储，既缓存索引，也缓存记录。</li><li>MyISAM使用非聚集索引（非聚簇索引），索引和记录分开。</li></ul></li><li><p>并发处理能力</p><ul><li>MyISAM使用表锁，会导致写操作并发率低，读之间并不阻塞，读写阻塞。</li><li>InnoDB读写阻塞可以与隔离级别有关，可以采用多版本并发控制（MVCC）来支持高并发</li></ul></li><li><p>存储文件</p><ul><li>InnoDB表对应两个文件，一个.frm表结构文件，一个.ibd数据文件。InnoDB表最大支持64TB；</li><li>MyISAM表对应三个文件，一个.frm表结构文件，一个MYD表数据文件，一个.MYI索引文件。从 MySQL5.0开始默认限制是256TB。</li></ul></li><li><p>对于自增长的字段</p><ul><li>InnoDB中必须包含只有该字段的索引</li><li>MyISAM表中可以和其他字段一起建立联合索引</li></ul></li><li><p>清空整个表时</p><ul><li>InnoDB是一行一行的删除，效率非常慢。</li><li>MyISAM则会重建表</li></ul></li></ul><p><img src="'+r+'" alt="1701781731119"></p><p><strong>适用场景</strong></p><ul><li><strong>MyISAM</strong><ul><li>不需要事务支持（不支持）</li><li>并发相对较低（锁定机制问题）</li><li>数据修改相对较少，以读为主</li><li>数据一致性要求不高</li></ul></li><li><strong>InnoDB</strong><ul><li>需要事务支持（具有较好的事务特性）</li><li>行级锁定对高并发有很好的适应能力</li><li>数据更新较为频繁的场景</li><li>数据一致性要求较高</li><li>硬件设备内存较大，可以利用InnoDB较好的缓存能力来提高内存利用率，减少磁盘IO</li></ul></li><li>总结 <ul><li>两种引擎该如何选择？ <ul><li>是否需要事务？有，InnoDB</li><li>是否存在并发修改？有，InnoDB</li><li>是否追求快速查询，且数据修改少？是，MyISAM</li><li>在绝大多数情况下，推荐使用InnoDB</li></ul></li></ul></li></ul><p>扩展资料：各个存储引擎特性对比</p><p><img src="'+p+'" alt="1701781852372"></p><h3 id="_3-2-innodb-存储结构" tabindex="-1"><a class="header-anchor" href="#_3-2-innodb-存储结构" aria-hidden="true">#</a> 3.2 InnoDB 存储结构</h3><p>​ 从MySQL 5.5版本开始默认使用InnoDB作为引擎，它擅长处理事务，具有自动崩溃恢复的特性，在日常开发中使用非常广泛。下面是官方的InnoDB引擎架构图，主要分为内存结构和磁盘结构两大部分。</p><p><img src="'+d+`" alt="1701781911595"></p><h4 id="一、innodb-内存结构" tabindex="-1"><a class="header-anchor" href="#一、innodb-内存结构" aria-hidden="true">#</a> <strong>一、InnoDB 内存结构</strong></h4><p>内存结构主要包括Buffer Pool、Change Buffer、Adaptive Hash Index和Log Buffer四大组件。</p><ul><li><p>Buffer Pool：缓冲池，简称BP。BP以Page页为单位，默认大小16K，BP的底层采用链表数据结构管理Page。在InnoDB访问表记录和索引时会在Page页中缓存，以后使用可以减少磁盘IO操作，提升效率。</p><ul><li>Page管理机制 <ul><li>Page根据状态可以分为三种类型： <ul><li>free page ： 空闲page，未被使用</li><li>clean page：被使用page，数据没有被修改过</li><li>dirty page：脏页，被使用page，数据被修改过，页中数据和磁盘的数据产生了不一致</li></ul></li></ul></li></ul><p>针对上述三种page类型，InnoDB通过三种链表结构来维护和管理</p><ul><li>free list ：表示空闲缓冲区，管理free page</li><li>flush list：表示需要刷新到磁盘的缓冲区，管理dirty page，内部page按修改时间排序。脏页即存在于flush链表，也在LRU链表中，但是两种互不影响，LRU链表负责管理page的可用性和释放，而flush链表负责管理脏页的刷盘操作。</li><li>lru list：表示正在使用的缓冲区，管理clean page和dirty page，缓冲区以 midpoint 为基点，前面链表称为new列表区，存放经常访问的数据，占63%；后面的链表称为old列表区，存放使用较少数据，占37%。</li></ul></li><li><p>改进型LRU算法维护</p><ul><li>普通LRU：末尾淘汰法，新数据从链表头部加入，释放空间时从末尾淘汰</li><li>改性LRU：链表分为new和old两个部分，加入元素时并不是从表头插入，而是从中间 midpoint 位置插入，如果数据很快被访问，那么page就会向new列表头部移动，如果数据没有被访问，会逐步向old尾部移动，等待淘汰。</li></ul><p>每当有新的page数据读取到buffer pool时，InnoDb引擎会判断是否有空闲页，是否足够，如果有就将free page从free list列表删除，放入到LRU列表中。没有空闲页，就会根据LRU算法淘汰LRU链表默认的页，将内存空间释放分配给新的页。</p></li><li><p>Buffer Pool配置参数</p><ul><li>show variables like &#39;%innodb_page_size%&#39;; //查看page页大小</li><li>show variables like &#39;%innodb_old%&#39;; //查看lru list中old列表参数</li><li>show variables like &#39;%innodb_buffer%&#39;; //查看buffer pool参数</li><li>建议：将innodb_buffer_pool_size设置为总内存大小的60%-80%， innodb_buffer_pool_instances可以设置为多个，这样可以避免缓存争夺。</li></ul></li><li><p>Change Buffer：写缓冲区，简称CB。</p><ul><li>在进行DML操作时，如果BP没有其相应的Page数据，并不会立刻将磁盘页加载到缓冲池，而是在CB记录缓冲变更，等未来数据被读取时，再将数据合并恢复到BP中。</li><li>ChangeBuffer占用BufferPool空间，默认占25%，最大允许占50%，可以根据读写业务量来进行调整。参数innodb_change_buffer_max_size;</li><li>当更新一条记录时，该记录在BufferPool存在，直接在BufferPool修改，一次内存操作。如果该记录在BufferPool不存在（没有命中），会直接在ChangeBuffer进行一次内存操作，不用再去磁盘查询数据，避免一次磁盘IO。当下次查询记录时，会先进性磁盘读取，然后再从 ChangeBuffer中读取信息合并，最终载入BufferPool中。</li><li>写缓冲区，仅适用于非唯一普通索引页，为什么？ <ul><li>如果在索引设置唯一性，在进行修改时，InnoDB必须要做唯一性校验，因此必须查询磁盘，做一次IO操作。会直接将记录查询到BufferPool中，然后在缓冲池修改，不会在 ChangeBuffer操作。</li></ul></li><li>Adaptive Hash Index：自适应哈希索引，用于优化对BP数据的查询。InnoDB存储引擎会监控对表索引的查找，如果观察到建立哈希索引可以带来速度的提升，则建立哈希索引，所以称之为自适应。InnoDB存储引擎会自动根据访问的频率和模式来为某些页建立哈希索引。</li></ul></li><li><p>Log Buffer：日志缓冲区</p><ul><li>用来保存要写入磁盘上log文件（Redo/Undo）的数据，日志缓冲区的内容定期刷新到磁盘log文件中。日志缓冲区满时会自动将其刷新到磁盘，当遇到BLOB 或多行更新的大事务操作时，增加日志缓冲区可以节省磁盘I/O。</li><li>LogBuffer主要是用于记录InnoDB引擎日志，在DML操作时会产生Redo和Undo日志。</li><li>LogBuffer空间满了，会自动写入磁盘。可以通过将innodb_log_buffer_size参数调大，减少磁盘IO频率</li><li>innodb_flush_log_at_trx_commit参数控制日志刷新行为，默认为1 <ul><li>0 ： 每隔1秒写日志文件和刷盘操作（写日志文件LogBuffer--&gt;OS cache，刷盘OS cache--&gt;磁盘文件），最多丢失1秒数据</li><li>1：事务提交，立刻写日志文件和刷盘，数据不丢失，但是会频繁IO操作</li><li>2：事务提交，立刻写日志文件，每隔1秒钟进行刷盘操作</li></ul></li></ul></li></ul><h4 id="二、innodb-磁盘结构" tabindex="-1"><a class="header-anchor" href="#二、innodb-磁盘结构" aria-hidden="true">#</a> 二、InnoDB 磁盘结构</h4><p>InnoDB磁盘主要包含Tablespaces，InnoDB Data Dictionary，Doublewrite Buffer、Redo Log 和Undo Logs。</p><ul><li>表空间（Tablespaces）：用于存储表结构和数据。表空间又分为系统表空间、独立表空间、通用表空间、临时表空间、Undo表空间等多种类型； <ul><li>系统表空间（The System Tablespace） <ul><li>包含InnoDB数据字典，Doublewrite Buffer，Change Buffer，Undo Logs的存储区域。系统表空间也默认包含任何用户在系统表空间创建的表数据和索引数据。系统表空间是一个共享的表空间因为它是被多个表共享的。该空间的数据文件通过参数 innodb_data_file_path控制，默认值是ibdata1:12M:autoextend(文件名为ibdata1、12MB、自动扩展)。</li></ul></li><li>独立表空间（File-Per-Table Tablespaces） <ul><li>默认开启，独立表空间是一个单表表空间，该表创建于自己的数据文件中，而非创建于系统表空间中。当innodb_file_per_table选项开启时，表将被创建于表空间中。否则，innodb将被创建于系统表空间中。每个表文件表空间由一个.ibd数据文件代表，该文件默认被创建于数据库目录中。表空间的表文件支持动态（dynamic）和压缩（commpressed）行格式。</li></ul></li><li>通用表空间（General Tablespaces） <ul><li>通用表空间为通过create tablespace语法创建的共享表空间。通用表空间可以创建于 mysql 数据目录外的其他表空间，其可以容纳多张表，且其支持所有的行格式。</li></ul></li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>CREATE TABLESPACE ts1 ADD DATAFILE ts1.ibd Engine=InnoDB; //创建表空间ts1

CREATE TABLE t1 (c1 INT PRIMARY KEY) TABLESPACE ts1; //将表添加到ts1表空间
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><p>撤销表空间（Undo Tablespaces）</p><ul><li>撤销表空间由一个或多个包含Undo日志文件组成。在MySQL 5.7版本之前Undo占用的 是System Tablespace共享区，从5.7开始将Undo从System Tablespace分离了出来。 InnoDB使用的undo表空间由innodb_undo_tablespaces配置选项控制，默认为0。参数值为0表示使用系统表空间ibdata1;大于0表示使用undo表空间undo_001、undo_002等。</li></ul></li><li><p>临时表空间（Temporary Tablespaces）</p><ul><li>分为session temporary tablespaces 和global temporary tablespace两种。session temporary tablespaces 存储的是用户创建的临时表和磁盘内部的临时表。global temporary tablespace储存用户临时表的回滚段（rollback segments ）。mysql服务器正常关闭或异常终止时，临时表空间将被移除，每次启动时会被重新创建。</li></ul></li><li><p>数据字典（InnoDB Data Dictionary）</p><ul><li>InnoDB数据字典由内部系统表组成，这些表包含用于查找表、索引和表字段等对象的元数据。元数据物理上位于InnoDB系统表空间中。由于历史原因，数据字典元数据在一定程度上与InnoDB表元数据文件（.frm文件）中存储的信息重叠。</li></ul></li><li><p>双写缓冲区（Doublewrite Buffer）</p><ul><li>位于系统表空间，是一个存储区域。在BufferPage的page页刷新到磁盘真正的位置前，会先将数据存在Doublewrite 缓冲区。如果在page页写入过程中出现操作系统、存储子系统或mysqld进程崩溃，InnoDB可以在崩溃恢复期间从Doublewrite 缓冲区中找到页面的一个好备份。在大多数情况下，默认情况下启用双写缓冲区，要禁用Doublewrite 缓冲区，可以将 innodb_doublewrite设置为0。使用Doublewrite 缓冲区时建议将innodb_flush_method设置为O_DIRECT。</li></ul></li></ul><blockquote><p>MySQL的innodb_flush_method这个参数控制着innodb数据文件及redo log的打开、刷写模式。有三个值：fdatasync(默认)，O_DSYNC，O_DIRECT。设置O_DIRECT表示数据文件写入操作会通知操作系统不要缓存数据，也不要用预读，直接从Innodb Buffer写到磁盘文件。</p><p>默认的fdatasync意思是先写入操作系统缓存，然后再调用fsync()函数去异步刷数据文件与redo log的缓存信息。</p></blockquote><ul><li>重做日志（Redo Log） <ul><li>重做日志是一种基于磁盘的数据结构，用于在崩溃恢复期间更正不完整事务写入的数据。 MySQL以循环方式写入重做日志文件，记录InnoDB中所有对Buffer Pool修改的日志。当出现实例故障（像断电），导致数据未能更新到数据文件，则数据库重启时须redo，重新把数据更新到数据文件。读写事务在执行的过程中，都会不断的产生redo log。默认情况下，重做日志在磁盘上由两个名为ib_logfile0和ib_logfile1的文件物理表示。</li></ul></li><li>撤销日志（Undo Logs） <ul><li>撤消日志是在事务开始之前保存的被修改数据的备份，用于例外情况时回滚事务。撤消日志属于逻辑日志，根据每行记录进行记录。撤消日志存在于系统表空间、撤消表空间和临时表空间中。</li></ul></li></ul><h4 id="三、新版本结构演变" tabindex="-1"><a class="header-anchor" href="#三、新版本结构演变" aria-hidden="true">#</a> <strong>三、新版本结构演变</strong></h4><p><img src="`+g+'" alt="1701787395084"></p><p><strong>MySQL 5.7 版本</strong></p><ul><li>将 Undo日志表空间从共享表空间 ibdata 文件中分离出来，可以在安装 MySQL 时由用户自行指定文件大小和数量。</li><li>增加了 temporary 临时表空间，里面存储着临时表或临时查询结果集的数据。</li><li>Buffer Pool 大小可以动态修改，无需重启数据库实例。</li></ul><p><strong>MySQL 8.0 版本</strong></p><ul><li>将InnoDB表的数据字典和Undo都从共享表空间ibdata中彻底分离出来了，以前需要 ibdata中数据字典与独立表空间ibd文件中数据字典一致才行，8.0版本就不需要了。</li><li>temporary 临时表空间也可以配置多个物理文件，而且均为 InnoDB 存储引擎并能创建索引，这样加快了处理的速度。</li><li>用户可以像 Oracle 数据库那样设置一些表空间，每个表空间对应多个物理文件，每个表空间可以给多个表使用，但一个表只能存储在一个表空间中。</li><li>将Doublewrite Buffer从共享表空间ibdata中也分离出来了。</li></ul><h3 id="_3-3-innodb-线程模型" tabindex="-1"><a class="header-anchor" href="#_3-3-innodb-线程模型" aria-hidden="true">#</a> 3.3 InnoDB 线程模型</h3><p><img src="'+u+'" alt="1701789076570"></p><p><strong>IO Thread</strong></p><p>​ 在InnoDB中使用了大量的AIO（Async IO）来做读写处理，这样可以极大提高数据库的性能。在 InnoDB1.0版本之前共有4个IO Thread，分别是write，read，insert buffer和log thread，后来版本将read thread和write thread分别增大到了4个，一共有10个了。</p><blockquote><ul><li>read thread ： 负责读取操作，将数据从磁盘加载到缓存page页。4个</li><li>write thread：负责写操作，将缓存脏页刷新到磁盘。4个</li><li>log thread：负责将日志缓冲区内容刷新到磁盘。1个</li><li>insert buffer thread ：负责将写缓冲内容刷新到磁盘。1个</li></ul></blockquote><p><strong>Purge Thread</strong></p><blockquote><ul><li>事务提交之后，其使用的undo日志将不再需要，因此需要Purge Thread回收已经分配的undo 页。</li><li>show variables like &#39;%innodb_purge_threads%&#39;;</li></ul></blockquote><p><strong>Page Cleaner Thread</strong></p><blockquote><ul><li>作用是将脏数据刷新到磁盘，脏数据刷盘后相应的redo log也就可以覆盖，即可以同步数据，又能达到redo log循环使用的目的。会调用write thread线程处理。</li><li>show variables like &#39;%innodb_page_cleaners%&#39;;</li></ul></blockquote><p><strong>Master Thread</strong></p><blockquote><p>Master thread是InnoDB的主线程，负责调度其他各线程，优先级最高。作用是将缓冲池中的数据异步刷新到磁盘 ，保证数据的一致性。包含：脏页的刷新（page cleaner thread）、undo页回收（purge thread）、redo日志刷新（log thread）、合并写缓冲等。内部有两个主处理，分别是每隔1秒和10秒处理。</p><p><strong>每1秒的操作：</strong></p><ul><li>刷新日志缓冲区，刷到磁盘</li><li>合并写缓冲区数据，根据IO读写压力来决定是否操作</li><li>刷新脏页数据到磁盘，根据脏页比例达到75%才操作（innodb_max_dirty_pages_pct， innodb_io_capacity）</li></ul><p><strong>每10秒的操作：</strong></p><ul><li>刷新脏页数据到磁盘</li><li>合并写缓冲区数据</li><li>刷新日志缓冲区</li><li>删除无用的undo页</li></ul></blockquote><h3 id="_3-4-innodb数据文件" tabindex="-1"><a class="header-anchor" href="#_3-4-innodb数据文件" aria-hidden="true">#</a> 3.4 InnoDB数据文件</h3><h4 id="一、innodb文件存储结构" tabindex="-1"><a class="header-anchor" href="#一、innodb文件存储结构" aria-hidden="true">#</a> <strong>一、InnoDB文件存储结构</strong></h4><p><img src="'+c+'" alt="1701789776064"></p><p><strong>InnoDB数据文件存储结构：</strong></p><p>分为一个ibd数据文件--&gt;Segment（段）--&gt;Extent（区）--&gt;Page（页）--&gt;Row（行）</p><ul><li><p>Tablesapce</p><p>表空间，用于存储多个ibd数据文件，用于存储表的记录和索引。一个文件包含多个段。</p></li><li><p>Segment</p><p>段，用于管理多个Extent，分为数据段（Leaf node segment）、索引段（Non-leaf node segment）、回滚段（Rollback segment）。一个表至少会有两个segment，一个管理数据，一个管理索引。每多创建一个索引，会多两个segment。</p></li><li><p>Extent</p><p>区，一个区固定包含64个连续的页，大小为1M。当表空间不足，需要分配新的页资源，不会一页一页分，直接分配一个区。</p></li><li><p>Page</p><p>页，用于存储多个Row行记录，大小为16K。包含很多种页类型，比如数据页，undo页，系统页，事务数据页，大的BLOB对象页。</p></li><li><p>Row</p><p>行，包含了记录的字段值，事务ID（Trx id）、滚动指针（Roll pointer）、字段指针（Field pointers）等信息。</p><p>Page是文件最基本的单位，无论何种类型的page，都是由page header，page trailer和page body组成。如下图所示，</p><p><img src="'+b+'" alt="1701790856139"></p></li></ul><h4 id="二、innodb-文件存储格式" tabindex="-1"><a class="header-anchor" href="#二、innodb-文件存储格式" aria-hidden="true">#</a> 二、InnoDB 文件存储格式</h4><p><strong>通过</strong> <strong>SHOW TABLE STATUS</strong> <strong>命令</strong></p><p><img src="'+h+`" alt="1701790943950"></p><p>一般情况下，如果row_format为REDUNDANT、COMPACT，文件格式为Antelope；如果</p><p>row_format为DYNAMIC和COMPRESSED，文件格式为Barracuda。</p><ul><li><p>通过 information_schema 查看指定表的文件格式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>select * from information_schema.innodb_sys_tables;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h4 id="三、file-文件格式-file-format" tabindex="-1"><a class="header-anchor" href="#三、file-文件格式-file-format" aria-hidden="true">#</a> 三、File 文件格式（ File-Format）</h4><p>​ 在早期的InnoDB版本中，文件格式只有一种，随着InnoDB引擎的发展，出现了新文件格式，用于支持新的功能。目前InnoDB只支持两种文件格式：Antelope 和 Barracuda。</p><ul><li>Antelope: 先前未命名的，最原始的InnoDB文件格式，它支持两种行格式：COMPACT和 REDUNDANT，MySQL 5.6及其以前版本默认格式为Antelope。</li><li>Barracuda: 新的文件格式。它支持InnoDB的所有行格式，包括新的行格式：COMPRESSED 和 DYNAMIC</li></ul><p>通过innodb_file_format 配置参数可以设置InnoDB文件格式，之前默认值为Antelope，5.7版本开始改为Barracuda。</p><h4 id="四、row行格式-row-format" tabindex="-1"><a class="header-anchor" href="#四、row行格式-row-format" aria-hidden="true">#</a> 四、Row行格式（Row_format）</h4><p>​ 表的行格式决定了它的行是如何物理存储的，这反过来又会影响查询和DML操作的性能。如果在单个page页中容纳更多行，查询和索引查找可以更快地工作，缓冲池中所需的内存更少，写入更新时所需的I/O更少。</p><p>InnoDB存储引擎支持四种行格式：REDUNDANT、COMPACT、DYNAMIC和COMPRESSED。</p><p><img src="`+m+`" alt="1701791219216"></p><p>DYNAMIC和COMPRESSED新格式引入的功能有：数据压缩、增强型长列数据的页外存储和大索引前缀。</p><p>每个表的数据分成若干页来存储，每个页中采用B树结构存储；</p><p>如果某些字段信息过长，无法存储在B树节点中，这时候会被单独分配空间，此时被称为溢出页，该字段被称为页外列。</p><ul><li>REDUNDANT 行格式 <ul><li>使用REDUNDANT行格式，表会将变长列值的前768字节存储在B树节点的索引记录中，其余的存储在溢出页上。对于大于等于786字节的固定长度字段InnoDB会转换为变长字段，以便能够在页外存储。</li></ul></li><li>COMPACT 行格式 <ul><li>与REDUNDANT行格式相比，COMPACT行格式减少了约20%的行存储空间，但代价是增加了某些操作的CPU使用量。如果系统负载是受缓存命中率和磁盘速度限制，那么COMPACT格式可能更快。如果系统负载受到CPU速度的限制，那么COMPACT格式可能会慢一些。</li></ul></li><li>DYNAMIC 行格式 <ul><li>使用DYNAMIC行格式，InnoDB会将表中长可变长度的列值完全存储在页外，而索引记录只包含指向溢出页的20字节指针。大于或等于768字节的固定长度字段编码为可变长度字段。 DYNAMIC行格式支持大索引前缀，最多可以为3072字节，可通过innodb_large_prefix参数控制。</li></ul></li><li>COMPRESSED 行格式 <ul><li>COMPRESSED行格式提供与DYNAMIC行格式相同的存储特性和功能，但增加了对表和索引数据压缩的支持。</li></ul></li></ul><p>在创建表和索引时，文件格式都被用于每个InnoDB表数据文件（其名称与*.ibd匹配）。修改文件格式的方法是重新创建表及其索引，最简单方法是对要修改的每个表使用以下命令：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>ALTER TABLE 表名 ROW_FORMAT=格式类型;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_3-5-undo-log" tabindex="-1"><a class="header-anchor" href="#_3-5-undo-log" aria-hidden="true">#</a> 3.5 Undo Log</h3><p><strong>3.5.1 Undo Log 介绍</strong></p><ul><li>Undo：意为撤销或取消，以撤销操作为目的，返回指定某个状态的操作。</li><li>Undo Log：数据库事务开始之前，会将要修改的记录存放到 Undo 日志里，当事务回滚时或者数据库崩溃时，可以利用 Undo 日志，撤销未提交事务对数据库产生的影响。</li><li>Undo Log产生和销毁：Undo Log在事务开始前产生；事务在提交时，并不会立刻删除undo log，innodb会将该事务对应的undo log放入到删除列表中，后面会通过后台线程purge thread进行回收处理。Undo Log属于逻辑日志，记录一个变化过程。例如执行一个delete，undolog会记录一个insert；执行一个update，undolog会记录一个相反的update。</li><li>Undo Log存储：undo log采用段的方式管理和记录。在innodb数据文件中包含一种rollback</li><li>segment回滚段，内部包含1024个undo log segment。可以通过下面一组参数来控制Undo log存储。</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>show variables like &#39;%innodb_undo%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>3.5.2 Undo Log 作用</strong></p><ul><li>实现事务的原子性 <ul><li>Undo Log 是为了实现事务的原子性而出现的产物。事务处理过程中，如果出现了错误或者用户执行了 ROLLBACK 语句，MySQL 可以利用 Undo Log 中的备份将数据恢复到事务开始之前的状态。</li></ul></li><li>实现多版本并发控制（MVCC） <ul><li>Undo Log 在 MySQL InnoDB 存储引擎中用来实现多版本并发控制。事务未提交之前，Undo Log 保存了未提交之前的版本数据，Undo Log 中的数据可作为数据旧版本快照供其他并发事务进行快照读。</li></ul></li></ul><p><img src="`+f+'" alt="1701791569150"></p><p>事务A手动开启事务，执行更新操作，首先会把更新命中的数据备份到 Undo Buffer 中。</p><p>事务B手动开启事务，执行查询操作，会读取 Undo 日志数据返回，进行快照读</p><h3 id="_3-6-redo-log-和-binlog" tabindex="-1"><a class="header-anchor" href="#_3-6-redo-log-和-binlog" aria-hidden="true">#</a> <strong>3.6 Redo Log 和 Binlog</strong></h3><p>Redo Log和Binlog是MySQL日志系统中非常重要的两种机制，也有很多相似之处，下面介绍下两者细节和区别。</p><p><strong>3.6.1 Redo Log日志</strong></p><ul><li><p>Redo Log介绍</p><ul><li>Redo：顾名思义就是重做。以恢复操作为目的，在数据库发生意外时重现操作。</li><li>Redo Log：指事务中修改的任何数据，将最新的数据备份存储的位置（Redo Log），被称为重做日志。</li><li>Redo Log 的生成和释放：随着事务操作的执行，就会生成Redo Log，在事务提交时会将产生 Redo Log写入Log Buffer，并不是随着事务的提交就立刻写入磁盘文件。等事务操作的脏页写入到磁盘之后，Redo Log 的使命也就完成了，Redo Log占用的空间就可以重用（被覆盖写入）。</li></ul></li><li><p>Redo Log工作原理</p><ul><li>Redo Log 是为了实现事务的持久性而出现的产物。防止在发生故障的时间点，尚有脏页未写入表的 IBD 文件中，在重启 MySQL 服务的时候，根据 Redo Log 进行重做，从而达到事务的未入磁盘数据进行持久化这一特性。</li></ul></li></ul><p><img src="'+B+'" alt="1701791733776"></p><ul><li>Redo Log写入机制 <ul><li>Redo Log 文件内容是以顺序循环的方式写入文件，写满时则回溯到第一个文件，进行覆盖写。</li></ul></li></ul><p><img src="'+S+`" alt="1701791767478"></p><p>如图所示：</p><ul><li>write pos 是当前记录的位置，一边写一边后移，写到最后一个文件末尾后就回到 0 号文件开头；</li><li>checkpoint 是当前要擦除的位置，也是往后推移并且循环的，擦除记录前要把记录更新到数据文件；</li></ul><p>write pos 和 checkpoint 之间还空着的部分，可以用来记录新的操作。如果 write pos 追上 checkpoint，表示写满，这时候不能再执行新的更新，得停下来先擦掉一些记录，把 checkpoint 推进一下。</p><ul><li>Redo Log相关配置参数 <ul><li>每个InnoDB存储引擎至少有1个重做日志文件组（group），每个文件组至少有2个重做日志文件，默认为ib_logfile0和ib_logfile1。可以通过下面一组参数控制Redo Log存储：</li></ul></li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>show variables like &#39;%innodb_log%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Redo Buffer 持久化到 Redo Log 的策略，可通过 Innodb_flush_log_at_trx_commit 设置：</p><ul><li>0：每秒提交 Redo buffer -&gt;OS cache -&gt; flush cache to disk，可能丢失一秒内的事务数据。由后台Master线程每隔 1秒执行一次操作。</li><li>1（默认值）：每次事务提交执行 Redo Buffer -&gt; OS cache -&gt; flush cache to disk，最安全，性能最差的方式。</li><li>2：每次事务提交执行 Redo Buffer -&gt; OS cache，然后由后台Master线程再每隔1秒执行OS cache -&gt; flush cache to disk 的操作。</li></ul><p>一般建议选择取值2，因为 MySQL 挂了数据没有损失，整个服务器挂了才会损失1秒的事务提交数据</p><p><img src="`+L+'" alt="1701791896130"></p><p><strong>3.6.2 Binlog日志</strong></p><ul><li>Binlog记录模式</li></ul><p>Redo Log 是属于InnoDB引擎所特有的日志，而MySQL Server也有自己的日志，即 Binary log（二进制日志），简称Binlog。Binlog是记录所有数据库表结构变更以及表数据修改的二进制日志，不会记录SELECT和SHOW这类操作。Binlog日志是以事件形式记录，还包含语句所执行的消耗时间。开启Binlog日志有以下两个最重要的使用场景。</p><ul><li>主从复制：在主库中开启Binlog功能，这样主库就可以把Binlog传递给从库，从库拿到 Binlog后实现数据恢复达到主从数据一致性。</li><li>数据恢复：通过mysqlbinlog工具来恢复数据。</li></ul><p>Binlog文件名默认为“主机名_binlog-序列号”格式，例如oak_binlog-000001，也可以在配置文件中指定名称。文件记录模式有STATEMENT、ROW和MIXED三种，具体含义如下。</p><ul><li><p>ROW（row-based replication, RBR）：日志中会记录每一行数据被修改的情况，然后在 slave端对相同的数据进行修改。</p><blockquote><p>优点：能清楚记录每一个行数据的修改细节，能完全实现主从数据同步和数据的恢复。</p><p>缺点：批量操作，会产生大量的日志，尤其是alter table会让日志暴涨。</p></blockquote></li><li><p>STATMENT（statement-based replication, SBR）：每一条被修改数据的SQL都会记录到 master的Binlog中，slave在复制的时候SQL进程会解析成和原来master端执行过的相同的 SQL再次执行。简称SQL语句复制。</p><blockquote><p>优点：日志量小，减少磁盘IO，提升存储和恢复速度</p><p>缺点：在某些情况下会导致主从数据不一致，比如last_insert_id()、now()等函数。</p></blockquote></li><li><p>MIXED（mixed-based replication, MBR）：以上两种模式的混合使用，一般会使用 STATEMENT模式保存binlog，对于STATEMENT模式无法复制的操作使用ROW模式保存 binlog，MySQL会根据执行的SQL语句选择写入模式。</p></li><li><p>Binlog文件结构</p><p>MySQL的binlog文件中记录的是对数据库的各种修改操作，用来表示修改操作的数据结构是Log event。不同的修改操作对应的不同的log event。比较常用的log event有：Query event、Row event、Xid event等。binlog文件的内容就是各种Log event的集合。</p></li></ul><p>Binlog文件中Log event结构如下图所示：</p><p><img src="'+_+'" alt="1701792203155"></p><ul><li><p>Binlog写入机制</p><ul><li>根据记录模式和操作触发event事件生成log event（事件触发执行机制）</li><li>将事务执行过程中产生log event写入缓冲区，每个事务线程都有一个缓冲区 Log Event保存在一个binlog_cache_mngr数据结构中，在该结构中有两个缓冲区，一个是 stmt_cache，用于存放不支持事务的信息；另一个是trx_cache，用于存放支持事务的信息。</li><li>事务在提交阶段会将产生的log event写入到外部binlog文件中。不同事务以串行方式将log event写入binlog文件中，所以一个事务包含的log event信息在 binlog文件中是连续的，中间不会插入其他事务的log event。</li></ul></li><li><p>Binlog文件操作</p><ul><li><p>Binlog状态查看</p><blockquote><p>show variables like &#39;log_bin&#39;;</p></blockquote></li><li><p>开启Binlog功能</p><blockquote><p>mysql&gt; set global log_bin=mysqllogbin;</p><p>ERROR 1238 (HY000): Variable &#39;log_bin&#39; is a read only variable</p></blockquote><p>需要修改my.cnf或my.ini配置文件，在[mysqld]下面增加log_bin=mysql_bin_log，重启</p><p>MySQL服务。</p><blockquote><p>#log-bin=ON</p><p>#log-bin-basename=mysqlbinlog</p><p>binlog-format=ROW</p><p>log-bin=mysqlbinlog</p></blockquote></li><li><p>使用show binlog events命令</p><blockquote><p>show binary logs; //等价于show master logs;</p><p>show master status;</p><p>show binlog events;</p><p>show binlog events in &#39;mysqlbinlog.000001&#39;;</p></blockquote></li><li><p>使用mysqlbinlog 命令</p><blockquote><p>mysqlbinlog &quot;文件名&quot;</p><p>mysqlbinlog &quot;文件名&quot; &gt; &quot;test.sql&quot;</p></blockquote></li><li><p>使用 binlog 恢复数据</p><blockquote><p>//按指定时间恢复</p><p>mysqlbinlog --start-datetime=&quot;2020-04-25 18:00:00&quot; --stop</p><p>datetime=&quot;2020-04-26 00:00:00&quot; mysqlbinlog.000002 | mysql -uroot -p1234</p><p>//按事件位置号恢复</p><p>mysqlbinlog --start-position=154 --stop-position=957 mysqlbinlog.000002</p><p>| mysql -uroot -p1234</p></blockquote><p>mysqldump：定期全部备份数据库数据。mysqlbinlog可以做增量备份和恢复操作。</p></li><li><p>删除Binlog文件</p><blockquote><p>purge binary logs to &#39;mysqlbinlog.000001&#39;; //删除指定文件</p><p>purge binary logs before &#39;2020-04-28 00:00:00&#39;; //删除指定时间之前的文件</p><p>reset master; //清除所有文件</p></blockquote></li></ul></li></ul><p>Redo Log和Binlog区别</p><ul><li><p>Redo Log是属于InnoDB引擎功能，Binlog是属于MySQL Server自带功能，并且是以二进制文件记录。</p></li><li><p>Redo Log属于物理日志，记录该数据页更新状态内容，Binlog是逻辑日志，记录更新过程。</p></li><li><p>Redo Log日志是循环写，日志空间大小是固定，Binlog是追加写入，写完一个写下一个，不会覆盖使用。</p></li><li><p>Redo Log作为服务器异常宕机后事务数据自动恢复使用，Binlog可以作为主从复制和数据恢复使用。Binlog没有自动crash-safe能力。</p></li></ul>',174),I=[y];function D(v,R){return i(),e("div",null,I)}const A=l(M,[["render",D],["__file","1.html.vue"]]);export{A as default};
