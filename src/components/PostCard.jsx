import './PostCard.css'
import { useNavigate } from 'react-router-dom';
import { truncatedStory } from '../utility/utils';
import './PostCard.css'

export const PostCard=({id,title,photo,category,story}) => {
    const navigate=useNavigate()
return(

  <div className="card" onClick={()=>navigate('/detail/'+id)}>
    <div className="card-image-wrapper">
      <img src={photo.url} alt={title} className="card-image" />
      <div className="card-hover-info">
        <p className="author">{category}</p>
        <p className="date">December 16, 2024</p>
      </div>
    </div>
    <div className="card-content">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{truncatedStory(story)}</p>
    </div>
  </div>
)
}