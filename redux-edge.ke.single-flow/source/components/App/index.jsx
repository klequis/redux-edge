/*
 * Simply renders Note. Doesn't seem necessary. Perhaps index.js could
 *   render it directly.
 */

import React from 'react';
import NotesList from '../NotesList';

const App = () => (
  <div>
    <NotesList />
  </div>
);

export default App;
