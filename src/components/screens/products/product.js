import React, { useCallback,useState,useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import ReactPaginate from 'react-paginate';
import './product.css'
import ResponsivePagination from 'react-responsive-pagination';
import Button from '../../elements/button';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
export default function Products({ data, eror, isLoading, dispatch, state }) {
 const [totalP,setTotal]=useState()
 const [currentPage, setCurrentPage] = useState(1);
 const[sliceData,setSliceData]=useState(10)
 const totalPages = data?.length/10;
 console.log("totalPages",totalPages)
  var val = data?.some(p => p?.id === val?.id)
  console.log("valss", val)
  useEffect(() => {
   setTotal( state?.cart.reduce((acc,val)=>acc+val?.price*val?.qty,0))
  }, [state.cart])

useEffect(()=>
{
  setSliceData(currentPage*10)
},[currentPage])
const changeQty=(id,qty)=>
{
  dispatch(
    {
      type: "QUANTITY",
      payload:
      {
        title: val.title,
        id: val.id,
        qty:val.qty
       
      }
    }
  )
}
  console.log("state.cart", state.cart)
  return (
    <>
    <div className='w-80 d-flex' style={{ width: "100%" }}>
      <div className="d-flex justify-content-space-between px-3 mt-3" style={{ "flex-wrap": "wrap", "justify-content": "space-between", "height": "auto",width:"80%" }}>{isLoading ? "loading" :
        <>
          {data?.slice(sliceData-10,sliceData).map((val, index) => (
            <Card
              key={index}
              style={{ width: '18rem' }}
              className="mb-4"
            >
              <Card.Img variant="top" src={val.thumbnail} style={{ height: "200px", "objectFit": "cover" }} />
              <Card.Body>

                <div className='d-flex justify-content-between'>
                  <Card.Text>
                    {val.title}
                  </Card.Text>
                  <span>{'$'}{val.price}</span>
                </div>
                {console.log(data?.some(p => p?.id === val?.id))}
                {state?.cart?.some(p => p?.id === val?.id) ?
                  <Button onClick={() => {
                    console.log("valuess", val.price)
                    dispatch(
                      {
                        type: "REMOVE_CART",
                        payload:
                        {
                         
                          id: val.id,
                         
                        }

                      }

                    )

                  }} text={'Remove from cart'} color={'bg-danger'}
                  />
                  :
                  <Button onClick={() => {
                    console.log("valuess", val.price)
                    dispatch(
                      {
                        type: "ADD_TO_CART",
                        payload:
                        {
                          price: val.price,
                          thumbnail: val.thumbnail,
                          title: val.title,
                          id: val.id,
                          qty:1
                        }

                      }

                    )
                  }} text={'Add to cart'} color={'bg-warning'} className="mb-2" />}

              </Card.Body>
            </Card>
          ))}
        </>}</div>
      <div style={{width:"20%"}}>
      <span>Total Price : {"$ "}{totalP}</span>
        <p>Cart Details</p>
        {
          state?.cart?.map((val) => (
            <>
            <div className='d-flex justify-content-around border align-items-center mb-2'>
            
              <img src={val.thumbnail} alt={val.title} style={{width:"10%",height:"20px",objectFit:'cover'}} />
              <p style={{margin:'revert'}}>{val.title}</p>
              <h6 style={{margin:'revert'}}>${val.price}</h6>
              <button onClick={()=>changeQty(val.id,val.qty++)} style={{border:'none',borderRadius:"7px",height:"5%"}} className='bg-warning'>+</button>
              <span >{val.qty}</span>
              <button onClick={()=>changeQty(val.id,val.qty--)} style={{border:'none',borderRadius:"7px",height:"5%"}} className='bg-warning'>-</button>
             
              </div>
            
            </>
          ))
        }
      </div>

    </div>
    <ResponsivePagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
    </>
  )
}
