const root = document.getElementById('root');

let contactObjCounter = 0;

class ContactObj {
	constructor(name, phone, imgsrc) {
		this.id = ++contactObjCounter;
		this.name = name;
		this.phone = phone;
		this.image = imgsrc;
	}
}

const CONTACTS = [
	new ContactObj('Anton Drozd', '+1234567890', 'img/anton.jpg'),
	new ContactObj('Kirill Buga', '+1234567890', 'img/kirill.jpg'),
	new ContactObj('Diana Buga', '+1234567890', 'img/diana.jpg'),
	new ContactObj('Anastasia Ushakova', '+1234567890', 'img/nastya.jpg'),
	new ContactObj('Kateryna Alekseyenko', '+1234567890', 'img/katya.jpg'),
	new ContactObj('Mark Getman', '+1234567890', 'img/mark.jpg'),
	new ContactObj('Bohdan Kushpler', '+1234567890', 'img/bohdan.jpg'),
	new ContactObj('Iryna Sliusarenko', '+1234567890', 'img/ira.jpg')
]


class Contact extends React.Component {
	render() {
		const blockName = 'contact-item';
		return (
			<li className={blockName}>
				<img className={`${blockName}__photo`} src={this.props.image} />
				<div className={`${blockName}__info`}>
					<span className={`${blockName}__name`}>{this.props.name}</span>
					<span className={`${blockName}__phone`}>{this.props.phone}</span>
				</div>
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
							return <Contact key={el.id} name={el.name} phone={el.phone} image={el.image} />
						})
					}
				</ul>
			</div>
		)
	}
}

ReactDOM.render(<ContactsList />, root);