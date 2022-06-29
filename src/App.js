import { useEffect, useState } from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import './App.css';

function App() {

  const [buttons, setbuttons] = useState([
    {
      value:'AC'
    },
    {
      value:'C'
    },
    {
      value:'%'
    },
    {
      value:'x',
    },
    {
      value:7,
    },
    {
      value:8,
    },
    {
      value:9,
    },
    {
      value:'/',
    },
    {
      value:4,
    },
    {
      value:5,
    },
    {
      value:6,
    },
    {
      value:'-',
    },
    {
      value:1,
    },
    {
      value:2,
    },
    {
      value:3,
    },
    {
      value:'+',
    },
    {
      value:0,
    },
    {
      value:'.',
    },
    {
      value:'=',
    },
  ])
  const [firstCount, setfirstCount] = useState([])
  const [secondCount, setsecondCount] = useState([])
  const [result, setresult] = useState([0])
  const [currentInputs, setcurrentInputs] = useState([0])
  const [swipe, setswipe] = useState(false)
  const handleButtons = (expression) =>{
    switch(expression) {
      case 'AC':
        setcurrentInputs([0])
        setswipe(false)
        setfirstCount([])
        setsecondCount([])
        break; 
      case 'C':
        currentInputs.splice(-1,1)
        setcurrentInputs([...currentInputs])
        if(currentInputs.length<1){
          setcurrentInputs([0])
        }
      break;
      case '=':
        if(!swipe)return;
        let result  = parseInt(firstCount.join("")) + parseInt(secondCount.join(""))
        setcurrentInputs([result])
        setfirstCount([result])
        setresult(result)
        setsecondCount([])
        setswipe(false)
      break;  
      case '+':
        if(currentInputs[currentInputs.length-1]==='+') return;
        setcurrentInputs([...currentInputs,'+'])
        if(swipe){
          let result  = parseInt(firstCount.join("")) + parseInt(secondCount.join(""))
          setfirstCount([result])
          setresult(result)
          setsecondCount([])
          setswipe(false)
        }
        setswipe(true)
      break;  
      case expression:
        [0,1,2,3,4,5,6,7,8,9].map(number=>{
          if(expression===number){
            setcurrentInputs([...currentInputs,number])
            if(swipe){
              setsecondCount([...secondCount,number])
            }else{
              setfirstCount([...firstCount,number])
            }
          }
          else{
            return;
          }
        })
      break;
      // case 'AC':
      //   setcurrentInputs([0])
      //   break;  
      default:
        // code block 
    }
  }
  return (
    <div className="app">
      <div className='calculatorBody'>
        <div>
          <Stack>
            <div className='calculator__first__display' >{result}</div>
            <div className='calculator__second__display'>{currentInputs}</div>
          </Stack>
        </div>
        <div className='calculator__buttons__container'>
        <Row style={rowStyle} className="row">
          {
            buttons?.map((button,index)=>(
              <Col onClick={()=>{handleButtons(button?.value)}} key={index} xs={button.value === '='? 6:3} style={columnStyle} ><Button variant={button.value === '='? 'outline-success':'outline-primary'} className="btn" >{button?.value}</Button></Col>
            ))
          }
        </Row>
        </div>
      </div>
    </div>
  );
}

export default App;


const columnStyle = {
  padding:'5px',
}
const rowStyle = {
  margin:'0px 0px 10px 0px',
}

