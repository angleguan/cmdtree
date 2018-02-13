---
title: 'MySQL学习笔记（2）约束'
category: 学习笔记
date: 2018-2-13 19:41:45
---

约束是一种限制，它通过对表的行或列的数据做出限制，来确保表的数据的完整性、唯一性。

MYSQL中，常用的几种约束：

| 约束类型：  | 主键 | 	 默认值  | 	唯一 |  外键 |  非空| 
| 关键字：|   PRIMARY KEY | 	 DEFAULT | 	 UNIQUE |  FOREIGN KEY |  NOT NULL| 

## 默认约束

默认值约束 (DEFAULT) 规定，当有 `DEFAULT` 约束的列，插入数据为空时，将使用默认值。

**添加默认约束**

```SQL
CREATE TABLE student(
  joinTime DATETIME DEFAULT CURRENT_TIMESTAMP
 );
```

`CURRENT_TIMESTAMP`为当前时间

## 主键约束

主键约束列不允许重复，即任意两行的主键值都不相同；每行都具有一个主键值，也不允许出现空值；

**添加主键**

```sql
CREATE TABLE student(
  id INT PRIMARY KEY,         
  name VARCHAR(20),          
)
```

**为已存在的表添加主键**

```sql
alter table user
add primary key(id),
modify id bigint(20) AUTO_INCREMENT;
```

**删除主键**

```sql
alter table user
drop primary key,
modify id bigint(20);
```

## 外键约束

外键用来指定参照完整性约束，被指定为外键的列必需要有索引，外键参考列必需为另一个表的主键。

**创建外键约束**

例如表user(id,username)和表article(id,uid,title)，其中`article.uid`是外键指向`user.id`主键

```sql
CREATE TABLE article (
  id bigint(20),
  uid bigint(20),
  PRIMARY KEY (id),
  CONSTRAINT fk_user_article_uid FOREIGN KEY (uid) REFERENCES user(id)
);
```

**为没有外键约束的表添加外键约束**

```sql
alter table article 
add constraint fk_user_article_uid FOREIGN KEY(uid) REFERENCES user(id);
```

**删除外键**

例如删除article表的外键`fk_user_article_uid`

```sql
alter table article
drop foreign key fk_user_article_uid;
```

## 唯一约束

唯一约束的列的值不能重复，使用`UNIQUE KEY`关键字指定

**创建表时添加唯一约束**

```sql
create table user(
  id bigint(20) PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) UNIQUE KEY
);
```

**为已存在的表添加唯一约束**

```sql
alter table user
add constraint uk_user_email UNIQUE KEY(email);
```

**删除唯一约束**

```sql
alter table user
drop key uk_user_email;
```

## 非空约束

指定为非空的字段不能取`NULL`值

**创建表时添加非空约束**

```sql
create table user (
  id bigint(20) PRIMARY KEY AUTO_INCREMENT,
  email varchar(255) NOT NULL
);
```

**为已存在的表添加非空约束**

```sql
alter table user
modify column email varchar(255);
```

