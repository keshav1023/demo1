import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Tables from '../../components/Tables/Tables';
import Spiner from "../../components/Spiner/Spiner"
import { useNavigate } from "react-router-dom"
import {ordergetfunc,downloadJsonfunc} from "../../services/Apis";
import Alert from 'react-bootstrap/Alert';
import "./home.css"
import { toast } from 'react-toastify';


const Home = () => {

  const [userdata,setUserData] = useState([]);
  const [showspin,setShowSpin] = useState(true);
  // const [search,setSearch] = useState("");
  const [product,setProduct] = useState("All");
  const [lastMile,setLastMile] = useState("All");
  const [sort,setSort] = useState("new");
  const [page,setPage] = useState(1);
  const [pageCount,setPageCount] = useState(0);


  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register")
  }

  // get user
  const userGet = async()=>{
    const response = await ordergetfunc(product,lastMile,sort,page);
    if(response.status === 200){
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount)
    }else{
      console.log("error for get user data")
    }
  }



  // export user
  const exportuser = async()=>{
    const response = await downloadJsonfunc();
    if(response.status === 200){
      window.open(response.data.downloadUrl,"blank")
    }else{
      toast.error("error !")
    }
  }

  // pagination
  // handle prev btn
  const handlePrevious = ()=>{
    setPage(()=>{
      if(page === 1) return page;
      return page - 1
    })
  }

  // handle next btn
  const handleNext = ()=>{
    setPage(()=>{
      if(page === pageCount) return page;
      return page + 1
    })
  }

  useEffect(()=>{
    userGet();
    setTimeout(()=>{
        setShowSpin(false)
    },1200)
  },[search,product,lastMile,sort,page])

  return (
    <>
      <div className="container">
        <div className="main_div">
          {/* search add btn */}

          {/* export,gender,status */}

          <div className="filter_div mt-5 d-flex justify-content-between flex-wrap">
            <div className="export_csv">
              <Button className='export_btn' onClick={exportuser}>Download JSON</Button>
            </div>
            <div className="filter_gender">
              <div className="filter">
                <h3>Filter By Product</h3>
                <div className="gender d-flex justify-content-between">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="gender"
                    value={"All"}
                    onChange={(e)=>setProduct(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Male`}
                    name="gender"
                    value={"Male"}
                    onChange={(e)=>setProduct(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Female`}
                    name="gender"
                    value={"Female"}
                    onChange={(e)=>setProduct(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* filter by status */}
            <div className="filter_status">
              <div className="status">
                <h3>Filter By LastMile</h3>
                <div className="status_radio d-flex justify-content-between flex-wrap">
                  <Form.Check
                    type={"radio"}
                    label={`All`}
                    name="status"
                    value={"All"}
                    onChange={(e)=>setLastMile(e.target.value)}
                    defaultChecked
                  />
                  <Form.Check
                    type={"radio"}
                    label={`Active`}
                    name="status"
                    value={"Active"}
                    onChange={(e)=>setLastMile(e.target.value)}
                  />
                  <Form.Check
                    type={"radio"}
                    label={`InActive`}
                    name="status"
                    value={"InActive"}
                    onChange={(e)=>setLastMile(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          showspin ? <Spiner /> : <Tables
                                    userdata={userdata}
                                    userGet={userGet}
                                    handlePrevious={handlePrevious}
                                    handleNext={handleNext}
                                    page={page}
                                    pageCount={pageCount}
                                    setPage={setPage}
                                  />
        }

      </div>
    </>
  )
}

export default Home