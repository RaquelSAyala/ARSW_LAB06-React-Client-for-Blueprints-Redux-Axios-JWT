import { useSelector, useDispatch } from 'react-redux'
import { updateBlueprint, clearCurrent } from '../features/blueprints/blueprintsSlice'
import AuthorSearch from '../components/AuthorSearch'
import BlueprintTable from '../components/BlueprintTable'
import BlueprintCanvas from '../components/BlueprintCanvas'

export default function DashboardPage() {
    const dispatch = useDispatch()
    const { current, saveStatus } = useSelector((state) => state.blueprints)

    const handleSave = () => {
        if (current) {
            dispatch(updateBlueprint(current))
        }
    }

    const handleClear = () => {
        dispatch(clearCurrent())
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-12">
                    <AuthorSearch />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-5">
                    <BlueprintTable />
                </div>
                <div className="col-lg-7">
                    <div className="card canvas-card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="card-title m-0">
                                    {current ? `Canvas: ${current.name}` : 'Blueprint Canvas'}
                                </h5>
                                {current && (
                                    <div className="btn-group">
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={handleClear}
                                        >
                                            Close
                                        </button>
                                        <button
                                            className="btn btn-sm btn-primary"
                                            onClick={handleSave}
                                            disabled={saveStatus === 'loading'}
                                        >
                                            {saveStatus === 'loading' ? 'Saving...' : 'Save Blueprint'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {saveStatus === 'succeeded' && (
                                <div className="alert alert-success py-2 small">Blueprint saved successfully!</div>
                            )}
                            {saveStatus === 'failed' && (
                                <div className="alert alert-danger py-2 small">Error saving blueprint.</div>
                            )}

                            <div className="d-flex flex-column align-items-center">
                                <BlueprintCanvas
                                    points={current ? current.points : []}
                                    interactive={!!current}
                                />
                                {current && (
                                    <p className="text-secondary small mt-2">
                                        <span className="dot" /> Mode: Interactive Drawing (Click on canvas to add points)
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
