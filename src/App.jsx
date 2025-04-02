import { useState, useEffect } from "react";
import './App.css'

const App = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ query, setQuery ] = useState("");
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        const fetchBooks = async () => {
            if (!searchTerm.trim()) return;
            setLoading(true);
            setError(null);
            setBooks([])
            try {
                const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`);
                if (!response.ok) {
                    console.error("Error fetching books.");
                }
                const data = await response.json();
                setBooks(data.items || []);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        const timeOut = setTimeout(fetchBooks, 1000);

        return () => clearTimeout(timeOut);
    }, [searchTerm])

    const handleSearch = (e) => {
        if (e.key === "Enter" && query.trim() !== "") {
            setSearchTerm(query.trim());
        }
    }



    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
            <div className="bg-[url('https://book-api-gules.vercel.app/img/oldbooks.8e9b1e6f.jpg')] bg-no-repeat bg-cover bg-center w-full h-lvh flex flex-col items-center p-10 gap-10">
                <h1 className="text-4xl text-white">Search for book by title:</h1>
                <input
                    type="text"
                    value={query}
                    className="p-4 border bg-white/80 rounded-tl-3xl rounded-br-3xl outline-none text-2xl"
                    onKeyDown={handleSearch}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by title..."
                />
                <div className="w-full h-2/3 grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-3 container mx-auto">
                    {books.length > 0 ? books.map((book) => (
                        <div key={book.id || book.title} className="card bg-white flex flex-row rounded-xl text-left p-4 gap-5">
                            <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Image not found" className="border" />
                            <div className="flex flex-col gap-3">
                                <h2 className="text-red-600">{book.volumeInfo.title}</h2>
                                <span className="my-4 line-clamp-4">Published: {book.volumeInfo.publishedDate} by <p>{book.volumeInfo.authors}</p></span>
                                <a href={book.volumeInfo.infoLink} target="_blank" className="text-blue-600">More information...</a>
                            </div>
                        </div>
                    )) : (
                        <div className="w-full h-2.5 relative overflow-hidden mt-5">
                            <div className="absolute inset-0 bg-gray-200 rounded-full w-full">
                                <div className="bg-indigo-500 w-full h-full animate-moving"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
    );
};

export default App;