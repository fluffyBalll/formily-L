import React, {useState,useEffect} from "react";
import './blog.less'
interface IProps {

}
let BlogList = (porps:IProps)=>{
  console.log(porps)
  return (
    <div className="bolgListBox">
      <ul>
        <li>
          <span>
            title
          </span>
          <span>
            content
          </span>
        </li>
        <li>
          <span>
            title
          </span>
          <span>
            content
          </span>
        </li>
      </ul>
    </div>
  )
}
export default BlogList