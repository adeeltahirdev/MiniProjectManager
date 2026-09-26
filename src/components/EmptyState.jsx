
function EmptyState({message, actionLabel, onAction}) {
    return(
        <div className="task-empty">
          <p>{message}</p>
          <button className="create-btn" onClick={onAction}>
            {actionLabel}
          </button>
        </div>
    );
}

export default EmptyState