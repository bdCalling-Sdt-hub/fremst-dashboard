import React from "react";

interface titleType{
    children:React.ReactNode ,
    className:string
}

const CommonTitle = ({children , className}:titleType) => {
    return  <div className={`${className}`}>{children}</div>
};

export default CommonTitle;