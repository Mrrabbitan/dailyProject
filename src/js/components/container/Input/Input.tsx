import React from 'react'

interface inputProto {
  label: string
  text: string
  type: string
  id: string
  value: string
  handleChange: () => {}
}

export const Input: React.FC<inputProto> = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.label}>{props.text}</label>
      <input type={props.type} className="form-control" id={props.id} value={props.value} onChange={props.handleChange} required />
    </div>
  )
}
