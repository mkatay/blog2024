import React from 'react'
import { Categories } from '../components/Categories'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CardsContainer } from '../components/CardsContainer'
import { SearchBox } from '../components/SearchBox'
import { ContentPagination } from '../components/ContentPagination'
import usePagination from 'react-firebase-pagination'
import { createMainQuery } from '../utility/crudUtility'
import { useEffect } from 'react'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from '../utility/firebaseApp'


export const PostsWithPagination = () => {
  //const [posts,setPosts]=useState([])
  const [mainQuery, setMainQuery] = useState( query(collection(db, "posts"), orderBy("created_timestamp", "desc")));
  let [searchParams] = useSearchParams();
  console.log(searchParams.get('sel'));   
  const [selectedCateg,setSelectedCateg]=useState( searchParams.get('sel') ? [searchParams.get('sel')] : [])
  
  console.log(selectedCateg);
  
  const pageSize = 6;
  /*  useEffect(()=>{
        const q = selectedCateg.length
            ? query(
                collection(db, "posts"),
                where("category", "in", selectedCateg),
                orderBy("created_timestamp", "desc")
              )
            : query(
                collection(db, "posts"),
                orderBy("created_timestamp", "desc")
              );
        setMainQuery(q); 
        console.log('query:',q);    
    },[])
 */

  // Használjuk a lapozáshoz szükséges hookot
  const { getNext, getPrevious, data, loading, currentPage, totalPages } =usePagination(
    {pageSize, pageByPage: true, query: mainQuery,enabled: mainQuery !== null });
!loading && console.log(data);

  return (
    <div className='page'>
      <div className='d-flex flex-wrap gap-1 justify-content-around pt-3' >
        <Categories selectedCateg={selectedCateg} setSelectedCateg={setSelectedCateg}/>
        {/*posts && <SearchBox items={posts.map(obj=>({id:obj.id,name:obj.title}))}/>*/}
      </div>
        
      {loading ?   <div>Loading...</div> : <CardsContainer posts={data.docs}/>}
      <ContentPagination
       page={currentPage}
       setPage={(newPage) => {
         if (newPage > currentPage) getNext();
         else getPrevious();
       }}
       numOfPage={totalPages}
      />
    </div>
  )
}


