import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import styles from "./CartItem.module.css";
import { Button, Box } from "@mui/material"

export const ItemCart = ({ item }) => {
    /* Traemos del context las funciones para agregar y sacar productos del carrito */
    const { addItemToCart, deleteItemToCart } = useContext(CartContext);

    /* Desestructuramos el item para sacar solo la id */
    const { amount } = item;

    return (
        <div className={styles.cartItem}>
            <img className={styles.imgs} src={item.images} alt={item.name} />
            <div className={styles.dataContainer}>
                <div className={styles.left}>
                    <p>{item.name} "{item.size}"</p>
                    <Box className={styles.buttons} pb={3}>
                        <Button variant="contained" color="success" size="small" onClick={() => addItemToCart(item)}>
                            AGREGAR
                        </Button>
                        <Button variant="contained" color="error" size="small" onClick={() => deleteItemToCart(item)}>
                            SACAR
                        </Button>
                    </Box>
                </div>
                <div className={styles.right}>
                    <div>{item.amount}</div>
                    <p>Total: ${item.amount * item.price}</p>
                </div>
            </div>
        </div>
    );
};