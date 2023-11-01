import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy ,useReducer} from 'react';
import { Suspense } from 'react';
import {fetchProducts} from './config/productServices'
// import {cartReducer} from '../src/redux/reducers/cartReducer'
// import {EmiCalc} from './components/screens/emiCalc'
const Products = lazy(() => import('./components/screens/products/product'));
const Login=lazy(()=>import('./components/login/login'))
const EMI = lazy(() => import('./components/screens/emiCalc'));
const cartReducer=(state,action)=>
{
switch(action.type)
{ case "ADD_TO_CART":
return {...state,
cart: [...state.cart,{...action.payload}]}
case "REMOVE_CART":
  return {
      ...state,
      cart: state.cart.filter((c)=>c.id!=action.payload.id),
  }
  case "QUANTITY":
    return {
        ...state,
        cart: state.cart.filter((c)=>c.id==action.payload.id?c.qty=action.payload.qty:c.qty),
    };
  default:return state}
}
function App() {
  const { isLoading, error, data } = useQuery('products', 
  fetchProducts
)
const [state, dispatch] = useReducer(cartReducer,{ cart:[]})
console.log(isLoading,error,data)
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Products isLoading={isLoading} error={error} 
            data={data} dispatch={dispatch} state={state}/>} />
            <Route exact path="/emi-calc" element={<EMI  
           />} />
            <Route exact path="/login" element={<Login  
           />} />
            {/* <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} /> */}
          </Routes>

        </Suspense>
      </Router>
    </div>
  );
}

export default App;
