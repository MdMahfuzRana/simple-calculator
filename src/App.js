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
  const [currentInputs, setcurrentInputs] = useState([])
  const [swipe, setswipe] = useState(false)
  const [operator, setoperator] = useState()
  const [modulus, setmodulus] = useState(false)

  const calculate = (right,left,operations)=>{
    switch (operations) {
      case '+':
        return(right+left)
      case '-':
        return(right-left)    
      case '/':
        return(right/left)
      case 'x':
        return(right*left)          
      default:
        break;
    }
  }
  const operations = (expression)=> {
    ['+','-','/','x'].map(sign=>{
      if(expression===sign){
        if(firstCount.length===0){
          setfirstCount([sign])
          return setcurrentInputs([sign])
        }
        if(currentInputs[currentInputs.length-1]===sign) return;
        setoperator(sign)
        setcurrentInputs([...currentInputs,sign])
        if(swipe){
          let leftNbr = parseInt(firstCount.join(""))
          let rightNbr = parseInt(secondCount.join(""))
          let result  =  calculate(leftNbr, rightNbr, operator)
          setfirstCount([result])
          setresult(result)
          setsecondCount([])
          setswipe(false)
        }
        setswipe(true)
      }
    })
  }

  const handleButtons = (expression) =>{
    switch(expression) {
      case 'AC':
        setcurrentInputs([])
        setswipe(false)
        setfirstCount([])
        setsecondCount([])
        break; 
      case 'C':
        currentInputs.splice(-1,1)
        setcurrentInputs([...currentInputs])
        if(currentInputs.length<1){
          setcurrentInputs([])
        }
      break;
      case '+':
        operations('+')
        break;
      case '-':
        operations('-')
        break;
      case '/':
        operations('/')
        break;
      case 'x':
        operations('x')
        break;
      case '%':
        if(firstCount.length===0){return}
        if(currentInputs[currentInputs.length-1]==='%') return
        setfirstCount([...firstCount,'%'])
        let divideable = parseFloat(firstCount.join(""))
        let modulus =  calculate(divideable, 100, '/')
        setcurrentInputs([modulus])
        setfirstCount([modulus])
        setresult(modulus)
        setsecondCount([])
        setswipe(false)
        break;
      case '.':
        setcurrentInputs([...currentInputs,'.'])
        if(swipe){
          setsecondCount([...secondCount,'.'])
        }else{
          setfirstCount([...firstCount,'.'])
        }
        break;
      case '=':
        if(secondCount?.length===0)return;
        let leftNbr = parseFloat(firstCount.join(""))
        let rightNbr = parseFloat(secondCount.join(""))
        let result  =  calculate(leftNbr, rightNbr, operator)
        setcurrentInputs([result])
        setfirstCount([result])
        setresult(result)
        setsecondCount([])
        setswipe(false)
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
      default:
    }
  }
  return (
    <div className="app">
      <div className='calculatorBody'>
        <div>
          <Stack>
            <div className='calculator__first__display' >{result}</div>
            <div className='calculator__second__display'>{currentInputs.length===0? 0:currentInputs}</div>
          </Stack>
        </div>
        <div className='calculator__buttons__container'>
        <Row style={rowStyle} className="row">
          {
            buttons?.map((button,index)=>(
              <Col onClick={()=>{handleButtons(button?.value)}} key={index} xs={button.value === '='? 6:3} style={columnStyle} ><Button variant={button.value === '='? 'secondary':'primary'} className="btn" >{button?.value}</Button></Col>
            ))
          }
        </Row>
        </div>
      </div>
      <div className='board'>
        <p>Designed and developed By Md Mahfuz Rana</p>
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

