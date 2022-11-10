import React from 'react'
import { createForm,FormPath } from '@formily/core'
import { createSchemaField,ArrayField, connect, mapProps, mapReadPretty ,RecursionField,useFieldSchema,observer,FormConsumer,RecordScope, useField,useForm } from '@formily/react'
import { Card, Button ,Radio as AntdRadio,Input as AntdInput} from 'antd'
import { Typography } from 'antd';
import {
  Form,
  FormItem,
  Submit,
  FormButtonGroup,
  ArrayItems,
  // Radio,
} from '@formily/antd'
const { Title,Text } = Typography;

const form = createForm({
  validateFirst: true,
})
const ArrayComponent = observer((props) => {
  const field = useField<any>()
  const schema = useFieldSchema()
  const dataSource = Array.isArray(field.value) ? field.value : []
  return (
    <>
      <div>
        {dataSource.map((item:any, index:number) => {
          const items:any = Array.isArray(schema.items)
          ? schema.items[index] || schema.items[0]
          : schema.items
          return ( 
           <div key={index} style={{ display: 'flex-block', marginBottom: 10 }}>
           {schema.items&&<RecursionField  schema={items} name={index} ></RecursionField>}
           <Button
             onClick={() => {
               field.remove(index)
             }}
           >
             Remove
           </Button>
           <Button
             onClick={() => {
               field.moveUp(index)
             }}
           >
             Move Up
           </Button>
           <Button
             onClick={() => {
               field.moveDown(index)
             }}
           >
             Move Down
           </Button>
       </div>)
})}
      </div>
      <Button
        onClick={() => {
          field.push('')
        }}
      >
        Add
      </Button>
    </>
  )
})

const AddButton = (props:any)=>{
  const field = useField<any>()
  return   <Button
    onClick={() => {
      field.push('')
    }}
  >
    Add
  </Button> 
}

const SchemaField = createSchemaField({
  components: {
    AntdInput,
    FormItem,
    ArrayComponent,
    AddButton
  },
  scope: {
  }
})

const schema = {
  type: 'object',
  properties: {
    string_array: {
      type: 'array',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayComponent',
      items:{
        type: 'void',
        'x-component': 'Space',
        properties:{
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'AntdInput',
          },
        }
      },
      properties: {
        add: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'AddButton',
        },
      },
    },
  },
}
export default ()=>{
  const onAutoSubmit = (value:any)=> {
    console.log(value)
  }
  return (
    <div>
      <Card title="#可增加及减少 (自定义组件方式)" style={{ width: "auto" }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={onAutoSubmit}
        >
          <SchemaField schema={schema} />
          <FormButtonGroup.FormItem>
            <Submit block size="middle">
              保存
            </Submit>
          </FormButtonGroup.FormItem>
          <code>
          <pre>
            <FormConsumer>
              {(form) => JSON.stringify(form.values, null, 2)}
            </FormConsumer>
          </pre>
          <Title level={3}>说明：</Title>
          <Text>1.使用了自定义组件</Text>
          <br />
        </code>
        </Form>
      </Card>
    </div>
  )
}