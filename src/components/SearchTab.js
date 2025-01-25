import { useState, useEffect, useRef } from 'react';

const SearchTab = ({ closeSearch }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [defaultItems, setDefaultItems] = useState([]);
    const searchRef = useRef(null); // Ref to the search tab
    const resultsLimit = 4; // Limit number of results displayed

    // Fetch default items when the component mounts
    useEffect(() => {
        const fetchDefaultItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/posts');
                const data = await response.json();
                setDefaultItems(data.slice(0, resultsLimit)); // Fetch and set the first 4 items
            } catch (error) {
                console.error('Error fetching default items:', error);
            }
        };
        fetchDefaultItems();
    }, []);

    // Handle input change
    const handleSearchChange = async (event) => {
        const searchQuery = event.target.value;
        setQuery(searchQuery);

        // If the query is not empty, fetch results from the database
        if (searchQuery.trim()) {
            try {
                const response = await fetch(`http://localhost:5000/posts?q=${searchQuery}`);
                const data = await response.json();
                setSearchResults(data.slice(0, resultsLimit)); // Set the fetched data as search results (limit to 4)
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        } else {
            setSearchResults([]); // Clear results if query is empty
        }
    };

    // Close the search tab if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                closeSearch(); // Close the search tab when clicking outside
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [closeSearch]);

    return (
        <div className="fixed top-[110px] shadow-lg rounded right-[200px] z-50 flex justify-center items-center">
            <div ref={searchRef} className="bg-gray-100 p-6 rounded w-96">
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Search for products..."
                    />
                    <button onClick={closeSearch} className="ml-4 text-gray-600 hover:text-gray-900">X</button>
                </div>

                {/* Display default items before any search query */}
                {query === '' && defaultItems.length > 0 && (
                    <div className="mt-4">
                        <h2 className="font-semibold">Default Items:</h2>
                        <ul>
                            {defaultItems.map((product) => (
                                <li key={product._id} className="mt-2 p-2 border-b">
                                    <a href={`/product/${product._id}`} className="text-blue-600 hover:underline">
                                        {product.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Display search results only if there are matching results */}
                {query && searchResults.length > 0 && (
                    <div className="mt-4">
                        <h2 className="font-semibold">Search Results:</h2>
                        <ul>
                            {searchResults.map((product) => (
                                <li key={product._id} className="mt-2 p-2 border-b">
                                    <a href={`/product/${product._id}`} className="text-blue-600 hover:underline">
                                        {product.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchTab;
