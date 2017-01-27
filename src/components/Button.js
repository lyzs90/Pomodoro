'use strict';

import React from 'react';

export const Button = ({onClick, btnClass, label}) => (
  <button onClick={onClick} className={btnClass}>{label}</button>
);
