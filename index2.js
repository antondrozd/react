const root = document.getElementById('root');

const CONTACTS = [
	{
		id: 1,
		name: 'Darth Vader',
		phoneNumber: '+250966666666',
		image: 'img/darth.gif'
	}, {
		id: 2,
		name: 'Princess Leia',
		phoneNumber: '+250966344466',
		image: 'img/leia.gif'
	}, {
		id: 3,
		name: 'Luke Skywalker',
		phoneNumber: '+250976654433',
		image: 'img/luke.gif'
	}, {
		id: 4,
		name: 'Chewbacca',
		phoneNumber: '+250456784935',
		image: 'img/chewbacca.gif'
	}
];


class Contact extends React.Component {
	render() {
		return (
			<li className="contact">
				<img className="contact-image" src={this.props.image} width="60px" height="60px" />
				<div className="contact-info">
					<div className="contact-name"> {this.props.name} </div>
					<div className="contact-number"> {this.props.phoneNumber} </div>
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
		var searchQuery = event.target.value.toLowerCase().trim();
		var displayedContacts = CONTACTS.filter(function(el) {
			var searchValue = el.name.toLowerCase();
			return searchValue.indexOf(searchQuery) !== -1;
		});
		this.setState({
			displayedContacts: displayedContacts
		});
	}

	render() {
		return (
			<div className="contacts">
				<div className="search-field">
        	<input type="text" placeholder="Search..." onChange={this.handleSearch} />
        </div>
				{<ul className="contacts-list">
					{
					  this.state.displayedContacts.map(function(el) {
							return <Contact
								key={el.id}
								name={el.name}
								phoneNumber={el.phoneNumber}
								image={el.image}
							/>;
					  })
					}
				</ul>}
		</div>
		)
	}
}


ReactDOM.render(<ContactsList />, root);