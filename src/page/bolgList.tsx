import React, {useState,useEffect} from "react";
// import  '../bolg.module.less'
import Style from  '../bolg.module.less'
import { useNavigate } from "react-router-dom";
// const Style = require('../bolg.less')
interface IProps {

}
let BlogList = (porps:IProps)=>{
  const navigate = useNavigate();
  let goAddBlog = () :void =>{
    navigate('/AddBlog')
  }
  console.log(porps)
  // console.log(Style)
  return (
    <div>
       <div style={{
        display:'flex',
        justifyContent:"space-between" ,
        alignItems:"center",
        margin:"0 20px"
      }}>
        <h2>
          博客列表
        </h2>
        <button style={{
          height:'40px',
        }} onClick={goAddBlog}>
          新增博客
        </button>
      </div>
      <div className={Style.box}>
     
      <ul>
        <li className={Style.bolgListBox}>
          <h3>
            title
          </h3>
          <div>
            content
          </div>
        </li>
        <li className={Style.bolgListBox}>
          <h3>
            title
          </h3>
          <div>
            content
          </div>
        </li>
      </ul>
    </div>
    </div>
    
  )
}
export default BlogList