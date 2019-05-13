define('docs/advanced.md', function(require, exports, module) {

  module.exports = {
    "title": "高级用法",
    "shortname": "advanced",
    "html": "<p>在开始阅读之前，希望你已经阅读 <a href=\"/docs/getting-started\">快速开始文档</a> 。</p>\n<h2><a class=\"anchor\" name=\"%E6%95%B0%E6%8D%AE%E4%BD%9C%E7%94%A8%E5%9F%9F\" href=\"#%E6%95%B0%E6%8D%AE%E4%BD%9C%E7%94%A8%E5%9F%9F\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>数据作用域</h2><p>配置中很多地方都可以用变量如： <a href=\"/docs/renderers/Tpl\">tpl</a> 类型的渲染器、API 中的 Url、FormItem 中的 source 配置、visibleOn、disabledOn 以及 Form 中的 <code>redirect</code> 配置等等。</p>\n<p>那么都有哪些数据可以用？这取决于在哪个容器，关于容器中的数据说明如下：</p>\n<ul>\n<li><code>page</code> 等价于全局变量，因为顶级渲染器就是它，所以下面的所有组件都能用到这个里面的数据。<ul>\n<li><code>amisPage</code> 当前页面的数据信息，包含标题，id，key 之类的信息。</li>\n<li><code>amisUser</code> 当前用户信息，包含邮箱和用户名信息。</li>\n<li><code>params 中的数据</code> 如果地址栏中也携带了参数，也会 merge 到该层的数据中。</li>\n<li><code>initApi 返回的数据</code> 如果 page 设置了 <code>initApi</code> 那么初始化的时候会从 API 中拉取数据，拉取到的数据可以用于整个页面。</li>\n</ul>\n</li>\n<li><p><code>crud</code></p>\n<ul>\n<li>父级 容器中的数据可以直接使用，如 page 容器</li>\n<li><code>api</code> 返回的数据，crud 的 api 除了可以返回 <code>rows</code> 和 <code>count</code> 数据外，其他的数据会被 merge 到数据中，供容器使用。</li>\n</ul>\n</li>\n<li><p><code>form</code></p>\n<ul>\n<li>父级 容器中的数据可以直接使用，如 page 容器</li>\n<li><code>initApi</code> 返回的数据。</li>\n<li>FormItem 的数据直接会存入到数据中，而且每次修改都会及时更新。通过 FormItem 设置的 <code>name</code> 值获取。</li>\n</ul>\n</li>\n<li><p><code>formItem</code> 表单项中，所在的表单中的数据都能用。</p>\n</li>\n<li><code>wizard</code> 同 form</li>\n<li><code>dialog</code> dialog 由 button 触发弹出，携带的数据根据按钮所在的位置来决定。<ul>\n<li>form 中弹出则会把 form 中的数据复制份传给 dialog。</li>\n<li>crud 中的批量操作按钮。把整个列表数据复制给 dialog。</li>\n<li>crud 中的某一项中的按钮，则只会把对应的那一条数据拷贝给 dialog。</li>\n</ul>\n</li>\n<li><code>servcie</code><ul>\n<li>父级 容器中的数据可以直接使用，如 page 容器</li>\n<li>如果配置了 <code>api</code>, <code>api</code> 返回的数据可以用。</li>\n</ul>\n</li>\n</ul>\n<p>取值过程，也跟 JS 作用域中取值一样，当前作用域中有，则直接返回当前作用域中，如果没有当前作用域没有，会一直往上找，直到找到了为止。如果存在同名变量，则返回就近作用域中数据。</p>\n<p>需要注意的是，要取到值一定是在自己所在的作用域，或者上级作用域里面，同级的是取不到的，如果需要怎么办？可以往下看联动，比如：FormA 的数据发送给 formB, 另外一种方式，可以把接口拉取换到父级组件去操作，没有可拉取数据的组件，就一起包在一个 service 控件里面。</p>\n<h2><a class=\"anchor\" name=\"%E8%81%94%E5%8A%A8\" href=\"#%E8%81%94%E5%8A%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>联动</h2><h3><a class=\"anchor\" name=\"%E7%AE%80%E5%8D%95%E7%9A%84%E6%98%BE%E9%9A%90%E8%81%94%E5%8A%A8\" href=\"#%E7%AE%80%E5%8D%95%E7%9A%84%E6%98%BE%E9%9A%90%E8%81%94%E5%8A%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>简单的显隐联动</h3><p>主要通过 <code>visibleOn</code>、<code>hiddenOn</code> 和 <code>disabledOn</code> 来配置。</p>\n<div class=\"amis-preview\" style=\"height: 500px\"><script type=\"text/schema\" height=\"500\" scope=\"form\">[\n    {\n        \"type\": \"radios\",\n        \"name\": \"foo\",\n        \"inline\": true,\n        \"label\": \" \",\n        \"options\": [\n            {\n                \"label\": \"类型1\",\n                \"value\": 1\n            },\n            {\n                \"label\": \"类型2\",\n                \"value\": 2\n            },\n            {\n                \"label\": \"类型3\",\n                \"value\": 3\n            }\n        ]\n    },\n\n    {\n        \"type\": \"text\",\n        \"name\": \"text\",\n        \"placeholder\": \"类型1 可见\",\n        \"visibleOn\": \"data.foo == 1\"\n    },\n\n     {\n         \"type\": \"text\",\n         \"name\": \"text2\",\n         \"placeholder\": \"类型2 不可点\",\n         \"disabledOn\": \"data.foo == 2\"\n     },\n\n   {\n       \"type\": \"button\",\n       \"label\": \"类型三不能提交\",\n       \"level\": \"primary\",\n       \"disabledOn\": \"data.foo == 3\"\n   }\n\n]\n</script></div>\n<h3><a class=\"anchor\" name=\"%E9%80%89%E9%A1%B9%E8%81%94%E5%8A%A8\" href=\"#%E9%80%89%E9%A1%B9%E8%81%94%E5%8A%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>选项联动</h3><p>比如 select 中 options 可能根据某个值不同而不同。</p>\n<div class=\"amis-preview\" style=\"height: 500px\"><script type=\"text/schema\" height=\"500\" scope=\"form\">[\n    {\n        \"label\": \"选项1\",\n        \"type\": \"radios\",\n        \"labelClassName\": \"text-muted\",\n        \"name\": \"a\",\n        \"inline\": true,\n        \"options\": [\n          {\n            \"label\": \"选项1\",\n            \"value\": 1\n          },\n          {\n            \"label\": \"选项2\",\n            \"value\": 2\n          },\n          {\n            \"label\": \"选项3\",\n            \"value\": 3\n          }\n        ]\n      },\n      {\n        \"label\": \"选项2\",\n        \"type\": \"select\",\n        \"labelClassName\": \"text-muted\",\n        \"name\": \"b\",\n        \"inline\": true,\n        \"source\": \"https://houtai.baidu.com/api/mock2/options/level2?a=${a}\",\n        \"initFetchOn\": \"data.a\"\n      }\n]\n</script></div>\n<p>他们是怎么关联的呢？注意看 select 的 source 配置 <code>&quot;/api/mock/getOptions?waitSeconds=1&amp;type=$foo&quot;</code> 这里用了变量 <code>$foo</code> 这个 foo 正好是第一个表单的 name 值。只要这个值发生变化，source 就会重新获取一次。</p>\n<p>这里有个问题就是，数据一旦变化就会出发重新拉取，如果是输入框岂不是拉取得很频繁？没关系，也可以主动拉取如：</p>\n<div class=\"amis-preview\" style=\"height: 500px\"><script type=\"text/schema\" height=\"500\" scope=\"body\">{\n    \"type\": \"form\",\n    \"name\": \"lidong\",\n    \"controls\": [\n        {\n            \"type\": \"text\",\n            \"name\": \"foo\",\n            \"addOn\": {\n                \"label\": \"搜索\",\n                \"className\": \"btn-info\",\n                \"type\": \"button\",\n                \"actionType\": \"reload\",\n                \"disabledOn\": \"!data.foo\",\n                \"target\": \"lidong.select\"\n            }\n        },\n\n        {\n            \"type\": \"select\",\n            \"name\": \"select\",\n            \"label\": \"Select\",\n            \"source\": {\n                \"method\": \"get\",\n                \"url\": \"https://houtai.baidu.com/api/mock2/options/level2?waitSeconds=1\",\n                \"data\": {\n                    \"a\": \"$foo\"\n                }\n            },\n            \"desc\": \"这里只是演示刷新不会真正的过滤。\"\n        }\n    ]\n}\n</script></div>\n<p>注意，source 中的传参是通过 source 中的 data 关联的，不能写在 source 的 url 中，因为如果写了，就会自动监控值的变化而自动刷新，写在 data 里面关联则不会。如果对 source 中的配置规则不了解，请前往 <a href=\"/docs/renderers/类型说明#api\">API 说明</a></p>\n<p>另外注意 button 的 target 值，正好是这个 form 的 name 值 <code>lidong</code> 的 formItem 的 name 值 <code>select</code>。当按钮的对象是一个 formItem 时，会出发 formItem 的数据重新拉取。</p>\n<h3><a class=\"anchor\" name=\"%E6%95%B0%E6%8D%AE%E8%81%94%E5%8A%A8\" href=\"#%E6%95%B0%E6%8D%AE%E8%81%94%E5%8A%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>数据联动</h3><p>Form 和 CRUD, CRUD 有个 filter 配置项，里面可以配置表单项，当他提交时 CRUD 自动就会携带接受到的表单数据然后重新获取数据。有个限制，就是 CRUD 和 filter 必须放在一起，不能分开，实际上完全可以分开，只要 Form 的 target 是 CRUD 的 name 值即可。</p>\n<div class=\"amis-preview\" style=\"height: 500px\"><script type=\"text/schema\" height=\"500\">{\n    \"type\": \"page\",\n    \"aside\": {\n        \"type\": \"form\",\n        \"target\": \"doc-crud\",\n        \"wrapWithPanel\": false,\n        \"className\": \"wrapper-xs\",\n        \"controls\": [\n            {\n                \"type\": \"text\",\n                \"name\": \"keywords\",\n                \"placeholder\": \"请输入关键字\",\n                \"clearable\": true,\n                \"addOn\": {\n                    \"label\": \"搜索\",\n                    \"className\": \"btn-info\",\n                    \"type\": \"submit\"\n                }\n            }\n        ]\n    },\n    \"body\": {\n        \"name\": \"doc-crud\",\n        \"type\": \"crud\",\n        \"api\": \"https://houtai.baidu.com/api/sample\",\n        \"syncLocation\": false,\n        \"title\": null,\n        \"perPageField\":\"rn\",\n        \"defaultParams\":{\n            \"rn\": 10\n        },\n        \"columns\": [\n            {\n                \"name\": \"id\",\n                \"label\": \"ID\",\n                \"width\": 20,\n                \"sortable\": true\n            },\n            {\n                \"name\": \"engine\",\n                \"label\": \"Rendering engine\",\n                \"sortable\": true,\n                \"toggled\": false\n            },\n            {\n                \"name\": \"browser\",\n                \"label\": \"Browser\",\n                \"sortable\": true\n            },\n            {\n                \"name\": \"platform\",\n                \"label\": \"Platform(s)\",\n                \"sortable\": true\n            },\n            {\n                \"name\": \"version\",\n                \"label\": \"Engine version\"\n            }\n        ]\n    }\n}\n</script></div>\n<p>Form 的 target 还可以是另外一个 Form，当 A Form 把自己的数据提交给 B Form 时，A 的数据会被合并到 B Form 中，同时，B Form 会再次初始化，如：拉取 initApi, 重新拉取 formItem 上的 source 等等。 比如用户管理中的<a href=\"/group/test/admin/users?perPage=12\">加入用户</a>操作就是用这种方式实现的。</p>\n<div class=\"amis-preview\" style=\"height: 500px\"><script type=\"text/schema\" height=\"500\">{\n    \"type\": \"page\",\n    \"aside\": {\n        \"type\": \"form\",\n        \"target\": \"doc-form\",\n        \"wrapWithPanel\": false,\n        \"className\": \"wrapper-xs\",\n        \"controls\": [\n            {\n                \"type\": \"text\",\n                \"name\": \"keywords\",\n                \"clearable\": true,\n                \"placeholder\": \"请输入关键字\",\n                \"addOn\": {\n                    \"label\": \"提交\",\n                    \"className\": \"btn-info\",\n                    \"type\": \"submit\"\n                }\n            }\n        ]\n    },\n    \"body\": {\n        \"name\": \"doc-form\",\n        \"type\": \"form\",\n        \"api\": \"https://houtai.baidu.com/api/sample\",\n        \"submitText\": null,\n        \"controls\": [\n            {\n                \"type\": \"static\",\n                \"name\": \"keywords\",\n                \"label\": \"你刚刚输入的是：\"\n            }\n        ]\n    }\n}\n</script></div>\n",
    "toc": {
      "label": "目录",
      "type": "toc",
      "children": [
        {
          "label": "数据作用域",
          "fragment": "%E6%95%B0%E6%8D%AE%E4%BD%9C%E7%94%A8%E5%9F%9F",
          "fullPath": "#%E6%95%B0%E6%8D%AE%E4%BD%9C%E7%94%A8%E5%9F%9F",
          "level": 2
        },
        {
          "label": "联动",
          "fragment": "%E8%81%94%E5%8A%A8",
          "fullPath": "#%E8%81%94%E5%8A%A8",
          "level": 2,
          "children": [
            {
              "label": "简单的显隐联动",
              "fragment": "%E7%AE%80%E5%8D%95%E7%9A%84%E6%98%BE%E9%9A%90%E8%81%94%E5%8A%A8",
              "fullPath": "#%E7%AE%80%E5%8D%95%E7%9A%84%E6%98%BE%E9%9A%90%E8%81%94%E5%8A%A8",
              "level": 3
            },
            {
              "label": "选项联动",
              "fragment": "%E9%80%89%E9%A1%B9%E8%81%94%E5%8A%A8",
              "fullPath": "#%E9%80%89%E9%A1%B9%E8%81%94%E5%8A%A8",
              "level": 3
            },
            {
              "label": "数据联动",
              "fragment": "%E6%95%B0%E6%8D%AE%E8%81%94%E5%8A%A8",
              "fullPath": "#%E6%95%B0%E6%8D%AE%E8%81%94%E5%8A%A8",
              "level": 3
            }
          ]
        }
      ],
      "level": 0
    }
  };

});