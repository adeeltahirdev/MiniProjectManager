
const operations = {
    create: 'Adding',
    update: 'Updating',
    delete: 'Deleting'
}

function Loader({operation, subject}) {

    const opt = operations[operation]
    const item = subject

    return(
        <p className="loading-message">
            {opt} {item}...
        </p>
    );
}

export default Loader