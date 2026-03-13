import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchByAuthor } from '../features/blueprints/blueprintsSlice'

export default function AuthorSearch() {
    const [author, setAuthor] = useState('')
    const dispatch = useDispatch()

    const handleSearch = (e) => {
        e.preventDefault()
        if (author.trim()) {
            dispatch(fetchByAuthor(author))
        }
    }

    return (
        <div className="card search-card mb-4">
            <div className="card-body">
                <h5 className="card-title">Search Author Blueprints</h5>
                <form onSubmit={handleSearch} className="row g-3">
                    <div className="col-auto">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Author name (e.g. Arsw)"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
