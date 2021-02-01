import React from 'react';
// 此容器内部每个 Form Item 不再占据一整行
const FormItemWidthHalfContainer = (props:{children:React.ReactNode})=>{
    return (
        <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap'}}>
            {props.children}
        </div>
    )
}

export default FormItemWidthHalfContainer