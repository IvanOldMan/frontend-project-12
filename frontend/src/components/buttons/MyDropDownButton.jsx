import React from 'react';
import {Button, ButtonGroup, Dropdown} from "react-bootstrap";

const MyDropDownButton = () => {
  return (
  <Dropdown variant={variant} as={ButtonGroup} role="group">
    <Button ># {channel.name}</Button>

    <Dropdown.Toggle split id="dropdown-split-basic" />

    <Dropdown.Menu>
      <Dropdown.Item >Удалить</Dropdown.Item>
      <Dropdown.Item >Изменить</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  );
};

export default MyDropDownButton;
