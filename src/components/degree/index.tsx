import { motion } from 'framer-motion';
import React from 'react'
import { useAppSelector } from 'store';


type DegreeProps = {
  temp?: number;
  style?: React.CSSProperties;
}

const Degree = ({temp, style}: DegreeProps ):JSX.Element => {

  const tempUnit  = useAppSelector((state) => state.tempUnit);

  return (
      <motion.div
          style={style}
          className='degree-container'
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 0.5 }}
          key={tempUnit}
        >
          <span>
            {temp}
          </span>
          <span className='degree-sign' style={{ position: 'relative', top: '-0.3em' }}>
            °
          </span>
      </motion.div>
  )
}

export default Degree;