import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Library from "./Library";
import ToDoList from "./ToDoList";

const App = () => {
    return (
        <Router>
            <div className="p-5">
                <ul className="flex gap-2">
                    <li>
                        <Link to="/library" className="cursor-pointer text-blue-600">
                            Library
                        </Link>
                    </li>
                    <li>
                        <Link to="/todolist" className="cursor-pointer text-blue-600">
                            List
                        </Link>
                    </li>
                </ul>

                {/* Routing */}
                <Routes>
                    <Route path="/library" element={<Library />} />
                    <Route path="/todolist" element={<ToDoList />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
