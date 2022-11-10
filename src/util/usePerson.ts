import { useState, useEffect } from "react";
interface Iperson {
  personId:string
}
type keys = 'personId' 
const usePerson = (personId:string):[boolean,Record<string,any>] => {
  const [loading, setLoading] = useState(true);
  const [person, setPerson] = useState<Iperson>({} as Iperson);
  useEffect(() => {
    setLoading(true);
      setTimeout(() => {
        setPerson({
          personId
        });
        setLoading(false);
      }, 2000);
  }, [personId]);  
  return [loading, person];
};

export default usePerson