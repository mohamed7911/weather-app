import { motion } from 'framer-motion';
import { useAppDispatch } from 'store';
import { changeforecastUnit } from 'store/global';

const MenuItem = ({ text, selected, onClick }:any) => {
    const dispatch = useAppDispatch();

return(
    <motion.div 
        className="menu-item"
        onClick={()=>{onClick();dispatch(changeforecastUnit(text));}}
        animate={{ opacity: selected ? 1 : .5}}
    >
        {text}
        {selected && (
            <motion.div 
                className="underline" 
                layoutId="underline" 
            />
        )}
    </motion.div>
)}

export default MenuItem;