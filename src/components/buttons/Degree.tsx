import { motion } from 'framer-motion';
import { useAppDispatch } from 'store';
import { changeTempUnit } from 'store/global';


const DegreeItem = ({ text, selected, onClick }:any) => {
    
    const dispatch = useAppDispatch();

    return (
    <motion.div 
        className="degree-item" 
        onClick={()=>{
            onClick();
            dispatch(changeTempUnit(text));
        }}
        animate={{ backgroundColor: selected ? "#FFFFFF40" : "transparent" }}
    >
        {text}
        {selected && (
            <motion.div 
                className="sideline"
                layoutId="sideline"
            />
        )}
    </motion.div>
)}

export default DegreeItem;