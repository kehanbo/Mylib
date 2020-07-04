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
     *                                      数据绑定
     * ***********************************************************************************/
    FormateString: function (str, data) {
        return str.replace(/#\((\w+)\)/g, function (match, key) {
            return typeof data[key] === "undefined" ? '' : data[key]
        });
    },

    /*************************************************************************************
     *                                      arttemplate语法
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
     *                                     克隆对象
     * ***********************************************************************************/
    /*克隆一个json对象*/
    CopyObject:function (target,source) {
        for (var i in source){
            target[i]=source[i]
        }
        return target
    },
    /*可克隆多个json对象*/
    // 功能呢实现CopyObjectMany(target,obj1,obj2,obj3)
    CopyObjectMany:function () {
        var key,i = 0,len = arguments.length,target = null,copy;
        if(len === 0){
            return;
        }else if(len === 1){
            target = this;
        }else{
            i++;
            target = arguments[0];
        }
        for(; i < len; i++){
            for(key in arguments[i]){
                copy = arguments[i][key];
                target[key] = copy;
            }
        }
        return target;
    }
    



}


    /*************************************************************************************
     *                                   对象实例化
     * ***********************************************************************************/
    var $$ = new Mylib();











