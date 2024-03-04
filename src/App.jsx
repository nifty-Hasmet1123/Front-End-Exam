import "./App.css";
import { useState } from "react";
import SearchBar from "./components/SearchBar";
import Content from "./components/Content";

/**
 * Represents the root component of the application
 * 
 * @returns {JSX.Element} The JSX representation of the App component
 */
function App() {
  // State variables to manage SpaceX data and search query
  const [spaceXData, setSpaceXData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Render the SearchBar and Content components
  return (
    <>
      <SearchBar setSearchQuery={setSearchQuery} />
      <Content 
        spaceXdata={spaceXData} 
        setSpaceXData={setSpaceXData} 
        searchQuery={searchQuery} 
      />
    </>
  )
}

export default App;