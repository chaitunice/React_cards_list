import React from 'react'
import { Rating } from 'semantic-ui-react'

const Mycard1 = (props) => (
  <div class="item">
    <a href="#0" aria-labelledby="person1"></a>
    {/* <img src='https://images.unsplash.com/photo-1590424744257-fdb03ed78ae0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt={props.desc.title} /> */}
    <img src={require('../walls/test4.jpg')} />
    <div class="item__overlay">
      <h3 id="person1" aria-hidden="true">{props.desc.title}</h3>
      <h5>@ {props.desc.platform_name}</h5>
      <div class="item__body">
        <p><Rating icon='star' defaultRating={props.desc.avg_rating}  maxRating={5} disabled />{props.desc.avg_rating.toFixed(1)} ({props.desc.num_of_ratings})</p>
        <p>{props.desc.storyline}</p>
      </div>
    </div>
  </div>
)

export default Mycard1