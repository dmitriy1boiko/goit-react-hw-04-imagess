import PropTypes from 'prop-types';

import { BtnForm, BtnFormText, Form, Header, Input } from './Searchbar.styled';
import { FcSearch } from 'react-icons/fc';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(input);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <BtnForm type="submit">
          <FcSearch
            style={{
              width: '25px',
              height: '25px',
            }}
          />
          <BtnFormText>Search</BtnFormText>
        </BtnForm>

        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={e => setInput(e.target.value)}
        />
      </Form>
    </Header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  value: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};