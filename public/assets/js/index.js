

var $noteTitle = $(".note-title");
var $noteText = $(".note-textarea");
var $saveNoteBtn = $(".save-note");
var $newNoteBtn = $(".new-note");
var $noteList = $(".list-container .list-group");

// activeNote is used to keep track of the note in the textarea
let activeNote = {};

// This is the function for getting 
// from the db //

  const getNotes = () => {
    return $.ajax({
      url: "/api/notes",
      method: "GET",

    });
    
  };

// This is the function for saving 
// the notes in db //

  const saveNote = (note) => {
    return $.ajax({
      url: '/api/notes',
      data: note,
      method: 'POST',

    });

  };


  const deleteNote = (id) => {
  return $.ajax({
    url: "api/notes/" + id,
    method: "DELETE",
  });
 };

const renderActiveNote = () => {
  hide(saveNoteBtn);

  if (activeNote.id) {
    $noteTitle.setAttribute('readonly', true);
    $noteText.setAttribute('readonly', true);
    $noteTitle.value = activeNote.title;
    $noteText.value = activeNote.text;
  } else {
    $noteTitle.removeAttribute('readonly');
    $noteText.removeAttribute('readonly');
    $noteTitle.value = '';
    $noteText.value = '';
  }
};

const handleNoteSave = () => {
  const newNote = {
    title: noteTitle.value,
    text: noteText.value,
  };
  saveNote(newNote).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Delete the clicked note
const handleNoteDelete = (e) => {
  // Prevents the click listener for the list from being called when the button inside of it is clicked
  e.stopPropagation();

  const note = $(this).parent(".list-group-item").data();

  if (activeNote.id === noteId) {
    activeNote = {};
  }

  deleteNote(noteId).then(() => {
    getAndRenderNotes();
    renderActiveNote();
  });
};

// Sets the activeNote and displays it
const handleNoteView = () => {
  
  activeNote = $(this).data();
  renderActiveNote();
};

// Sets the activeNote to and empty object and allows the user to enter a new note
const handleNewNoteView = () => {
  activeNote = {};
  renderActiveNote();
};

// The save btn function that when the note's are
// empty hide the btn for save
// or if it's not empty show it

const handleRenderSaveBtn = () => {
  if (!noteTitle.value.trim() || !noteText.value.trim()) {
    hide(saveNoteBtn);
  } else {
    show(saveNoteBtn);
  }
};

// Render the list of note titles
const renderNoteList = (notes) => {
  $noteList.empty();
  

  const noteListItems = [];

  // Returns HTML element with or without a delete button
  const create$li = (text, withDeleteButton = true) => {
    const $li = $("<li class='list-group-item'>");
    const $span = $("<span>").text(text);
    $li.append($span);


    li.append(spanEl);

    if (withDeleteButton) {
      const $delBtn = $(
        "<i class='fas fa-trash-alt float-right text-danger delete-note'>"
      );
      $li.append($delBtn);
    }

    return $li;
  };

  if (notes.length === 0) {
    noteListItems.push(create$Li('No saved Notes', false));
  }

  notes.forEach((note) => {
    const $li = create$li(note.title).data(note);

    noteListItems.push($li);
  });

  $noteList.append(noteListItems);
};

// Gets notes from the db and renders them to the sidebar
const getAndRenderNotes = () => getNotes().then(renderNoteList);

if (window.location.pathname === '/notes') {
  saveNoteBtn.addEventListener('click', handleNoteSave);
  newNoteBtn.addEventListener('click', handleNewNoteView);
  noteTitle.addEventListener('keyup', handleRenderSaveBtn);
  noteText.addEventListener('keyup', handleRenderSaveBtn);
}

getAndRenderNotes();
