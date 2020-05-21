import React from 'react';

function FieldUpdateItemQty({cartItem, updateInputValueAndButton}) {

  return (
    <input type="text" value={cartItem.quantity} onChange={updateInputValueAndButton} className="form-control input-number" required readOnly />
  );
}

export default FieldUpdateItemQty;
