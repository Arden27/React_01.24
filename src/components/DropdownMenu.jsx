import React, { useState, useRef, useContext, useEffect } from 'react';
import Button from '@/components/Button';
import useOutsideClick from '@/hooks/useOutsideClick';

import ChevronUp from '@/assets/svg/chevron-up.svg?react';
import ChevronDown from '@/assets/svg/chevron-down.svg?react';

// Context to provide selected value and handleSelect function to children
const DropdownContext = React.createContext();

export default function DropdownMenu({ children, onSelect, selected, setSelected: externalSetSelected }) {
  const node = useRef();
  const buttonRef = useRef();

  const [isOpen, setIsOpen] = useState(false);

  // Internal state, used only if externalSetSelected is not provided
  const [internalSelected, internalSetSelected] = useState('');

  const isSelectedControlled = externalSetSelected !== undefined;
  const currentSelected = isSelectedControlled ? selected : internalSelected;
  const currentSetSelected = isSelectedControlled ? externalSetSelected : internalSetSelected;

  const handleSelect = (value) => {
    currentSetSelected(value);
    onSelect(value);
    setIsOpen(false);
  };

  const handleOutsideClick = () => {
    setIsOpen(false);
  };

  useOutsideClick([buttonRef, node], handleOutsideClick);

  useEffect(() => {
    const buttonChild = React.Children.toArray(children).find(
      (child) => child.type === DropdownMenu.Button,
    );

    if(buttonChild){
      currentSetSelected(buttonChild.props.children)
    } else {
      const listChild = React.Children.toArray(children).find(
        (child) => child.type === DropdownMenu.List,
      );
  
      if (listChild) {
        const defaultItem = React.Children.toArray(listChild.props.children).find(
          (child) => child.props.isDefault,
        );
  
        if (defaultItem) {
          currentSetSelected(defaultItem.props.children);
        }
      }
    }
    
  }, []);

  return (
    <DropdownContext.Provider value={{ selected: currentSelected, handleSelect }}>
      <div className="relative cursor-pointer text-end" ref={node}>
        <Button
          className={`whitespace-nowrap hover:text-bg2 ${isOpen ? 'bg-text !text-bg2' : ''}`}
          format="sm"
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentSelected} {/* Use currentSelected instead of selected */}
          <span className="ml-3xs">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
        </Button>
        {isOpen && React.Children.map(children, (child) => {
          if (child.type === DropdownMenu.List) {
            return React.cloneElement(child);
          }
          return child;
        })}
      </div>
    </DropdownContext.Provider>
  );
}

DropdownMenu.List = function DropdownList({ className, children }) {
  const { handleSelect } = useContext(DropdownContext);

  return (
    <ul className={className}>
      {React.Children.map(children, (child, index) => {
        if (child.type === DropdownMenu.Item) {
          return React.cloneElement(child, { key: index, onSelect: handleSelect });
        }
        return child;
      })}
    </ul>
  );
};

// Sub-component to render selectable Items
DropdownMenu.Item = function DropdownItem({ children, onSelect, className, isDefault }) {
  return (
    <li onClick={() => onSelect(children)}>
      <Button
        className={className}
        format="sm"
      >
        {children}
      </Button>
    </li>
  );
};

// Sub-component to render a custom default button label
DropdownMenu.Button = function DropdownButton({ children }) {
  return <></>;
};
