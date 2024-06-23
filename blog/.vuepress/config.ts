import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "Msz's Blog   ",
  base: '/msz-blog/',
  dest:'./dist',
  description: "Blog",
  head: [
    [
      "link",
      {
        "rel": "icon",
        "href": "/avatar2.png"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    colorMode: 'light', // dark, light
    logo: "/avatar2.png",
    author: "MExcellence",
    authorAvatar: "/avatar1.png",
    docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
    docsBranch: "main",
    docsDir: "example",
    editLink: false,
    lastUpdatedText: "",
    // series 为原 sidebar
    series: {
      "/blogs/shejimoshi/": [
        {
          text: "设计模式",
          children: ["qidashejiyuanze","1.danlimoshi", "2.gongchangfangfamoshi","3.cxgcms","4.yxms","5.jzzms"
        ,"6.dlms","7.spqms","8.zszms","9.qjms","10.wgms","11.zhms","12.xyms","13.clms","14.mlms","15.zrlms",
        "16.ztms","17.gczms","18.zjzms","19.ddqms","20.fwzms","21.bwlms","22.jsqms","23.mbms"
        ],
        },
      ],
      "/blogs/spring/": [
        {
          text: "Spring",
          children: ["0.Spring","1.Springcyzj","2.SpringAop", "3.SpringIoc"],
        },
      ],
      "/blogs/springboot/": [
        {
          text: "SpringBoot",
          children: ["SpringBoot"],
        },
      ],

      "/blogs/rpc/": [
        {
          text: "第一部分 RPC框架设计",
          children: ["1","2","3","4","5","6"],
        },
        {
          text: "第二部分 高性能的Java-RPC框架Dubbo",
          children: ["7","8","9"],
        },
      ],

      "/blogs/sjkAndzjj/MySql": [
        {
          text: "MySql",
          children: ["1","2","3", "4", "5", "6"],
        },
        {
          text: "常见问题",
          children: ["ckhs","10Explan"],
        },
      ],

      "/blogs/springcloud/": [
        {
          text: "第一部分 微服务架构",
          children: ["11", "12", "13"],
        },
        {
           text: "第二部分 SpringCloud综述",
           children: ["21", "22", "23", "24", "25"],
         },
        {
          text: "第三部分 案例准备",
          children: ["31", "32", "33", "34", "35"],
        },
        {
          text: "第四部分 SpringCloud核心组件",
          children: ["41", "42", "43", "44", "45", "46", "47",
          "71", "72", "73"
          ],
        },
        {
          text: "第五部分 常见问题及解决方案",
          children: ["51"],
        },
        {
          text: "第六部分 SpringCloud高级进阶",
          children: ["61", "62", "63"],
        },
      ],
      
    },
    navbar: [
      { text: "首页", link: "/" ,icon: 'Task'},
      // { text: "分类", link: "/categories/shejimoshi/1/" , icon: 'SubVolume'},
      // { text: "标签", link: "/tags/SpringBoot/1/", icon: 'Tag' },
      {
        text: "Spring系列&RPC框架",
        icon: 'Fire',
        children: [
          {
            text: 'Spring系列',
            icon: 'SubVolume',
            children: [
              { text: "Spring", link: "/blogs/spring/0.Spring" },
              { text: "SpringBoot", link: "/blogs/springboot/springboot" },
              { text: "SpringCloud", link: "/blogs/springcloud/11" },
            ],
          },
          {
            text: 'RPC框架',
            icon: 'SubVolume',
            children: [
              { text: "RPC框架设计", link: "/blogs/rpc/1" },

            ],
          },
        ],
      },
      {
        text: "数据库&中间件",
        icon: 'Fire',
        children: [
          { text: "MySql", link: "/blogs/sjkAndzjj/MySql/1" },
          { text: "Oracle", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "MongoDB", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "Redis", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "RabbitMQ", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "Kafka", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "Tomcat", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "Nginx", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "ElasticSearch", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
        ],
      },
      {
        text: "容器技术&CI_CD、DevOps",
        icon: 'Fire',
        children: [
          { text: "Docker", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "K8s", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "CI_CD、DevOps", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "APM管理和性能监控工具", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
        ],
      },
      {
        text: "文档",
        icon: 'Document',
        children: [
          { text: "LeetCode", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
          { text: "设计模式", link: "/blogs/shejimoshi/qidashejiyuanze" },
          { text: "数据结构与算法", link: "/blogs/sjkAndzjj/ElasticSearch/1" },
        ],
      },
    ],
    bulletin: {
      body: [
        // {
        //   type: "text",
        //   content: `🎉🎉🎉 <br/> 永远积极向上，<br/>永远热泪盈眶~~~`,
        //   style: "font-size: 8px;",
        // },
        // {
        //   type: "hr",
        // },
        {
          type: "title",
          content: "🎉🎉网站持续更新ing...",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: `有事vx联系<br/> <img src ="./vx.jpg">`,
          style: "font-size: 15px;",
        },

        // {
        //   type: "text",
        //   content: `
        //   <ul>
        //     <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
        //     <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
        //   </ul>`,
        //   style: "font-size: 12px;",
        // },

        // {
        //   type: "buttongroup",
        //   children: [
        //     {
        //       text: "打赏",
        //       link: "/docs/others/donate.html",
        //     },
        //   ],
        // },
      ],
    },
    // commentConfig: {
    //   //type: 'valie',
    //   type: 'valine',
    //type: 'waline',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     appId: 'xxx',
    //     appKey: 'xxx',
    //     placeholder: '填写邮箱可以收到回复提醒哦！',
    //     verify: true, // 验证码服务
    //     notify: true,
    //     recordIP: true,
    //     hideComments: true // 隐藏评论
    //   },
    // },
    commentConfig: {
      //type: 'valie',
      type: 'valine',
      // options 与 1.x 的 valineConfig 配置一致
      options: {
        el: '#valine-vuepress-comment',
        appId: '4XX4ZZTtAymGSd9UZ2lNQkGu-gzGzoHsz',
        appKey: 'VjsE4CKyoyqdsOedx93OQBH8',
        visitor: true
        
      },
    },
  }),
  // debug: true,

});
