import { memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'; // hack to make it work with typescript
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';

interface WishListButtonProps { 
    wishListed: boolean;
    clickHandler: (event: React.MouseEvent) => void
};

const WishListButton = memo(({ wishListed, clickHandler }: WishListButtonProps) => {
    return (
        <FontAwesomeIcon className='wishlist-icon' icon={wishListed ? fasHeart : farHeart} onClick={clickHandler} size="2xl" beat={!wishListed}/>
    )
});

export default WishListButton;