import { Button, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import InputAutoWidth                 from './InputAutoWidth'

function DrugSelector ( { drug, onDrugChange = Function } ) {
  const { Option }                      = Select
  const [searchValue, setSearchValue]   = useState( '' )
  const list                            = require( '../mock-data/west_recipe' ).default.list
  const [filteredList, setFilteredList] = useState( list )

  function handleChange ( value ) {
    onDrugChange( list.find( drug => drug.id === value ) )
    console.log( `selected ${value}` )
  }

  function onSearch ( v ) {
    console.log( v )
    setSearchValue( v )
  }

  useEffect( function () {
    setFilteredList(
      searchValue
        ? list.filter( ( { drugName } ) => drugName.indexOf( searchValue ) > -1 )
        : list
    )
  }, [searchValue] )

  return (
    <span className="diagnose-list-selector">
      <Select
        value={drug.drugName}
        showSearch={true}
        style={{ minWidth: '150px' }}
        size={'small'}
        placeholder="添加药品"
        onChange={handleChange}
        onSearch={onSearch}
      >{
        filteredList.map( ( { id, drugName } ) => <Option key={id}>{drugName}</Option> )
      }</Select>
    </span>

  )
}

function DrugAdmissionSelector ( { isWest, form } ) {

  const data                     = require( '../mock-data/smarthos-system-dict-drug-list' ).default
  const drugAdmissionList        = data.obj.drugAdmissionList // 药品用法
  const westernDrugAdmissionList = data.obj.westernDrugAdmissionList // 药品用法(西药)

  function handleChange ( value ) {
    console.log( `selected ${value}` )
  }

  return (
    <span className="diagnose-list-selector">
      <Select
        size={'small'}
        placeholder="请选择"
        dropdownMatchSelectWidth={80}
        onChange={handleChange}
      >{(isWest ? westernDrugAdmissionList : drugAdmissionList).map( ( { dictValue, dictKey } ) =>
        <Option key={dictValue}>{dictKey}</Option>
      )}</Select>
    </span>

  )
}

function Table ( { isWest, form } ) {

  const data              = require( '../mock-data/smarthos-system-dict-drug-list' ).default
  const drugFrequencyList = data.obj.drugFrequencyList // 用药频率

  function handleChange ( value ) {
    console.log( `selected ${value}` )
  }

  return (
    <span className="diagnose-list-selector">
      <Select
        size={'small'}
        placeholder="请选择"
        dropdownMatchSelectWidth={80}
        onChange={handleChange}
      >{drugFrequencyList.map( ( { dictValue, dictKey } ) =>
        <Option key={dictValue}>{dictKey}</Option>
      )}</Select>
    </span>

  )
}

function TableChineseRecipe () {
  // noinspection JSXNamespaceValidation
  return <table className="middle-prescription-ui--recipe-table" style={{ height: '100%', width: '100%' }}>
    <tr>
      <th width="20px">序号</th>
      <th width="100px">药品名称</th>
      <th width="50px">单次计量</th>
      <th width="100px">单价/金额</th>
      <th width="50px">药品用法</th>
      <th width="100px">操作</th>
    </tr>
    <tr>
      <td>01</td>
      <td><InputAutoWidth/></td>
      <td>
        <div><InputAutoWidth/></div>
      </td>
      <td>
        <div style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>2元/g 8元</div>
      </td>
      <td><InputAutoWidth/></td>
      <td>
        <button>删除</button>
      </td>
    </tr>
    <tr style={{ opacity: 0.5 }}>
      <td>02</td>
      <td>
        <div><InputAutoWidth/></div>
      </td>
      <td>
        <div><InputAutoWidth/></div>
      </td>
      <td>2元/g 8元</td>
      <td><InputAutoWidth/></td>
      <td>
        <button onClick={() => {
          alert( '最后一行为空白时不会保存, 无需删除' )
        }}>删除
        </button>
      </td>
    </tr>
  </table>
}

export function TableWestRecipe ( { form, tableDataChange = Function, enableEdit } ) {

  /** @namespace drug.frequencyCode */

  const [list, setList] = useState( [{}] )


  function onDrugChange ( drug, index ) {

    console.log( drug, index )
    const _list  = JSON.parse( JSON.stringify( list ) )
    _list[index] = drug

    const lastDrug = _list[_list.length - 1]
    lastDrug && lastDrug.id && _list.push( {} )
    setList( _list.map( ( drug, index ) => Object.assign( drug, { key: index } ) ) )
  }

  function onDrugPropertyChange ( propertyName, propertyValue, index ) {
    const _list                = JSON.parse( JSON.stringify( list ) )
    _list[index][propertyName] = propertyValue
    setList( _list )
  }

  function onDeleteButtonClick ( index ) {

    console.log( index )

    if ( index === list.length - 1 )
      return alert( '最后一行为空白时不会保存, 无需删除' )

    let _list = JSON.parse( JSON.stringify( list ) )
    _list.splice( index, 1 )
    setList( _list )

  }

  return <table
    className="middle-prescription-ui--recipe-table"
    style={{ height: '100%', width: '100%', userSelect: 'none' }}
  >
    <thead>
    <tr>
      <th width="20px">Rp</th>
      <th>药品名称</th>
      <th>单次计量</th>
      <th>开药量</th>
      <th>单价/金额</th>
      <th>药品用法</th>
      <th>用药频率</th>
      {enableEdit && <th>操作</th>}
    </tr>
    </thead>
    <tbody>{list.map( ( drug, index ) =>
      <tr key={drug.key}>
        <td>{index === list.length - 1 ? '+' : (index + 1) < 10 ? '0' + (index + 1) : (index + 1)}</td>
        <td><DrugSelector drug={drug} onDrugChange={drug => {
          onDrugChange( drug, index )
        }}/></td>
        <td><InputNumber value={drug.dosage /* 单次计量 */} onChange={v => onDrugPropertyChange( 'dosage', v, index )}
                         style={{ width: '60px' }}/></td>
        <td><InputAutoWidth value={drug.amount} onChange={v => onDrugPropertyChange( 'amount', v, index )}/></td>
        <td>
          <div style={{ wordBreak: 'keep-all', whiteSpace: 'nowrap' }}>{drug.price}元/{drug.dosageUnit},
            共{drug.price * drug.amount || 0}元
          </div>
        </td>
        <td><DrugAdmissionSelector value={drug.drugAdmission}
                                   onChange={v => onDrugPropertyChange( 'drugAdmission', v, index )}/></td>
        <td><Table value={drug.frequencyCode}
                   onChange={v => onDrugPropertyChange( 'frequencyCode', v, index )}/></td>
        {enableEdit && <td>{index !== list.length - 1 &&
        <Button type={'primary'} size={'small'} onClick={() => {
          onDeleteButtonClick( index )
        }}>删除</Button>
        }</td>}
      </tr>
    )}</tbody>
  </table>
}
