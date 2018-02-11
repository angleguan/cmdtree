---
date: 2017-10-12 12:01:46
title: "CORS跨域资源共享"
category: JavaScript
---

出于安全考虑，浏览器会阻止从脚本内发起的跨域HTTP请求，即使用`XMLHttpRequest`发起的HTTP请求（AJAX）只能发送到自己的域。CORS就是一个用来允许服务器进行跨域资源访问的一个W3C标准，全称“跨域资源共享”（Cross-origin resource sharing）。



CORS需要客户端和服务器同时支持，目前所有的浏览器（客户端，低于IE10的不支持）都支持该机制。

跨域资源共享通常用于以下场景：

- 由`XMLHttpRequest`或[Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)发起的跨域HTTP请求。
- Web字体
- [WebGL](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)
- CSS或者Script



CORS跨域请求分为两类：简单请求和预检请求

## 简单请求

满足条件：

- 使用GET、HEAD或POST方法
- 若使用POST方法，`Content-Type`的值必须是下列之一
  - text/plain
  - multipart/form-data
  - application/x-www-form-urlencoded
- Fetch 规范定义了[对 CORS 安全的首部字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)不得人为设置该集合之外的其他首部字段。该集合为：
  - [`Accept`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept)
  - [`Accept-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language)
  - [`Content-Language`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language)
  - [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) （需要注意额外的限制）
  - `DPR`
  - `Downlink`
  - `Save-Data`
  - `Viewport-Width`
  - `Width`

原理：

简单请求直接在头信息中添加`Origin`字段来处理跨域权限：

![](/pics/2017/10/simple_req.png)

一个简单的跨域请求例子:

```
GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

Origin字段指定了要请求的地址。即http://api.bob.com。

下面是服务器的响应信息：

```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 00:23:53 GMT
Server: Apache/2.0.61 
Access-Control-Allow-Origin: *
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: application/xml
```

返回头信息中的`Access-Control-Allow-Origin`指定了该资源可被哪些外域访问，`*`表示该资源可被任意外域访问，如果服务端仅允许来自 http://foo.example 的访问，该首部字段应该指定`http://foo.example`。



若如此，该资源将不能被除`http://foo.example`之外的任何资源访问。



## 预检请求

预检请求在对服务器进行跨域访问之前，必须先使用`OPTIONS`方法发起一个预检请求到该服务器来确认该服务器是否允许跨域请求。



满足下列**任一**请求时，则必须先发送预检请求：



- 使用了下列任一方法：
  - [`PUT`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PUT)
  - [`DELETE`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/DELETE)
  - [`CONNECT`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/CONNECT)
  - [`OPTIONS`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS)
  - [`TRACE`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/TRACE)
  - [`PATCH`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/PATCH)
- 设置了除[对 CORS 安全的首部字段集合](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)之外的其他首部字段（参见上述简单请求中的字段）
-  [`Content-Type`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type) 指定了不属于上述简单请求中规定的值。

下面是一个预检请求的例子：

```
var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.setRequestHeader('Content-Type', 'application/xml');
xhr.send();
```

上面的例子使用了PUT方法并使用了自定义头信息`X-Custom-Header`，而且请求的Content-Type为`application/xml`。因此，在发送该请求前会由浏览器先发送“预检请求”。

![](/pics/2017/10/prelight.png)



下面是浏览器发送的预检请求：

```
OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0...
```

预检请求使用的方法是`OPTIONS`，Origin字段指定了要请求的源。OPTIONS是HTTP/1.1协议中定义的方法，用以从服务器获取更多信息。预检请求还会携带下列两个字段：

```
Access-Control-Request-Method: POST
Access-Control-Request-Headers: X-PINGOTHER
```

##### （1）Access-Control-Request-Method

该字段用于告知服务器该请求使用的何种方法，例如上述代码中华使用的POST方法

##### （2）Access-Control-Request-Headers

该字段用于告知服务器该请求所携带的额外的自定义请求字段，服务器来判断该请求是否被允许。



下面是该请求的响应信息：

```
HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Access-Control-Max-Age: 86400

```

#####  (1）Access-Control-Allow-Methods

该字段表明该服务器允许客户端使用的请求方法，如GET, POST, PUT。

##### （2）Access-Control-Allow-Headers

该字段表明了服务器允许请求中携带的额外字段

##### （3）Access-Control-Max-Age

该字段表明了此次响应的有效时间，例如86400，也就是一天。在有效时间内，浏览器无需为同一请求再次发送预检请求。
