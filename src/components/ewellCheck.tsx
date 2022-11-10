import React from 'react'
import { createForm,FormPath } from '@formily/core'
import { createSchemaField, connect, mapProps, mapReadPretty ,RecursionField,useFieldSchema,observer,FormConsumer,RecordScope, useField,useForm } from '@formily/react'
import { Card, Button ,Checkbox as AntdCheckbox,Input as AntdInput} from 'antd'
import { Typography } from 'antd';
import {
  Form,
  FormItem,
  Submit,
  FormButtonGroup,
  // Radio,
} from '@formily/antd'
const { Title,Text } = Typography;

const form = createForm({
  validateFirst: true,
})

const NewCheckBox = (props:any)=>{
  interface Ioption {
    label:string,
    value:any,
    followDom?:any,
    style?:object
  }
  let currentSchema = useFieldSchema()
  let currentfield = useField()
  // let form = useForm ()
  //@ts-ignore

  //@ts-ignore
  const options = currentSchema.options.map((op:Ioption)=>{
    return <> 
      <span style={op.style}>
        <AntdCheckbox value={op.value} >{op.label}</AntdCheckbox>
      </span>
      {op.followDom&&<RecursionField  schema={op.followDom}  basePath={currentfield.address.parent()}></RecursionField> }
    </>
  })
  //@ts-ignore
  return <AntdCheckbox.Group name="checkgroup"  {...props}> {options} </AntdCheckbox.Group>
}
//@ts-ignore
const CheckBoxFormily = connect(NewCheckBox ,
  mapProps({
    value: 'checked',
  })
)

const SchemaField = createSchemaField({
  components: {
    AntdInput,
    FormItem,
    CheckBoxFormily
  },
  scope: {
    showfllowDom:(filed:any)=> {
      let CheckBoxFormily = filed.form.query('CheckBoxFormily').take()
      let isArray =  Array.isArray(CheckBoxFormily.value) 
      if (isArray&&CheckBoxFormily?.value?.includes(1)){
        filed.query('testFollow').take().visible = true
      } else {
        filed.query('testFollow').take().visible = false
      }
    }
  },
})

const schema = {
  type: 'object',
  properties: {
    CheckBoxFormily:{
      type: 'object',
      title: 'CheckBoxFormily',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'CheckBoxFormily',
      "options":[
        {
          label: '选项1',
          value: 1,
          followDom:{
            type: 'object',
            properties:{
              testFollow: {
                type: 'string',
                title: 'testFollow',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'AntdInput',
                "x-reactions": '{{showfllowDom}}',
                
                "x-decorator-props":{
                  style: {
                    display: 'inline-flex',
                    marginRight:"16px"
                  },
                },
                'x-component-props': {
                  style: {
                    // display: 'inline-flex',
                  },
                },
              },
            }
          }
        },
        {
          label: '选项2',
          value: 2,
        }
      ],
    },
  },
}
export default ()=>{
  const onAutoSubmit = (value:any)=> {
    console.log(value)
  }
  return (
    <div>
      <Card title="#checkbox选中选项后 出现跟随dom" style={{ width: "auto" }}>
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
          <Text>1.添加了通过在选项节点上加followDom字段的方式，传入选项选中时要跟随显示的dom元素</Text>
        </code>
        </Form>
      </Card>
    </div>
  )
}