import {loginFailure,loginStart,loginSuccess} from "./userRedux";
import {publicRequest, userRequest,uploadImageReques} from "../requestMethods";

  
export const login = async(dispatch,user) => {
    dispatch(loginStart());
    try{
        console.log(user);

        let res = await publicRequest.post("/auth/login",user);
        console.log(res);
            dispatch(loginSuccess(res.data));
    }catch(err){
        console.log(err);
        dispatch(loginFailure());
    }
}

export const admin = async(dispatch,user) => {
    dispatch(loginStart());
    try{
        let res = await publicRequest.post("/auth/login",user);
        if(res.data.isAdmin === true){
            dispatch(loginSuccess(res.data));
        }else{
            throw new Error("you are not the admin");       
        }
    }catch(err){
        dispatch(loginFailure());
    }
}

export const create = async(product) => {
    console.log(product);
    try{
        let prod = await uploadImageReques.post('/products/',product);
        console.log(prod);
    }catch(err){
        console.log("something went wrong");
        console.log(err);
    }
}





