import React from 'react';
import './Loader.scss';

interface LoaderProps {
    height?: string;
}

const Loader: React.FunctionComponent<LoaderProps> = (props: LoaderProps) =>
    <div className="loader-cont" style={{height: props.height}}>
        <div className="loader" />
    </div>

export default Loader;
