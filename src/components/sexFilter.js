export function sexFilter ( str, type = 1 ) {
  if ( !str ) return ''
  let data = {}
  str      = str.toLowerCase()
  if ( type === 1 ) {
    data = { f: '女', m: '男', n: '未知' }
  }
  if ( type === 2 ) {
    data = { 2: '女', 1: '男', 0: '未知' }
  }
  return data[str] || ''
}
