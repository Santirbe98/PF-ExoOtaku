import React from "react";

export default function Paged({productPage, productList, paged,pagePrev,pageNext}) {

    const pages = [];
    for (let i = 1; i <= Math.ceil(productList/productPage); i++) {
        pages.push(i)
    };    
    return(
        <div>
            {
                pages.length <= 1 ? 
                <></> :
                <ul>
                    <li><button onClick={() => paged(pagePrev,pages.length)} style={{width:"50px"}}> Prev</button></li>
                    {pages?.map(p =>(
                        <li  key={p}>
                            <button onClick={() => paged(p,pages.length)} style={{width:"30px"}}>{p}</button>
                        </li>
                    ))}
                    <li><button onClick={() => paged(pageNext,pages.length)} style={{width:"50px"}}> Next</button></li>
                </ul>
            }  
        </div>
    )
};
