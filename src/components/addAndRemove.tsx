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

const SchemaField = createSchemaField({
  components: {
    AntdInput,
    FormItem,
    ArrayItems
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
      'x-component': 'ArrayItems',
      items:{
        type: 'void',
        'x-component': 'Space',
        properties:{
          input: {
            type: 'string',
            'x-decorator': 'FormItem',
            'x-component': 'AntdInput',
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        }
      },
      properties: {
        add: {
          type: 'void',
          title: 'Add entry',
          'x-component': 'ArrayItems.Addition',
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
      <Card title="#可增加及减少" style={{ width: "auto" }}>
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
          <Text>1.使用了formilyAntd的array组件</Text>
          <br />
        </code>
        </Form>
      </Card>
    </div>
  )
}