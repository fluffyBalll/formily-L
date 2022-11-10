import React, { useState } from "react";
import usePerson  from '../util/usePerson'
const Test = () =>{
  let [personId,setPersonId] = useState('001')
  let addpersonId = () => {
    setPersonId( personId+'2')
  }
  console.log('-------------')
  const [loading, person] = usePerson(personId);
  if (loading === true) {
    return <p>Loading ...</p>;
  }
  return <div>
    test
    {
      person.personId
    }
    {
      personId
    }
    <button onClick={addpersonId}>
      addPersonId
    </button>
  </div>
}
export default Test