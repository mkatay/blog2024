import { TaggedContentCard } from 'react-ui-cards';
import './MyCard.css'
import { useNavigate } from 'react-router-dom';
import { truncatedStory } from '../utility/utils';

export const MyCard=({id,title,photo,category,story}) => {
    const navigate=useNavigate()
return(
<TaggedContentCard
    href='#'
    thumbnail={photo.url}
    title={title}
    description={truncatedStory(story)}
    tags={[category]}
    style={{width:'320px',height:'250px'}}
    onClick={()=>navigate('/detail/'+id)}
/>
)
}