import React from 'react'
import PetfulService from '../../services/PetfulService'
import './Adopt.css'

export default class Adopt extends React.Component {
  state = {
    error: null,
    dogs: [],
    cats: [],
    people: [],
    currentUser: '',
    touched: false,
  }

  componentDidMount(){
    this.setState({ error: null })
    
    PetfulService.getPets()
      .then(res => {
        this.setState({
          dogs: res.dogs,
          cats: res.cats,
        })
      })
      .catch(res => this.setState({ error: res.error }))
  
    PetfulService.getPeople()
      .then(res => this.setState({ people: res }))
      .catch(res => this.setState({ error: res.error }))
  }

  startAdoption() {
    this.myInterval = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * 2) + 1
        
        if(randomNumber === 1) {
          PetfulService.deletePetAndPerson('dog')
            .then(res => {
              PetfulService.getPets()
                .then(res => this.setState({ dogs: res.dogs }))
                .catch(res => this.setState({ error: res.error }))
              PetfulService.getPeople()
                .then(res => this.setState({ people: res }))
                .catch(res => this.setState({ error: res.error }))
            })
            .catch(res => this.setState({ error: res.error }))
        } else {
          PetfulService.deletePetAndPerson('cat')
            .then(res => {
              PetfulService.getPets()
                .then(res => this.setState({ cats: res.cats }))
                .catch(res => this.setState({ error: res.error }))
              PetfulService.getPeople()
                .then(res => this.setState({ people: res }))
                .catch(res => this.setState({ error: res.error }))
            })
            .catch(res => this.setState({ error: res.error }))
        }
      }, 5000);
  }

  handleAddName(e) {
    e.preventDefault()
    this.setState({ touched: false })

    const { name } = e.target
    PetfulService.postPerson(name.value)
      .then( res => {
        name.value = ''
        this.setState({
          people: [...this.state.people, res],
          currentUser: res
        })
      })
      .catch(res => this.setState({ error: res.error }))
    this.startAdoption()
  }

  handleAdoptDog(e) {
    e.preventDefault()
    this.setState({ touched: true })
    
    PetfulService.deletePetAndPerson('dog')
      .then( res => {
        PetfulService.getPets()
          .then(res => this.setState({ dogs: res.dogs }))
          .catch(res => this.setState({ error: res.error }))
        PetfulService.getPeople()
          .then(res => this.setState({ people: res }))
          .catch(res => this.setState({ error: res.error }))
      })
      .catch(res => this.setState({ error: res.error }))
      clearInterval(this.addPeople)
  }

  handleAdoptCat(e) {
    e.preventDefault()
    this.setState({ touched: true })

    PetfulService.deletePetAndPerson('cat')
      .then( res => {
        PetfulService.getPets()
          .then(res => this.setState({ cats: res.cats }))
          .catch(res => this.setState({ error: res.error }))
        PetfulService.getPeople()
          .then(res => this.setState({ people: res }))
          .catch(res => this.setState({ error: res.error }))
      })
      .catch(res => this.setState({ error: res.error }))
      clearInterval(this.addPeople)
  }

  renderAdoptDogButton(name) {
    let button
    if(this.state.currentUser === this.state.people[0]){
        button = <button 
        onClick={e => this.handleAdoptDog(e)} 
        className='landingButton'>
        Adopt Me!
        </button>
    }
    return button
  }

  renderAdoptCatButton(name) {
    let button
    if(this.state.currentUser === this.state.people[0]){
        clearInterval(this.myInterval)
        button = <button 
        onClick={e => this.handleAdoptCat(e)} 
        className='landingButton'>
        Adopt Me!
        </button>
    }
    return button
  }

  renderPeople() {
    let line = []
    for(let i = 0; i < this.state.people.length; i++) {
      if(i === 0) {
        line.push(<h3 id={i} key={i} className='current'>
          {this.state.people[0]}</h3>)
      } else {
        line.push(<p id={i} key={i}>{this.state.people[i]}</p>)
      }
    }
    return line
  }

  peopleInterval() {
      this.addPeople = setInterval(() => {
        const firstNames = ['Kanye', 'Ari', 'James', 'Bon', 'Alex', 'Elon']
        const lastNames = ['West', 'Aster', 'Bond', 'Iver', 'Turner', 'Musk']

        const getRandomName = () => `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`

        if(this.state.people.length < 5) {
            PetfulService.postPerson(getRandomName())
              .then( res => {
                this.setState({
                  people: [...this.state.people, res],
                })
              })
              .catch(res => this.setState({ error: res.error }))
        }

        }, 5000);
  }

  componentWillUnmount() {
      this.setState({ touched: false, error: null })
  }


  render() {
    const {dogs, cats, people, error} = this.state
    let content
    if (error) {
      content = <p className='red'>There was an error</p>
    } else if (dogs.length === 0 || cats.length === 0) {
      return <div className='noPets'>No pets left to adopt!</div>
    } else if (people.length <= 1) {
      this.peopleInterval() 
    } else if (people.length === 5) {
      clearInterval(this.addPeople)
    }
    return(
      <section className='adoptMain'>
        <h2>Adopt!</h2>

        {content}

        <div className='adoptionContainer'>
          <div className='dog-container'>
            <img className='pet-img' src={this.state.dogs[0].imageURL} alt={this.state.dogs[0].description}></img>
            <h3>{this.state.dogs[0].name}</h3>
            <p>{this.state.dogs[0].age} years old</p>
            <p>Gender: {this.state.dogs[0].gender}</p>
            <p>Breed: {this.state.dogs[0].breed}</p>
            <p>How I got here: {this.state.dogs[0].story}</p>
            {this.renderAdoptDogButton()}
          </div>

          <div className='cat-container'>
            <img className='pet-img' src={this.state.cats[0].imageURL} alt={this.state.cats[0].description}></img>
            <h3>{this.state.cats[0].name}</h3>
            <p>{this.state.cats[0].age} years old</p>
            <p>Gender: {this.state.cats[0].gender}</p>
            <p>Breed: {this.state.cats[0].breed}</p>
            <p>How I got here: {this.state.cats[0].story}</p>
            {this.renderAdoptCatButton()}
          </div>
        </div>

        {this.state.touched === true ? 
        <h3>{this.state.currentUser} adopted a pet!</h3> : null}

        <section className='queueContainer' aria-live='polite'>
          <h3 className='adoptH3'>Queue</h3>
          <div className='peopleContainer'>
          {this.renderPeople()}
          </div>
        </section>

        <form className='add-name' onSubmit={e => this.handleAddName(e)}>
          <label htmlFor='name'>Enter your name to get in line:</label>
          <input type='text' name='name' minLength='1' id='name'></input>
          <button type='submit' className='landingButton'>Get in line</button>
        </form>
      </section>
    )
  }
}