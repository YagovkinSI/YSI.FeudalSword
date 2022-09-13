import * as React from 'react';
import { useLocation } from 'react-router';

const EmptyPage :  React.FC = () => {
    const pathName = useLocation().pathname;

    return (
        <React.Fragment>
            <h1>Страница {pathName} пока не досутпна</h1>
        </React.Fragment>
    );
};

export default EmptyPage;
