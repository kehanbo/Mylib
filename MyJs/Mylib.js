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


    /*************************************************************************************
     *                                      数据类型检测部分A
     * ***********************************************************************************/
    Ajax: function (data) {
        //data{data:'',datatype:'json/xml',type:"get/posh",url:"",asyn:"true/false",success:function(){},failure:function(){}}
        //data:{username:123,password:456}
        //data:'username:123&password:456';
        //第一步：创建xhr对象
        var xhr = null;
        if (window.XMLHttpRequest) {
            //标准浏览器
            xhr = new XMLHttpRequest();
        }
        else {
            //早期的ie浏览器
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }
        //第二步：准备发送前的一些配置参数
        var type = data.type == 'get' ? 'get' : 'posh';
        var url = '';
        if (data.url) {
            url = data.url;
            if (type == 'get') {
                url += "?" + data.data + "&_t=" + new Date().getTime();;
            }
        }
        var falg = data.asyn == 'true' ? 'true' : 'false';
        xhr.open(type, url, falg);

        //第三步：执行发送的动作
        if (type == 'get') {
            xhr.send(null);
        } else if (type == 'posh') {
            xhr.setRequestHeader("Content-Type", "application/x-www-from-urlencoded");
            xhr.send(data.data);
        }
        //第四步：指定回调函数
        xhr.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    if (typeof data.success == 'function') {
                        var d = data.dataType == 'xml' ? xhr.responseXML : xhr.responseText;
                        data.success(d);
                    }
                    else {
                        if (typeof data.failure == 'function') {
                            data.failure();
                        }
                    }
                }
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
        return json;//返回对象
    }



}


/*************************************************************************************
 *                                   对象实例化
 * ***********************************************************************************/
var $$ = new Mylib();











