import { createContext, useContext, useEffect, useMemo, useState } from "react";

const KEY_CART_ITEMS = "phonemarket-cart-items";

const ShopContext = createContext({});
const useShopContext = () => useContext(ShopContext);

const ShopContextProvider = ({ children }) => {
    const [state, setState] = useState({
        cartItems: 0,
    });

    useEffect(() => {
        const res = localStorage.getItem(KEY_CART_ITEMS);
        if (res) {
            try {
                const val = parseInt(res);
                setState(prev => ({ ...prev, cartItems: val }));
            }
            catch (err) {
                console.error("Failed to read cart items from local storage.", err);
            }
        }
    }, []);

    const value = useMemo(() => {
        function setCartItems (amount) {
            localStorage.setItem(KEY_CART_ITEMS, amount);
            setState(prev => ({
                ...prev,
                cartItems: amount,
            }));
        }

        return {
            ...state,
            setCartItems,
        }
    }, [state]);

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export {
    useShopContext,
    ShopContextProvider,
};
