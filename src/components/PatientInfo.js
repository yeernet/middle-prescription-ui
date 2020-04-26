import InputAutoWidth from './InputAutoWidth'
import React          from 'react'
import { Select }                 from 'antd'
import { getSexFromIdCardFilter } from './getSexFromIdCardFilter'
import { sexFilter }              from './sexFilter'

export function getPatientInfo ( patientInfos ) {
  // 以下字段从老项目复制
  let form           = {}
  let info           = patientInfos
  form.patId         = info.patId || patientInfos.hzid
  form.compatId      = info.compatId || info.jzrid
  form.compatName    = info.compatName ? info.compatName : info.commpatName ? info.commpatName : info.consulterName
  form.sex           = sexFilter( info.compatGender ) || getSexFromIdCardFilter( info.commpatIdcard ) || getSexFromIdCardFilter( info.zjhm ) || sexFilter( info.consulterGender )
  form.compatGender  = form.sex === '男' ? 'M' : 'F'
  form.compatMobile  = info.compatMobile || info.commpatMobile || info.sjh || info.consulterMobile
  form.compatAge     = info.compatAge || getAgeFromIdCardFilter( info.commpatIdcard, '' ) || getAgeFromIdCardFilter( info.zjhm, '' ) || getAgeFromIdCardFilter( info.consulterIdcard, '' )
  form.compatAddress = info.compatAreaName || info.compatAddress || info.areaName
  form.orderNo       = info.orderNo
  return form
}

export function PatientInfo ( { patientInfo = {}, allergyHistory = '', setAllergyHistory = Function } ) {
  const sub = false
  const currentRecipe = {}

  function currDate() {
    const tDate = new Date()
    return timeFormat(tDate, "%Y/%m/%d")
  }

  return (
    <div>
      <span className="recipe-user-info-item" style={{ width: '50%' }}>处方单号：
        <span>{ sub ? '' : patientInfo.orderNo ? patientInfo.orderNo: currentRecipe.orderNo || '提交后查看' } </span>
      </span>
      <span className="recipe-user-info-item">开方日期： <span> {currDate()} </span></span>
      <div style={{ height: '.2em' }}/>

      <span className="recipe-user-info-item" style={{ width: '25%' }}>姓　　名： <span> {patientInfo.compatName || '____'} </span></span>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>性　　别： <span> {patientInfo.sex || '____'} </span></span>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>年　　龄： <span> {patientInfo.compatAge || '____'} </span></span>
      <span className="recipe-user-info-item">科　　别： <span> {patientInfo.bookDeptName/** @TODO: ||userInfo.deptName*/ || '____'} </span></span>
      <div style={{ height: '.2em' }}/>

      <span className="recipe-user-info-item" style={{ width: '50%' }}>住　　址：<span> {patientInfo.compatAddress || '____'} </span></span>
      <span className="recipe-user-info-item">电　　话：<span> {patientInfo.compatMobile || '____'} </span></span>
      <div style={{ height: '1em' }}/>

      <div>诊 断：<DiagnoseListSelector/></div>
      <div style={{ height: '1em' }}/>

      <div className="recipe-user-info-item">过敏史： <InputAutoWidth value={allergyHistory} onChange={v => { setAllergyHistory(v) } } placeholder={'(选填)'} defaultSize={30}/></div>
      <div style={{ height: '1em' }}/>

    </div>
  )
}

function DiagnoseListSelector () {
  const { Option } = Select;

  const children = [2,3,4,5,6,7,8,9,10].map( i => <Option key={'高血压'+i}>高血压{i}</Option> )

  children.push(<Option key="糖尿病">糖尿病</Option>);
  children.push(<Option key="糖尿病2">糖尿病2</Option>);
  children.push(<Option key="糖尿病3">糖尿病3</Option>);
  children.push(<Option key="糖尿病4">糖尿病4</Option>);
  children.push(<Option key="糖尿病5">糖尿病5</Option>);
  children.push(<Option key="白血病">白血病</Option>);
  children.push(<Option key="高血压">高血压</Option>);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <span className="diagnose-list-selector">
      <Select
        style={{ minWidth: '400px' }}
        size={'small'}
        mode="multiple"
        placeholder="请选择诊断, 支持搜索"
        defaultValue={[]}
        onChange={handleChange}
      >
        {children}
      </Select>
    </span>

  )
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

/**
 * 时间日期格式化
 * @param time
 * @param str
 * @returns {*}
 */
function timeFormat (time, str) {
  const handlerZero = (value) => {
    return value < 10 ? '0' + value : value;
  };
  const dateObj = new Date(time);
  const Y = dateObj.getFullYear();
  const m = handlerZero(dateObj.getMonth() + 1);
  const d = handlerZero(dateObj.getDate());
  const W = dateObj.getDay();
  const H = handlerZero(dateObj.getHours());
  const M = handlerZero(dateObj.getMinutes());
  const S = handlerZero(dateObj.getSeconds());

  const ruleArr = [
    {regx: new RegExp('%' + 'Y', 'g'), value: Y},
    {regx: new RegExp('%' + 'm', 'g'), value: m},
    {regx: new RegExp('%' + 'd', 'g'), value: d},
    {regx: new RegExp('%' + 'H', 'g'), value: H},
    {regx: new RegExp('%' + 'M', 'g'), value: M},
    {regx: new RegExp('%' + 'S', 'g'), value: S},
    {regx: new RegExp('%' + 'W', 'g'), value: ['日', '一', '二', '三', '四', '五', '六'][W]}
  ];

  ruleArr.forEach(r => {
    str = str.replace(r.regx, r.value);
  });

  return str;
};
