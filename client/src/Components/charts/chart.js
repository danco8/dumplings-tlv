import React from 'react'
import { Chart } from 'react-charts'
import { Button } from '../Auth/AuthForm';
import { useAuth } from '../../context/auth';

export default function MyChart() {
    const { setAuthTokens } = useAuth();

    function logOut() {
        setAuthTokens();
        localStorage.removeItem('tokens');
    }

    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Series 2',
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            }
        ],
        []
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    return (
        // A react-chart hyper-responsively and continuously fills the available
        // space of its parent element automatically
        <div
            style={{
                width: '400px',
                height: '300px'
            }}
        >
            <Chart data={data} axes={axes} />
            <Button onClick={logOut}> Log Out </Button>
        </div>
    )
}