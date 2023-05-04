const LoadIndicator = ({message} : {message : String}) => {
    return (
        <div className="LoadIndicatorWrapper">
            <h1 className="LoadIndicator">{message}</h1>
        </div>
    )
}

export default LoadIndicator;