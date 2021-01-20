## 短链系统设计


Q0: 场景
A0: 微博推文，短信推广

Q1: 怎么计算短路径
A1: 发号器（ID 自增） + 62 进制编码

Q2: 分布式发号器
A2:
* UUID： 产生的内容过长，没意义
* 多台 MySQL 服务器：它有一个自增 ID。假设 8 台，第一台 MySQL 初始值为 1，每次自增 8；第二台初始值为 2，每次自增 8，依次类推。缺点：ID 是连续，容易被爬虫顺着 ID 抓数据 
* 多台MySQL服务器: 第一台只发100取余等于0的数字n，依次类推, 这样可以随时扩展我们的机器
* 雪花算法分布式生成唯一 ID

Q3: 自定义短路径

Q4: 一个长链接对于一个还是多少短链接
A4:  一个长链接，在不同的地点，不同的用户等情况下，生成的短链接应该不一样。这样才能更好的进行数据分析。

Q5: 如何存储长/短链接
A5: KV形式存储，以短链接为 primary key， 长网址为 value，用 MySQL/redis 进行存储

Q6: 301/302的区别
A6: 第一次301后，浏览器会进行缓存，下次再访问短链接时，不会再去请求短链接服务器而是直接从浏览器本地的缓存拿到长链接。好处是减少短链接服务器的压力，缺点是不能统计短链接的点击次数。
302请求表示临时重定向，浏览器不会主动去缓存它，每次点击都会去请求服务器。方便统计点击次数

Q7: 预防攻击防止耗光ID
A7: 限制IP的单日请求总数+缓存redis服务器(长链接->ID)，仅存一天数据，用LRU机制。当发大量同一个网址过来，直接从缓存服务器里返回短网址

Q8: 为什么是62进制而不是64进制
A8: 62进制转换是因为62进制转换后只含数字+小写+大写字母。而64进制转换会含有/,+这样的符号（不符合正常URL的字符）

### 自增算法业务流程
```flow
  st=>start: 开始
  inp1=>inputoutput: 输入网址
  cond1=>condition: 数据库/redis不存在该短码
  op1=>operation: 保存输入的网址到数据库/redis
  op2=>operation: 根据id计算对应的短码
  op3=>operation: 更新短码到数据库
  op4=>operation: 返回对应的短码 
  inp2=>inputoutput: 返回短网址
  e=>end

  st->inp1->cond1
  cond1(yes)->op1->op2->op3->op4
  cond1(no)->op4
  op4->inp2->e

```

Reference：

- [知乎话题](https://www.zhihu.com/question/20103344/answer/573638467)
- [设计短链接系统](http://cn.soulmachine.me/2017-04-10-how-to-design-tinyurl/)
- [base62与短链接](https://www.jianshu.com/p/3156cc5d6ae3)
- [base62工具](https://tool.lu/hexconvert/)

