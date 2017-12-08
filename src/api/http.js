import qs from 'qs'
import axios from 'axios'

// 与后台协商的状态码，比如code:0为成功,那么除1之外的所有数字进行错误提示,并且提示内容也由后台返回
const adminSuccessCode = 0

// 响应拦截器
// http 状态码在 200-300 以内不触发error
axios.interceptors.response.use((response) => {
    let data = response.data;
    // json文件直接返回
    if (response.config.url.match('.json')) {
        return data;
    }
    if (data.code !== adminSuccessCode) {
        failCallback(`提示`, data.message);
        return Promise.reject(data)
    }
    return data.data
}, (error) => {
    let response = error.response
    if (response) {
        failCallback(`请求失败` + response.status, response.statusText)
    }
    return Promise.reject(error)
})

// 请求拦截器
axios.interceptors.request.use((config) => {
    return config
}, function(error) {
    return Promise.reject(error)
})

let handleError = {
    prevent: false,
    type: 0
}

export default function http({
    url,
    params,
    method = 'get',
    requestType = 'form',
    responseType = 'json',
    cache = true,
    errorPrevent = true,
    errorType = 0
}) {
    handleError = {
        prevent: errorPrevent,
        type: errorType
    }
    let config = {
        method: method,
        url: url,
        responseType: responseType
    }

    if (method === 'get') {
        if (!cache) {
            if (config.url.indexOf('?') !== -1) {
                config.url += `&timestamp=${new Date().getTime()}`
            } else {
                config.url += `?timestamp=${new Date().getTime()}`
            }
        }
        Object.assign(config, {
            params: params
        })
    } else {
        if (requestType === 'form') {
            config.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            Object.assign(config, {
                data: qs.stringify(params)
            })
        } else if (requestType === 'json') {
            config.headers = {
                'Content-Type': 'application/json'
            }
            Object.assign(config, {
                data: params
            })
        } else if (requestType === 'formData') {
            let formData = new FormData()
            for (let i in params) {
                if ('image/jpeg' == params[i].type) {
                    // 服务端通过文件名判断文件类型
                    formData.append(i, params[i], 'upload.jpg');
                } else {
                    formData.append(i, params[i]);
                }
            }
            config.headers = {
                'Content-Type': 'multipart/form-data'
            }
            Object.assign(config, {
                data: formData
            })
        }
    }
    return new Promise((resolve, reject) => {
        axios(config).then((response) => {
                resolve(response)
            }, (error) => {
                reject(error)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function failCallback(title, msg) {
    if (handleError.prevent) return
    switch (handleError.type) {
        case 0:
            vModal.error({
                title: title,
                content: msg
            })
            break
        case 1:
            vMessage.error({
                content: msg,
                duration: 2
            })
            break
    }
}