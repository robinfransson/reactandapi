import * as React from 'react';
import { Component } from 'react';
import { Products } from '../components/Products';
import { API, HomeData, ProductData, ViewStyle } from '../scripts/api';
import '../scss/Product.scss';
export const Home = () => {
    const [home, setHome] = React.useState<HomeData>();
    const [ready, setReady] = React.useState<Boolean>(false);
    const [viewStyle, setViewStyle] = React.useState<ViewStyle>(ViewStyle.Grid);

    React.useEffect(() => {
        const getData = async () => {
            let response = await API.getHomeData();
            setHome(response);
        };
        getData();
    }, []);

    React.useEffect(() => {
        setReady(true);
    }, [home]);

    React.useEffect(() => {
        console.log(
            'viewstyle changed to' +
                (viewStyle === ViewStyle.Grid ? ' grid' : ' rows')
        );
    }, [viewStyle]);

    if (ready && home) {
        return (
            <>
                <div>{home.title}</div>
                <div>{home.preamble}</div>
                <div className="View-choice">
                    <button
                        key={'grid'}
                        className="View-grid"
                        onClick={() => setViewStyle(ViewStyle.Grid)}
                    >
                        Grid
                    </button>
                    <button
                        key={'rows'}
                        className="View-rows"
                        onClick={() => setViewStyle(ViewStyle.Row)}
                    >
                        Rows
                    </button>
                </div>
                <Products view={viewStyle}></Products>
            </>
        );
    } else {
        return <div>error</div>;
    }
};
