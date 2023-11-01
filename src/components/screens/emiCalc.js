import React, { useState, useCallback ,useEffect} from 'react'
import Form from 'react-bootstrap/Form';
// import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';
function Button1({ id, isActive, onClick }) {
    return (
      <Button
        id={id}
        variant={isActive ? "contained" : "outlined"}
        onClick={() => onClick(id)}
      >
         {id}
      </Button>
    );
  }
export default function EmiCalc() {
    const [downpayment, setDownpayment] = useState(0)
    const [cost, setCost] = useState('')
    const [process, setProcess] = useState(0)
    const [interest, setInterest] = useState(0)
    const [value, setValue] = React.useState(10);
    const [loan, setLoan] = React.useState(10);
    const [active, setActive] = useState(false);
    const [error, setError] = useState(false)
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [activeButton, setActiveButton] = useState(12);
    const [emi, setEMI] = useState(0)
    const buttons = [12, 24, 36, 48];
    const re = /^[0-9\b]+$/;
 
    const handleButtonClick = (id) => {
        setActiveButton(id);
      };
    const handle = (event, newValue) => {
        setValue(newValue);
        console.log("1233", newValue)
    };
    useEffect(() => {
        
        let val =cost*(value/100)
        let val1=(cost-val)*(process/100)
        console.log("process",process,value,val)
        const P=(cost-val)
        const numOfyears=(activeButton/12)
        const valss=P*(interest/100)*((1+(interest/100))**(numOfyears))
        const res=(1+(interest/100))**(numOfyears-1)
        let em=((valss/res)*activeButton)
        setDownpayment(val1+val)
        setEMI((em).toFixed(0))
        console.log("valss,res,",valss,res,numOfyears,em)

    }, [value,process,cost,interest,activeButton,emi])
    return (

        <div>
            <Form.Label htmlFor="inputPassword5" className="d-flex mx-2 mt-3 font-weight-bolder" style={{ fontSize: "17px", fontWeight: "bolder" }}>Total Cost of Asset</Form.Label>
            <Form.Control

                className="d-flex mx-2"
                aria-describedby="passwordHelpBlock"
                style={{ width: "80%" }}
                value={cost}
                onChange={(e, val) => {
                    console.log("cost", (e.target.value.toLocaleString('en-US')))
                    if (e.target.value === '' || re.test(e.target.value)) {
                        setCost((e.target.value).toLocaleString())
                        setError1(false)
                    }
                    else {
                        setError1(true)
                    }
                }}
            />
            <Form.Text id="passwordHelpBlock" className="d-flex mx-2 text-danger" >
                {error1 ? "!Enter in number format" : ""}
            </Form.Text>
            <Form.Label htmlFor="inputPassword5" className="d-flex mx-2 mt-3 font-weight-bolder" style={{ fontSize: "17px", fontWeight: "bolder" }}>
                Interest Rate</Form.Label>
            <Form.Control
                type="number"
                className="d-flex mx-2"
                aria-describedby="passwordHelpBlock"
                style={{ width: "80%" }}
                value={interest}
                min={1}
                max={100}
                onFocus={() => setInterest('')}
                onChange={(e, val) => {
                    console.log("cost", e.target.value)
                    if (e.target.value === '' || re.test(e.target.value)) {
                        setInterest(e.target.value)
                        setError2(false)
                    }
                    else {
                        setError2(true)
                    }
                }}

            />
            <Form.Text id="passwordHelpBlock" className="d-flex mx-2 text-danger" >
                {error2 ? "!Enter in number format" : ""}
            </Form.Text>

            <Form.Label htmlFor="inputPassword5" className="d-flex mx-2 mt-3 font-weight-bolder" style={{ fontSize: "17px", fontWeight: "bolder" }}>Processing Rate</Form.Label>
            <Form.Control

                className="d-flex mx-2"
                aria-describedby="passwordHelpBlock"
                style={{ width: "80%" }}
                value={process}
                min={1}
                max={100}
                type="number"
                onFocus={() => setProcess('')}
                onChange={(e, val) => {
                    console.log("cost", e.target.value)
                    if (e.target.value === '' || re.test(e.target.value)) {
                        setProcess(e.target.value)
                        setError(false)
                    }
                    else {
                        setError(true)
                    }
                }}
            />
            <Form.Text id="passwordHelpBlock" className="d-flex mx-2 text-danger" >
                {error ? "!Enter in number format" : ""}
            </Form.Text>
            <Form.Label htmlFor="inputPassword5" className="d-flex mx-2 mt-3 font-weight-bolder" style={{ fontSize: "17px", fontWeight: "bolder" }}>Total Down Payment PKR{" "}{downpayment}</Form.Label>
            <Slider aria-label="Volume" value={value} onChange={handle} className="d-flex mx-2" style={{ width: "80%" }} />
            <Form.Text id="passwordHelpBlock" muted className="d-flex mx-2 text-success" style={{ color: "green!important" }}>
                {`${value} %`}
            </Form.Text>
            <Form.Label htmlFor="inputPassword5" className="d-flex mx-2 mt-3 font-weight-bolder" style={{ fontSize: "17px", fontWeight: "bolder" }}>Total Loan Amount PKR{" "}{emi}</Form.Label>
            <Slider aria-label="Volume" value={loan} onChange={(e, newValue) => setLoan(newValue)} className="d-flex mx-2" style={{ width: "80%" }} />
            <Form.Text id="passwordHelpBlock" muted className="d-flex mx-2 text-success" style={{ color: "green!important" }}>
                {`${loan} %`}
            </Form.Text>
            <Form.Label htmlFor="inputPassword5" className="d-flex mx-2 mt-3 font-weight-bolder" style={{ fontSize: "17px", fontWeight: "bolder" }}>Tenure</Form.Label>
            <Stack spacing={4} direction="row" className='mx-3'>
                {buttons.map((buttonId) =>
                (
                    <Button1  
                    key={buttonId}
                    id={buttonId}
                    isActive={activeButton === buttonId}
                    onClick={handleButtonClick}
                    ></Button1>
                ))
                }

            </Stack>
        </div>
    )
}
