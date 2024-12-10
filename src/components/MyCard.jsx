import { TaggedContentCard } from 'react-ui-cards';
import './MyCard.css'
import { useNavigate } from 'react-router-dom';

export const MyCard=({id,title,photo,category}) => {
    const navigate=useNavigate()
return(
<TaggedContentCard
    href='#'
    thumbnail={photo.url}
    title={title}
    description='a cake with raspberries'
    tags={[category]}
    style={{width:'320px',height:'250px'}}
    onClick={()=>navigate('/detail/'+id)}
/>
)
}