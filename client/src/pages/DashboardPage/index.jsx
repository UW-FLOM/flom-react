import { useState, useEffect } from 'react';

import { Menu } from '../../components/Menu';

function DashboardPage() {

    const [content, setContent] = useState('');

    useEffect(() => {

    }, []);

    return (
        <>
            <Menu />
        </>
    );
}

export default DashboardPage;
