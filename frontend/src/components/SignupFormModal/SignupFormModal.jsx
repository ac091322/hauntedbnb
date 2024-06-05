import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';


function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validations, setValidations] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    let formErrors = {};
    if (!email) formErrors.email = "Email cannot be empty"
    if (!username) formErrors.username = "Username cannot be empty"
    if (!firstName) formErrors.firstName = "First Name cannot be empty"
    if (!lastName) formErrors.lastName = "Last Name cannot be empty"
    if (!password) formErrors.password = "Password cannot be empty"
    if (!confirmPassword) formErrors.confirmPassword = "Confirm Password cannot be empty"
    setValidations(formErrors);
  }, [email, username, firstName, lastName, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (password === confirmPassword) {
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Passwords don't match"
    });
  };

  return (
    <div id="signup-popup-container">
      <h1>Sign Up</h1>
      <form id="signup-form-container" onSubmit={handleSubmit}>

        <input
          type="text"
          className="input-field"
          value={email}
          placeholder=" Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <span>{errors.email}</span>}

        <input
          type="text"
          className="input-field"
          value={username}
          placeholder=" Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <span>{errors.username}</span>}

        <input
          type="text"
          className="input-field"
          value={firstName}
          placeholder=" First Name"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        {errors.firstName && <span>{errors.firstName}</span>}
        <input
          type="text"
          className="input-field"
          value={lastName}
          placeholder=" Last Name"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        {errors.lastName && <span>{errors.lastName}</span>}

        <input
          type="password"
          className="input-field"
          value={password}
          placeholder=" Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <span>{errors.password}</span>}

        <input
          type="password"
          className="input-field"
          value={confirmPassword}
          placeholder=" Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

        <button
          type="submit"
          className="input-field"
          disabled={Object.values(validations).length > 0}
        >Sign up</button>

      </form>
    </div>
  );
}


export default SignupFormModal;
