/*
************************************************************
获取元素部分
************************************************************
*$id
*$tag



************************************************************
检测数据类型部分
************************************************************
*isNumber
*isBoolean
*isString
*isUndefined
*isObj
*isNull
*isArray
*trim
*ltrim
*rtrim



************************************************************
ajax
************************************************************



************************************************************
arttemplate语法A
************************************************************
*formateString
*
*
*/

function Mylib() { }
Mylib.prototype = {
    /*************************************************************************************
     *                                      获取元素部分
     * ***********************************************************************************/
    $id: function (id) {
        return document.getElementById(id)
    },
    $tag: function (tag) {
        return document.getElementsByTagName(tag)
    },


    /*************************************************************************************
     *                                      数据类型检测部分A
     * ***********************************************************************************/
    IsNumber: function (val) {
        return typeof val === 'number' && isFinite(val)
    },
    IsBoolean: function (val) {
        return typeof val === "boolean";
    },
    IsString: function (val) {
        return typeof val === "string";
    },
    IsUndefined: function (val) {
        return typeof val === "undefined";
    },
    IsObj: function (str) {
        if (str === null || typeof str === 'undefined') {
            return false;
        }
        return typeof str === 'object';
    },
    IsNull: function (val) {
        return val === null;
    },
    IsArray: function (arr) {
        if (arr === null || typeof arr === 'undefined') {
            return false;
        }
        return arr.constructor === Array;
    },
    Trim: function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, '');
    },
    Ttrim: function (str) {
        return str.replace(/(^\s*)/g, '');
    },
    Ttrim: function (str) {
        return str.replace(/(\s*$)/g, '');
    },
    //获取数组中最大的值 标准写法     【同理：要获取最小值，那么将max改成min】
    getMax: function (arr) {
        var arrlen = arr.length;
        for (var i = 0, ret = arr[0]; i < arrlen; i++) {
            ret = Math.max(ret, arr[i])
        }
        return ret;
    },
    //获取多个数中最大的值  call用法  【同理：要获取最小值，那么将max改成min】
    getMax2: function () {
        return Math.max.call(null, 1, 2, 3, 4, 5, 6, 7);
    },
    //获取数组中最大的值 apply用法   【同理：要获取最小值，那么将max改成min】
    getMax3: function (arr) {
        return Math.max.apply(null, arr);
    },

    /*************************************************************************************
     *                                      ajax封装
     * ***********************************************************************************/
     //ajax - 前面我们学习的
     myAjax:function(URL,fn){
        var xhr = createXHR();	//返回了一个对象，这个对象IE6兼容。
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
                    fn(xhr.responseText);
                }else{
                    alert("错误的文件！");
                }
            }
        };
        xhr.open("get",URL,true);
        xhr.send();

        //闭包形式，因为这个函数只服务于ajax函数，所以放在里面
        function createXHR() {
            //本函数来自于《JavaScript高级程序设计 第3版》第21章
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                if (typeof arguments.callee.activeXString != "string") {
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"
                        ],
                        i, len;

                    for (i = 0, len = versions.length; i < len; i++) {
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex) {
                            //skip
                        }
                    }
                }

                return new ActiveXObject(arguments.callee.activeXString);
            } else {
                throw new Error("No XHR object available.");
            }
        }
    },
    /*************************************************************************************
     *                                    简单的数据绑定FormateString
     * ***********************************************************************************/
    FormateString: function (str, data) {
        return str.replace(/#\((\w+)\)/g, function (match, key) {
            return typeof data[key] === "undefined" ? '' : data[key]
        });
    },

    /*************************************************************************************
     *                                    arttemplate语法
     * ***********************************************************************************/
    /****************************【注意要引入arttemplate文件】*****************************/
    //封装成一个函数
    BindTemplate: function (tempalteId, data) {
        var html = template(tempalteId, data);
        return html;
    },
    ArtTemplate: function (str, data) {
        var render = template.compile(str);
        return render(data)
    },

    /*************************************************************************************
     *                                     克隆对象/给一个对象扩充功能
     * ***********************************************************************************/
    /*克隆一个json对象*/
    CopyObject: function (target, source) {
        for (var i in source) {
            target[i] = source[i]
        }
        return target
    },
    /*可克隆多个json对象*/
    // 功能呢实现CopyObjectMany(target,obj1,obj2,obj3)
    CopyObjectMany: function () {
        var key, i = 0, len = arguments.length, target = null, copy;
        if (len === 0) {
            return;
        } else if (len === 1) {
            target = this;
        } else {
            i++;
            target = arguments[0];
        }
        for (; i < len; i++) {
            for (key in arguments[i]) {
                copy = arguments[i][key];
                target[key] = copy;
            }
        }
        return target;
    },
    /*************************************************************************************
    *                                     随机数
    * ***********************************************************************************/
    random: function (begin, end) {
        return Math.floor(Math.random() * (end - begin)) + begin;
    },
    /*************************************************************************************
    *                                   获取页面传过来的参数
    *************************************************************************************/
    simpleQuery: function () {
        var params = window.location.search;//params:?id,date
        var arr = params.substring(1).split(",");
        return arr;
    },
    /*************************************************************************************
    *                                   获取URL查询字符串参数值的通用函数
    *************************************************************************************/
    querystring: function () {
        var str = window.location.search.substring(1);//获取查询字符串，即"id=1&name=location"的部分
        var arr = str.split("&");//以&符号为界把查询字符串分割成数组
        var json = {};//定义一个临时对象
        for (var i = 0; i < arr.length; i++)//遍历数组
        {
            var c = arr[i].indexOf("=");//获取每个参数中的等号小标的位置
            if (c == -1) continue;//如果没有发现测跳到下一次循环继续操作
            var d = arr[i].substring(0, c);//截取等号前的参数名称，这里分别是id和name
            var e = arr[i].substring(c + 1);//截取等号后的参数值
            json[d] = e;//以名/值对的形式存储在对象中
        }
        return json;//返回对象，这里返回的是一个json的对象 
    },
    /*************************************************************************************
    *                                   如何将伪数组转化成真数组
    *************************************************************************************/
    //例子：var json={0:'first',2:'second'}  -------->  ["first","second"]
    callArray: function (json) {
        return Array.prototype.slice.call(json);
    }




}


/*************************************************************************************
 *                                   对象实例化
 * ***********************************************************************************/
var $$ = new Mylib();











