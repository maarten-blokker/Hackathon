import React from 'react'
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import data from './fakeProducts.json'

 class Carousel extends React.PureComponent {
   render() {
     return (
       <div className="carousel">
         <Slider autoplay={ 3000 }>
           {data.products.map((product, index) => <div key={index}>
             <h2>{product.name}</h2>
             <img className="carouselImage" src={ product.currentVariantProduct.images[0].url }></img>
           </div>)}
         </Slider>
       </div>
     )
   }
 }

 export default Carousel
