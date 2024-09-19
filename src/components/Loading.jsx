import React from 'react';
import { ring } from 'ldrs'

ring.register();

const Loading = (props) => {
    const { height = "auto", size = "30", color = "white", display = "flex", stroke="5" } = props
    return (
        <>
            <style>
                {`
                .loading-container {
                possition: relative;
                display: ${display};
                justify-content: center;
                align-items: center;
                height: ${height};
                }
            `}
            </style>
            <div className="loading-container">
                <l-ring size={size} speed="2" color={color} stroke={stroke}></l-ring>
            </div>
        </>
    );
};

export default Loading;
