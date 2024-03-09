import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    storeId: ""
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {


        addToCart(state, action) {
            const sameStore = state.cartItems.findIndex(
                (item) => item.storeId === action.payload.storeId
            )


       

            if (sameStore < 0 && state.cartItems.length > 0) {
                toast.error("Vui lòng chọn dịch vụ có cùng cửa hàng", {
                    position: "bottom-left",
                });
            } else {
                const existingIndex = state.cartItems.findIndex(
                    (item) => item.id === action.payload.id
                );

                if (existingIndex >= 0 && !state.cartItems[existingIndex].isStandard) {
                    state.cartItems[existingIndex] = {
                        ...state.cartItems[existingIndex],
                        cartQuantity: state.cartItems[existingIndex].cartQuantity + 1,
                        
                    }; 
                    toast.success(`Số lượng của dịch vụ  ${state.cartItems[existingIndex].name}  đã được cập nhật trong 
                    giỏ hàng` , {
                        position: "bottom-left",
                    });

                } else if (!action.payload.isStandard) {
                    let tempProductItem = { ...action.payload, cartQuantity: 1 };
                    state.cartItems.push(tempProductItem);
                    toast.success("Dịch vụ đã được đặt", {
                        position: "bottom-left",
                    });
                }

                else if (existingIndex >= 0 && state.cartItems[existingIndex].isStandard) {

                    toast.error("Dịch vụ đã tồn tại trong giỏ hàng", {
                        position: "bottom-left",
                    });
                }
                else if (action.payload.isStandard) {
                    toast.success("Dịch vụ đã được đặt", {
                        position: "bottom-left",
                    });

                    let tempProductItem = { ...action.payload, cartQuantity: 1, price: 0.0 };
                    state.cartItems.push(tempProductItem);

                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));

            }

        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                toast.success("Dịch vụ đã được cập nhật", {
                    position: "bottom-left",
                });


            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cartItems = nextCartItems;

                toast.error("Dịch vụ đã được xóa", {
                    position: "bottom-left",

                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.id !== cartItem.id
                    );

                    state.cartItems = nextCartItems;


                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                return state;
            });
        },
        getTotals(state, action) {

            let { total, quantity, storeId } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, cartQuantity, storeId } = cartItem;
                    const itemTotal = price * cartQuantity;


                    cartTotal.total += itemTotal;
                    cartTotal.quantity += cartQuantity;
                    cartTotal.storeId = storeId;
                    return cartTotal;
                },
                {
                    total: 0,
                    quantity: 0,
                    storeId: ""
                }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
            state.storeId = storeId;

        },
        clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("Giỏ hàng đã trống", { position: "bottom-left" });
        },
    },
});

export const { addToCart, decreaseCart, removeFromCart, getTotals, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
