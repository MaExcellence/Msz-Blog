import{_ as r,o as n,c as s,a as i,b as t,d as e}from"./app-ad70bc3c.js";const l="/msz-blog/assets/1702088167050-99018894.png",d="/msz-blog/assets/1702088262938-8a0fedea.png",a="/msz-blog/assets/1702088285506-cf34853b.png",o="/msz-blog/assets/1702110673509-05520598.png",g="/msz-blog/assets/1702111039406-12bc5582.png",p="/msz-blog/assets/1702111149425-de61b24e.png",c="/msz-blog/assets/1702128255025-4c3f33e5.png",h="/msz-blog/assets/image-20240125000911090-fada2b7c.png",m="/msz-blog/assets/image-20240125000930152-9d602169.png",_="/msz-blog/assets/image-20240125000951721-6b6c75a6.png",u="/msz-blog/assets/image-20240125001011617-e8535643.png",b="/msz-blog/assets/image-20240124235928429-4eba96cd.png",x="/msz-blog/assets/image-20240125001042001-fb8afd46.png",v="/msz-blog/assets/image-20240125001100752-f4631548.png",y="/msz-blog/assets/image-20240125001117040-ede99fa0.png",R="/msz-blog/assets/image-20240125000248908-8e3edb23.png",E="/msz-blog/assets/image-20240125001140322-50462333.png",A="/msz-blog/assets/image-20240125000449668-c49f00d8.png",C="/msz-blog/assets/image-20240125000506052-52efd5a4.png",I="/msz-blog/assets/image-20240124230051091-7056e03f.png",L={},T=i('<h2 id="第-1-节-相关数据库知识点回顾" tabindex="-1"><a class="header-anchor" href="#第-1-节-相关数据库知识点回顾" aria-hidden="true">#</a> 第 1 节 相关数据库知识点回顾</h2><h3 id="_1-1-什么是数据库事务-为什么要有事务" tabindex="-1"><a class="header-anchor" href="#_1-1-什么是数据库事务-为什么要有事务" aria-hidden="true">#</a> <strong>1.1 什么是数据库事务，为什么要有事务</strong></h3><p>事务，由一个有限的数据库操作序列构成，这些操<strong>作要么全部执行,要么全部不执行</strong>，是一个不可分割的工作位。</p><blockquote><p>假如A转账给B 100 元，先从A的账户里扣除 100 元，再在 B 的账户上加上 100 元。如果扣完A的100元后，还没来得及给B加上，银行系统异常了，最后导致A的余额减少了，B的余额却没有增加。所以就需要事务，将A的钱回滚回去，就是这么简单。</p></blockquote><p><strong>为什么要有事务呢？</strong> 就是为了<strong>保证数据的最终一致性。</strong></p><h3 id="_1-2-事务包括哪几个特性" tabindex="-1"><a class="header-anchor" href="#_1-2-事务包括哪几个特性" aria-hidden="true">#</a> 1.2 事务包括哪几个特性？</h3><p>在关系型数据库管理系统中，一个逻辑工作单元要成为事务，必须满足这 4 个特性，即所谓的 ACID： 原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）和持久性（Durability）。</p><h4 id="_1-原子性" tabindex="-1"><a class="header-anchor" href="#_1-原子性" aria-hidden="true">#</a> 1.原子性</h4><p>原子性：事务是一个原子操作单元，其对数据的修改，要么全都执行，要么全都不执行。</p><p>修改---》Buffer Pool修改---》刷盘。可能会有下面两种情况：</p><ul><li>事务提交了，如果此时Buffer Pool的脏页没有刷盘，如何保证修改的数据生效？ Redo</li><li>如果事务没提交，但是Buffer Pool的脏页刷盘了，如何保证不该存在的数据撤销？Undo</li></ul><p>每一个写事务，都会修改BufferPool，从而产生相应的Redo/Undo日志，在Buffer Pool 中的页被刷到磁盘之前，这些日志信息都会先写入到日志文件中，如果 Buffer Pool 中的脏页没有刷成功，此时数据库挂了，那在数据库再次启动之后，可以通过 Redo 日志将其恢复出来，以保证脏页写的数据不会丢失。如果脏页刷新成功，此时数据库挂了，就需要通过Undo来实现了。</p><h4 id="_2-持久性" tabindex="-1"><a class="header-anchor" href="#_2-持久性" aria-hidden="true">#</a> 2.持久性</h4><p>持久性：指的是一个事务一旦提交，它对数据库中数据的改变就应该是永久性的，后续的操作或故障不应该对其有任何影响，不会丢失。</p><p>如下图所示，一个“提交”动作触发的操作有：binlog落地、发送binlog、存储引擎提交、flush_logs， check_point、事务提交标记等。这些都是数据库保证其数据完整性、持久性的手段。</p><p><img src="'+l+'" alt="1702088167050"></p><p>MySQL的持久性也与WAL技术相关，redo log在系统Crash重启之类的情况时，可以修复数据，从而保障事务的持久性。通过原子性可以保证逻辑上的持久性，通过存储引擎的数据刷盘可以保证物理上的持久性。</p><h4 id="_3-隔离性" tabindex="-1"><a class="header-anchor" href="#_3-隔离性" aria-hidden="true">#</a> 3. 隔离性</h4><p>隔离性：指的是一个事务的执行不能被其他事务干扰，即一个事务内部的操作及使用的数据对其他的并发事务是隔离的。</p><p>InnoDB 支持的隔离性有 4 种，隔离性从低到高分别为：读未提交、读提交、可重复读、可串行化。锁和多版本控制（MVCC）技术就是用于保障隔离性的。</p><h4 id="_4-一致性" tabindex="-1"><a class="header-anchor" href="#_4-一致性" aria-hidden="true">#</a> 4. <strong>一致性</strong></h4><p>一致性：指的是事务开始之前和事务结束之后，数据库的完整性限制未被破坏。一致性包括两方面的内容，分别是约束一致性和数据一致性。</p><ul><li>约束一致性：创建表结构时所指定的外键、Check、唯一索引等约束，可惜在 MySQL 中不支持 Check 。</li><li>数据一致性：是一个综合性的规定，因为它是由原子性、持久性、隔离性共同保证的结果，而不是单单依赖于某一种技术。</li></ul><p>一致性也可以理解为数据的完整性。数据的完整性是通过原子性、隔离性、持久性来保证的，而这3个特性又是通过 Redo/Undo 来保证的。逻辑上的一致性，包括唯一索引、外键约束、check 约束，这属于业务逻辑范畴。</p><p><img src="'+d+'" alt="1702088262938"></p><p>ACID 及它们之间的关系如下图所示，4个特性中有3个与 WAL 有关系，都需要通过 Redo、Undo 日志来保证等。</p><p>WAL的全称为Write-Ahead Logging，先写日志，再写磁盘。</p><p><img src="'+a+'" alt="1702088285506"></p><h2 id="第-2-节-事务并发存在的问题" tabindex="-1"><a class="header-anchor" href="#第-2-节-事务并发存在的问题" aria-hidden="true">#</a> 第 2 节 事务并发存在的问题</h2><h3 id="_2-1-并发事务" tabindex="-1"><a class="header-anchor" href="#_2-1-并发事务" aria-hidden="true">#</a> <strong>2.1 并发事务</strong></h3><p>事务并发处理可能会带来一些问题，比如：更新丢失、脏读、不可重复读、幻读等。</p><ul><li><p>更新丢失</p><p>当两个或多个事务更新同一行记录，会产生更新丢失现象。可以分为回滚覆盖和提交覆盖。</p><ul><li>回滚覆盖：一个事务回滚操作，把其他事务已提交的数据给覆盖了。</li><li>提交覆盖：一个事务提交操作，把其他事务已提交的数据给覆盖了。</li></ul></li><li><p>脏读</p><ul><li>一个事务读取到了另一个事务修改但未提交的数据。</li></ul><blockquote><p>假设现在有两个事务A、B：</p><ul><li>假设现在Jay的余额是100，事务A正在准备查询Jay的余额</li><li>事务B先扣减Jay的余额，扣了10，但是还没提交</li><li>最后A读到的余额是90，即扣减后的余额</li></ul><p><img src="'+o+'" alt="1702110673509"></p></blockquote></li><li><p>不可重复读</p><ul><li>一个事务中多次读取同一行记录不一致，后面读取的跟前面读取的不一致。</li></ul><blockquote><p>假设现在有两个事务A和B：</p><ul><li>事务A先查询Jay的余额，查到结果是100</li><li>这时候事务B 对Jay的账户余额进行扣减，扣去10后，提交事务</li><li>事务A再去查询Jay的账户余额发现变成了90</li></ul><p><img src="'+g+'" alt="1702111039406"></p></blockquote></li><li><p>幻读</p><ul><li>一个事务中多次按相同条件查询，结果不一致。后续查询的结果和面前查询结果不同，多了或少了 几行记录。</li></ul><blockquote><p>假设现在有两个事务A、B：</p><ul><li>事务A先查询id大于2的账户记录，得到记录id=2和id=3的两条记录</li><li>这时候，事务B开启，插入一条id=4的记录，并且提交了</li><li>事务A再去执行相同的查询，却得到了id=2,3,4的3条记录了。</li></ul><p><img src="'+p+`" alt="1702111149425"></p></blockquote></li></ul><h3 id="_2-2-mysql锁家族" tabindex="-1"><a class="header-anchor" href="#_2-2-mysql锁家族" aria-hidden="true">#</a> 2.2 MySQl锁家族</h3><h4 id="_1-四大隔离级别" tabindex="-1"><a class="header-anchor" href="#_1-四大隔离级别" aria-hidden="true">#</a> <strong>1.四大隔离级别</strong></h4><p>为了解决并发事务存在的<strong>脏读、不可重复读、幻读</strong>等问题，数据库大叔设计了四种隔离级别。分别是<strong>读未提交，读已提交，可重复读，串行化（Serializable）</strong>。</p><ul><li><p><strong>读未提交</strong></p><p>读未提交隔离级别，只限制了两个数据<strong>不能同时修改</strong>，但是修改数据的时候，即使事务<strong>未提交</strong>，都是可以被别的事务读取到的，这级别的事务隔离有<strong>脏读、重复读、幻读</strong>的问题；</p></li><li><p><strong>读已提交</strong></p><p>读已提交隔离级别，当前事务只能读取到其他事务<strong>提交</strong>的数据，所以这种事务的隔离级别<strong>解决了脏读</strong>问题，但还是会存在<strong>重复读、幻读</strong>问题；</p></li><li><p><strong>可重复读</strong></p><p>可重复读隔离级别，限制了读取数据的时候，不可以进行修改，所以<strong>解决了重复读</strong>的问题，但是读取范围数据的时候，是可以插入数据，所以还会存在<strong>幻读</strong>问题；</p></li><li><p><strong>串行化</strong></p><p>事务最高的隔离级别，在该级别下，所有事务都是进行<strong>串行化顺序</strong>执行的。可以避免脏读、不可重复读与幻读所有并发问题。但是这种事务隔离级别下，事务执行很耗性能。</p><p>​ 数据库的事务隔离级别越高，并发问题就越小，但是并发处理能力越差（代价）。读未提交隔离级别最低，并发问题多，但是并发处理能力好。以后使用时，可以根据系统特点来选择一个合适的隔离级别，比如对不可重复读和幻读并不敏感，更多关心数据库并发处理能力，此时可以使用Read Commited隔离级别。</p><p>事务隔离级别，针对Innodb引擎，支持事务的功能。像MyISAM引擎没有关系。</p><p><strong>事务隔离级别和锁的关系</strong></p><p>1）事务隔离级别是SQL92定制的标准，相当于事务并发控制的整体解决方案，本质上是对锁和MVCC使用的封装，隐藏了底层细节。</p><p>2）锁是数据库实现并发控制的基础，事务隔离性是采用锁来实现，对相应操作加不同的锁，就可以防止其他事务同时对数据进行读写操作。</p><p>3）对用户来讲，首先选择使用隔离级别，当选用的隔离级别不能解决并发问题或需求时，才有必要在开发中手动的设置锁。</p><p>MySQL默认隔离级别：可重复读</p><p>Oracle、SQLServer默认隔离级别：读已提交</p><p>一般使用时，建议采用默认隔离级别，然后存在的一些并发问题，可以通过悲观锁、乐观锁等实现处理。</p><h3 id="mysql-隔离级别控制" tabindex="-1"><a class="header-anchor" href="#mysql-隔离级别控制" aria-hidden="true">#</a> <strong>MySQL 隔离级别控制</strong></h3><p>MySQL默认的事务隔离级别是Repeatable Read，查看MySQL当前数据库的事务隔离级别命令如下：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>show variables like &#39;transaction_isolation&#39;;
或者
select @@transaction_isolation;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>设置事务隔离级别可以如下命令：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>set transaction_isolation = &#39;READ-UNCOMMITTED&#39;;
set transaction_isolation = &#39;READ-COMMITTED&#39;;
set transaction_isolation = &#39;REPEATABLE-READ&#39;;
set transaction_isolation = &#39;SERIALIZABLE&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h4 id="_2-四大隔离级别-都会存在哪些并发问题呢" tabindex="-1"><a class="header-anchor" href="#_2-四大隔离级别-都会存在哪些并发问题呢" aria-hidden="true">#</a> <strong>2.四大隔离级别，都会存在哪些并发问题呢</strong></h4><table><thead><tr><th style="text-align:center;">隔离级别</th><th style="text-align:center;">脏读</th><th style="text-align:center;">不可重复读</th><th style="text-align:center;">幻读</th></tr></thead><tbody><tr><td style="text-align:center;">读未提交</td><td style="text-align:center;">√</td><td style="text-align:center;">√</td><td style="text-align:center;">√</td></tr><tr><td style="text-align:center;">读已提交</td><td style="text-align:center;">×</td><td style="text-align:center;">√</td><td style="text-align:center;">√</td></tr><tr><td style="text-align:center;">可重复读</td><td style="text-align:center;">×</td><td style="text-align:center;">×</td><td style="text-align:center;">√</td></tr><tr><td style="text-align:center;">串行化</td><td style="text-align:center;">×</td><td style="text-align:center;">×</td><td style="text-align:center;">×</td></tr></tbody></table><h4 id="_3-数据库是如何保证事务的隔离性的呢" tabindex="-1"><a class="header-anchor" href="#_3-数据库是如何保证事务的隔离性的呢" aria-hidden="true">#</a> <strong>3.数据库是如何保证事务的隔离性的呢？</strong></h4><p>数据库是通过<strong>加锁</strong>，来实现事务的隔离性的。这就好像，如果你想一个人静静，不被别人打扰，你就可以在房门上加上一把锁。</p><p>加锁确实好使，可以保证隔离性。比如<strong>串行化隔离级别就是加锁实现的</strong>。但是频繁的加锁，导致读数据时，没办法修改，修改数据时，没办法读取，大大<strong>降低了数据库性能</strong>。</p><p><img src="`+c+'" alt="1702128255025"></p>',42),w=t("div",{class:"custom-container tip"},[t("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[t("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[t("circle",{cx:"12",cy:"12",r:"9"}),t("path",{d:"M12 8h.01"}),t("path",{d:"M11 12h1v4h1"})])]),t("p",{class:"custom-container-title"},"读锁、写锁"),t("p",null,"读锁 ：也称为 共享锁 、英文用 S 表示。针对同一份数据，多个事务的读操作可以同时进行而不会互相影响，相互不阻塞的。"),t("p",null,"写锁 ：也称为 排他锁 、英文用 X 表示。当前写操作没有完成前，它会阻断其他写锁和读锁。这样就能确保在给定的时间里，只有一个事务能执行写入，并防止其他用户读取正在写入的同一资源。"),t("p",null,[t("strong",null,"需要注意的是对于 InnoDB引擎来说，读锁和写锁可以加在表上，也可以加在行上。")])],-1),S=t("div",{class:"custom-container tip"},[t("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[t("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[t("circle",{cx:"12",cy:"12",r:"9"}),t("path",{d:"M12 8h.01"}),t("path",{d:"M11 12h1v4h1"})])]),t("p",{class:"custom-container-title"},"表级锁、页级锁、行锁"),t("p",null,"行锁 和 表锁 的区别："),t("p",null,[t("strong",null,"表锁"),e("： 开销小，加锁快，不会出现死锁；锁定力度大，发生锁冲突概率高，并发度最低")]),t("p",null,[t("strong",null,"行锁"),e("： 开销大，加锁慢，会出现死锁；锁定粒度小，发生锁冲突的概率低，并发度高")])],-1),f=i('<h5 id="_1-表锁-table-lock" tabindex="-1"><a class="header-anchor" href="#_1-表锁-table-lock" aria-hidden="true">#</a> 1.表锁（Table Lock）</h5><p><strong>① 表级别的S锁、X锁</strong></p><p>在对某个表执行SELECT、INSERT、DELETE、UPDATE语句时，InnoDB存储引擎是不会为这个表添加表级别的 S锁 或者 X锁 的。在对某个表执行一些诸如 ALTER TABLE 、 DROP TABLE 这类的 DDL 语句时，其他事务对这个表并发执行诸如SELECT、INSERT、DELETE、UPDATE的语句会发生阻塞。同理，某个事务中对某个表执行SELECT、INSERT、DELETE、UPDATE语句时，在其他会话中对这个表执行 DDL 语句也会发生阻塞。这个过程其实是通过在 server层 使用一种称之为 元数据锁 （英文名： Metadata Locks，简称 MDL ）结构来实现的。</p><ul><li>LOCK TABLES 表名 READ --InnoDB存储引擎会对表 加表级别的 S锁 。</li><li>LOCK TABLES 表名 WRITE --InnoDB存储引擎会对表 加表级别的 X锁 。</li></ul><p>不过尽量避免在使用InnoDB存储引擎的表上使用 LOCK TABLES 这样的手动锁表语句，它们并不会提供什么额外的保护，只是会降低并发能力而已。InnoDB的厉害之处还是实现了更细粒度的 行锁； MySQL的表级锁有两种模式：（以MyISAM表进行操作的演示）</p><ul><li>表共享读锁（Table Read Lock）</li><li>表独占写锁（Table Write Lock）</li></ul><table><thead><tr><th style="text-align:center;">锁类型</th><th style="text-align:center;">自己可读</th><th style="text-align:center;">自己可写</th><th style="text-align:center;">自己可操作其他表</th><th style="text-align:center;">他人可读</th><th style="text-align:center;">他人可写</th></tr></thead><tbody><tr><td style="text-align:center;">读锁</td><td style="text-align:center;">是</td><td style="text-align:center;">否</td><td style="text-align:center;">否</td><td style="text-align:center;">是</td><td style="text-align:center;">否</td></tr><tr><td style="text-align:center;">写锁</td><td style="text-align:center;">是</td><td style="text-align:center;">是</td><td style="text-align:center;">否</td><td style="text-align:center;">否</td><td style="text-align:center;">否</td></tr></tbody></table><p><strong>读写互斥原则：</strong></p><ol><li>读读相容</li><li>读写互斥</li><li>写写互斥</li></ol><p><strong>② 意向锁 （intention lock）</strong></p><p>InnoDB 支持 多粒度锁（multiple granularity locking） ，它允许 行级锁 与 表级锁 共存，而<strong>意向锁</strong>就是其中的一种 表锁 。意向锁分为两种：</p><blockquote><p>意向共享锁（intention shared lock, IS）：事务有意向对表中的某些行加<strong>共享锁</strong>（S锁）</p><p>-- 事务要获取某些行的 S 锁，必须先获得表的 IS 锁。 SELECT column FROM table ... LOCK IN SHARE MODE;</p></blockquote><blockquote><p>意向排他锁（intention exclusive lock, IX）：事务有意向对表中的某些行加<strong>排他锁</strong>（X锁） -- 事务要获取某些行的 X 锁，必须先获得表的 IX 锁。 SELECT column FROM table ... FOR UPDATE;</p></blockquote><p>即：意向锁是由存储引擎 自己维护的 ，用户无法手动操作意向锁，在为数据行加共享 / 排他锁之前，InooDB 会先获取该数据行 所在数据表的对应意向锁 。</p><p>意向锁的并发性：</p><p>意向锁不会与行级的共享 / 排他锁互斥！正因为如此，意向锁并不会影响到多个事务对不同数据行加排他锁时的并发性。（不然我们直接用普通的表锁就行了）</p><p>我们扩展一下上面 teacher表的例子来概括一下意向锁的作用（一条数据从被锁定到被释放的过程中，可能存在多种不同锁，但是这里我们只着重表现意向锁）。</p><p>从上面的案例可以得到如下结论：</p><ol><li><p>InnoDB 支持 多粒度锁 ，特定场景下，行级锁可以与表级锁共存。</p></li><li><p>意向锁之间互不排斥，但除了 IS 与 S 兼容外， 意向锁会与 共享锁 / 排他锁 互斥 。</p></li><li><p>IX，IS是表级锁，不会和行级的X，S锁发生冲突。只会和表级的X，S发生冲突。</p></li><li><p>意向锁在保证并发性的前提下，实现了 行锁和表锁共存 且 满足事务隔离性 的要求。</p></li></ol><table><thead><tr><th style="text-align:center;"></th><th style="text-align:center;">意向共享锁(IS)</th><th style="text-align:center;">意向排他锁(IX)</th></tr></thead><tbody><tr><td style="text-align:center;">共享锁（S）</td><td style="text-align:center;">兼容</td><td style="text-align:center;">互斥</td></tr><tr><td style="text-align:center;">排他锁（X）</td><td style="text-align:center;">互斥</td><td style="text-align:center;">互斥</td></tr><tr><td style="text-align:center;">意向共享锁（IS）</td><td style="text-align:center;">兼容</td><td style="text-align:center;">兼容</td></tr><tr><td style="text-align:center;">意向排他锁（IX）</td><td style="text-align:center;">兼容</td><td style="text-align:center;">兼容</td></tr></tbody></table><p><strong>③ 自增锁（AUTO-INC 锁）</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 在使用MySQL过程中，我们可以为表的某个列添加 AUTO_INCREMENT 属性。举例： \n\nCREATE TABLE `teacher` (\n`id` int NOT NULL AUTO_INCREMENT,\n`name` varchar(255) NOT NULL,\nPRIMARY KEY (`id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;\n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>-- 由于这个表的id字段声明了AUTO_INCREMENT，意味着在书写插入语句时不需要为其赋值，SQL语句修改 如下所示。</p><p>INSERT INTO <code>teacher</code> (name) VALUES (&#39;zhangsan&#39;), (&#39;lisi&#39;);</p><p>-- 现在我们看到的上面插入数据只是一种简单的插入模式，所有插入数据的方式总共分为三类，分别是“ Simple inserts ”，“ Bulk inserts ”和“ Mixed-mode inserts ”。</p><ol><li><p>“Simple inserts” （简单插入） 可以 预先确定要插入的行数 （当语句被初始处理时）的语句。包括没有嵌套子查询的单行和多行INSERT...VALUES() 和 REPLACE 语句。比如我们上面举的例子就属于该类插入，已经确定要插入的行数。</p></li><li><p>“Bulk inserts” （批量插入） 事先不知道要插入的行数 （和所需自动递增值的数量）的语句。比如: INSERT ... SELECT ， REPLACE... SELECT 和 LOAD DATA 语句，但不包括纯INSERT。 InnoDB在每处理一行，为AUTO_INCREMENT列分配一个新值。</p></li><li><p>“Mixed-mode inserts” （混合模式插入） 这些是“Simple inserts”语句但是指定部分新行的自动递增值。例如: INSERT INTO teacher (id,name)VALUES (1,&#39;a&#39;), (NULL,&#39;b&#39;), (5,&#39;c&#39;), (NULL,&#39;d&#39;); 只是指定了部分id的值。另一种类型的“混合模式插入”是 INSERT ... ON DUPLICATE KEY UPDATE 。</p></li></ol><p>innodb_autoinc_lock_mode有三种取值，分别对应与不同锁定模式：</p><p>（1）innodb_autoinc_lock_mode = 0(“传统”锁定模式) 在此锁定模式下，所有类型的insert语句都会获得一个特殊的表级AUTO-INC锁，用于插入具有AUTO_INCREMENT列的表。这种模式其实就如我们上面的例子，即每当执行insert的时候，都会得到一个表级锁(AUTO-INC锁)，使得语句中生成的auto_increment为顺序，且在binlog中重放的时候，可以保证master与slave中数据的auto_increment是相同的。因为是表级锁，当在同一时间多个事务中执行insert的时候，对于AUTO-INC锁的争夺会 限制并发 能力。</p><p>（2）innodb_autoinc_lock_mode = 1(“连续”锁定模式) 在 MySQL 8.0 之前，连续锁定模式是 默认 的。在这个模式下，“bulk inserts”仍然使用AUTO-INC表级锁，并保持到语句结束。这适用于所有INSERT ...SELECT，REPLACE ... SELECT和LOAD DATA语句。同一时刻只有一个语句可以持有AUTO-INC锁。对于“Simple inserts”（要插入的行数事先已知），则通过在 mutex（轻量锁） 的控制下获得所需数量的自动递增值来避免表级AUTO-INC锁， 它只在分配过程的持续时间内保持，而不是直到语句完成。不使用 表级AUTO-INC锁，除非AUTO-INC锁由另一个事务保持。如果另一个事务保持AUTO-INC锁，则“Simpleinserts”等待AUTO-INC锁，如同它是一个“bulk inserts”。</p><p>（3）innodb_autoinc_lock_mode = 2(“交错”锁定模式) 从 MySQL 8.0 开始，交错锁模式是 默认 设置。在此锁定模式下，自动递增值 保证 在所有并发执行的所有类型的insert语句中是 唯一 且 单调递增 的。但是，由于多个语句可以同时生成数字（即，跨语句交叉编号），为任何给定语句插入的行生成的值可能不是连续的。</p><h2 id="第-3-节-mvcc" tabindex="-1"><a class="header-anchor" href="#第-3-节-mvcc" aria-hidden="true">#</a> <strong>第 3 节 MVCC</strong></h2><h3 id="_1-什么是-mvcc" tabindex="-1"><a class="header-anchor" href="#_1-什么是-mvcc" aria-hidden="true">#</a> <strong>1. 什么是 MVCC？</strong></h3><p>​ MVCC，即<strong>Multi-Version Concurrency Control （多版本并发控制）</strong>。它是一种并发控制的方法，一般在数据库管理系统中，实现对数据库的并发访问，在编程语言中实现事务内存。</p><blockquote><p>通俗的讲，数据库中同时存在多个版本的数据，并不是整个数据库的多个版本，而是某一条记录的多个版本同时存在，在某个事务对其进行操作的时候，需要查看这一条记录的隐藏列事务版本id，比对事务id并根据事物隔离级别去判断读取哪个版本的数据。</p></blockquote><p>数据库隔离级别读<strong>已提交、可重复读</strong> 都是基于MVCC实现的，相对于加锁简单粗暴的方式，它用更好的方式去处理读写冲突，能有效提高数据库并发性能。</p><hr><h3 id="_2-mvcc实现的关键知识点" tabindex="-1"><a class="header-anchor" href="#_2-mvcc实现的关键知识点" aria-hidden="true">#</a> <strong>2. MVCC实现的关键知识点</strong></h3><h4 id="_2-1-事务版本号" tabindex="-1"><a class="header-anchor" href="#_2-1-事务版本号" aria-hidden="true">#</a> <strong>2.1 事务版本号</strong></h4><p>​ 事务每次开启前，都会从数据库获得一个<strong>自增</strong>长的事务ID，可以从事务ID判断事务的执行先后顺序。这就是事务版本号。</p><h4 id="_2-2-隐式字段" tabindex="-1"><a class="header-anchor" href="#_2-2-隐式字段" aria-hidden="true">#</a> <strong>2.2 隐式字段</strong></h4><p>​ 对于InnoDB存储引擎，每一行记录都有两个隐藏列<strong>trx_id</strong>、<strong>roll_pointer</strong>，如果表中没有主键和非NULL唯一键时，则还会有第三个隐藏的主键列<strong>row_id</strong>。</p><table><thead><tr><th>列名</th><th>是否必须</th><th>描述</th></tr></thead><tbody><tr><td>row_id</td><td>否</td><td>单调递增的行ID，不是必需的，占用6个字节。</td></tr><tr><td>trx_id</td><td>是</td><td>记录操作该数据事务的事务ID</td></tr><tr><td>roll_pointer</td><td>是</td><td>这个隐藏列就相当于一个指针，指向回滚段的undo日志</td></tr></tbody></table><h4 id="_2-3-undo-log" tabindex="-1"><a class="header-anchor" href="#_2-3-undo-log" aria-hidden="true">#</a> <strong>2.3 undo log</strong></h4><p>​ undo log，<strong>回滚日志</strong>，用于记录数据被修改前的信息。在表记录修改之前，会先把数据拷贝到undo log里，如果事务回滚，即可以通过undo log来还原数据。</p><p>可以这样认为，当delete一条记录时，undo log 中会记录一条对应的insert记录，当update一条记录时，它记录一条对应相反的update记录。</p><p>undo log有什么<strong>用途</strong>呢？</p><ol><li>事务回滚时，保证原子性和一致性。</li><li>用于MVCC<strong>快照读</strong>。</li></ol><h4 id="_2-4-版本链" tabindex="-1"><a class="header-anchor" href="#_2-4-版本链" aria-hidden="true">#</a> <strong>2.4 版本链</strong></h4><p>多个事务并行操作某一行数据时，不同事务对该行数据的修改会产生多个版本，然后通过回滚指针（roll_pointer），连成一个链表，这个链表就称为<strong>版本链</strong>。如下：</p><p><img src="'+h+'" alt="image-20240125000911090"></p><p>​ 版本链</p><p>其实，通过版本链，我们就可以看出<strong>事务版本号、表格隐藏的列和undo log</strong>它们之间的关系。我们再来小分析一下。</p><ol><li>假设现在有一张core_user表，表里面有一条数据,id为1，名字为孙权：</li></ol><p><img src="'+m+'" alt="image-20240125000930152"></p><ol><li>现在开启一个事务A：对core_user表执行 <strong>update core_user set name =&quot;曹操&quot; where id=1</strong>,会进行如下流程操作</li></ol><ul><li>首先获得一个事务ID=100</li><li>把core_user表修改前的数据,拷贝到undo log</li><li>修改core_user表中，id=1的数据，名字改为曹操</li><li>把修改后的数据事务Id=101改成当前事务版本号，并把 <strong>roll_pointer</strong>指向undo log数据地址。</li></ul><p><img src="'+_+'" alt="image-20240125000951721"></p><h4 id="_2-5-快照读和当前读" tabindex="-1"><a class="header-anchor" href="#_2-5-快照读和当前读" aria-hidden="true">#</a> <strong>2.5 快照读和当前读</strong></h4><p><strong>快照读：</strong> 读取的是记录数据的可见版本（有旧的版本）。不加锁,普通的select语句都是快照读,如：</p><blockquote><p>select * from core_user where id &gt; 2;</p></blockquote><p><strong>当前读</strong>：读取的是记录数据的最新版本，显式加锁的都是当前读</p><blockquote><p>select * from core_user where id &gt; 2 for update; select * from account where id&gt;2 lock in share mode;</p></blockquote><h4 id="_2-6-read-view" tabindex="-1"><a class="header-anchor" href="#_2-6-read-view" aria-hidden="true">#</a> <strong>2.6 Read View</strong></h4><ul><li><strong>Read View是什么呢？</strong> 它就是事务执行SQL语句时，产生的读视图。实际上在innodb中，每个SQL语句执行前都会得到一个Read View。</li><li><strong>Read View有什么用呢？</strong> 它主要是用来做可见性判断的，即判断当前事务可见哪个版本的数据~</li></ul><p>Read View是如何保证可见性判断的呢？我们先看看Read view 的几个重要属性</p><ul><li><strong>m_ids</strong>:当前系统中那些活跃(未提交)的读写事务ID, 它数据结构为一个List。</li><li><strong>min_limit_id</strong>:表示在生成Read View时，当前系统中活跃的读写事务中最小的事务id，即m_ids中的最小值。</li><li><strong>max_limit_id</strong>:表示生成Read View时，系统中应该分配给下一个事务的id值。</li><li><strong>creator_trx_id</strong>: 创建当前Read View的事务ID</li></ul><blockquote><p><strong>Read view 匹配条件规则</strong></p><ol><li>如果数据事务ID <strong>trx_id &lt; min_limit_id</strong>，表明生成该版本的事务在生成Read View<strong>前</strong>，已经提交(因为事务ID是递增的)，所以该版本可以被当前事务访问。</li><li>如果 <strong>trx_id&gt;= max_limit_id</strong>，表明生成该版本的事务在生成ReadView后才生成，所以该版本不可以被当前事务访问。</li><li>如果 <strong>min_limit_id =,需腰分3种情况讨论</strong></li></ol><p>​ （1）如果m_ids包含trx_id,则代表Read View生成时刻，这个事务还未提交，但是如果数据的trx_id等于 creator_trx_id的话，表明数据是自己生成的，因此 是<strong>可见</strong>的。</p><p>​ （2）如果m_ids包含trx_id，并且trx_id不等于creator_trx_id，则Read View生成时，事务未提交，并且不是自己生产的，所以当前事务也是<strong>看不见</strong>的；</p><p>​ （3）如果m_ids不包含trx_id，则说明你这个事务在Read View生成之前就已经提交了，修改的结果，当前事务是能看见的。</p></blockquote><hr><h3 id="_3-mvcc实现原理分析" tabindex="-1"><a class="header-anchor" href="#_3-mvcc实现原理分析" aria-hidden="true">#</a> <strong>3. MVCC实现原理分析</strong></h3><p><strong>3.1 查询一条记录，基于MVCC，是怎样的流程</strong></p><ol><li>获取事务自己的版本号，即事务ID</li><li>获取Read View</li><li>查询得到的数据，然后Read View中的事务版本号进行比较。</li><li>如果不符合Read View的可见性规则， 即就需要Undo log中历史快照;</li><li>最后返回符合规则的数据</li></ol><p>InnoDB 实现MVCC，是通过Read View+ Undo Log 实现的，Undo Log 保存了历史快照，Read View可见性规则帮助判断当前版本的数据是否可见。</p><p><strong>3.2 读已提交（RC）隔离级别，存在不可重复读问题的分析历程</strong></p><ol><li>创建core_user表，插入一条初始化数据,如下：</li></ol><p><img src="'+u+`" alt="image-20240125001011617"></p><ol><li>隔离级别设置为读已提交（RC），事务A和事务B同时对core_user表进行查询和修改操作。</li></ol><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>事务A: select * fom core_user where id=1 

事务B: update core_user set name =”曹操”
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>执行流程如下： <img src="`+b+'" alt="image-20240124235928429"></p><p>最后事务A查询到的结果是，<strong>name=曹操</strong>的记录，我们<strong>基于MVCC</strong>，来分析一下执行流程：</p><p>(1) A开启事务，首先得到一个事务ID为100</p><p>(2) B开启事务，得到事务ID为101</p><p>(3) 事务A生成一个Read View，read view对应的值如下</p><table><thead><tr><th>变量</th><th>值</th></tr></thead><tbody><tr><td>m_ids</td><td>100，101</td></tr><tr><td>max_limit_id</td><td>102</td></tr><tr><td>min_limit_id</td><td>100</td></tr><tr><td>creator_trx_id</td><td>100</td></tr></tbody></table><p>然后回到版本链：开始从版本链中挑选可见的记录：</p><p><img src="'+x+`" alt="image-20240125001042001"></p><p>​ 版本链</p><p>由图可以看出，最新版本的列name的内容是孙权，该版本的trx_id值为100。开始执行read view可见性规则校验：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>min_limit_id(100)=&lt;trx_id（100）&lt;102; 

creator_trx_id = trx_id =100;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>由此可得，trx_id=100的这个记录，当前事务是可见的。所以查到是name为孙权的记录。</p><p>（4). 事务B进行修改操作，把名字改为曹操。把原数据拷贝到undo log,然后对数据进行修改，标记事务ID和上一个数据版本在undo log的地址。</p><p><img src="`+v+'" alt="image-20240125001100752"></p><p>(5) 提交事务</p><p>(6) 事务A再次执行查询操作，<strong>新生成一个Read View</strong>，Read View对应的值如下</p><table><thead><tr><th>变量</th><th>值</th></tr></thead><tbody><tr><td>m_ids</td><td>100</td></tr><tr><td>max_limit_id</td><td>102</td></tr><tr><td>min_limit_id</td><td>100</td></tr><tr><td>creator_trx_id</td><td>100</td></tr></tbody></table><p>然后再次回到版本链：从版本链中挑选可见的记录：</p><p><img src="'+y+`" alt="image-20240125001117040"></p><p>从图可得，最新版本的列name的内容是曹操，该版本的trx_id值为101。开始执行Read View可见性规则校验：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>min_limit_id(100)=&lt;trx_id（101）&lt;max_limit_id（102); 
但是,trx_id=101，不属于m_ids集合
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>因此，trx_id=101这个记录，对于当前事务是可见的。所以SQL查询到的是name为曹操的记录。</p><p>综上所述，在<strong>读已提交（RC）隔离级别</strong>下，同一个事务里，两个相同的查询，读取同一条记录（id=1），却返回了不同的数据（<strong>第一次查出来是孙权，第二次查出来是曹操那条记录</strong>），因此RC隔离级别，存在<strong>不可重复读</strong>并发问题。</p><p><strong>4.3 可重复读（RR）隔离级别，解决不可重复读问题的分析</strong></p><p>在RR隔离级别下，是如何解决不可重复读问题的呢？我们一起再来看下，</p><p>还是4.2小节那个流程，还是这个事务A和事务B，如下：</p><p><img src="`+R+'" alt="image-20240125000248908"></p><p><strong>4.3.1 不同隔离级别下，Read View的工作方式不同</strong></p><p>实际上，各种事务隔离级别下的Read view工作方式，是不一样的，RR可以解决不可重复读问题，就是跟<strong>Read view工作方式有关</strong>。</p><ul><li>在读已提交（RC）隔离级别下，同一个事务里面，</li></ul><p><strong>每一次查询都会产生一个新的Read View副本</strong>，这样就可能造成同一个事务里前后读取数据可能不一致的问题（不可重复读并发问题）。</p><table><thead><tr><th>begin</th><th></th></tr></thead><tbody><tr><td>select * from core_user where id =1</td><td>生成一个Read View</td></tr><tr><td>/</td><td>/</td></tr><tr><td>/</td><td>/</td></tr><tr><td>select * from core_user where id =1</td><td>生成一个Read View</td></tr></tbody></table><ul><li>在可重复读（RR）隔离级别下，</li></ul><p><strong>一个事务里只会获取一次read view</strong>，都是副本共用的，从而保证每次查询的数据都是一样的。</p><table><thead><tr><th>begin</th><th></th></tr></thead><tbody><tr><td>select * from core_user where id =1</td><td>生成一个Read View</td></tr><tr><td>/</td><td></td></tr><tr><td>/</td><td></td></tr><tr><td>select * from core_user where id =1</td><td>共用一个Read View副本</td></tr></tbody></table><p><strong>4.3.2 实例分析</strong></p><p>我们穿越下，回到<strong>刚4.2的例子</strong>，然后执行第2个查询的时候：</p><p>事务A再次执行查询操作，复用老的Read View副本，Read View对应的值如下</p><table><thead><tr><th>变量</th><th>值</th></tr></thead><tbody><tr><td>m_ids</td><td>100，101</td></tr><tr><td>max_limit_id</td><td>102</td></tr><tr><td>min_limit_id</td><td>100</td></tr><tr><td>creator_trx_id</td><td>100</td></tr></tbody></table><p>然后再次回到版本链：从版本链中挑选可见的记录：</p><p><img src="'+E+`" alt="image-20240125001140322"></p><p>从图可得，最新版本的列name的内容是曹操，该版本的trx_id值为101。开始执行read view可见性规则校验：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>min_limit_id(100)=&lt;trx_id（101）&lt;max_limit_id（102); 
因为m_ids{100,101}包含trx_id（101）， 
并且creator_trx_id (100) 不等于trx_id（101）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，trx_id=101这个记录，对于当前事务是<strong>不可见</strong>的。这时候呢，版本链roll_pointer跳到下一个版本，trx_id=100这个记录，再次校验是否可见：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>min_limit_id(100)=&lt;trx_id（100）&lt; max_limit_id（102); 
因为m_ids{100,101}包含trx_id（100），
并且creator_trx_id (100) 等于trx_id（100）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>所以，trx_id=100这个记录，对于当前事务是<strong>可见</strong>的，所以两次查询结果，都是<strong>name=孙权</strong>的那个记录。即在可重复读（RR）隔离级别下，复用老的Read View副本，解决了<strong>不可重复读</strong>的问题。</p><p><strong>4.4 网络江湖传说，MVCC是否解决了幻读问题呢？</strong></p><p>网络江湖有个传说，说MVCC的RR隔离级别，解决了幻读问题，我们来一起分析一下。</p><p><strong>4.4.1 RR级别下，一个快照读的例子，不存在幻读问题</strong></p><p><img src="`+A+'" alt="image-20240125000449668"></p><p>由图可得，步骤2和步骤6查询结果集没有变化，<strong>看起来RR级别是已经解决幻读问题啦</strong>~</p><p><strong>4.4.2 RR级别下，一个当前读的例子</strong></p><p>假设现在有个account表，表中有4条数据，RR级别。</p><ul><li>开启事务A，执行</li></ul><p><strong>当前读</strong>，查询id&gt;2的所有记录。</p><ul><li>再开启事务B，插入id=5的一条数据。</li></ul><p>流程如下：</p><p><img src="'+C+'" alt="image-20240125000506052"></p><p>显然，事务B执行插入操作时，阻塞了~因为事务A在执行select ... lock in share mode（当前读）的时候，不仅在id = 3,4 这2条记录上加了锁，而且在id &gt; 2这个范围上也加了<strong>间隙锁</strong>。</p><p>因此，我们可以发现，RR隔离级别下，加锁的select, update, delete等语句，会使用间隙锁+ 临键锁，锁住索引记录之间的范围，避免范围间插入记录，以<strong>避免产生幻影行记录</strong>，那就是说RR隔离级别解决了幻读问题？</p><p><strong>4.4.3 这种特殊场景，似乎有幻读问题</strong></p><p><img src="'+I+'" alt="image-20240124230051091"></p><p>其实，上图事务A中，多加了update account set balance=200 where id=5;这步操作，同一个事务，相同的sql，查出的结果集不同了，这个结果，就符合了幻读的定义~</p>',140),k=[T,w,S,f];function D(B,V){return n(),s("div",null,k)}const M=r(L,[["render",D],["__file","3.html.vue"]]);export{M as default};
