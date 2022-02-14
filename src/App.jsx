import DataContext from './context/Context'
import { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Form,Container,Button,Table,Row,Col,Alert} from 'react-bootstrap'


const CustomAlert = (props) => {      
  return (
    <>
      { props.error ? <Alert className="alert-danger">Error al agregar todo</Alert>: <Alert>Se agrego correctamente el Todo</Alert>}
    </>
  )
}


const WrapForm = () => {

  const [dataForm , setDataForm] = useState({inputValue:""})
  const [message , setMessage] = useState (false)
  const [error , setError] = useState(false)
  const {data , setData} = useContext(DataContext)

  const handleEventSubmit = (e) => {
      e.preventDefault()

     if(!dataForm.inputValue){
        /*setData([...data,{todo:dataForm.inputValue}])
        setDataForm({inputValue: ""})*/
          if(!message){
            setMessage(true)
          }
       return setError(true)
      }

    setData([...data,{todo: dataForm.inputValue}])

    if(!message){
     return  setMessage(true)
    }
    setError(false)
    setDataForm({inputValue: ""})
  }


  const handleEventInput = (e) => {
    setDataForm({inputValue: e.target.value})
  }

  return(
  <Form className="mt-4">
      <h1>Todo List</h1>
      <Form.Group>
        <Form.Control type="text" placeholder="Enter Todo" onInput={handleEventInput} value={dataForm.inputValue}/>
        <Form.Text className="text-mutead">
           We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
        <Button variant="primary" type="submit" className="mt-3" onClick={handleEventSubmit}>
          add todo
        </Button>
      <div className="mt-3">
        {message ? <CustomAlert error = {error}/>: null}
      </div>
    </Form>
  
  )
}



  const ItemList = (props)=>{
    const {index,value,data,setData } = props;

    const deleteEvent = ()=> {
      setData( data.filter((e , i)=>{
          if(i!==index){
            return e
          }
        }))
    }

    const updateEvent = ()=> {
       
    }
    return (
        <tr>
          <td>{index + 1}</td>
          <td><input type="text" defaultValue = {value}/> </td>
          <td>{<Button variant="danger" onClick = {deleteEvent}>delete</Button>}</td>
          <td>{<Button variant="warning">update</Button>}</td>
        </tr>
    )
  }


const WrapTable = ()=>{

  const {data , setData} = useContext(DataContext)
  return(
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>todo</th>
            <th>borrar</th>
            <th>modificar</th>
          </tr>
        </thead>
        <tbody>
          {
            data.map((value,index)=>{
                return(
                  <ItemList key={index} index={index}value={value.todo} data={data} setData={setData}/>
                )
            })

          }
      </tbody>
    </Table>
  )
}

function App() {

  return (
    <div className="App">
      <Container className="fluid">
        <Row>
          <Col>
            <WrapForm />
          </Col>
        </Row>
        <Row>
          <Col>
            <WrapTable/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}  


export default App;    
