import { useState, useEffect } from "react";

const App = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ query, setQuery ] = useState("");
    const [error, setError] = useState(null);
    const fetchBooks = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=harry+potter`);
            if (!response.ok) {
                console.error("Error fetching books.");
            }
            const data = await response.json();
            setBooks(data.items);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchBooks();
    }, [])

    if (loading) return <p className="text-center text-white">Yuklanmoqda...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
            <div className="bg-[url('https://book-api-gules.vercel.app/img/oldbooks.8e9b1e6f.jpg')] bg-no-repeat bg-cover bg-center w-full h-lvh flex flex-col items-center p-10 gap-10">
                <h1 className="text-4xl text-white">Search for book by title:</h1>
                <input type="text" className="p-4 border bg-white/80 rounded-tl-3xl rounded-br-3xl outline-none text-2xl"/>
                <div className="w-full border border-blue-500 grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-3 container mx-auto">
                    {books.map((book) => (
                        <card key={book.id || book.title} className="card bg-white flex flex-row rounded-xl text-left p-4 gap-5" >
                            <img src={book.volumeInfo.imageLinks?.thumbnail} alt="Image not found" className="w-1/3 h-full border" />
                            <div className="flex flex-col gap-3">
                                <h2 className="text-red-600">{book.volumeInfo.title}</h2>
                                <span className="my-4">Published: {book.volumeInfo.publishedDate} by <p>{book.volumeInfo.authors}</p></span>
                                <a href={book.volumeInfo.link} className="text-blue-600">More information...</a>
                            </div>
                        </card>
                    ))}
                </div>
            </div>
    );
};

export default App;