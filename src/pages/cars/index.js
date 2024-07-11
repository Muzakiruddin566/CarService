import { useState } from 'react';
import DesolInt from '../../../Config/axiosConfig'; 
import { useRouter } from 'next/router';
import { Container, Form, Button, Alert, Card, Col } from 'react-bootstrap';

export default function CarPage() {
  const [carModel, setCarModel] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [maxPictures, setMaxPictures] = useState(1);
  const [pictures, setPictures] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > maxPictures) {
      setError(`You can only upload up to ${maxPictures} pictures. Please adjust your selection.`);
      return;
    }

    setPictures([...pictures, ...files]);
  };

  const handleDeletePicture = (index) => {
    const newPictures = [...pictures];
    newPictures.splice(index, 1);
    setPictures(newPictures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (pictures.length !== Number(maxPictures)) {
      setError(`Please upload exactly ${maxPictures} pictures.`);
      return;
    }

    const formData = new FormData();
    formData.append('model', carModel);
    formData.append('price', price);
    formData.append('phone', phone);
    formData.append('city', city);
    formData.append('maxPictures', maxPictures);

    pictures.forEach((file, index) => {
      formData.append(`pictures`, file);
    });

    try {
      const token = localStorage.getItem('token');
      await DesolInt.post('/api/cars', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccess('Car information submitted successfully');
    } catch (error) {
      setError('Failed to submit car information');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Submit Car Information</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="carModel">
            <Form.Label>Car Model</Form.Label>
            <Form.Control type="text" required minLength="3" value={carModel} onChange={(e) => setCarModel(e.target.value)} />
          </Form.Group>
          <Form.Group id="price" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" required value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>
          <Form.Group id="phone" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" required pattern="\d{11}" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>
          <Form.Group id="city" className="mt-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" required value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Form.Group id="maxPictures" className="mt-3">
            <Form.Label>Max Number of Pictures</Form.Label>
            <Form.Control type="number" required min="1" max="10" value={maxPictures} onChange={(e) => setMaxPictures(e.target.value)} />
          </Form.Group>
          <Form.Group id="pictures" className="mt-3">
            <Form.Label>Upload Pictures</Form.Label>
            <Form.Control type="file" multiple accept="image/*" onChange={handleFileChange} />
            <div className="mt-3">
              {pictures.map((picture, index) => (
                <Card key={index} style={{ width: '100px', display: 'inline-block', marginRight: '10px' }}>
                  <Card.Img variant="top" src={URL.createObjectURL(picture)} style={{ height: '100px', objectFit: 'cover' }} />
                  <Card.Body>
                    <Button variant="danger" size="sm" onClick={() => handleDeletePicture(index)}>Delete</Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Form.Group>
          <Button className="w-100 mt-4" type="submit">Submit</Button>
        </Form>
      </div>
    </Container>
  );
}
