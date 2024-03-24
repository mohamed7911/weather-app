import { LayoutGroup } from 'framer-motion';
import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
  className:string
}

const UnderlinedMenu: React.FC<Props> = ({children, className}) => {
  
    const [selected, setSelected] = useState(0);
    
    return (
      <div className={className}>
        <div className="wrapper">
          <LayoutGroup>
            {React.Children.map(children, (child, index) => (
              React.cloneElement(child as React.ReactElement<any>, {
                selected: selected === index,
                onClick: () => setSelected(index),
              })
            ))}
          </LayoutGroup>
        </div>
      </div>
    )
  }

  export default UnderlinedMenu;