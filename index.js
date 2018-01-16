const root = document.getElementById('root');

class NotesApp extends React.Component {
	render() {
		 <div className="notes-app">
			<h2 className="app-header">NotesApp</h2>
		 	<NotesEditor />
		 	<NotesGrid />
		 </div>
	}
}

class NotesEditor extends React.Component {
	render() {

	}
}

class NotesGrid extends React.Component {
	render() {

	}
}

class Note extends React.Component {
	render() {

	}
}

ReactDOM.render(<NotesApp />, root);