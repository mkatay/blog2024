import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

export const DropDown = ({categories, selectedCategory, setSelectedCategory }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div style={{maxWidth:300,marginTop:20}}>
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle caret>
          {selectedCategory ? selectedCategory : 'Kategória'}
        </DropdownToggle>
        <DropdownMenu>
          {categories ?
            categories.map((obj) => (
              <DropdownItem key={obj.id} onClick={() => setSelectedCategory(obj.name)}>
                {obj.name}
              </DropdownItem>
            ))
            : 
            <DropdownItem disabled>Nincs elérhető kategória</DropdownItem>
        }
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
