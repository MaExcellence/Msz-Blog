const e=JSON.parse('{"key":"v-0e4f7061","path":"/blogs/rpc/9.html","title":"3.Dubbo源码剖析","lang":"en-US","frontmatter":{"title":"3.Dubbo源码剖析","date":"2023/12/10","description":"Apache Dubbo是一款高性能的Java RPC框架。其前身是阿里巴巴公司开源的一个高性能、轻量级的开源Java RPC框架，可以和Spring框架无缝集成。","cover":"https://i.postimg.cc/gkYKcnhC/image.png","tags":["自定义RPC框架","Dubbo"],"categories":["RPC框架","Dubbo","原理深入及源码剖析"]},"headers":[{"level":2,"title":"1、源码下载和编译","slug":"_1、源码下载和编译","link":"#_1、源码下载和编译","children":[]},{"level":2,"title":"2、架构整体设计","slug":"_2、架构整体设计","link":"#_2、架构整体设计","children":[{"level":3,"title":"2.1 Dubbo调用关系说明","slug":"_2-1-dubbo调用关系说明","link":"#_2-1-dubbo调用关系说明","children":[]},{"level":3,"title":"2.2 整体的调用链路","slug":"_2-2-整体的调用链路","link":"#_2-2-整体的调用链路","children":[]},{"level":3,"title":"2.3 Dubbo 源码整体设计","slug":"_2-3-dubbo-源码整体设计","link":"#_2-3-dubbo-源码整体设计","children":[]}]},{"level":2,"title":"3、服务注册与消费源码剖析","slug":"_3、服务注册与消费源码剖析","link":"#_3、服务注册与消费源码剖析","children":[{"level":3,"title":"3.1 注册中心Zookeeper剖析","slug":"_3-1-注册中心zookeeper剖析","link":"#_3-1-注册中心zookeeper剖析","children":[]},{"level":3,"title":"3.2 服务的注册过程分析","slug":"_3-2-服务的注册过程分析","link":"#_3-2-服务的注册过程分析","children":[]},{"level":3,"title":"3.3 URL规则详解 和 服务本地缓存","slug":"_3-3-url规则详解-和-服务本地缓存","link":"#_3-3-url规则详解-和-服务本地缓存","children":[]},{"level":3,"title":"3.4 Dubbo 消费过程分析","slug":"_3-4-dubbo-消费过程分析","link":"#_3-4-dubbo-消费过程分析","children":[]}]},{"level":2,"title":"4、Dubbo扩展 SPI源码剖析","slug":"_4、dubbo扩展-spi源码剖析","link":"#_4、dubbo扩展-spi源码剖析","children":[{"level":3,"title":"4.1 getExtensionLoader 加载过程","slug":"_4-1-getextensionloader-加载过程","link":"#_4-1-getextensionloader-加载过程","children":[]},{"level":3,"title":"4.2 根据 name 获取扩展点的方法 getExtension","slug":"_4-2-根据-name-获取扩展点的方法-getextension","link":"#_4-2-根据-name-获取扩展点的方法-getextension","children":[]},{"level":3,"title":"4.3 Adaptive 功能实现原理","slug":"_4-3-adaptive-功能实现原理","link":"#_4-3-adaptive-功能实现原理","children":[]}]},{"level":2,"title":"5、集群容错源码剖析","slug":"_5、集群容错源码剖析","link":"#_5、集群容错源码剖析","children":[{"level":3,"title":"5.1 信息缓存接口 Directory","slug":"_5-1-信息缓存接口-directory","link":"#_5-1-信息缓存接口-directory","children":[]},{"level":3,"title":"5.2 路由规则实现原理","slug":"_5-2-路由规则实现原理","link":"#_5-2-路由规则实现原理","children":[]},{"level":3,"title":"5.3 Cluster 组件","slug":"_5-3-cluster-组件","link":"#_5-3-cluster-组件","children":[]},{"level":3,"title":"5.4 负载均衡实现原理","slug":"_5-4-负载均衡实现原理","link":"#_5-4-负载均衡实现原理","children":[]},{"level":3,"title":"5.5 Invoker 执行逻辑","slug":"_5-5-invoker-执行逻辑","link":"#_5-5-invoker-执行逻辑","children":[]}]},{"level":2,"title":"6、网络通信原理剖析","slug":"_6、网络通信原理剖析","link":"#_6、网络通信原理剖析","children":[{"level":3,"title":"6.1 数据包结构讲解","slug":"_6-1-数据包结构讲解","link":"#_6-1-数据包结构讲解","children":[]},{"level":3,"title":"6.2 数据协议 ExchangeCodec 详解","slug":"_6-2-数据协议-exchangecodec-详解","link":"#_6-2-数据协议-exchangecodec-详解","children":[]},{"level":3,"title":"6.3 处理粘包和拆包问题","slug":"_6-3-处理粘包和拆包问题","link":"#_6-3-处理粘包和拆包问题","children":[]}]}],"git":{"createdTime":null,"updatedTime":null,"contributors":[]},"filePathRelative":"blogs/rpc/9.md"}');export{e as data};
