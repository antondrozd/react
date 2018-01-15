const root = document.getElementById('root');

let contactObjCounter = 0;

class ContactObj {
	constructor(name, phone, imgsrc, adress, email) {
		this.id = ++contactObjCounter;
		this.name = name;
		this.phone = phone;
		this.image = imgsrc;
		this.adress = adress;
		this.email = email;
	}
}

const CONTACTS = [
	new ContactObj('Kirill Buga', '+1234567890', 'img/kirill.jpg', 'Bazhana Ave 24/1', 'me@uneedweb.com'),
	new ContactObj('Diana Buga', '+1234567890', 'img/diana.jpg', 'Bazhana Ave 24/1', 'me@uneedweb.com'),
	new ContactObj('Anton Drozd', '+1234567890', 'img/anton.jpg', 'Bazhana Ave 24/1', 'me@uneedweb.com'),
	new ContactObj('Anastasia Ushakova', '+1234567890', 'img/nastya.jpg', 'Bazhana Ave 24/1', 'me@uneedweb.com'),
	new ContactObj('Kateryna Alekseyenko', '+1234567890', 'img/katya.jpg', 'Bazhana Ave 24/1', 'me@uneedweb.com'),
	new ContactObj('Mark Getman', '+1234567890', 'img/mark.jpg', 'Bazhana Ave 24/1', 'me@uneedweb.com'),
	new ContactObj('Bohdan Kushpler', '+1234567890', 'img/bohdan.jpg', 'Bazhana Ave 24/1', 'me@uneedweb.com'),
	new ContactObj('Iryna Sliusarenko', '+1234567890', 'img/ira.jpg', 'Bazhana Ave 24/1', 'me@uneedweb.com')
]


class Contact extends React.Component {
	state = {
		isOpened: false
	}

	handleAdditionalInfo = () => {
		if (this.state.isOpened) {
			this.setState({
				isOpened: false
			})} else {
			this.setState({
				isOpened: true
			})
		}
	}

	render() {
		const blockName = 'contact-item';
		return (
			<li className={blockName} onClick={this.handleAdditionalInfo}>
				<img className={`${blockName}__photo`} src={this.props.image} />
				<div className={`${blockName}__info`}>
					<span className={`${blockName}__name`}>{this.props.name}</span>
					<span className={`${blockName}__phone`}>{this.props.phone}</span>
					{
						this.state.isOpened ? (
							<div className={`${blockName}__additional-info`}>
								<span className={`${blockName}__adress`}>{this.props.adress}</span>
								<span className={`${blockName}__email`}>{this.props.email}</span>
							</div>
						) : null
					}
				</div>
				<span className={`${blockName}__state-toggle`}>{this.state.isOpened ? '▲' : '▼'}</span>
			</li>
		)
	}
}


class ContactsList extends React.Component {
	state = {
		displayedContacts: CONTACTS
	}

	handleSearch = (event) => {
		let searchValue = event.target.value.toLowerCase().trim();
		let filtredContacts = CONTACTS.filter(function (el) {
			return el.name.toLowerCase().indexOf(searchValue) !== -1;
		})
		this.setState({
			displayedContacts: filtredContacts
		})
	}

	render() {
		const blockName = 'contacts';
		return (
			<div className={blockName}>
				<div className={`${blockName}__search-field-wrapper`}>
					<input type='text' placeholder='Search...' onChange={this.handleSearch} />
				</div>
				<ul className={`${blockName}__list`}>
					{
						this.state.displayedContacts.map(function (el) {
							return <Contact
								key={el.id}
								name={el.name}
								phone={el.phone}
								image={el.image}
								adress={el.adress}
								email={el.email}
							/>
						})
					}
				</ul>
			</div>
		)
	}
}

ReactDOM.render(<ContactsList />, root);