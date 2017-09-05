# 引入app
`let app = angular.module('myTest', ['ng', 'ngRoute']);`

## 路由

#### 配置
>  需要引入ng, ngRoute && js文件

```javascript

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/my/:itemIndex', {
        templateUrl: 'tpl/test01.html',
        controller: 'param'
    }).when('/me', {
        templateUrl: 'tpl/test02.html'
    }).otherwise({
        redirectTo: '/my/:itemIndex'
    });
}]);

```
#### 跳转、传参 服务

 $location 在控制器可以控制路由
 *    path(routePars) 设置或者返回路由
 *    replace() 可以禁止后退  >> 使用: $location.path('/').replace()
 *    absUrl() 获取编码后的完整url
 *    hash() 获取hash片段
 *    host() 获取url主机
 *    port() 获取端口号
 *    protocol() 获取协议
 *    search() 获取查询字符串 --->>> 对象或者字符串形式设置查询
 *    url() 获取页面 url


```javascript

app.controller('myCtr', ['$scope', '$location', function($scope, $location) {

    $scope.jumpObj = {
        data: [1, 2, 4, 5, 56, 6, 6]
    };

    $scope.jumpObj.jump = function(routParams) {

        $location.path(routParams);
    };

}]);

```
#### 接收参数
```javascript

app.controller('param', ['$scope', '$routeParams', function($scope, $routeParams) {

    $scope.num = $routeParams.itemIndex;

}]);
;

```

## 过滤器、自定义过滤器
```javascript

app.filter('myFilter', function () {
    // @params {input}为前面传入值
    // @params {arg} 是一些参数，自己定义
    // @return 显示内容
    return function (input, arg) {
        console.log(input);
        input = input.map(function (val) {
            return val + arg
        });

        return input;
    };
});

```

 ## 创建指令
 ```javascript

 app.directive('myDirective', function () {
    return {
        // templateUrl: './1.html', // url连接形式创建, 会与template冲突
        // 限制使用场景 E: element, C: class, M: comment, A: attribute
        restrict: 'ECMA',
        // 插入元素形式创建
        template: '<h2>{{tsName}}<a href="{{tsName}}">{{person.name}}</a><input ng-model="myInput"></h2>',
        replace: true, // 默认会在指令下包含创建元素，设置true可以只保留创建元素
        scope: {
            // 定义了一些变量，通过  <my-directive ts-name='val'>动态生成
            // tsName: '@',
            tsName: '@tsAttr' // 通过映射ts-attr 到ts-name复制值, 与ng-model可以{{}}配合使用
        }
    };
});


```

```javascript

app.directive('yJ', function() {
    return {
        // transclude 会保留指令内部的原始内容 添加到 带有 ng-transclude 属性内部
        template: '<div>aaa<span ng-transclude></span></div>',
        transclude: true,
        restrict: 'A',
        scope: {
            // @ 通过本地作用域同属性绑定，指令作用域的可以获取外部作用域的值，间接获取值 @attr 可以直接为外部属性获取值
            // = 双向绑定，就像普通绑定数据 =attr--
            // & 一般是父作用表达式，函数最常用
            tsName: '@'
        },
        link: function(scope, ele, attr, contr) {
            // jqLite **** find() lclone() children()...
            // link scope作用域 ele 特指指令, attr{{$$element, $attr}}
            // ele , contr== controller
            console.log(arguments); //----
            console.log(attr.$attr); // 指令上的属性
            console.log(attr.$$element); // 指令上的元素 === ele
            console.log(ele.children().clone()); // 可以获取clone节点方法等
            for (var i = 0; i < 6; i++) {
                var cloneChild = ele.children().clone();
                ele.append(cloneChild);
            }

        },
        compile: function(ele, attr) {
            // 会忽略link, 可以定义普通 link this.link 引用函数方便
            console.log(arguments);
            return {
                // linK 可以直接返回 post-link--- post:func
                // return fun()
                // 或者向这样 返回两个 pre-link func + post-link func
            }
        },
        controller: function($scope) {
            $scope.value = 'directive scope value';
            $scope.alert = function(o) {
                // value is 'directive scope value'
                console.log(o);
            }
        },
        template: '<button ng-click="alert({message: value})">Alert</button>'
        }
    }
});

```



## 常用指令

 * ng-include=" 'url' " 注意有引号
 * ng-view
 * ng-if
 * ng-show/ hide
 * ng-bind = “ ‘ ’ ”, ng-bind-template=" {{}}{{}} " 多个表达式
 * ng-cloak可以避免闪烁同 ng-bind作用 <any ng-cloak>{{val}}</any>
 * ng-src
 * ng-href
 * ng-disabled
 * ng-checked
 * ng-readonly
 * ng-style

 > ng-switch
 >> 只加属性 ng-switch 配合 on='propertyName' 表示监控属性变化则有动作 <br>
 ng-switch-default表示默认显示的<br> 
 ng-switch-when='val' 表示 propertyName = val 显示
```html

 <div>
    <input type="text" ng-model="mySwitch"><br>
    <div ng-switch on="mySwitch">
         <p ng-switch-default>And the winner is</p>
         <h1 ng-switch-when="aaa">{{person.name}}</h1>
    </div>
</div>

```
 > ng-repeat
 * &nbsp; $index 遍历 0~length-1
 * &nbsp; $first 第一个时为true
 * &nbsp; $middle 除第一个和最后一个为true
 * &nbsp; $last 最后一个true
 * &nbsp; $even $index 为偶数true
 * &nbsp; $odd $index 为奇数true

 > ng-class
 * 设置 `ng-class="{myCls: boolean, myCls2: boolean}"`
 * 当boolean为true, myCls生效

 > ng-change 
 * 配合ng-model，与 ng-click事件类似
 * `<input type="text" ng-model="eq.x" ng-change="change()">`

 > ng-form 
 * 可以设置嵌套表单
 * angular 不会提交表单，除非指定了 action
 * ng-submit 表单上使用 或者 ng-click (button或者 input:submit)

 > ng-options 配合 ng-model
 * ng-model指向 item
 * option[value]='' 可以得到默认值效果
 ```html

    <select ng-options="item.name for item in obj" ng-model="itemObj">
        <option value="">-----</option>
    </select>

```

## 表单验证

 * name 属性必填
 * input: required 验证是否填写时
 * 最 * 长度 ng-minlength/ maxlength = num
 * 模式匹配 ng-pattern = '正则'
 * 验证电子邮件/ 数字/ url 只需要 设置input: type=email/ number/ url
 * 表单属性可以通过 $scope对象访问到，所以可以间接访问表单属性
 * formName.inputFiledName.property
 > 未修改的表单 -- $pristine
 *    formName.inputFiledName.$pristine
 *    判断是否修改了表单，如果未修改返回true, 否则为false
 > 修改过的表单 -- $dirty
 *     formName.inputFiledName.$dirty
 *     判断效果与上面相反
 > 不合法的表单 -- $invalid
 *     formName.inputFiledName.$invalid
 *     判断表单内容是否不合法, 返回boolean
 > 错误 -- $error
 *     formName.inputFiledName.$error
 *     包含表单验证内容及是否合法的信息 返回true,表示有错误
