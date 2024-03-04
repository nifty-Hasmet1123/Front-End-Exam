import React, { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import "./css/content.css";

/**
 * Represents a component that displays SpaceX data with filtering capability.
 * 
 * @param {Object} props - The props object containing the following properties
 *                      - spaceXdata {Array} - The array of SpaceX data to be displayed.
 *                      - setSpaceData {Function} - A function to set the SpaceX data.
 *                      - searchQuery {string} - The search query entered by the user.
 * @returns {JSX.Element} The JSX representation of the Content component
 */
function Content({ spaceXdata, setSpaceXData, searchQuery }) {
    const [loading, setLoading] = useState(true);

    // useEffect for http methods requests.
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://api.spacexdata.com/v4/launches/");
                const data = await response.json();
                setSpaceXData(data);
                setLoading(false);
                
            } catch (error) {
                console.error("Error fetching SpaceX data: ", error);
            }
        }

        fetchData();
    }, []);

    // filter the SpaceX data based on the search query
    const filteredData = spaceXdata.filter(content => {
        const name = content.name || "";
        return name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    // Render JSX based on loading state and filtered data
    return (
        <div className="container2">
            {
                loading
                    ? <LoadingScreen />
                    : (
                        filteredData.length === 0 
                            ? showNotFound(searchQuery)
                            : <ContentContainer data={filteredData}/>
                    )                        
            }
        </div>
    )
}

/**
 * Renders a message when no results are found based on the search query.
 * 
 * @param {string} searchQuery - The search query entered by the user. 
 * @returns {JSX.Element} The JSX representation of the "no results found" message.
 */
function showNotFound(searchQuery) {
    return <p className="no-result">
            No Result Found for "{searchQuery}"
        </p>
}

/**
 * Renders the container for displaying content items.
 * 
 * @param {Object} props - The props object containing the following properties:
 *                      - data {Array} - The array of content data to be displayed.
 * @returns {JSX.Element} The JSX representation of the ContentContainer component
 */
function ContentContainer({ data }) {
    return (
        <div className="inner-container">
            {data.map(content => {
                return unpack(content);
            })}
        </div>
    );
}

/**
 * Unpacks and renders individual content items.
 * 
 * @param {Object} object - The object representing a single content item.
 * @returns {JSX.Element|null} The JSX representation of the unpacked content item
 */
function unpack(object) {
    const { name, details, flight_number, date_utc } = object;
    
    if (name && details && flight_number && date_utc) {
        return (
            <div key={flight_number} className="content" data-name={name.replace(" ", "_").toLowerCase()}>
                <p className="para-head">{flight_number}: {name} {new Date(date_utc).getFullYear()}</p>
                <p className="para-details">Details: {details}</p>
                <br /><br />
            </div>
        );
    }

    return null;
}

export default Content;
