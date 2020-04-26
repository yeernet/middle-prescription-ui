import axios from 'axios'
import md5 from 'md5'

const BASE_PARAMS = {
  'channel': '4',
  'format': 'JSON',
  'oper': '127.0.0.1',
  'random': '1234',
  'spid': '1001',
  version: '1.0.0'
}
const password = 'aAr9MVS9j1'


export default function http(service, data, method = 'post', loading = true, showError = true) {

  data = Object.assign({}, BASE_PARAMS, data, {service});

  const doc={}
  !data.hosId && doc && doc.hosId && (data.hosId = doc.hosId)
  !data.hosId && (data.hosId = '00000')

  const sign = md5(md5(password) + JSON.stringify(data));
  return new Promise((resolve, reject) => {
    // loading && (load = weuijs.loading('加载中...'));
    // loading && (bus.$emit('loading', '加载中...'));
    let axiosConfig = {
      url: '//dev-saas.diandianys.com/api/app',
      method,
      data,
      headers: {
        sign
      }
    };
    axios(axiosConfig).then(res => {
      // loading && (bus.$emit('loading', false));
      // loading && load.hide();
      if (res.status == 200) {
        // if (res.data.code !== '0') showError && Message.error({
        //   message: res.data.msg || '错误代码:' + res.data.code
        // });
        resolve(res.data)
      } else {
        // Message.error({
        //   message: '请求失败' + res.status
        // });
        reject(res);
      }
    }).catch(errsr => {
      // loading && (bus.$emit('loading', false));
      // loading && load.hide();
      // Message.error({
      //   message: '服务器出错了'
      // });
      reject(errsr);
    })
  })
}
