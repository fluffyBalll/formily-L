import React from 'react'
import { createForm,FormPath } from '@formily/core'
import { createSchemaField, connect, mapProps, mapReadPretty ,RecursionField,useFieldSchema,observer,FormConsumer,RecordScope, useField,useForm } from '@formily/react'
import EwellRadio from '../components/ewellRadio'
import ChooseThenShow from '../components/chooseThenDisabled'
import EwellCheck from '../components/ewellCheck'
import AddAndRemove from '../components/addAndRemove'
import AddAndRemoveBySelf from '../components/addAndRemoveBySelf'
export default ()=>{
  return (
    <div>
      <h1>formily的一些例子</h1>
      <EwellRadio/>
      <ChooseThenShow />
      <EwellCheck></EwellCheck>  
      <AddAndRemove></AddAndRemove>  
      <AddAndRemoveBySelf></AddAndRemoveBySelf>
    </div>
  )
}