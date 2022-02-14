import {useState} from 'react'
import DataContext from './Context'


const Provider = (props)=>{
  const [data,setData] = useState([{todo:"desayunar"}])
  return(
    <DataContext.Provider value={{data,setData}}>
      {props.children}
    </DataContext.Provider>
  )
}

export default Provider
