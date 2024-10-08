import React from 'react';
import {Button, ButtonGroup, Dropdown, DropdownButton, NavItem, NavLink} from "react-bootstrap";

const DropDown = () => {
  return (
  <ButtonGroup>
    <Button>1</Button>
    <DropdownButton id="bg-nested-dropdown" title=''>
      <Dropdown.Item eventKey="1">Удалить</Dropdown.Item>
      <Dropdown.Item eventKey="2">Переименовать</Dropdown.Item>
    </DropdownButton>
  </ButtonGroup>
  );
};

export default DropDown;
