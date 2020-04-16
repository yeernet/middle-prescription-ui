import React, { useEffect, useRef, useState } from 'react'
import Input2                                 from './Input2'
import { Button, Input, InputNumber, Select }    from 'antd'
import { createForm } from 'rc-form'

function Page () {

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
    <h2 style={{ textAlign: 'center' }}>中药方(未提交)</h2>
    <br/>

    <div>
      <span className="recipe-user-info-item" style={{ width: '50%' }}>处方单号：<span className="underline"> 23223423423423 </span></span>
      <span className="recipe-user-info-item">开方日期： <span className="underline"> 2020/04/14 </span></span>
      <div style={{ height: '.2em' }}/>

      <span className="recipe-user-info-item" style={{ width: '25%' }}>姓　　名： <span className="underline"> 张三 </span></span>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>性　　别： <span className="underline"> 男 </span></span>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>年　　龄： <span className="underline"> 43岁 </span></span>
      <span className="recipe-user-info-item">科　　别： <span className="underline"> 呼吸内科 </span></span>
      <div style={{ height: '.2em' }}/>

      <span className="recipe-user-info-item" style={{ width: '50%' }}>住　　址：<span className="underline"> 上海市辖县医院 </span></span>
      <span className="recipe-user-info-item">电　　话：<span className="underline"> 15958036586 </span></span>
      <div style={{ height: '1em' }}/>

      <div>诊　　断：<DiagnoseListSelector/></div>
      <div style={{ height: '1em' }}/>

      <div className="recipe-user-info-item">过敏史：　<Input2 placeholder={'(选填)'} defaultSize={30}/></div>
      <div style={{ height: '1em' }}/>

    </div>

    <br/>
    <hr/>
    <br/>

    <div style={{ minHeight: '260px' }}>
      <TableWestRecipe/>
    </div>
    <br/>
    <hr/>
    <br/>

    <div>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>类型：<ChineseRecipeTypeSelector/></span>
      <span className="recipe-user-info-item" style={{ width: '25%' }}>贴数：<InputNumber size={'small'} style={{ minWidth: '20px' }}/></span>
      <span className="recipe-user-info-item" style={{ width: '50%' }}>服用方法：<ChineseRecipeTypeSelector/></span>
    </div>
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

function DrugSelector ({ drugList, onDrugChange }) {
  const { Option } = Select
  const [searchValue, setSearchValue] = useState('')
  const list = require('../mock-data/west_recipe').default.list
  const [filteredList, setFilteredList] = useState(list)

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch (v) {
    console.log(v)
    setSearchValue(v)
  }

  useEffect( function () {
    setFilteredList(
      searchValue
        ? list.filter( ({ drugName }) => drugName.indexOf(searchValue) > -1 )
        : list
    )
  }, [searchValue] )

  return (
    <span className="diagnose-list-selector">
      <Select
        showSearch={true}
        style={{ minWidth: '150px' }}
        size={'small'}
        placeholder="请选择"
        onChange={handleChange}
        onSearch={onSearch}
      >{
        filteredList.map( ({ id, drugName }) => <Option key={id}>{drugName}</Option> )
      }</Select>
    </span>

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
function DrugAdmissionSelector () {

  const drugAdmissionList = require('../mock-data/smarthos-system-dict-drug-list').drugAdmissionList // 药品用法
  const westernDrugAdmissionList = require('../mock-data/smarthos-system-dict-drug-list').westernDrugAdmissionList // 药品用法(西药)
  const drugFrequencyList = require('../mock-data/smarthos-system-dict-drug-list').drugFrequencyList // 用药频率

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

function TableChineseRecipe (  ) {
  // noinspection JSXNamespaceValidation
  return <table className="middle-prescription-ui--recipe-table" style={{ height: '100%', width: '100%' }}>
    <tr>
      <th width="20px" >序号</th>
      <th width="100px" >药品名称</th>
      <th width="50px" >单次计量</th>
      <th width="100px">单价/金额</th>
      <th width="50px">药品用法</th>
      <th width="100px">操作</th>
    </tr>
    <tr>
      <td>01</td>
      <td><Input2/></td>
      <td><div><Input2/></div></td>
      <td><div style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>2元/g 8元</div></td>
      <td><Input2/></td>
      <td><button>删除</button></td>
    </tr>
    <tr style={{ opacity: 0.5 }}>
      <td>02</td>
      <td><div><Input2/></div></td>
      <td><div><Input2/></div></td>
      <td>2元/g 8元</td>
      <td><Input2/></td>
      <td><button onClick={ () => { alert('最后一行为空白时不会保存, 无需删除') } }>删除</button></td>
    </tr>
  </table>
}

function TableWestRecipe (  ) {

  // require('../mock-data/west_recipe').default.list
  const [list, setList] = useState([])

  // noinspection JSXNamespaceValidation
  return <table className="middle-prescription-ui--recipe-table" style={{ height: '100%', width: '100%' }}>
    <tr>
      <th width="20px" >Rp</th>
      <th >药品名称</th>
      <th >单次计量</th>
      <th>单价/金额</th>
      <th>药品用法</th>
      <th>用药频率</th>
      <th>开药量</th>
      <th>操作</th>
    </tr>
    <tr>
      <td>01</td>
      <td><DrugSelector/></td>
      <td><InputNumber style={{ width: '60px' }}/></td>
      <td><div style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>2元/g 8元</div></td>
      <td><ChineseRecipeTypeSelector/></td>
      <td><ChineseRecipeTypeSelector/></td>
      <td><Input2/></td>
      <td><Button type={'primary'} size={'small'}>删除</Button></td>
    </tr>
    <tr style={{ opacity: 0.5 }}>
      <td>02</td>
      <td><DrugSelector/></td>
      <td><InputNumber style={{ width: '60px' }}/></td>
      <td>2元/g 8元</td>
      <td><ChineseRecipeTypeSelector/></td>
      <td><ChineseRecipeTypeSelector/></td>
      <td><Input2/></td>
      <td><Button type={'primary'} size={'small'} onClick={ () => { alert('最后一行为空白时不会保存, 无需删除') } }>删除</Button></td>
    </tr>
  </table>
}

const PageForm = createForm()(Page)
export default PageForm
