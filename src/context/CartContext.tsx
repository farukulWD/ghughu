'use client';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';

type CartMap = Record<string, number>;

type State = {
  cart: CartMap;
  wish: Set<string>;
};

type Action =
  | { type: 'ADD'; id: string; qty?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; qty: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISH'; id: string }
  | { type: 'INIT'; cart: CartMap; wish: Set<string> };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INIT':
      return { cart: action.cart, wish: action.wish };
    case 'ADD': {
      const qty = action.qty ?? 1;
      return { ...state, cart: { ...state.cart, [action.id]: (state.cart[action.id] || 0) + qty } };
    }
    case 'REMOVE': {
      const next = { ...state.cart };
      delete next[action.id];
      return { ...state, cart: next };
    }
    case 'SET_QTY': {
      if (action.qty <= 0) {
        const next = { ...state.cart };
        delete next[action.id];
        return { ...state, cart: next };
      }
      return { ...state, cart: { ...state.cart, [action.id]: action.qty } };
    }
    case 'CLEAR_CART':
      return { ...state, cart: {} };
    case 'TOGGLE_WISH': {
      const w = new Set(state.wish);
      if (w.has(action.id)) w.delete(action.id);
      else w.add(action.id);
      return { ...state, wish: w };
    }
    default:
      return state;
  }
}

type ToastMsg = { msg: string; id: number };

type CartCtx = {
  cart: CartMap;
  wish: Set<string>;
  toast: ToastMsg | null;
  addToCart: (id: string, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWish: (id: string) => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  showToast: (msg: string) => void;
  cartCount: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { cart: {}, wish: new Set<string>() });
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<ToastMsg | null>(null);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('ghughu.cart') || '{}') as CartMap;
    const wish = new Set<string>(JSON.parse(localStorage.getItem('ghughu.wish') || '[]'));
    dispatch({ type: 'INIT', cart, wish });
  }, []);

  useEffect(() => {
    localStorage.setItem('ghughu.cart', JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem('ghughu.wish', JSON.stringify([...state.wish]));
  }, [state.wish]);

  let toastTimer: ReturnType<typeof setTimeout>;
  function showToast(msg: string) {
    const id = Date.now();
    setToast({ msg, id });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => setToast(null), 1800);
  }

  const cartCount = Object.values(state.cart).reduce((a, b) => a + b, 0);

  return (
    <Ctx.Provider value={{
      cart: state.cart,
      wish: state.wish,
      toast,
      addToCart: (id, qty) => dispatch({ type: 'ADD', id, qty }),
      removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      toggleWish: (id) => dispatch({ type: 'TOGGLE_WISH', id }),
      cartOpen,
      setCartOpen,
      showToast,
      cartCount,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart outside CartProvider');
  return ctx;
}
