import React from 'react';
import { useState, useEffect } from 'react';
import Card from './mycard1'
import { Button } from 'semantic-ui-react'
import axios from 'axios';

const MyButton = (props) => {
    
    let card_data = [];
    const [data, setData] = useState({data: []});
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    
    // function sleep(ms) {
    //     return new Promise(resolve => setTimeout(resolve, ms));
    // }

    const handleClick = async () => {
        setIsLoading(true);
        try {

            const mydata = await axios.get('https://drfproject.azurewebsites.net/watch/list/', {
            headers: {
            Accept: 'application/json',
            'Content-Type':'application/x-www-form-urlencoded'
            },
        },[])
        .then((response) => {
            // }, await sleep(2000)).then((response) => {
            setData(response.data);
            console.log('data is: ', JSON.stringify(response.data, null, 4));
        })
        } 
    
        catch (err) {
        setErr(err.message);
        }

        finally {
        setIsLoading(false);
        }
    }
    console.log({data})
    
    if (data.length > 0) {
        card_data = data.map(i => ( <div className="cardclass"><Card desc={i} /></div> ))
        
    }
    else{ card_data = []; }
    
    console.log('card_data is: ', card_data);

    
return (
    <div>
        <Button loading={isLoading} content='Click Here' onClick={handleClick} /> <br /><br />
        <div class="grid">{card_data}</div>
    </div>
)};

export default MyButton