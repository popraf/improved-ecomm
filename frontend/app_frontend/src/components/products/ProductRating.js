function ProductRating({ value, text, color }) {
    return (
        <div>
            <span>
                <i style={{color}} className={
                    value>=1
                        ? 'fas fa-star'
                        : value >= 0.5
                            ? 'fas fa-star-half-alt'
                            : 'fas fa-star'
                }></i>
            </span>
        </div>
    )
}

export default ProductRating