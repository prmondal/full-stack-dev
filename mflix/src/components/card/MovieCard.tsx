import { MovieInfoType } from "../../types";
import { MovieSelectHandlerContext } from "../../contexts/MovieSelectHandlerContext";
import { useCallback, useContext, useState } from "react";
import WishListButton from "./WishListButton";

//todo: move to common place
const MOVIE_API_ENDPOINT_URL = 'http://localhost:3000/movies';

const wishMovie = async (id: string): Promise<Response> => {
    return await fetch(`${MOVIE_API_ENDPOINT_URL}/${id}/wish`, {
        method: "PUT"
    });
};

const unwishMovie = async (id: string): Promise<Response> => {
    return await fetch(`${MOVIE_API_ENDPOINT_URL}/${id}/unwish`, {
        method: "PUT"
    });
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
        
        let response: Response;
        if (!wishListed) {
            response = await wishMovie(movieInfo.id);
            if (response.ok) {
                setWishListed(true);
            }
        } else {
            response = await unwishMovie(movieInfo.id);
            if (response.ok) {
                setWishListed(false);
            }
        }
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