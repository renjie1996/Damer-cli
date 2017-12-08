import http from './http.js';
import urlConfig from './urlConfig.js';

export function getBaseInfo (){
	return http({url: URLConfig('baseInfo')});
}