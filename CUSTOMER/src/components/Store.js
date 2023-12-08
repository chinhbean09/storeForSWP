import React from "react";
import { NavLink } from "react-router-dom";

const Store = (curElem) => {
    const { id, name, address, phone, district } = curElem;

    return (
 <NavLink to={`/single-store/${id}`}>
        <div className="card">
        <figure>
    <img src="https://th.bing.com/th/id/OIP.AQBfoGu1jn4DQR4S2DM6MQHaD5?w=289&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Ảnh du lịch Anh Quốc" style={{height:'auto',width:'auto'}}/>
</figure>


            <div className="card-data">
                <div className="card-data-flex">
                    <h3>{name} Store</h3>
                    <div className="card-data"> 
                    <label className="h3 card-data-inline">Address :</label>  {address}, {district} 
                    <br/>
                    <p className="h3" style={{color:'blue'}}>SĐT : {phone} </p>  
                    </div>
                </div>
            </div>
        </div>
    </NavLink>
    );
};
export default Store;