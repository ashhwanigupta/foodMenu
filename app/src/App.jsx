import { useEffect, useState } from 'react';
import styled from 'styled-components'
import SearchResult from './components/searchResult/SearchResult';

export const URL = "http://localhost:7000"

function App() {
  
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false) 
  const [error, setError] = useState(false)
  const [filteredData, setFilteredData] = useState(null)
  const [SelectedBtn,setSelectedBtn] = useState(null)

 
  
  useEffect(()=>{
    const FetchFoodData = async()=>{
      setLoading(true) 
      try{
        const response = await fetch(URL);
        const json = await response.json()
        setLoading(false)
        setFilteredData(json)
        setData(json);
      }catch(error){
        setError("Unable to fetch Data")
      }
    }
    FetchFoodData()

   
  },[])

  const SearchFood=(e)=>{
    const searchValue = e.target.value;

    if(searchValue===""){
      setFilteredData(null)
    }
    const filter = data.filter((khana)=>
      khana.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter)
  }

  const FilterFood=(type)=>{
    if(type==="all"){
      setFilteredData(data)
      setSelectedBtn("all")
      return
    }

    const filter = data.filter((khana)=>
      khana.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter)
    setSelectedBtn(type)

  }

  const filterBtns = [
    {
      name:"All",
      type:"all"
    },
    {
      name:"Breakfast",
      type:"breakfast"
    },
    {
      name:"Lunch",
      type:"lunch"
    },
    {
      name:"Dinner",
      type:"dinner"
    }
  ]


  if(error) return <div>{error}</div>
  if(loading) return <div>Loading...</div>
 

  return (
    <>
    <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>

          <div className="search">
              <input onChange={SearchFood} type="text" placeholder='Search Food...'/>
          </div>
        </TopContainer>

        <FilterContainer>
          {filterBtns.map((value)=>(
            <Button
            isSelected={SelectedBtn === value.type}
            key={value.name} onClick={()=>FilterFood(value.type)}>{value.name}</Button>
          ))}
        </FilterContainer>

    </Container>
    <SearchResult data={filteredData}/>

    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 0 10px;
      &::placeholder {
        color: white;
      }
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#cc2222" : "#ff4343")};
  /* outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")}; */
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #cc2222;
  }
`;

