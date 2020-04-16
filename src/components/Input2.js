import React, { useEffect, useRef } from 'react'
function Input2 ( { form, placeholder, defaultSize = 1 }) {

  const domRef = useRef()
  useEffect( () => {
    const input = domRef.current
    input && (input.size = Math.max( input.value.length * 2.5 || defaultSize, 1 ))
  }, [] )


  function changeWidth (e) {
    console.log(domRef)
    console.dir(e.currentTarget)
    e.currentTarget.size = Math.max( e.currentTarget.value.length * 2.5 || defaultSize, 1 )
  }

  return <input onChange={ changeWidth } placeholder={placeholder} ref={domRef} style={{ display: 'inline', border: 0, borderBottom: '1px solid #666', outline: 'none', minWidth: '20px' }} type="text"/>
}

export default Input2
