import React from 'react'
import { createForm,FormPath } from '@formily/core'
import { createSchemaField, connect, mapProps, mapReadPretty ,RecursionField,useFieldSchema,observer,FormConsumer,RecordScope, useField,useForm } from '@formily/react'
import {
  Form,
  FormItem,
  FormLayout,
  Input,
  Select,
  Password,
  Cascader,
  DatePicker,
  Submit,
  Space,
  FormGrid,
  Upload,
  ArrayItems,
  Editable,
  FormButtonGroup,
  // Radio,
} from '@formily/antd'
import { action } from '@formily/reactive'
import { Card, Button ,Radio as AntdRadio,Input as AntdInput} from 'antd'
import { UploadOutlined } from '@ant-design/icons'
const form = createForm({
  validateFirst: true,
})

const Test  = (props:any)=>{
  return  <div>
    <Input {...props}/>
  </div>
}
const TestFormily = connect(Test, mapProps((props:any, field:any) => {
  return {
    ...props
  }
})
)
const NewRadio = (props:any)=>{
  debugger
  interface Ioption {
    label:string,
    value:any,
    followDom?:any
  }
  let currentSchema = useFieldSchema()
  let currentfield = useField()
  let form = useForm ()
  const onChange = (e:any)=>{
    console.log(e.target.value)
       //@ts-ignore
    let  currentValue = currentfield.value
    let value = e.target.value
    debugger
    if (value==currentValue) {
        //@ts-ignore
      currentfield.value = null
    }
  }
  console.log(currentSchema)
  console.log(currentfield.address.parent())
  //@ts-ignore
  console.log(currentfield.value)

  
  debugger
  //@ts-ignore
  const options = currentSchema.options.map((op:Ioption)=>{
    return <> 
      <AntdRadio value={op.value} onClick={onChange}>{op.label}</AntdRadio>
      <SchemaField schema={currentSchema.properties}  />
      <RecordScope getRecord={() => props.record} getIndex={() => props.index}>
         {op.followDom&&<RecursionField  schema={op.followDom}  basePath={currentfield.address.parent()}></RecursionField> }
      </RecordScope>
       
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

const IDUpload = (props:any) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: 'authorization-text',
      }}
    >
      <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
  )
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    Password,
    IDUpload,
    Space,
    ArrayItems,
    Editable,
    TestFormily,
    // Radio,
    Test,
    RadioFormily,
    AntdInput
  },
  scope: {
    fetchAddress: (field:any) => {
      const transform = (data = {}):any => {
        return Object.entries(data).reduce((buf, [key, value]) => {
          if (typeof value === 'string')
            return buf.concat({
              // @ts-ignore
              label: value,
              value: key,
            })
            // @ts-ignore
          const { name, code, cities, districts } = value
          const _cities = transform(cities)
          const _districts = transform(districts)
          return buf.concat({
            // @ts-ignore
            label: name,
            value: code,
            children: _cities.length
              ? _cities
              : _districts.length
              ? _districts
              : undefined,
          })
        }, [])
      }

      field.loading = true
      fetch('//unpkg.com/china-location/dist/location.json')
        .then((res) => res.json())
        .then(
          // @ts-ignore
          action.bound((data:any) => {
            field.dataSource = transform(data)
            field.loading = false
          })
        )
    },
    myReaction (field:any) {
      const username = field.query('username').take()
      const firstName = field.query('firstName').take()
      const email = field.query('email').take()
      if (!username||!firstName) return
      if (username.value&&firstName.value) {
        email.value = Number(username.value) + Number(firstName.value)
      }
    }
  },
})

