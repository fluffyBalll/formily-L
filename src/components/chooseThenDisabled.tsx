import React from 'react'
import { createForm,FormPath } from '@formily/core'
import { createSchemaField, connect, mapProps, mapReadPretty ,RecursionField,useFieldSchema,observer,FormConsumer,RecordScope, useField,useForm } from '@formily/react'
import { Card, Button ,Radio as AntdRadio,Input as AntdInput} from 'antd'
import RadioFormily from './RadioFormily'
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

const SchemaField = createSchemaField({
  components: {
    AntdInput,
    FormItem,
    RadioFormily
  },
  scope: {
  }
})

const schema = {
  type: 'object',
  properties: {
   chooseRadio:{
    type: 'object',
      title: 'RadioFormily',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'RadioFormily',
      "options":[
        {
          label: '选项1',
          value: 1,
        },
        {
          label: '选项2',
          value: 2,
        }
      ],
   },
   testDisabled: {
    type: 'string',
    title: 'testDisabled',
    required: true,
    'x-decorator': 'FormItem',
    'x-component': 'AntdInput',
    "x-disabled": true,
    "x-reactions": {
      "dependencies": ["chooseRadio"],
      "fulfill": {
        "schema": {
          "x-disabled": "{{$deps[0] !== 1}}" //任意层次属性都支持表达式
        }
      }
    }
   },
  },
}
export default ()=>{
  const onAutoSubmit = (value:any)=> {
    console.log(value)
  }
  return (
    <div>
      <Card title="#radio选中某个选项 控制是否禁用（选中选项1解除禁用）" style={{ width: "auto" }}>
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
          <Text>1.逻辑操作可以有主动逻辑或被动逻辑，复杂逻辑可采用函数形式（这里采用的是被动模式，多用于一个节点被多个其他节点影响的情景）</Text>
          <br />
        </code>
        </Form>
      </Card>
    </div>
  )
}