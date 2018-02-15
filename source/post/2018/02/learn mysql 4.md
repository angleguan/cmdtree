---
title: '[简记]MySQL学习笔记（4）简单的修改与删除'
Caregory: 学习笔记
date: 2018-2-15 11:19:07
---

## 修改数据库

**删除数据库**

```sql
DROP DATABASE test1;
```

## 修改数据表

**重命名表**

```sql
RENAME TABLE 原名 TO 新名
```

**删除表**

```sql
DROP TABLE table_name;
```

## 修改列

**添加列**

```sql
ALTER TABLE 表名字 ADD COLUMN 列名字 数据类型 约束;
```

使用`AFTER col_name`可以实现添加在某列后面

使用`FIREST`可以实现添加在最前面（左边）

**删除列**

```sql
ALTER TABLE 表名字 DROP COLUMN 列名字;
```

**重命名列**

```sql
ALTER TABLE 表名字 CHANGE 原列名 新列名 数据类型 约束;
```

**修改数据类型**

```sql
ALTER TABLE 表名字 MODIFY 列名字 新数据类型;
```

修改数据类型会导致数据消失

## 修改表内容

**修改某值**

```sql
UPDATE 表名字 SET 列1=值1,列2=值2 WHERE 条件;
```

**删除某行**

删除某行使用`WHERE`来指定行相关信息

```sql
DELETE FROM 表名字 WHERE 条件;
```
