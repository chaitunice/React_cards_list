import React, { useState } from 'react';
import Card from './mycard1.js'
import { Button } from 'semantic-ui-react'
import axios from 'axios';

const MyButton = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');

    const handleClick = async () => {
        setIsLoading(true);
        setErr('');
        try {
            const response = await axios.get('https://drfproject.azurewebsites.net/watch/list/', {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            setData(response.data);
        } catch (error) {
            setErr(error.message);
        }

        finally {
            setIsLoading(false);
        }
    }

    const cardData = data.map((item, index) => (
        <div className="cardclass" key={item.id ?? index}>
            <Card desc={item} />
        </div>
    ));
    
    return (
        <div>
            <Button loading={isLoading} content='Click Here' onClick={handleClick} />
            {err && <p role="alert">{err}</p>}
            <br /><br />
            <div className="grid">{cardData}</div>
        </div>
    );
};

export default MyButton