import "./css/loadingScreen.css";

/**
 * Represents a loading screen component
 * 
 * @returns {JSX.Element} The JSX representation of the LoadingScreen component
 */
function LoadingScreen() {
    return (
        <div className="loading" id="loadingIndicator">
            Loading...
        </div>
    )
}

export default LoadingScreen;