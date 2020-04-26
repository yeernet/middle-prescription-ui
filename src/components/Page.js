import React, { useEffect, useRef, useState } from 'react'
import InputAutoWidth                         from './InputAutoWidth'
import { InputNumber, Select }                from 'antd'
import { createForm }                          from 'rc-form'
import './Page.css'
import { TableWestRecipe }                     from './Table'
import httpGetSmarthosOnlineOutpatientPackInfo from '../network/httpGetSmarthosOnlineOutpatientPackInfo'
import { getPatientInfo, PatientInfo }         from './PatientInfo'

const { Option } = Select

function Page ({ form, onPrescriptionDataChange = Function, enableEdit = false, isChineseRecipe = false }) {

  const editorRef = useRef()

  // useEffect( () => {
  //   document.addEventListener( 'keydown', function (e) {
  //     console.log(e)
  //     if(e.altKey && e.keyCode === 18){
  //       alert('组合成功');
  //     }
  //   } )
  //
  // }, [] )

  const [drugList, setDrugList] = useState([])

  function getDefaultInfo () {
    return { patientInfos: {}, curr: {}, attaList: {} }
  }

  const [outpatientPackInfo, setOutpatientPackInfo] = useState(getDefaultInfo())
  const { patientInfos, curr, attaList } = outpatientPackInfo

  useEffect( () => {
    httpGetSmarthosOnlineOutpatientPackInfo('5e819710e4b0e2f2698b367a').then( res => {
      setOutpatientPackInfo(res || getDefaultInfo())
    } )
  }, [] )

  return (
  <div className="middle-prescription-ui" ref={editorRef} style={{
    maxWidth: '700px',
    boxShadow: '0 0 6px 1px #808080',
    margin: 'auto',
    borderRadius: '1px',
    padding: '2em'
  }}>
    <h1 style={{ textAlign: 'center' }}>上海市辖县医院</h1>
    <h2 style={{ textAlign: 'center' }}>处方笺</h2>
    <h2 style={{ textAlign: 'center' }}>{ isChineseRecipe ? '中' : '西' }药方(未提交)</h2>
    <br/>

    <PatientInfo patientInfo={getPatientInfo(patientInfos)}/>

    <br/>
    <hr/>
    <br/>

    { /** Table */ }
    <div style={{ minHeight: '260px' }}>
      <TableWestRecipe tableDataChange={ function () { console.log(arguments) } } enableEdit={enableEdit}/>
    </div>
    <br/>
    <hr/>
    <br/>

    { isChineseRecipe && <div>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>类型：<ChineseRecipeTypeSelector/></span>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>贴数：<InputNumber size={'small'} style={{ minWidth: '20px' }}/></span>
      <span className="recipe-user-info-item" style={{ width: '50%' }}>服用方法：<InputAutoWidth defaultSize={20}/></span>
    </div> }
    <div style={{ height: '1em' }}/>

    <div>
      <span className="recipe-user-info-item" style={{ width: '50%' }}> </span>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>处方医生：<span className="underline"> 李平 </span></span>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>审方医生：<span className="underline"> 李平 </span></span>
    </div>
    <div style={{ height: '.2em' }}/>

  </div>
)
}


function ChineseRecipeTypeSelector () {
  const { Option } = Select;

  const children = [
    {value: '饮片', label: '饮片'},
    {value: '颗粒', label: '颗粒'}
  ].map( ({ value, label }) => <Option key={value}>{label}</Option> )

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <span className="diagnose-list-selector">
      <Select
        size={'small'}
        placeholder="请选择"
        defaultValue={'饮片'}
        onChange={handleChange}
      >
        {children}
      </Select>
    </span>

  )
}

const PageWithForm = createForm()(Page)
export default PageWithForm
