import React from 'react'
import {  connect, mapProps, mapReadPretty ,RecursionField,useFieldSchema,useField } from '@formily/react'
import { Radio as AntdRadio} from 'antd'

const NewRadio = (props:any)=>{
  interface Ioption {
    label:string,
    value:any,
    followDom?:any
  }
  let currentSchema = useFieldSchema()
  let currentfield = useField()
  // let form = useForm ()
  const onChange = (e:any)=>{
    console.log(e.target.value)
       //@ts-ignore
    let  currentValue = currentfield.value
    let value = e.target.value
    if (value==currentValue) {
        //@ts-ignore
      currentfield.value = null
    }
  }
  console.log(currentfield.address.parent())
  //@ts-ignore

  //@ts-ignore
  const options = currentSchema.options.map((op:Ioption)=>{
    return <> 
      <AntdRadio value={op.value} onClick={onChange}>{op.label}</AntdRadio>
      {op.followDom&&<RecursionField  schema={op.followDom}  basePath={currentfield.address.parent()}></RecursionField> }
    </>
  })
  
  //@ts-ignore
  return <AntdRadio.Group name="radiogroup"  {...props}> {options} </AntdRadio.Group>
}
//@ts-ignore
const RadioFormily = connect(NewRadio ,
  mapProps({
    dataSource: 'options',
  })
)
export default RadioFormily 