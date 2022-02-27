import * as React from 'react';
import { Component } from 'react';
import { API, ProductData, ViewStyle } from '../scripts/api';
import { Login } from '../components/Login';
import { authContext } from './AuthContext';

export const Products: React.FC<{ view: ViewStyle }> = ({ view }) => {
    const [products, setProducts] = React.useState<ProductData[]>();
    const { authorized } = React.useContext(authContext);

    React.useEffect(() => {
        const getProducts = async () => {
            let response = await API.getProducts();
            setProducts(response);
        };
        if (authorized) {
            getProducts();
        }
    }, [authorized]);

    if (products) {
        return (
            <div
                className={
                    'Product-container' +
                    (view === ViewStyle.Grid ? ' grid' : ' rows')
                }
            >
                {products.map((x, index) => (
                    <Product
                        key={index}
                        description={x.description}
                        name={x.name}
                        imageUrl={x.imageUrl}
                        id={x.id}
                    ></Product>
                ))}
            </div>
        );
    } else if (!authorized) {
        return <Login></Login>;
    }
    return <></>;
};
const Product = ({ description, name, id, imageUrl }: ProductData) => {
    return (
        <div key={'product-' + id} className="Product">
            <div className="Product-title">{name}</div>
            <div
                className="Product-image"
                style={{ backgroundImage: `url(${imageUrl})` }}
            ></div>
            <div className="Product-description">{description}</div>
        </div>
    );
};
