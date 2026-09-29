import React from 'react'
import { Rating } from 'semantic-ui-react'
import cardImage from '../walls/test4.jpg'

const Mycard1 = ({ desc }) => (
  <div className="item">
    <a href="#0">
      <span className="screen-reader-text">View {desc.title}</span>
    </a>
    <img src={cardImage} alt={desc.title} />
    <div className="item__overlay">
      <h3>{desc.title}</h3>
      <h5>@ {desc.platform_name}</h5>
      <div className="item__body">
        <div className="rating-summary">
          <Rating icon='star' defaultRating={desc.avg_rating} maxRating={5} disabled />
          <span>{desc.avg_rating.toFixed(1)} ({desc.num_of_ratings})</span>
        </div>
        <p>{desc.storyline}</p>
      </div>
    </div>
  </div>
)

export default Mycard1