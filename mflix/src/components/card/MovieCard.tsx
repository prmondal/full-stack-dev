import { MovieInfoType } from "../../types";
import { MovieSelectHandlerContext } from "../../contexts/MovieSelectHandlerContext";
import { useCallback, useContext, useState } from "react";
import WishListButton from "./WishListButton";

const MovieCard = ({ movieInfo }: { movieInfo: MovieInfoType }) => {
    const { movieSelectHandler } = useContext(MovieSelectHandlerContext);

    const [wishListed, setWishListed] = useState(false);
    const [showWishListIcon, setShowWishListIcon] = useState(false);

    const clickHandler = useCallback(() => {
        movieSelectHandler(movieInfo);
    }, [movieSelectHandler, movieInfo]);

    const thumbnailMouseEnterHandler = useCallback(() => {
        setShowWishListIcon(!showWishListIcon); 
    }, [showWishListIcon]);

    const wishListIconClickHandler = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setWishListed(!wishListed);
    }, [wishListed]);

    return (
        <div className='movie-card'>
            <div className='thumbnail' onClick={clickHandler} onMouseEnter={thumbnailMouseEnterHandler} onMouseLeave={thumbnailMouseEnterHandler}>
                {
                    showWishListIcon && <WishListButton clickHandler={wishListIconClickHandler} wishListed={wishListed}/>
                }

                <img decoding="async" src={movieInfo.thumbnail} />
            </div>
        </div>
    )
}

export default MovieCard;