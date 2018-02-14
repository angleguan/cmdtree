---
title: 'MySQL学习笔记（3）简单SELECT语句'
Caregory: 学习笔记
date: 2018-2-14 20:26:41
---

本文用来总结，推荐阅读

- [SQL SELECT 语句](http://www.w3school.com.cn/sql/sql_select.asp)

- [基础篇 - SELECT 语句详解 - 实验楼](https://www.shiyanlou.com/courses/9/labs/74/document)

---

**SELECT 语句用于从表中选取数据。**

结果被存储在一个结果表中（称为结果集）。

用法:

```sql
SELECT 要查询的列名 FROM 表名字 WHERE 限制条件;
```

可用*代替可输出所有的列

### 数学符号条件

where限制条件可加入数学符号`=,<,>,>=,<=`。

例如：

```
SELECT * FROM sstud WHERE age>=25;

SELECT * FROM sstud WHERE name='join';
```

### AND OR

WHERE后面可以有不止一条限制，而根据条件之间的逻辑关系，可以用`OR(||)`和`AND(&&)`连接：

例如：

```
SELECT * FROM sstud WHERE age>=23 AND age<=25 ;
SELECT * FROM sstud WHERE age=23 OR age=25;

SELECT * FROM sstud WHERE age BETWEEN 23 AND 25;
```

### IN 和 NOT IN

`IN`、`NOT IN`表示在或不在。例如下面的语句用来查询在in_dpt是dpt3或dpt4中的数据。

```sql
SELECT name,age,phone,in_dpt FROM employee WHERE in_dpt IN ('dpt3','dpt4');
```

而`NOT IN`相反，用来查询某值不为某值中的数据。

### 通配符

关键字`LIKE`在SQL语句中和通配符一起使用，通配符代表未知字符。SQL中的通配符是`_`和`%`。其中`_`代表一个未指定字符，`%`代表不定个未指定字符。

比如，要只记得电话号码前四位数为1101，而后两位忘记了，则可以用**两个**`_`通配符代替：

```
SELECT name,age,phone  FROM employee WHERE phone LIKE '1101__';
```

### 排序

SQL可以使用`ORDER BY`关键词对表进行排序。默认情况下，`ORDER BY`的结果是升序排列，而使用关键词`ASC`和`DESC`可指定升序或降序排序。

比如，我们按salary降序排列，SQL语句为：

```sql
SELECT name,age,salary,phone FROM employee ORDER BY salary DESC;
```

### 内置函数和计算

SQL 允许对表中的数据进行计算。对此，SQL 有 5 个内置函数，这些函数都对`SELECT`的结果做操作：

|函数名：| COUNT | SUM | AVG | MAX| MIN |
| :------------ | :------------ | :------------ | :------------ | :------------ | :------------ | 
|作用：| 计数| 求和 | 求平均值 | 最大值 | 最小值 |

> 其中 COUNT 函数可用于任何数据类型(因为它只是计数)，而 SUM 、AVG 函数都只能对数字类数据类型做计算，MAX 和 MIN 可用于数值、字符串或是日期时间数据类型。

```sql
select count(Code) FROM Car 查询Car表中有多少条数据
select max(Price) FROM Car  取Car表中价格的最大值
select min(Price) FROM Car  取Car表中价格的最小值
select sum(Price) FROM Car  取Car表中价格的总和
select avg(Price) FROM Car  取Car表中价格的平均值
```

