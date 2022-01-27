import React, { useContext, useState, useEffect } from 'react';

const AppContext = React.createContext();

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isCartModalOpen, setCartModalOpen] = useState(false);
  const [productsInCart, setProductsInCart] = useState([]);

  const clearUser = () => {
    localStorage.removeItem('user');
    setUser(undefined);
    clearCart();
  };

  const openCartModal = () => setCartModalOpen(true);

  const closeCartModal = () => setCartModalOpen(false);

  const getAccessToken = () => {
    if (user && user.token) {
      return { Authorization: 'Bearer ' + user.token }; // for Spring Boot back-end
    } else {
      return {};
    }
  };

  const getAuthorization = () => {
    if (user && user.token) {
      return 'Bearer ' + user.token; // for Spring Boot back-end
    } else {
      return '';
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    if (user?.token) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  const addProductToCart = (prodToAdd) => {
    if (user) {
      let prod = productsInCart.filter((p) => p.id === prodToAdd.id)[0];
      if (prod) {
        prod = { ...prodToAdd, cantidad: prod.cantidad + 1 };
        setProductsInCart([
          ...productsInCart.filter((p) => p.id !== prodToAdd.id),
          prod,
        ]);
      } else {
        prod = { ...prodToAdd, cantidad: 1 };
        setProductsInCart([...productsInCart, prod]);
      }
    }
  };

  const clearCart = () => setProductsInCart([]);

  const removeProuctFromCart = (prod) =>
    setProductsInCart(productsInCart.filter((p) => p.id !== prod.id));

  return (
    <AppContext.Provider
      value={{
        user,
        clearUser,
        setUser,
        openCartModal,
        closeCartModal,
        isCartModalOpen,
        productsInCart,
        addProductToCart,
        clearCart,
        removeProuctFromCart,
        getAccessToken,
        getAuthorization,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, useAppContext, AppContextProvider };
