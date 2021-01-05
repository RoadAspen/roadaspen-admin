import React from 'react';

const FormItemWidthHalfContainer = (props:{children:React.ReactNode})=>{
    return (
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
            {props.children}
        </div>
    )
}

export default FormItemWidthHalfContainer