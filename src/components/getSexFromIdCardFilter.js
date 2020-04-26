export function getSexFromIdCardFilter ( str ) {
  if ( !str ) return ''
  if ( str.length === 18 ) {
    const sex = str.substring( 16, 17 )
    return sex % 2 === 1 ? '男' : '女'
  } else {
    return ''
  }
}
