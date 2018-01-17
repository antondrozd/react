const root = document.getElementById('root');

class NotesApp extends React.Component {
	state = {
		notes: [
			{
				id: 0,
				text: 'text1'
			},
			{
				id: 1,
				text: 'text2'
			},
			{
				id: 2,
				text: 'text3'
			}
		]
	}

	handleNoteAdd = (newNote) => {
		const newNotes = this.state.notes.slice();
		newNotes.unshift(newNote);
		this.setState({
			notes: newNotes
		})
	}

	render() {
		return (
			<div className='notes-app'>
				<h2 className='app-header'>NotesApp</h2>
				<NoteEditor onNoteAdd={this.handleNoteAdd} />
				<NotesGrid notes={this.state.notes} />
			</div>
		)
	}
}

class NoteEditor extends React.Component {
	state = {
		text: ''
	}

	handleTextChange = (event) => {
		this.setState({
			text: event.target.value
		})
	}

	handleNoteAdd = () => {
		const newNote = {
			id: Date.now(),
			text: this.state.text
		};

		this.props.onNoteAdd(newNote);
	}

	render() {
		return (
			<div className='note-editor'>
				<textarea
					placeholder='Enter your note here...'
					rows={5}
					className='textarea'
					onChange={this.handleTextChange}
				/>
				<button className='add-button' onClick={this.handleNoteAdd}>Add</button>
			</div>
		)
	}
}

class NotesGrid extends React.Component {
	componentDidMount() {
		const grid = this.refs.grid;
		this.msnry = new Masonry(grid, {
			itemSelector: '.note',
			columnWidth: 200,
			gutter: 10,
			isFitWidth: true
		})
	}
	render() {
		return (
			<div className='notes-grid' ref='grid'>
				{
					this.props.notes.map(function (note) {
						return <Note key={note.id} text={note.text} />
					})
				}
			</div>
		)
	}
}

class Note extends React.Component {
	render() {
		return (
			<div className='note'>{this.props.text}</div>
		)
	}
}

ReactDOM.render(<NotesApp />, root);