// require('es6-promise').polyfill();
import axios from 'axios';
export default {
	install(Vue, options) {

		Vue.prototype.config = function() { //配置信息
			let config = {

			};
			return config
		};
        Vue.prototype.otherConfig = {
            serviceTel: '021-80117789',//客服电话
            workTime: '9:00~18:00',//工作时间
		};
		Vue.prototype.channelHeaderBg = function (channel) {
			let backData = {
                isShow: true//控制渠道是否显示头部(非首页，默认显示)
			};
		    let tmpStyle = {};
		    //非首页的返回头部样式
            tmpStyle.position = "relative";
            tmpStyle.color = "#fff";
            tmpStyle.display = "block";
            //页面相关元素样式配置（默认）
            tmpStyle.pageBtnColor = {
                'bgcolor': '',
                'txtcolor': ''
            };
            switch (channel) {
                case "eleme":
                    tmpStyle.background = "#089EFF";
                    tmpStyle.pageBtnColor = {
                        'bgcolor': '#089EFF',
                        'txtcolor': ''
                    };
                    break;
                case "falv":
                case "weixin":
                case "onstar":
                case "linjia":
                case "jbh":
                    tmpStyle.background = "#FF6100";
                    tmpStyle.pageBtnColor = {
                        'bgcolor': '#FF6100',
                        'txtcolor': ''
                    };
                    break;
                case "mmbang":
                case "hers":
                case "weixin":
                    tmpStyle.background = "#ff6191";
                    tmpStyle.pageBtnColor = {
                        'bgcolor': '#ff6191',
                        'txtcolor': ''
                    };
                    break;
                case "fengniao":
                case "fengniaozb":
                    tmpStyle.background = "#5C7DC0";
                    tmpStyle.pageBtnColor = {
                        'bgcolor': '#5C7DC0',
                        'txtcolor': ''
                    };
                    break;
                case "dayima":
                    tmpStyle.background = "#fff";
                    tmpStyle.color = "#000";
                    tmpStyle.borderBottom = "1px solid #f5f5f5";
                    tmpStyle.pageBtnColor = {
                        'bgcolor': '#089EFF',
                        'txtcolor': ''
                    };
                    break;
                case "cmbc":
                    tmpStyle.background = "#fff";
                    tmpStyle.color = "#333";
                    tmpStyle.borderBottom = "1px solid #f5f5f5";
                    tmpStyle.pageBtnColor = {
                        'bgcolor': '#089EFF',
                        'txtcolor': ''
                    };
                    break;
                case "fengcheng":
                    tmpStyle.background = "#fe6100";
                    backData.isShow = true;
                    tmpStyle.pageBtnColor = {
                        'bgcolor': '#fe6100',
                        'txtcolor': ''
                    };
                    break;
                case "chinaums":
                    tmpStyle.position = "fixed";//要注意页面布局
                    tmpStyle.background = "-webkit-linear-gradient(left,#2d8bfd,#2dbafd)";
                    tmpStyle.pageBtnColor = {
                    	'bgcolor': '#2d8bfd',
						'txtcolor': ''
					};
                    backData.isShow = true;
                    break;
                case "jingu":
                    tmpStyle.background = "#fe6100";
                    backData.isShow = true;
                    tmpStyle.pageBtnColor = {
                        'bgcolor': '#fe6100',
                        'txtcolor': ''
                    };
                    break;
                case "baiduivrad":
                case "baidusearch":
                    tmpStyle.background = "#fff";
                    tmpStyle.color = "#000";
                    break;
				case "winbaoxian":
				case "chinapay":
                    backData.isShow = false;
                    tmpStyle.pageBtnColor = {
                        'bgcolor': '#fe6100',
                        'txtcolor': ''
                    };
                    break;
                default:
                    break;

            }
            backData.styleObj = tmpStyle;
            return backData;
        };


		// Vue.prototype.getcookie = function(name) { //查询cookie
		// 	var arr = document.cookie.replace(/\s/g, "").split(';');
		// 	for(var i = 0; i < arr.length; i++) {
		// 		var tempArr = arr[i].split('=');
		// 		if(tempArr[0] == name) {
		// 			return decodeURIComponent(tempArr[1]);
		// 		}
		// 	}
		// 	return false;
		// }

		// Vue.prototype.setcookie = function(name, value, days) { //增加cookie
		// 	// var strsec = getsec(time);
		// 	// console.log("过期时间为--->" + strsec); 分钟
		// 	var date = new Date();
		// 	date.setMinutes(date.getMinutes() + days);
		// 	document.cookie = name + '=' + encodeURIComponent(JSON.stringify(value)) + ';expires=' + date;
		// };

		Vue.prototype.getUrl = function(name) { //获取url
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || '';
		}

		// Vue.prototype.datatype = function(data) { //获取数据类型
		// 	let types = Object.prototype.toString.call(data);
		// 	return types.substring(7, types.length - 1);
		// }

		Vue.prototype.ajax = function(opt) {
			let curWwwPath = window.document.location.href;
			let pathName = window.document.location.pathname;
			let pos = curWwwPath.indexOf(pathName);
			let localhostPaht = curWwwPath.substring(0, pos);
			// let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
			// let realPath = localhostPaht + projectName;//有的渠道会携带参数
			// let realPath = window.location.origin + window.location.pathname;
			// let iscookie = true;
		
			let opts = opt || {};
			if (!opts.url) {
				alert('请填写接口地址');
				return false;
			}
			let ajaxdata={
				method: opts.type || 'post',
				url: opts.url,
				// data: opts.data || {},
				// params:opts.data || {},
				headers: opts.headers || {
					'Content-Type': 'application/x-www-form-urlencoded'
                    // 'Content-Type': 'text/plain;charset=UTF-8',
				},
				baseURL: localhostPaht,
                transformRequest: [function (data) {
                    let str = [];
                    for (var p in data) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                    }
                    return str.join("&");
                }],
				withCredentials: opts.cookiestart || true,//表示跨域请求时是否需要使用凭证
				timeout: opts.time || 10 * 1000,
				responseType: opts.dataType || 'json'
			}
			 opts.type=(opts.type).toLowerCase()
			  if(opts.type && opts.type=='get'){
				ajaxdata.params= opts.data || {}
			  }else {
				ajaxdata.data= opts.data || {}
			  }
			  
			axios(ajaxdata).then(function(res) {
                // console.log(opt.url +'-----成功了');
				if (res.status == 200) {
					if (opts.success) {
						opts.success(res.data, res);
					}
				} else {
					if (opts.error) {
						opts.error(error);
					} else {
						alert('好多人在访问呀，请重新试试[timeout]');
					}
				}
			}).catch(function(error) {
				console.log(error, opts.url + '--err')
				if (opts.error) {
					opts.error(error);
				} else {
					console.log('ajax错误了')
				}
			});

		}

		// Vue.prototype.manyqg = function(s, n) { //钱格式
		// 	n = n > 0 && n <= 20 ? n : 2;
		// 	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		// 	let l = s.split(".")[0].split("").reverse(),
		// 		r = s.split(".")[1],
		// 		t = "";
		// 	for(let i = 0; i < l.length; i++) {
		// 		t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
		// 	}
		// 	if(r == undefined) {
		// 		return '****'
		// 	} else {
		// 		return t.split("").reverse().join("") + "." + r;
		// 	}
		// };

		Vue.prototype.routerurl = function(url, param, encode) { //方便后期单页修改路由跳转
			if (param == null) return '';
			for (let key in param) {
				var link = '&' + key + "=" + param[key];
				if(link!==link){
					link += link;
				}
				
			}
			link = (url + "?" + link.substr(1)).replace(' ', '');
			link = (encode == null || encode) ? link : encodeURIComponent(link);
			location.href = link;
			//  	this.$router.push({
			//  		name: 'result',
			//  		params: param
			//  	})
		}
	}
}
