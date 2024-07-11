import { useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import DesolInt from '../../Config/axiosConfig';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await DesolInt.post('/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      router.push('/cars');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Log In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group id="password" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button className="w-100 mt-4" type="submit">Log In</Button>
        </Form>
      </div>
    </Container>
  );
}
