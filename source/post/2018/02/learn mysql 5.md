---
title: '[简记]MySQL学习笔记（5）索引视图、备份还原'
category: 学习笔记
date: 2018-2-18 08:30:41
---

推荐阅读：

[基础篇 - 其他基本操作 - 实验楼](https://www.shiyanlou.com/courses/9/labs/76/document)

------

## 索引

索引是存放在模式（schema）中的一个数据库对象，索引的作用就是提高对表的检索查询速度，索引是通过快速访问的方法来进行快速定位数据，从而减少了对磁盘的读写操作。

索引类似于书籍的目录，可以快速定位到相关的数据，一个表可以有多个索引。

```sql
//创建索引
create index idx_temp_name on temp(name);

//组合索引
create index idx_temp_name$pwd on temp(name, pwd);

//删除索引
drop index idx_temp_name on temp;
```

## 视图

视图就是一个表或多个表的查询结果，它是一张虚拟的表，因为它并不能存储数据。

```sql
//创建、修改视图
create or replace view view_temp as select name, age from temp;

//通常不对视图的数据做修改操作，因为视图是一张虚拟的表，它并不存储实际数据。如果想让视图不被修改，可以用with check option来完成限制。
create or replace view view_temp as  select *from temp with check option;

//删除视图
drop view view_temp;

//显示创建语法
show create view v_temp;
```

## 导入

导入操作，可以把一个文件里的数据保存进一张表。导入语句格式为：

```sql
LOAD DATA INFILE '文件路径和文件名' INTO TABLE 表名字;
```

## 导出

导出与导入是相反的过程，是把数据库某个表中的数据保存到一个文件之中。导出语句基本格式为：

```sql
SELECT 列1，列2 INTO OUTFILE '文件路径和文件名' FROM 表名字;
```

## 备份

mysqldump 是 MySQL 用于备份数据库的实用程序。它主要产生一个 SQL 脚本文件，其中包含从头重新创建数据库所必需的命令CREATE TABLE INSERT 等。

使用 mysqldump 备份的语句：

```sql
mysqldump -u root 数据库名>备份文件名;   #备份整个数据库

mysqldump -u root 数据库名 表名字>备份文件名;  #备份整个表
```

## 恢复

```sql
source /tmp/SQL6/MySQL-06.sql

// 把备份的 bak.sql 恢复到 test 数据库：
mysql -u root test < bak.sql
```
