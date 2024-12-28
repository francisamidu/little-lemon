import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    guests: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};

    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }

    if (!formData.date) {
      validationErrors.date = 'Date is required';
    }

    if (!formData.time) {
      validationErrors.time = 'Time is required';
    }

    if (!formData.guests || isNaN(formData.guests) || parseInt(formData.guests) <= 0) {
      validationErrors.guests = 'Please enter a valid number of guests';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log('Form submitted:', formData);
      alert('Reservation submitted successfully!');
      setFormData({
        name: '',
        date: '',
        time: '',
        guests: '',
      });
    }
  };

  return (
    <div className="App">
      <header>
        <img src="/little-lemon.jpg" alt="Little Lemon Restaurant" className="logo" />
        <p>Chicago</p>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-heading">
          <img src="/neopolitan-pizza.jpg" alt="Little Lemon Neapolitan Pizza" className="hero-image" />
          <div className="hero-content">
            <h2 id="hero-heading">Neapolitan Pizza</h2>
            <p>Authentic Italian Cuisine</p>
            <button aria-label="Book a table now">Book a Table</button>
          </div>
        </section>

        <section className="about" aria-labelledby="about-heading">
          <h2 id="about-heading">About</h2>
          <p>
            Little Lemon is a cozy neighborhood Italian Bistro serving up delicious homemade pasta
            and authentic Neapolitan pizzas. We use only the freshest, seasonal ingredients to create
            dishes that are as beautiful as they are flavorful.
          </p>
        </section>

        <section className="booking" aria-labelledby="booking-heading">
          <h2 id="booking-heading">Book a Table</h2>
          <form onSubmit={handleSubmit} aria-describedby="form-instructions">
            <p id="form-instructions" className="visually-hidden">
              Fill out the form below to book a table at Little Lemon. All fields are required.
            </p>

            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                aria-required="true"
              />
              {errors.name && <span className="error" role="alert">{errors.name}</span>}
            </div>

            <div>
              <label htmlFor="date">Date:</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                aria-required="true"
              />
              {errors.date && <span className="error" role="alert">{errors.date}</span>}
            </div>

            <div>
              <label htmlFor="time">Time:</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                aria-required="true"
              />
              {errors.time && <span className="error" role="alert">{errors.time}</span>}
            </div>

            <div>
              <label htmlFor="guests">Number of Guests:</label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder="Enter number of guests"
                min="1"
                required
                aria-required="true"
              />
              {errors.guests && <span className="error" role="alert">{errors.guests}</span>}
            </div>

            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              aria-disabled={Object.keys(errors).length > 0}
            >
              Book Now
            </button>
          </form>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 Little Lemon</p>
      </footer>
    </div>
  );
}

export default App;
