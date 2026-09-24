import { useState } from "react"
import { useProjects } from "../context/ProjectContext"

function CreateProject() {

    const {createProject} = useProjects()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState('')

    async function handleSubmit(e) {
        e.preventDefault()

        setError('')

        if (name.trim() === '') {
            setError('Project name is required')
            return
        }

        createProject(name, description)

        setName('')
        setDescription('')

    }
    
    return(
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Create Project</h2>

                <div className="form-group">
                    <label htmlFor="name">Project Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter project name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    >
                    </textarea>
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit">
                    Create
                </button>
            </form>
        </div>
    );
}

export default CreateProject