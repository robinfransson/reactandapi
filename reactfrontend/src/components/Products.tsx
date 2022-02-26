import * as React from 'react';
import { Component } from 'react';
import { API, ProductData, ViewStyle } from '../scripts/api';

export const Products: React.FC<{ view: ViewStyle }> = ({ view }) => {
    const [products, setProducts] = React.useState<ProductData[]>();

    React.useEffect(() => {
        const getProducts = async () => {
            let response = await API.getProducts();
            setProducts(response);
        };
        getProducts();
    }, []);
    if (products) {
        return (
            <div
                className={
                    'Product-container' +
                    (view === ViewStyle.Grid ? ' grid' : ' rows')
                }
            >
                {products.map((x) => (
                    <Product
                        description={x.description}
                        name={x.name}
                        imageUrl={x.imageUrl}
                        id={x.id}
                    ></Product>
                ))}
            </div>
        );
    }
    return <>Loading..</>;
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
