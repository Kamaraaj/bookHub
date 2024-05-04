import React, {useState} from "react";
import loginCover from "../data/loginLeftCoverImg.svg";
import bookHubLogo from "../data/bookHubLogo.svg";
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom';


const initialData={
  username:'',
  password:'',
}
const LoginLanding = (prps) => {
  const navigate = useNavigate()
  const [formDatas,setFormDatas]=useState(initialData);
  const [formErrors, setFormErrors] = useState({});
  const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value.trim();
    setFormDatas((prev)=>{
      return{
        ...prev,[name]:value
      }
    })
  }
  const onSubmitHandler = (e)=>{
    e.preventDefault()
    let errorFields = validate(formDatas)
    setFormErrors (errorFields);
    if (Object.keys(errorFields).length === 0)  apiHandler()
   
  }
  const validate=(values)=>{
    let errors = {};
    if (values.username === '') {
      errors.username = "Enter valid user name"
    }
    if (values.password === ''){
      errors.password = "Enter valid password"
    }
    return errors
  }

  const apiHandler = async ()=> {
          const url = 'https://apis.ccbp.in/login'
          const options ={
            method : 'POST',
            body: JSON.stringify(formDatas)
          }
          const responseData = await fetch(url,options) 
          if (responseData.ok === true) {
            const data = await responseData.json();
            jwtTokenHandler (data.jwt_token)
          }
  }

  const jwtTokenHandler = (token)=> {
    Cookies.set('jwt_token',token,{expires:30});
    navigate('/',{replace:true})
  }
  return (
    <div className="relative bg-[#F8FAFC] px-6 pt-[32px] pb-[56px] lg:p-0  ">
      <div className="relative flex flex-col  space-y-4 lg:space-y-0 lg:flex-row lg:space-x-[72px]">
        <div className="flex justify-center items-center">
        <div className= "w-[216px] h-[216px] max-w-[216px] max-h-[216px]  lg:w-[780px] lg:max-w-[780px] md:h-[60vh] md:max-h-[60vh]">
          <img
            className="w-full h-full object-contain rounded-full lg:rounded-none"
            src={loginCover}
            alt="LoginCover"
            width="100%"
            height="100%"
          />
        </div>
        </div>
        <div className="flex lg:justify-center items-center ">
          <div className="w-full lg:pl-[69px] lg:pr-[70px] lg:pt-[48px] lg:pb-[48px]">
            <div className="flex justify-center ">
              <div className="mb-8 lg:mb-[48px] w-[104px] h-[28px] lg:w-[141px] lg:h-[48px]">
                <img
                  src={bookHubLogo}
                  className="w-full h-full object-cover"
                  alt="logo"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
            <form onSubmit={onSubmitHandler}>
              <div className="formConatiner">
                <div className="formGroup mb-4 lg:mb-6">
                  <div className="pt-[3px] pb-3 leading-[19px]">
                    <label
                      htmlFor="username"
                      className="text-[#5A7184] text-[16px] font-semobold"
                    >
                      username *
                    </label>
                  </div>
                  <div>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      onChange={onChangeHandler}
                      placeholder="Enter User Name"
                      className="w-full h-[56px] border border-[#C3CAD9] rounded-[8px] px-5 pt-[18px] pb-[19px] text-[16px] text-[#183B56] font-normal focus:outline-0 focus:ring-0"
                    />
                  </div>
                  {
                  formErrors.username && (
                    <p className="text-[#EF4444] text-[14px] font-normal pt-2">Username is Invalid</p>
                  )
                }
                </div>
                <div className="formGroup">
                  <div className="pt-[3px] pb-3 leading-[19px]">
                    <label
                      htmlFor="password"
                      className="text-[#5A7184] text-[16px] font-semobold"
                    >
                      Password *
                    </label>
                  </div>
                  <div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={onChangeHandler}
                      placeholder="Enter Password"
                      className="w-full h-[56px] border border-[#C3CAD9] rounded-[8px] px-5 pt-[18px] pb-[19px] text-[16px] text-[#183B56] font-normal  focus:outline-0 focus:ring-0"
                    />
                  </div>
                </div>
                {
                  formErrors.password && (
                    <p className="text-[#EF4444] text-[14px] font-normal pt-2">Password is Invalid</p>
                  )
                }
                <div className="mt-6 lg:mt-8"> 
                  <button
                    type="submit"
                    className="w-full lg:w-[360px] h-[56px] flex justify-center items-center pt-4 pb-[18px] bg-[#0284C7] text-[#FFF] rounded-[8px] text-[18px] font-[700] text-center "
                  >  
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginLanding;
