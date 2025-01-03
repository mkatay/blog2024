import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { CardsContainer } from '../components/CardsContainer';
import { SearchBox } from '../components/SearchBox';
import { readPosts } from '../utility/crudUtility'; // Az új `readPosts` függvény importálása

export const PostsWithPagination = () => {
  const [posts, setPosts] = useState([]);
  let [searchParams] = useSearchParams();
  const [selectedCateg, setSelectedCateg] = useState(searchParams.get('sel') ? [searchParams.get('sel')] : []);
  
  // Az adatokat a readPosts függvénnyel frissítjük
  const { getNext, getPrevious, loading } = readPosts(setPosts, selectedCateg);

  // Az oldalak közötti navigációval kapcsolatos gombok
  return (
    <div className='page'>
      <div className='d-flex flex-wrap gap-1 justify-content-around pt-4'>
        {/* Kategóriák kiválasztása */}
        <Categories selectedCateg={selectedCateg} setSelectedCateg={setSelectedCateg} />
        {/* Keresőmező a posztok listájához */}
        {posts && <SearchBox items={posts.map(obj => ({ id: obj.id, name: obj.title }))} />}
      </div>

      {/* Kártyák megjelenítése, ha vannak posztok */}
      {posts.length > 0 && <CardsContainer posts={posts} />}

      {/* Navigáció az oldalak között */}
      <div className="pagination-controls">
        <button onClick={getPrevious} disabled={loading}>Előző</button>
        <button onClick={getNext} disabled={loading}>Következő</button>
      </div>
    </div>
  );
};