const schema = {
  type: 'object',
  properties: {
    RadioFormily:{
      type: 'object',
      title: 'RadioFormily',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'RadioFormily',
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
                // required: true,
                'x-decorator': 'FormItem',
                'x-component': 'AntdInput',
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
    testName: {
      type: 'string',
      title: 'testName',
      // required: true,
      'x-decorator': 'FormItem',
      'x-component': 'TestFormily',
    },
    // test1:{
    //   type:'number',
    //   title:'test1',
    //   // require:true,
    //   'x-decorator': 'FormItem',
    //   'x-component': 'Radio.Group',
    //   "enum":[
    //     {
    //       label: '选项1',
    //       value: 1,
    //     },
    //     {
    //       label: '选项2',
    //       value: 2,
    //     },
    //   ]
    // },
    username: {
      type: 'string',
      title: '用户名',
      // required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      "x-reactions":"{{myReaction}}"
    },
    password: {
      type: 'string',
      title: '密码',
      // required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
      'x-reactions': [
        {
          dependencies: ['.confirm_password'],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
            },
          },
        },
      ],
    },
    confirm_password: {
      type: 'string',
      title: '确认密码',
      // required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
      'x-component-props': {
        checkStrength: true,
      },
      'x-reactions': [
        {
          dependencies: ['.password'],
          fulfill: {
            state: {
              selfErrors:
                '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
            },
          },
        },
      ],
    },
    name: {
      type: 'void',
      title: '姓名',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        asterisk: true,
        feedbackLayout: 'none',
      },
      'x-component': 'FormGrid',
      
      properties: {
        firstName: {
          type: 'string',
          // required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          "x-reactions":"{{myReaction}}",
          'x-component-props': {
            placeholder: '姓',
          },
        },
        lastName: {
          type: 'string',
          // required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
          'x-component-props': {
            placeholder: '名',
          },
        },
      },
    },
    email: {
      type: 'string',
      title: '邮箱',
      // required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-validator': 'email',
    },
    gender: {
      type: 'string',
      title: '性别',
      enum: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
        {
          label: '第三性别',
          value: 3,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    birthday: {
      type: 'string',
      // required: true,
      title: '生日',
      'x-decorator': 'FormItem',
      'x-component': 'DatePicker',
    },
    address: {
      type: 'string',
      // required: true,
      title: '地址',
      'x-decorator': 'FormItem',
      'x-component': 'Cascader',
      'x-reactions': '{{fetchAddress}}',
    },
    idCard: {
      type: 'string',
      // required: true,
      title: '身份证复印件',
      'x-decorator': 'FormItem',
      'x-component': 'IDUpload',
    },
    contacts: {
      type: 'array',
      // required: true,
      title: '联系人信息',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayItems',
      items: {
        type: 'object',
        'x-component': 'ArrayItems.Item',
        properties: {
          sort: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.SortHandle',
          },
          popover: {
            type: 'void',
            title: '完善联系人信息',
            'x-decorator': 'Editable.Popover',
            'x-component': 'FormLayout',
            'x-component-props': {
              layout: 'vertical',
            },
            'x-reactions': [
              {
                dependencies: ['.popover.name'],
                fulfill: {
                  schema: {
                    title: '{{$deps[0]}}',
                  },
                },
              },
            ],
            properties: {
              name: {
                type: 'string',
                title: '姓名',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              email: {
                type: 'string',
                title: '邮箱',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'email'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
              phone: {
                type: 'string',
                title: '手机号',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-validator': [{ required: true }, 'phone'],
                'x-component-props': {
                  style: {
                    width: 300,
                  },
                },
              },
            },
          },
          remove: {
            type: 'void',
            'x-decorator': 'FormItem',
            'x-component': 'ArrayItems.Remove',
          },
        },
      },
      properties: {
        addition: {
          type: 'void',
          title: '新增联系人',
          'x-component': 'ArrayItems.Addition',
        },
      },
    },
  },
}

export default () => {
  const onAutoSubmit = (value:any)=> {
    console.log(value)
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        background: '#eee',
        padding: '40px 0',
      }}
    >
      <Card title="新用户注册" style={{ width: 620 }}>
        <Form
          form={form}
          labelCol={5}
          wrapperCol={16}
          onAutoSubmit={onAutoSubmit}
        >
          <SchemaField schema={schema} />
          <FormButtonGroup.FormItem>
            <Submit block size="large">
              注册
            </Submit>
          </FormButtonGroup.FormItem>
          <code>
          <pre>
            <FormConsumer>
              {(form) => JSON.stringify(form.values, null, 2)}
            </FormConsumer>
          </pre>
        </code>
        </Form>
      </Card>
    </div>
  )
}