---
title: '[简记]MySQL学习笔记（1）创建数据库插入数据'
category: 学习笔记
date: 2018-2-13 16:46:41
---

首先启动mysql服务并登陆

```
mysql -u root
```

使用`show databases;`查看所有的数据库

### 创建数据库

```sql
CREATE DATABASE mysql_data;
```

mysql不区分大小写，但为了区分保留字，所以建议关键字使用全大写

**定位到某个数据库**

```
use mysql_data;
```

显示该数据库下的数据表

```
show tables;
```

创建数据表

```
CREATE TABLE table1 (
  rowa int(10),
  rowb char(20),
  rowc int(20)
);
```

### 数据类型

| 数据类型 | 大小(字节) | 用途 | 格式 |
| :------------ | :------------ | :------------ | :------------ |
| INT | 4 | 整数 | |
| FLOAT | 	4 | 	单精度浮点数	 |  | 
| DOUBLE | 	8	 | 双精度浮点数	 |  | 
| ENUM | 	 | 	单选,比如性别 | 	ENUM('a','b','c')
| SET	 |  | 	多选 | 	SET('1','2','3')
| DATE | 	3 | 	日期 | 	YYYY-MM-DD
| TIME | 	3 | 	时间点或持续时间 | 	HH:MM:SS 
| YEAR | 	1	 | 年份值	YYYY |  | 
| CHAR | 	0~255	 | 定长字符串	 |  | 
| VARCHAR |  | 	0~255	变长字符串	 |  | 
| TEXT | 	0~65535	 | 长文本数据	 |  | 

### 插入数据

**显示该数据表下的所有数据**

```
SELECT * FROM table1;
```

**插入数据**

```
INSERT INTO table1(rowname) VALUES(value)
```

或者直接

```sql
INSERT INTO table1 VALUES(value, value2)
```

一些数据类型需要用单引号括起来，一些数字类型则不用

没有指定的列的值为NULL
