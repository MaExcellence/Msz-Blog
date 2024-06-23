import{_ as s,o as i,c as a,b as e,a as n}from"./app-3bb1037e.js";const r="/assets/1695648548975-5ba054e2.png",l="/assets/1696688429271-62339674.png",d="/assets/1696689291630-c889e400.png",v="/assets/1696689415899-a5d18151.png",c="/assets/1697885689495-253d090a.png",t="/assets/1697886265614-03502122.png",u="/assets/1697887161764-3adbbf72.png",m="/assets/1697887193289-9838a4e5.png",b="/assets/1697887555685-fac7e587.png",o={},p=e('<h2 id="一-低版本mysql实现窗口函数" tabindex="-1"><a class="header-anchor" href="#一-低版本mysql实现窗口函数" aria-hidden="true">#</a> 一.低版本MySql实现窗口函数</h2><h2 id="_1-问题" tabindex="-1"><a class="header-anchor" href="#_1-问题" aria-hidden="true">#</a> 1.问题</h2><p>低版本的MySql ，无法使用,rank（）,row_number（）等其它窗口函数。</p><h2 id="_2-解决方案" tabindex="-1"><a class="header-anchor" href="#_2-解决方案" aria-hidden="true">#</a> 2.解决方案</h2><p>测试表：<img src="'+r+`" alt="1695648548975"></p><h3 id="_1-row-number" tabindex="-1"><a class="header-anchor" href="#_1-row-number" aria-hidden="true">#</a> 1.row_number()</h3><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- MySql8.0中的row_number（）函数，可以使用变量来实现。

-- 能用但是不会并列 
select t.id,t.score,t.week,
IF(@pre_name = t.week , @cur_rank := @cur_rank + 1, @cur_rank := 1) ranking,
@pre_name := t.week weeking
FROM stock t, (SELECT @cur_rank := 0, @pre_name := NULL) r
ORDER BY week DESC,score DESC; 


-- 优化后 --
select t.id,t.score,t.week,
IF(@pre_name = t.week , @rank_counter := @rank_counter + 1, @rank_counter := 1) pm,
IF(@pre_score = t.score , @cur_rank := @cur_rank , @cur_rank := @rank_counter) blpm,
@pre_name := t.week weeknum,
@pre_score := t.score scoreCount
FROM stock t, (SELECT @pre_name := NULL, @pre_score := NULL,@cur_rank := 0,@rank_counter:=0) r
ORDER BY CAST(week AS FLOAT) DESC,CAST(score AS FLOAT) DESC; 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-sum-over" tabindex="-1"><a class="header-anchor" href="#_2-sum-over" aria-hidden="true">#</a> 2.SUM() OVER()</h3><p>测试表：<img src="`+l+`" alt="1696688429271"></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- -----视图_转换格式
CREATE VIEW npyyzb_kv35220 AS 
SELECT SUM(a.35kv) &#39;35kv&#39;, SUM(a.110kv) &#39;110kv&#39;, SUM(a.220kv) &#39;220kv&#39;,&quot;全市&quot; name ,a.j
FROM(
SELECT a.*,IF(b =35,1,0) as &#39;35kv&#39;,IF(b =110,1,0) as &#39;110kv&#39;,IF(b =220,1,0) as &#39;220kv&#39;
FROM(
select * FROM kv35220 
)a
)a
GROUP BY a.j
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+d+`" alt="1696689291630"></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-----------------高版本实现
SELECT  
j,
SUM(110kv) OVER(partition by SUBSTR(j,1,4) ORDER BY j) 110kv 
FROM npyyzb_kv35220

-----------------低版本实现
SELECT 
 a.j,
(
	SELECT SUM(b.35kv)
	FROM  npyyzb_kv35220 b
	WHERE b.j &lt;= a.j  AND SUBSTR(b.j,1,4) = SUBSTR(a.j,1,4) 
  )35kv,
(
	SELECT SUM(b.110kv)
	FROM  npyyzb_kv35220 b
	WHERE b.j &lt;= a.j AND SUBSTR(b.j,1,4) = SUBSTR(a.j,1,4) 
  )110kv,
(
	SELECT SUM(b.220kv)
	FROM  npyyzb_kv35220 b
	WHERE b.j &lt;= a.j  AND SUBSTR(b.j,1,4) = SUBSTR(a.j,1,4) 
  )220kv
from npyyzb_kv35220 a
GROUP BY j
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+v+'" alt="1696689415899"></p>',13),_=n("div",{class:"custom-container tip"},[n("svg",{xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},[n("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[n("circle",{cx:"12",cy:"12",r:"9"}),n("path",{d:"M12 8h.01"}),n("path",{d:"M11 12h1v4h1"})])]),n("p",{class:"custom-container-title"},"TIP"),n("p",null,"另外一种实现方式：利用变量")],-1),k=e('<p><strong>为了解决上述问题1：新增了一张周数的配置表。</strong></p><p><img src="'+c+'" alt="1697885689495"></p><p><strong>遇到新的问题：因为是计算累计值，本周没有数据，就展示上周的累计数据。</strong></p><p><strong>-- 最终实现方式 --</strong></p><p>原始数据：</p><p><img src="'+t+`" alt="1697886265614"></p><hr><p><strong>视图1：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 视图1
CREATE VIEW view_1 AS
SELECT SUM(a.35kv) &#39;35kv&#39;, SUM(a.110kv) &#39;110kv&#39;, SUM(a.220kv) &#39;220kv&#39;,&quot;全市&quot; name ,a.TBZS
FROM(
SELECT a.*,IF(b =35,1,0) as &#39;35kv&#39;,IF(b =110,1,0) as &#39;110kv&#39;,IF(b =220,1,0) as &#39;220kv&#39;
FROM(
select * FROM np_35220 WHERE i != &quot;是&quot; 
)a
)a
GROUP BY a.TBZS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><img src="`+u+`" alt="1697887161764"></p><hr><p><strong>视图2：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 视图2
CREATE VIEW view_2 AS
SELECT a.weeknum as tbzs,
if(b.35kv is null ,0,b.35kv ) 35kv,
if(b.110kv is null ,0,b.110kv ) 110kv,
if(b.220kv is null ,0,b.220kv ) 220kv,
&quot;全市&quot; name 
FROM (
	SELECT * FROM configweek
)a
LEFT JOIN (
	SELECT * from 	view_1
)b
ON a.weeknum = b.tbzs
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><p><img src="`+m+`" alt="1697887193289"></p><hr><p><strong>视图3：</strong></p><div class="language-mysql line-numbers-mode" data-ext="mysql"><pre class="language-mysql"><code>-- 视图3 （利用变量来实现sum() over()函数）
SELECT a.*,a.35kv+a.110kv+a.220kv as sum 
FROM(
select t.tbzs,
cast(IF(@pre_name = substr(t.tbzs,1,4) , @cur_35 := @cur_35 + 35kv, @cur_35 := 35kv) as char) 35kv,
cast(IF(@pre_name = substr(t.tbzs,1,4) , @cur_110 := @cur_110 + 110kv, @cur_110 := 110kv)as char) 110kv,
cast(IF(@pre_name = substr(t.tbzs,1,4) , @cur_220 := @cur_220 + 220kv, @cur_220 := 220kv)as char) 220kv,
@pre_name := substr(t.tbzs,1,4) year1
FROM view_2 t, (SELECT @cur_35 := 0,@cur_110 := 0,@cur_220 := 0, @pre_name := NULL) r
ORDER BY substr(t.tbzs,1,4) asc,tbzs asc
)a
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><img src="`+b+'" alt="1697887555685"></p>',20),g=[p,_,k];function h(E,S){return i(),a("div",null,g)}const y=s(o,[["render",h],["__file","ckhs.html.vue"]]);export{y as default};
