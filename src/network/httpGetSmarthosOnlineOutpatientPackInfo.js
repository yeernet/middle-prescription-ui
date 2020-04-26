// let bizId = this.$route.query.ddId || this.$route.query.bizId

import http from './http'

export default async function httpGetSmarthosOnlineOutpatientPackInfo ( bizId) {
  const {code, obj} = await http("smarthos.online.outpatient.pack.info", {
    id: bizId
  });
  return handlerDetail(obj)
}

function handlerDetail(info) {
  let form = {}
  if (info.ddxx) {
    info.zjhm = info.ddxx.zjhm
  }
  form.patId = info.patId || info.hzid
  form.compatId = info.compatId || info.jzrid
  form.commpatName = info.compatName || info.patname
  form.sex = sexFilter(info.compatGender) || getSexFromIdCardFilter(info.zjhm)
  form._sex = sexFilter(info.compatGender) || getSexFromIdCardFilter(info.zjhm)
  form.compatGender = form.sex === '男' ? 'M' : 'F'
  form.consulterGender = form.sex === '男' ? 'M' : 'F'
  form.commpatMobile = info.compatMobile || info.sjh
  form.compatAge = info.compatAge || getAgeFromIdCardFilter(info.zjhm, '')
  form.consulterAge = getAgeFromIdCardFilter(info.zjhm, '')
  form.compatAddress = info.compatAddress || info.areaName
  form.orderNo = info.orderNo
  console.log(form)
  // this.curr = this.patientInfos = form
  // this.attaList = info.attaList
  return {
    curr: form,
    patientInfos: form,
    attaList: info.attaList
  }
}

function sexFilter(str, type = 1) {
  if (!str) return '';
  let data = {};
  str = str.toLowerCase();
  if (type === 1) {
    data = {f: '女', m: '男', n: '未知'};
  }
  if (type === 2) {
    data = {2: '女', 1: '男', 0: '未知'};
  }
  return data[str] || '';
}


function getSexFromIdCardFilter (str) {
  if (!str) return '';
  if (str.length === 18) {
    const sex = str.substring(16, 17);
    return sex % 2 === 1 ? '男' : '女';
  } else {
    return ''
  }
}

function getAgeFromIdCardFilter (str, next = '岁') {
  if (!str) return '';
  const y = new Date().getFullYear();
  if (str.length === 18) {
    return (y - str.substring(6, 10)) + next;
  } else {
    return "";
  }
}
