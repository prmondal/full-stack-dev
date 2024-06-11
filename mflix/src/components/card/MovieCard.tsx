import { MovieInfoType } from "../../types";
import { MovieSelectHandlerContext } from "../../contexts/MovieSelectHandlerContext";
import { useCallback, useContext, useState } from "react";
import WishListButton from "./WishListButton";

//todo: move to common place
const MOVIE_API_ENDPOINT_URL = 'http://localhost:3000/movies';

const sendWishMovieRequest = async (id: string): Promise<boolean> => {
    const response = await fetch(`${MOVIE_API_ENDPOINT_URL}/${id}/wish`, {
        method: "PUT"
    });
    
    return response.ok;
};

const sendUnWishMovieRequest = async (id: string): Promise<boolean> => {
    const response = await fetch(`${MOVIE_API_ENDPOINT_URL}/${id}/unwish`, {
        method: "PUT"
    });
    
    return response.ok;
};

const MovieCard = ({ movieInfo }: { movieInfo: MovieInfoType }) => {
    const { movieSelectHandler } = useContext(MovieSelectHandlerContext);

    const [wishListed, setWishListed] = useState(movieInfo.wishlisted);
    const [showWishListIcon, setShowWishListIcon] = useState(false);
    const [hasBrokenThumbnail, setHasBrokenThumbnail] = useState<boolean>(false);
    const [thumbnailLoaded, setThumbnailLoaded] = useState<boolean>(false);

    const clickHandler = useCallback(() => {
        movieSelectHandler(movieInfo);
    }, [movieSelectHandler, movieInfo]);

    const thumbnailMouseEnterHandler = useCallback(() => {
        thumbnailLoaded && setShowWishListIcon(!showWishListIcon); 
    }, [thumbnailLoaded, showWishListIcon]);

    const wishListIconClickHandler = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        
        let requestSuccessful: boolean;
        if (!wishListed) {
            requestSuccessful = await sendWishMovieRequest(movieInfo.id);
        } else {
            requestSuccessful = await sendUnWishMovieRequest(movieInfo.id);
        }

        if (requestSuccessful)
            setWishListed(!wishListed);
    }, [movieInfo, wishListed]);

    const thumbnailErrorHandler = (e) => {
        setHasBrokenThumbnail(true);
    }

    const thumbnailLoadHandler = (e) => {
        setThumbnailLoaded(true);
    }

    return (
        !hasBrokenThumbnail &&
        <div className='movie-card'>
            <div className='thumbnail' onClick={clickHandler} onMouseEnter={thumbnailMouseEnterHandler} onMouseLeave={thumbnailMouseEnterHandler}>
                { showWishListIcon && <WishListButton clickHandler={wishListIconClickHandler} wishListed={wishListed}/> }
                <img decoding="async" loading="lazy" src={movieInfo.thumbnail} onLoad={thumbnailLoadHandler} onError={thumbnailErrorHandler}/>
            </div>
        </div>
    )
}

export default MovieCard;