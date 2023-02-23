function ProductRating({ value, text, color }) {
    return (
        <div>
            <span>
                <i style={{color}} className={
                    value>=1
                        ? 'fas fa-star'
                        : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'far fa-star'
                }></i>
            </span>
            <span>{ text && text }</span>
        </div>
    )
}

export default ProductRating