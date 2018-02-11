---
date: 2018-1-6 18:32:39
title: 使用EditorConfig插件来格式化代码
category: 使用笔记
---

初衷：VS Code是个很棒的编辑器（or IDE？），但是在自定义代码格式化上面还有很多不足，例如在WebStrom中可以设置不同的语言使用不同的方法来格式化代码，但在vscode中却无法设置，默认在HTML文件中会使用tab来缩进，但在css/scss中却使用两个空格来缩进，以及可能对于py会使用四个空格来缩进，也许这样符合大多数人的编写习惯，但对于有特殊要求的人来说却无法满足。

## EditorConfig

EditorConfig是一个可以在不同的编辑器或者IDE中保持同一代码风格的插件，例如在一个项目中，成员之间如果使用不同的编辑器来编写代码，有的人喜欢使用tab缩进或者空格，或者有的人喜欢把一个tab设置为2个空格而不是4个，这就会造成你们一起编写的代码很混乱，而EditorConfig这个插件就可以解决这个问题。



### 安装

各大流行IDE都可以在其插件商店搜索并安装这款插件，WebStrom自带，VSCODE的安装步骤如下：

![](/pics/2018/01/0601.png)

### 使用方法

安装完成之后，你只需要项目的根目录下新建一个`.editorconfig`文件即可。

这是一个官方实例：


```conf
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```


#### 参数

来说一下常用参数

1）使用方括号`[]`来指定文件

```conf
[*]	# 匹配所有文件

[*.py]	# 匹配所有python文件

[lib/**.js]	# 匹配lib文件夹下的所有js文件

```

2）`indent_style`

设置`indent_style`来指定代码缩进方案

```conf
indent_style = tab	# 使用制表符缩进

indent_style = space	# 使用空格缩进

```

3）`indent_size`

设置`indent_size`来指定缩进长度

```conf
indent_style = space
indent_size = 2	# 使用2个空格缩进
```

4）`end_of_line`

设置`end_of_line`来指定行结尾方式

```conf
end_of_line = lf	# 换行（Unix-like）
end_of_line = cr	# 回车（Mac）
end_of_line = crlf	# 回车 换行（WINDOWS)
```

不了解这个的朋友默认就好了（lf），我在[这里](https://fanzhiyang.com/blog/git-warning-lf-crlf/#%E4%B8%80crlfcrlf%E4%B9%8B%E9%97%B4%E7%9A%84%E5%85%B3%E7%B3%BB)有提到过

5）`charset`

这个就不用多说了，默认utf-8即可，详见[理解计算机字符编码 - 樊志阳的个人博客](https://fanzhiyang.com/blog/understanding-computer-character-encoding/)

6）`trim_trailing_whitespace`、`insert_final_newline`

- 设置`trim_trailing_whitespace`来规定是否允许行尾空格

- 设置`insert_final_newline`表示文件是否以空行结束

两者都是布尔值


## 参考

- [EditorConfig](http://editorconfig.org/)

- [EditorConfig Properties · editorconfig/editorconfig Wiki](https://github.com/editorconfig/editorconfig/wiki/EditorConfig-Properties)
