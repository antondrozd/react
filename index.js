const root = document.getElementById('root');

class NotesApp extends React.Component {
	state = {
		notes: []
	}

	handleNoteAdd = (newNote) => {
		let newNotes = this.state.notes.slice();
		newNotes.unshift(newNote);
		this.setState({
			notes: newNotes
		})
	}

	handleNoteDelete = (note) => {
		let noteId = note.id;
		let newNotes = this.state.notes.filter(function (note) {
			return noteId !== note.id
		})
		this.setState({
			notes: newNotes
		})
	}

	handleDeleteAll = () => {
		if (confirm('All notes will be deleted')) {
			this.setState({
				notes: []
			})
		}
	}

	render() {
		return (
			<div className='notes-app'>
				<h2 className='app-header'>NotesApp</h2>
				<NoteEditor onNoteAdd={this.handleNoteAdd} />
				<button className='delete-all' onClick={this.handleDeleteAll}>Delete all notes</button>
				<NotesGrid notes={this.state.notes} onNoteDelete={this.handleNoteDelete} />
			</div>
		)
	}
}

class NoteEditor extends React.Component {
	state = {
		text: '',
		color: 'yellow'
	}

	handleTextChange = () => {
		this.setState({
			text: this.refs.textarea.value
		});
		// console.log(this.state.text, '|', this.refs.textarea.value);
	}

	handleNoteAdd = () => {
		let newNote = {
			id: Date.now(),
			text: this.state.text,
			color: this.state.color
		};

		this.props.onNoteAdd(newNote);
		this.refs.textarea.focus();

		this.setState({
			text: ''
		})
	}

	handleColorChange = (newColor) => {
		this.setState({
			color: newColor
		})
		 this.refs.textarea.focus();
	}

	render() {
		return (
			<div className='note-editor'>
				<textarea
					placeholder='Enter your note here...'
					rows={5}
					className='textarea'
					ref='textarea'
					value={this.state.text}
					onChange={this.handleTextChange}
					onKeyDown={(event) => {
						if (event.key == 'Enter') {
							event.preventDefault();
							if (this.state.text.trim()) this.handleNoteAdd();
						}
					}}
				/>
				<div className='controls'>
					<NoteColorsPanel onColorChange={this.handleColorChange} />
					<button className='add-button' onClick={this.handleNoteAdd}>Add</button>
				</div>
			</div>
		)
	}
}

class NoteColorsPanel extends React.Component {
	colors = ['yellow', 'red', 'green', 'blue', 'orange', 'pink']

	state = {
		currentColor: this.colors[0]
	}

	handleColorChange = (el) => {
		let newColor = el.target.getAttribute('data-color');
		this.setState({
			currentColor: newColor
		})
		this.props.onColorChange(newColor);
	}

	render () {
		return (
			<div className='color-select'>
				{
					this.colors.map((color, index) => {
					let isActive = (color == this.state.currentColor) ? 'active-color' : '';
						return (
							<span
								key={index}
								className={`color ${isActive}`.trim()}
								data-color={color}
								style={{backgroundColor: color}}
								onClick={this.handleColorChange}
							></span>
						)
					})
				}
			</div>
		)
	}
}

class NotesGrid extends React.Component {

	render() {
		return (
			<div className='notes-grid' ref='grid'>
				{
					this.props.notes.map((note) => {
						return (
							<Note
								key={note.id}
								text={note.text}
								color={note.color}
								onDelete={this.props.onNoteDelete.bind(null, note)}
							/>
						)
					})
				}
			</div>
		)
	}

	componentDidMount() {
		const grid = this.refs.grid;
		this.msnry = new Masonry(grid, {
			itemSelector: '.note',
			columnWidth: 200,
			gutter: 10,
			isFitWidth: true
		})
	}

	componentDidUpdate() {
		this.msnry.reloadItems();
		this.msnry.layout();
	}
}

class Note extends React.Component {
	render() {
		return (
			<div className='note' style={{backgroundColor: this.props.color}}>
				<span className="delete-note" onClick={this.props.onDelete}> × </span>
				{this.props.text}
			</div>
		)
	}
}

ReactDOM.render(<NotesApp />, root);