var Rxports = {
   
    formatTime: function (val, format) {
        let t = new Date(val);
        //format : 'yyyy/MM/dd  HH:mm:ss';
        function tf (i) {
            return (i < 10 ? '0' : '') + i
        };
        return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
            switch (a) {
                case 'yyyy':
                    return t.getFullYear();
                    break;
                case 'MM':
                    return tf(t.getMonth() + 1);
                    break;
                case 'dd':
                    return tf(t.getDate());
                    break;
                case 'HH':
                    return tf(t.getHours());
                    break;
                case 'mm':
                    return tf(t.getMinutes());
                    break;
                case 'ss':
                    return tf(t.getSeconds());
                    break;
            }
        })
    },
    computedRem: function () {
        //计算rem
        let docEl = document.documentElement, clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        docEl.getElementsByTagName("body")[0].style.fontSize = docEl.style.fontSize;
    },
    getEquipmentType: function () {
        var Type = "";
        var u = navigator.userAgent;
        //Android终端
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
        //iOS终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if(isAndroid){
            Type = "android";
        }
        if(isiOS){
            Type = "ios";
        }
        return Type;
    }
   
};


export default Rxports;
