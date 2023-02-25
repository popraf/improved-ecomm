function ProductRating({ value, text }) {
    const color = '#000000';
    const starClassInactive = 'far fa-star';
    const halfStarClass = 'fas fa-star-half-alt';
    const starClassActive = 'fas fa-star';

    value = value.toFixed(1);
    const numStarsActive = Math.floor(value);
    const numHalfStar = ((value - numStarsActive) >= 0.5) ? 1 : 0;

    let starsArr = [];

    for (let i=1; i<=5; i++) {
        starsArr.push(
            <span>
                <i style={{color}} className={
                    i <= numStarsActive ? starClassActive
                        : (numHalfStar === 1) &&  (i === (numStarsActive+1)) ? halfStarClass
                            : starClassInactive
                }></i>
            </span>
            );
    };

    return (
        <div>
            { starsArr }
            <span>{ text && text }</span>
        </div>
    )
}

export default ProductRating
