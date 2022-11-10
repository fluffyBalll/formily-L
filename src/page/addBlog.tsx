import React, {useState,useEffect} from "react";
import axios from 'axios'
interface IProps {

}
const AddBlog = (porps:IProps)=>{
  let [title,setTitle] = useState<String>('')
  let [content,setContent] = useState<String>('')
  let setBlogTitle = (e:React.FormEvent<HTMLInputElement>)=>{
    console.log(e)
    let value  = e.currentTarget.value
    setTitle(value)
  }
  let setBlogContent = (e:React.FormEvent<HTMLTextAreaElement>) =>{
    console.log(e)
    let value  = e.currentTarget.value
    setContent(value)
  }
  let submitBlog = () => {
    let params = {
      id:new Date().getTime(),
      title,
      content
    }
    axios.post('/api/blog/addBlog', params).then((res)=>{
      if (res) alert("添加成功")
    })
  }
  return (
    <div>
      新增博客
      <div>
        <input type="text" onInput={e=>setBlogTitle(e)}/>
      </div>
      <div>
        <textarea name="" id="" onInput={e=>setBlogContent(e)}></textarea>
      </div>
      <button onClick={submitBlog}>
        提交
      </button>
    </div>
  )
}
export default AddBlog