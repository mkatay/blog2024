import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Categories } from '../components/Categories';
import { CardsContainer } from '../components/CardsContainer';
import { SearchBox } from '../components/SearchBox';
import { getMainQuery } from '../utility/crudUtility'; // Az új `readPosts` függvény importálása
import usePagination from 'react-firebase-pagination';
import { useMemo } from 'react';
import { buttonStyle } from '../utility/utils';

export const PostsWithPagination = () => {
  const [posts, setPosts] = useState([]);
  let [searchParams] = useSearchParams();
  const [selectedCateg, setSelectedCateg] = useState(searchParams.get('sel') ? [searchParams.get('sel')] : []);
  
  // Query objektum memoizálása
  //Az useMemo segítségével csak akkor számítjuk újra a query-t, ha a selectedCateg változik. 
  //Ez megakadályozza, hogy a usePagination minden renderelésnél újra inicializálódjon.
  const query = useMemo(() => getMainQuery(selectedCateg), [selectedCateg]);
  const { getNext, getPrevious, loading,data,hasNext,hasPrevious } = usePagination({
    pageSize: 12,  
    pageByPage: true,  
    query
  });
 
// Adatok feldolgozása useEffect-tel
useEffect(() => {
    if (!loading && data) {
      const formattedData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setPosts(formattedData);
    }
  }, [data,loading]);

  // Oldal tetejére ugrás új adatok betöltésekor
  useEffect(() => {
    if (posts.length > 0) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [posts]);

console.log(hasNext,hasPrevious);//első rendereléskor: false és true  ?????????????miért

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
      <div className="d-flex gap-2 justify-content-center">
        <button className="btn btn-outline-info " onClick={getPrevious} disabled={loading || !hasPrevious}>Előző</button>
        <button className="btn btn-outline-info"onClick={getNext} disabled={loading || !hasNext}>Következő</button>
      </div>
    </div>
  );
};
