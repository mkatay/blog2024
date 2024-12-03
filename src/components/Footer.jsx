import React from 'react'
import'./Footer.css'

export const Footer = () => {
  return (
    <footer >
      <hr className=" mt-5 mb-4" />
      <div className="about-me">
        <img src="kam.jpg" alt="Rólam" className="about-me-photo"/>
         <p><strong>Rólam</strong></p>
         <p> Sziasztok! KAM vagyok, lelkes blogger, aki szívesen osztja meg gondolatait a fenti témakörök világából.
          Tarts velem, fedezzük fel együtt az ötleteket, inspirálódjunk és kapcsolódjunk egymáshoz!
        </p>
      </div>
    </footer>
  )
}


