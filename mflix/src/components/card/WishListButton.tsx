import { memo } from "react";

interface WishListButtonPropsType { 
    wishListed: boolean;
    clickHandler: (event: React.MouseEvent) => void
};

//todo: use font awesome
const WishListButton = memo(({ wishListed, clickHandler }: WishListButtonPropsType) => {
    return (
        <div className='wishlist-icon' onClick={clickHandler}>
            {wishListed ? '💚' : '🤍'}
        </div>
    )
});

export default WishListButton;