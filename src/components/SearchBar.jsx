import { useState } from "react";
import "./css/searchbar.css";

/**
 * Represents a search bar component
 * 
 * @param {Object} props - The props object containing the following property:
 *                      - setSearchQuery {Function} - A function to update the search query. 
 * @returns {JSX.Element} The JSX representation of the SearchBar component
 */
function SearchBar({ setSearchQuery }) {
    // State variable to track the search query
    const [query, setQuery] = useState("");

    // Handler function to update the search query state
    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        setSearchQuery(value);
    }

    // Render the search bar input element
    return (
        <div className="container1">
            <input 
                type="search" 
                placeholder="Enter Keywords by Name" 
                id="keywords"
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;