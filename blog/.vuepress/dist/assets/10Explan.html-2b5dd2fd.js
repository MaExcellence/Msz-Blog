import{_ as e,o as i,c as s,b as a}from"./app-3bb1037e.js";const l="/assets/image-20240316215525649-aa2e6bbc.png",n="/assets/image-20240317183045685-57efc98c.png",d="/assets/image-20240317183857943-1a0bdc28.png",m="/assets/image-20240317184405816-9294f3a1.png",r="/assets/image-20240317184730335-545c84b2.png",c="/assets/image-20240317185102121-54919240.png",t="/assets/image-20240317185244881-ea5b3446.png",p="/assets/image-20240317185818550-ad9bec8d.png",o="/assets/image-20240317190127535-1a2f6adc.png",v="/assets/image-20240317190252190-6daa8452.png",u="/assets/image-20240317190332063-4e0473d9.png",g="/assets/image-20240317213540685-ffed4fbd.png",b="/assets/image-20240317213737539-6b062447.png",y="/assets/image-20240317213832403-60d2a54d.png",E="/assets/image-20240317213937298-2c9c766e.png",h="/assets/image-20240317214050363-3907d5c5.png",_="/assets/image-20240317214749162-eef45c4d.png",L="/assets/image-20240317220714143-94bbf61c.png",q="/assets/image-20240317220824759-490d1d4e.png",x="/assets/image-20240317220850046-683a1439.png",f="/assets/image-20240317223251335-709de1dd.png",N={},T=a('<h1 id="explain工具介绍" tabindex="-1"><a class="header-anchor" href="#explain工具介绍" aria-hidden="true">#</a> Explain工具介绍</h1><p>使用EXPLAIN关键字可以模拟优化器执行SQL语句，分析你的查询语句或是结构的性能瓶颈。 在 select 语句之前增加 explain 关键字，MySQL 会在查询上设置一个标记，执行查询会返回执行计划的信息，而不是执行这条SQL。 注意：如果 from 中包含子查询，仍会执行该子查询，将结果放入临时表中</p><h2 id="_1-explain分析示例" tabindex="-1"><a class="header-anchor" href="#_1-explain分析示例" aria-hidden="true">#</a> 1.Explain分析示例</h2><p>参考官方文档：https://dev.mysql.com/doc/refman/5.7/en/explain-output.html</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 示例表：\n DROP TABLE IF EXISTS `actor`;\n CREATE TABLE `actor` (\n `id` int(11) NOT NULL,\n `name` varchar(45) DEFAULT NULL,\n `update_time` datetime DEFAULT NULL,\n PRIMARY KEY (`id`)\n ) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n\nINSERT INTO `actor` (`id`, `name`, `update_time`) VALUES (1,&#39;a&#39;,&#39;2017‐12‐22\n15:27:18&#39;), (2,&#39;b&#39;,&#39;2017‐12‐22 15:27:18&#39;), (3,&#39;c&#39;,&#39;2017‐12‐22 15:27:18&#39;);\n\nDROP TABLE IF EXISTS `film`;\nCREATE TABLE `film` (\n`id` int(11) NOT NULL AUTO_INCREMENT,\n`name` varchar(10) DEFAULT NULL,\nPRIMARY KEY (`id`),\nKEY `idx_name` (`name`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n\nINSERT INTO `film` (`id`, `name`) VALUES (3,&#39;film0&#39;),(1,&#39;film1&#39;),(2,&#39;film2&#39;);\n\nDROP TABLE IF EXISTS `film_actor`;\nCREATE TABLE `film_actor` (\n`id` int(11) NOT NULL,\n`film_id` int(11) NOT NULL,\n`actor_id` int(11) NOT NULL,\n`remark` varchar(255) DEFAULT NULL,\nPRIMARY KEY (`id`),\nKEY `idx_film_actor_id` (`film_id`,`actor_id`)\n) ENGINE=InnoDB DEFAULT CHARSET=utf8;\n\nINSERT INTO `film_actor` (`id`, `film_id`, `actor_id`) VALUES (1,1,1),(2,1,2),(3,2,1);\n \n \n\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>explain select * from actor;</p><p>在查询中的每个表会输出一行，如果有两个表通过 join 连接查询，那么会输出两行</p></blockquote><p><img src="'+l+`" alt="image-20240316215525649"></p><h2 id="_2-explain-两个变种" tabindex="-1"><a class="header-anchor" href="#_2-explain-两个变种" aria-hidden="true">#</a> 2.explain 两个变种</h2><p>1）explain extended：会在 explain 的基础上额外提供一些查询优化的信息。紧随其后通过 show warnings 命令可以得到优化后的查询语句，从而看出优化器优化了什么。额外还有 filtered 列，是一个半分比的值，rows * filtered/100 可以估算出将要和 explain 中前一个表进行连接的行数（前一个表指 explain 中的id值比当前表id值小的表）。</p><blockquote><p>MySQL 8.0 版本不支持 （extended ）</p><p>explain extended select * from film where id = 1;</p><p>explain select * from film where id = 1;</p><p>show warnings;</p></blockquote><p>2)explain partitions：相比 explain 多了个 partitions 字段，如果查询是基于分区表的话，会显示查询将访问的分 区。</p><h2 id="_3-explain中的列" tabindex="-1"><a class="header-anchor" href="#_3-explain中的列" aria-hidden="true">#</a> 3.explain中的列</h2><p>接下来我们将展示 explain 中每个列的信息。</p><h3 id="_1-id列" tabindex="-1"><a class="header-anchor" href="#_1-id列" aria-hidden="true">#</a> 1.id列</h3><p>id列的编号是 select 的序列号，有几个 select 就有几个id，并且id的顺序是按 select 出现的顺序增长的。 id列越大执行优先级越高，id相同则从上往下执行，id为NULL最后执行。</p><h3 id="_2-select-type列" tabindex="-1"><a class="header-anchor" href="#_2-select-type列" aria-hidden="true">#</a> 2.select_type列</h3><p>select_type 表示对应行是简单还是复杂的查询。 1）simple：简单查询。查询不包含子查询和union</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from film where id = 2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+n+`" alt="image-20240317183045685"></p><p>2）primary：复杂查询中最外层的 select 3）subquery：包含在 select 中的子查询（不在 from 子句中） 4）derived：包含在 from 子句中的子查询。MySQL会将结果存放在一个临时表中，也称为派生表（derived的英文含义） 用这个例子来了解 primary、subquery 和 derived 类型</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>set session optimizer_switch=&#39;derived_merge=off&#39;; #关闭mysql5.7新特性对衍生表的合并优化

explain select (select 1 from actor where id = 1) from (select * from film where
id = 1) der;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+d+`" alt="image-20240317183857943"></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>set session optimizer_switch=&#39;derived_merge=on&#39;; #还原默认配置
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>5）union：在 union 中的第二个和随后的 select</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code> explain select 1 union all select 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+m+`" alt="image-20240317184405816"></p><h3 id="_3-table列" tabindex="-1"><a class="header-anchor" href="#_3-table列" aria-hidden="true">#</a> 3.table列</h3><p>这一列表示 explain 的一行正在访问哪个表。 当 from 子句中有子查询时，table列是 &quot;derivenN&quot;格式，表示当前查询依赖 id=N 的查询，于是先执行 id=N 的查询。 当有 union 时，UNION RESULT 的 table 列的值为&lt;union1,2&gt;，1和2表示参与 union 的 select 行id。</p><h3 id="_4-type列" tabindex="-1"><a class="header-anchor" href="#_4-type列" aria-hidden="true">#</a> 4.type列</h3><p>这一列表示关联类型或访问类型，即MySQL决定如何查找表中的行，查找数据行记录的大概范围。 依次从最优到最差分别为：system &gt; const &gt; eq_ref &gt; ref &gt; range &gt; index &gt; ALL 一般来说，得保证查询达到range级别，最好达到ref NULL：mysql能够在优化阶段分解查询语句，在执行阶段用不着再访问表或索引。例如：在索引列中选取最小值，可以单独查找索引来完成，不需要在执行时访问表</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select min(id) from film;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+r+`" alt="image-20240317184730335"> const, system：mysql能对查询的某部分进行优化并将其转化成一个常量（可以看show warnings 的结果)。用于primary key 或 unique key 的所有列与常数比较时，所以表最多有一个匹配行，读取1次，速度比较快。system是 const的特例，表里只有一条元组匹配时为system</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain extended select * from (select * from film where id = 1) tmp;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+c+`" alt="image-20240317185102121"></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>show warnings;	
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+t+`" alt="image-20240317185244881"></p><p>eq_ref：primary key 或 unique key 索引的所有部分被连接使用 ，最多只会返回一条符合条件的记录。这可能是在const 之外最好的联接类型了，简单的 select 查询不会出现这种 type。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from film_actor left join film on film_actor.film_id = film.id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+p+`" alt="image-20240317185818550"></p><p>ref：相比 eq_ref，不使用唯一索引，而是使用普通索引或者唯一性索引的部分前缀，索引要和某个值相比较，可能会找到多个符合条件的行。</p><ol><li>简单 select 查询，name是普通索引（非唯一索引）</li></ol><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from film where name = &#39;film1&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.关联表查询，idx_film_actor_id是film_id和actor_id的联合索引，这里使用到了film_actor的左边前缀film_id部分。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select film_id from film left join film_actor on film.id = film_actor.film_id;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>range：范围扫描通常出现在 in(), between ,&gt; ,&lt;, &gt;= 等操作中。使用一个索引来检索给定范围的行。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from actor where id &gt; 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+o+`" alt="image-20240317190127535"></p><p>index：扫描全索引就能拿到结果，一般是扫描某个二级索引，这种扫描不会从索引树根节点开始快速查找，而是直接对二级索引的叶子节点遍历和扫描，速度还是比较慢的，这种查询一般为使用覆盖索引，二级索引一般比较小，所以这种通常比ALL快一些。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from film;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+v+`" alt="image-20240317190252190"> ALL：即全表扫描，扫描你的聚簇索引的所有叶子节点。通常情况下这需要增加索引来进行优化了。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from actor;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+u+`" alt="image-20240317190332063"></p><h3 id="_5-possible-keys列" tabindex="-1"><a class="header-anchor" href="#_5-possible-keys列" aria-hidden="true">#</a> 5.possible_keys列</h3><p>这一列显示查询可能使用哪些索引来查找。 explain 时可能出现 possible_keys 有列，而 key 显示 NULL 的情况，这种情况是因为表中数据不多，mysql认为索引对此查询帮助不大，选择了全表查询。 如果该列是NULL，则没有相关的索引。在这种情况下，可以通过检查 where 子句看是否可以创造一个适当的索引来提高查询性能，然后用 explain 查看效果。</p><h3 id="_6-key列" tabindex="-1"><a class="header-anchor" href="#_6-key列" aria-hidden="true">#</a> 6.key列</h3><p>这一列显示mysql实际采用哪个索引来优化对该表的访问。 如果没有使用索引，则该列是 NULL。如果想强制mysql使用或忽视possible_keys列中的索引，在查询中使用 force index、ignore index。</p><h3 id="_7-key-len列" tabindex="-1"><a class="header-anchor" href="#_7-key-len列" aria-hidden="true">#</a> 7.key_len列</h3><p>这一列显示了mysql在索引里使用的字节数，通过这个值可以算出具体使用了索引中的哪些列。 举例来说，film_actor的联合索引 idx_film_actor_id 由 film_id 和 actor_id 两个int列组成，并且每个int是4字节。通过结果中的key_len=4可推断出查询使用了第一个列：film_id列来执行索引查找。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from film_actor where film_id = 2;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>key_len计算规则如下：</p><ul><li><p>字符串，char(n)和varchar(n)，5.0.3以后版本中，n均代表字符数，而不是字节数，如果是utf-8，一个数字或字母占1个字节，一个汉字占3个字节</p><ul><li>char(n)：如果存汉字长度就是 3n 字节</li><li>varchar(n)：如果存汉字则长度是 3n + 2 字节，加的2字节用来存储字符串长度，因为varchar是变长字符串</li></ul></li><li><p>数值类型</p><ul><li>tinyint：1字节</li><li>smallint：2字节</li><li>int：4字节</li><li>bigint：8字节</li></ul></li><li><p>时间类型</p><ul><li>date：3字节</li><li>timestamp：4字节</li><li>datetime：8字节</li></ul></li><li><p>如果字段允许为 NULL，需要1字节记录是否为 NULL，索引最大长度是768字节，当字符串过长时，mysql会做一个类似左前缀索引的处理，将前半部分的字符提取出来做索引。</p></li></ul><h3 id="_8-ref列" tabindex="-1"><a class="header-anchor" href="#_8-ref列" aria-hidden="true">#</a> 8.ref列</h3><p>这一列显示了在key列记录的索引中，表查找值所用到的列或常量，常见的有：const（常量），字段名（例：film.id）</p><h3 id="_9-rows列" tabindex="-1"><a class="header-anchor" href="#_9-rows列" aria-hidden="true">#</a> 9.rows列</h3><p>这一列是mysql估计要读取并检测的行数，注意这个不是结果集里的行数。</p><h3 id="_10-extra列" tabindex="-1"><a class="header-anchor" href="#_10-extra列" aria-hidden="true">#</a> 10.Extra列</h3><p>这一列展示的是额外信息。常见的重要值如下： 1）Using index：使用覆盖索引 覆盖索引定义：mysql执行计划explain结果里的key有使用索引，如果select后面查询的字段都可以从这个索引的树中获取，这种情况一般可以说是用到了覆盖索引，extra里一般都有using index；覆盖索引一般针对的是辅助索引，整个查询结果只通过辅助索引就能拿到结果，不需要通过辅助索引树找到主键，再通过主键去主键索引树里获取其它字段值</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select film_id from film_actor where film_id = 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+g+`" alt="image-20240317213540685"></p><p>2）Using where：使用 where 语句来处理结果，并且查询的列未被索引覆盖</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from actor where name = &#39;a&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>3）Using index condition：查询的列不完全被索引覆盖，where条件中是一个前导列的范围；</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from film_actor where film_id &gt; 1;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4）Using temporary：mysql需要创建一张临时表来处理查询。出现这种情况一般是要进行优化的，首先是想到用索引来优化。</p><ol><li>actor.name没有索引，此时创建了张临时表来distinct</li></ol><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select distinct name from actor;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+b+`" alt="image-20240317213737539"></p><p>2.film.name建立了idx_name索引，此时查询时extra是using index,没有用临时表</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>explain select distinct name from film;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+y+`" alt="image-20240317213832403"></p><p>5）Using filesort：将用外部排序而不是索引排序，数据较小时从内存排序，否则需要在磁盘完成排序。这种情况下一般也是要考虑使用索引来优化的。</p><ol><li>actor.name未创建索引，会浏览actor整个表，保存排序关键字name和对应的id，然后排序name并检索行记录</li></ol><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from actor order by name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+E+`" alt="image-20240317213937298"></p><ol start="2"><li>film.name建立了idx_name索引,此时查询时extra是using index</li></ol><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from film order by name;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+h+`" alt="image-20240317214050363"> 6）Select tables optimized away：使用某些聚合函数（比如 max、min）来访问存在索引的某个字段是</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code> explain select min(id) from film;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+_+'" alt="image-20240317214749162"></p><h1 id="索引最佳实践" tabindex="-1"><a class="header-anchor" href="#索引最佳实践" aria-hidden="true">#</a> 索引最佳实践</h1><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>示例表：\nCREATE TABLE `employees` (\n `id` int(11) NOT NULL AUTO_INCREMENT,\n `name` varchar(24) NOT NULL DEFAULT &#39;&#39; COMMENT &#39;姓名&#39;,\n `age` int(11) NOT NULL DEFAULT &#39;0&#39; COMMENT &#39;年龄&#39;,\n `position` varchar(20) NOT NULL DEFAULT &#39;&#39; COMMENT &#39;职位&#39;,\n `hire_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT &#39;入职时间&#39;,\n PRIMARY KEY (`id`),\n KEY `idx_name_age_position` (`name`,`age`,`position`) USING BTREE\n ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT=&#39;员工记录表&#39;;\n\nINSERT INTO employees(name,age,position,hire_time) VALUES(&#39;LiLei&#39;,22,&#39;manager&#39;,NOW());\nINSERT INTO employees(name,age,position,hire_time) VALUES(&#39;HanMeimei&#39;,\n23,&#39;dev&#39;,NOW());\nINSERT INTO employees(name,age,position,hire_time) VALUES(&#39;Lucy&#39;,23,&#39;dev&#39;,NOW());\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>1.全值匹配</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name= &#39;LiLei&#39;;\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="'+L+`" alt="image-20240317220714143"></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name= &#39;LiLei&#39; AND age = 22;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+q+`" alt="image-20240317220824759"></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name= &#39;LiLei&#39; AND age = 22 AND position =&#39;manager&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><img src="`+x+`" alt="image-20240317220850046"></p><p>2.最左前缀法则 如果索引了多列，要遵守最左前缀法则。指的是查询从索引的最左前列开始并且不跳过索引中的列。</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name = &#39;Bill&#39; and age = 31;
EXPLAIN SELECT * FROM employees WHERE age = 30 AND position = &#39;dev&#39;;
EXPLAIN SELECT * FROM employees WHERE position = &#39;manager&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3.不在索引列上做任何操作（计算、函数、（自动or手动）类型转换），会导致索引失效而转向全表扫描</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name = &#39;LiLei&#39;;

EXPLAIN SELECT * FROM employees WHERE left(name,3) = &#39;LiLei&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给hire_time增加一个普通索引：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE \`employees\` ADD INDEX \`idx_hire_time\` (\`hire_time\`) USING BTREE ;
EXPLAIN select * from employees where date(hire_time) =&#39;2018‐09‐30&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>转化为日期范围查询，有可能会走索引：</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN select * from employees where hire_time &gt;=&#39;2018‐09‐30 00:00:00&#39; and hire_time &lt;=&#39;2018‐09‐30 23:59:59&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>还原最初索引状态</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE \`employees\` DROP INDEX \`idx_hire_time\`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>4.存储引擎不能使用索引中范围条件右边的列</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name= &#39;LiLei&#39; AND age = 22 AND position =&#39;manager&#39;;
EXPLAIN SELECT * FROM employees WHERE name= &#39;LiLei&#39; AND age &gt; 22 AND position =&#39;manager&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>5.尽量使用覆盖索引（只访问索引的查询（索引列包含查询列）），减少 select * 语句</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT name,age FROM employees WHERE name= &#39;LiLei&#39; AND age = 23 AND position=&#39;manager&#39;;
EXPLAIN SELECT * FROM employees WHERE name= &#39;LiLei&#39; AND age = 23 AND position =&#39;manager&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>6.mysql在使用不等于（！=或者&lt;&gt;），not in ，not exists 的时候无法使用索引会导致全表扫描&lt; 小于、 &gt; 大于、 &lt;=、&gt;= 这些，mysql内部优化器会根据检索比例、表大小等多个因素整体评估是否使用索引</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name != &#39;LiLei&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>7.is null,is not null 一般情况下也无法使用索引</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name is null
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>8.like以通配符开头（&#39;$abc...&#39;）mysql索引失效会变成全表扫描操作</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name like &#39;%Lei&#39;

EXPLAIN SELECT * FROM employees WHERE name like &#39;Lei%&#39;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>问题：解决like&#39;%字符串%&#39;索引不被使用的方法？ a）使用覆盖索引，查询字段必须是建立覆盖索引字段</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT name,age,position FROM employees WHERE name like &#39;%Lei%&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>b）如果不能使用覆盖索引则可能需要借助搜索引擎 9.字符串不加单引号索引失效</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name = &#39;1000&#39;;
EXPLAIN SELECT * FROM employees WHERE name = 1000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>10.少用or或in，用它查询时，mysql不一定使用索引，mysql内部优化器会根据检索比例、表大小等多个因素整体评估是否使用索引，详见范围查询优化 1</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>EXPLAIN SELECT * FROM employees WHERE name = &#39;LiLei&#39; or name = &#39;HanMeimei&#39;;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>11.范围查询优化 给年龄添加单值索引</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE \`employees\` ADD INDEX \`idx_age\` (\`age\`) USING BTREE ;
explain select * from employees where age &gt;=1 and age &lt;=2000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>没走索引原因：mysql内部优化器会根据检索比例、表大小等多个因素整体评估是否使用索引。比如这个例子，可能是由于单次数据量查询过大导致优化器最终选择不走索引 优化方法：可以将大的范围拆分成多个小范围</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>explain select * from employees where age &gt;=1 and age &lt;=1000;
explain select * from employees where age &gt;=1001 and age &lt;=2000;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>还原最初索引状态</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>ALTER TABLE \`employees\` DROP INDEX \`idx_age\`;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>索引使用总结：</p><p><img src="`+f+`" alt="image-20240317223251335"></p><p>like KK%相当于=常量，%KK和%KK% 相当于范围</p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>‐‐ mysql5.7关闭ONLY_FULL_GROUP_BY报错
2 select version(), @@sql_mode;SET sql_mode=(SELECT REPLACE(@@sql_mode,&#39;ONLY_FULL_GROUP_BY&#39;,&#39;&#39;));
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,134),A=[T];function R(I,O){return i(),s("div",null,A)}const U=e(N,[["render",R],["__file","10Explan.html.vue"]]);export{U as default};
