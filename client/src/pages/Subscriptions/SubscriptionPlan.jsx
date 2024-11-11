import React, { useEffect, useState } from "react";
import { getAllSubsData } from "../../services/Apis";
import { Link, useNavigate } from "react-router-dom";
import HeaderLayout from "../../components/HeaderLayout";

const SubscriptionPlan = () => {
    const navigate=useNavigate()
    const [plans, setPlans] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    const fetchPlans = async () => {
        try {
            const response = await getAllSubsData();
            setPlans(response.data.data);
        } catch (error) {
            console.error("Error fetching plans: ", error);
        }
    };

    const handleAddToCart = (plan) => {
        const newItem = {
            cors_plan: plan.cors_plan,
            cors_description:plan.cors_description,
            subscription_charges: Number(plan.subscription_charges),      
            GST_amt: Number(plan.GST_amt),
        };
        setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    };

    const handleDelete = (index) => {
        const newCartItems = cartItems.filter((item, i) => i !== index);
        setCartItems(newCartItems);
    };

    const totalSubscriptionCharges = cartItems.reduce(
        (total, item) => total + item.subscription_charges, 0);

    const totalGST = cartItems.reduce((total, item) => total + item.GST_amt, 0);
    const grandTotal = totalSubscriptionCharges + totalGST;

    useEffect(() => {
        fetchPlans();
    }, []);

    if (plans.length === 0) {
        return <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>;
    }

    const handleDataSend=()=>{
        navigate('/subscription1/plan',  {state: {cartItems, grandTotal,totalGST,totalSubscriptionCharges}})


    }

    return (
        <HeaderLayout>
            <div className="container mt-4">
                <h3 className="mb-3">CORS Subscription Plan</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                            <th>S.No</th>
                            <th>Plan</th>
                            <th>Description</th>
                            <th>Subscription Charges</th>
                            <th>GST</th>
                            <th>Total</th>
                            <th>ADD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map((plan, index) => (
                            <tr
                                key={index}
                                style={{
                                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#e9ecef",
                                }}
                            >
                                <td>{index + 1}</td>
                                <td>{plan.cors_plan}</td>
                                <td>{plan.cors_description}</td>
                                <td>₹ {Number(plan.subscription_charges).toFixed(2)}</td>
                                <td>₹ {Number(plan.GST_amt).toFixed(2)}</td>
                                <td>₹{" "}{(Number(plan.subscription_charges) + Number(plan.GST_amt)).toFixed(2)}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAddToCart(plan)}
                                    >
                                        Add to Cart
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {grandTotal !== 0 ?

                    (<div className="container mt-4">
                        <h3 className="mb-3">Cart Details</h3>
                        <table className="table table-bordered">
                            <thead>
                                <tr style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                                    <th>Plan</th>
                                    <th>Subscription Charges</th>
                                    <th>GST</th>
                                    <th>Total</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.cors_plan}</td>
                                        <td>₹ {item.subscription_charges.toFixed(2)}</td>
                                        <td>₹ {item.GST_amt.toFixed(2)}</td>
                                        <td>₹ {(item.subscription_charges + item.GST_amt).toFixed(2)}</td>
                                        <td>
                                            <button
                                                className="btn btn-link text-danger"
                                                onClick={() => handleDelete(index)}
                                            >
                                                <i className="fa-solid fa-trash-can"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                <tr style={{ backgroundColor: "#0d6efd", color: "#fff" }}>
                                    <td>Total</td>
                                    <td>₹ {totalSubscriptionCharges.toFixed(2)}</td>
                                    <td>₹ {totalGST.toFixed(2)}</td>
                                    <td>₹ {grandTotal.toFixed(2)}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="text-center">
                            {/* <Link to={"selectP"}> */}
                            <button className="btn btn-primary" onClick={handleDataSend} >Next</button>  
                            {/* </Link> */}
                        </div>
                    </div>) : " "
                }
            </div>
        </HeaderLayout>
    );
};

export default SubscriptionPlan;








