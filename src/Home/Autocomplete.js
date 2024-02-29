import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css'; // Importe os estilos necessários

const Autocomplete = () => {
  const [options, setOptions] = React.useState([
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Grape',
    'Lemon',
    'Lime',
    'Orange',
    'Peach',
    'Pear'
  ]);

  return (
    <Typeahead
      id="autocomplete"
      options={options}
      placeholder="Escolha uma fruta..."
    />
  );
};

export default Autocomplete;
