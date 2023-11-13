import React from 'react'

export const BarraMenuHeader = (props) => {
  return (
    <div style={{width: props.width, height: props.height, textAlign: props.textAlign, float: 'left'}}>
        <h3>{props.value}</h3>
    </div>
  )
}
