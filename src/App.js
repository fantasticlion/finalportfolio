import './App.css';
import {useState} from 'react';
import productsData from "./assets/items.json";
import ProductItem from "./components/item";

function App() {
  const [favorites, setFavorites] = useState(productsData.reduce((object, key) => 
    ({ ...object, [key.name]: -1}), {}));
  const [sort, setSort] = useState("productType");
  const [filter, setFilter] = useState({"release_time": [], "product_type": []});
  const [filterData, setFilterData] = useState(productsData);
  const [total, setTotal] = useState(0);

  const allSorts = {
    productType: {method: (a, b) => (parseInt(a.id) < parseInt(b.id) ? -1 : 1)},
    ascending: {method: (a, b) => (parseInt(a.price) < parseInt(b.price) ? -1 : 1)},
    descending: {method: (a, b) => (parseInt(a.price) > parseInt(b.price) ? -1 : 1)},
  };

  const allFilters = 
    [{type: "release_time", value: "Released in 2022"}, 
    {type: "release_time", value: "Not Released in 2022"}, 
    {type: "product_type", value: "iphone"}, 
    {type: "product_type", value: "iPad"}, 
    {type: "product_type", value: "Notebook"}, 
    {type: "product_type", value: "Desktop"}]

  const updateFavorites = (name, price) => {
    let tempFavorites = favorites;
    tempFavorites[name] = tempFavorites[name] === 1 ? -1 : 1;
    setTotal(total + tempFavorites[name] * parseInt(price));
    setFavorites(tempFavorites);
  };

  const updateFilter = (newFilter, filterType) => {
    let tempFilters = filter[filterType];

    if (tempFilters.includes(newFilter)) {
      tempFilters.splice(tempFilters.indexOf(newFilter), 1);
    } 
    else {
      tempFilters.push(newFilter);
    }

    filter[filterType] = [...tempFilters];
    setFilter(filter);

    const size = filter["release_time"].length + filter["product_type"].length;
    if (size === 0 || size === allFilters.length) {
      setFilterData(productsData);
    } 
    else {
      setFilterData(productsData.filter(item => 
        (filter["release_time"].includes(item["release_time"]) 
        || filter["release_time"].length === 0) && 
        (filter["product_type"].includes(item["product_type"]) 
        || filter["product_type"].length === 0)));
    }
  }

  const resetPage = () => {
    setSort("productType");
    setFilter({"release_time": [], "product_type": []});
    setFilterData(productsData);
    setFavorites(productsData.reduce((object, key) => ({ ...object, [key.name]: -1}), {}));
    setTotal(0);
  }

  return (
  <body>
    <div className = "App">



      <h1>Portfolio for Fantastic Lion</h1>

      <div className = "intro">
      <img src="https://i.natgeofe.com/n/487a0d69-8202-406f-a6a0-939ed3704693/african-lion_square.JPG" 
          width="300" height="300" padding="1000"></img>
        <h2>&nbsp;About me:</h2>
        
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I am a student at Brown taking CS 1300 UIUX this semester. My theme/character in this portfolio is my strong skills of user interface and user experience.</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In my free time, I enjoy doing a lot of things but I don't think I'm allowed to say them here because I should keep myself anonymous. So all you have to know is that I'm a fantastic lion coming from Pride Land. My name is Simpa and I am the friend of Simba.</p>
      </div>
      <h2>&nbsp;My Projects:</h2>

      <div className = "product"> {
        filterData.sort(allSorts[sort].method)
          .map ((item, index) => (<ProductItem key={"product" + index} info = {item} 
            added = {favorites[item.name]} setStateOfParent={updateFavorites}/>))}
      </div> 
    </div>

  <h2>Resume:</h2>
  <div class="resume">
    <img src="https://fantasticlion.github.io/photos/assets/resume.png" width="700"></img>
  </div>
  <label>Made in 2022 by Fantastic Lion</label>
  </body>);
}

export default App;
