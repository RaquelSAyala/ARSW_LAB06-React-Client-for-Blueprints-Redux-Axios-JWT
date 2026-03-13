import { useSelector, useDispatch } from 'react-redux'
import { fetchBlueprint } from '../features/blueprints/blueprintsSlice'

export default function BlueprintTable() {
    const { byAuthor, status } = useSelector((state) => state.blueprints)
    const dispatch = useDispatch()

    // Get the most recently searched author from the byAuthor keys
    const authors = Object.keys(byAuthor)
    if (authors.length === 0) {
        return (
            <div className="alert alert-info">
                Search for an author to see their blueprints.
            </div>
        )
    }

    const currentAuthor = authors[authors.length - 1]
    const blueprints = byAuthor[currentAuthor] || []

    const totalPoints = blueprints.reduce((acc, bp) => acc + bp.points.length, 0)

    const handleOpen = (name) => {
        dispatch(fetchBlueprint({ author: currentAuthor, name }))
    }

    return (
        <div className="card table-card">
            <div className="card-body">
                <h4 className="card-title">Blueprints by {currentAuthor}</h4>
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Blueprint Name</th>
                                <th>Points Count</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blueprints.map((bp) => (
                                <tr key={bp.name}>
                                    <td>{bp.name}</td>
                                    <td>{bp.points.length}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => handleOpen(bp.name)}
                                        >
                                            Open
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-3 text-end text-muted">
                    <strong>Total Points:</strong> {totalPoints}
                </div>
            </div>
        </div>
    )
}
