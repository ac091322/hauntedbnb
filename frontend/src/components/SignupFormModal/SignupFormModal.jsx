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
    if (!email) formErrors.email = "Email is required"
    if (!username) formErrors.username = "Username is required"
    if (!firstName) formErrors.firstName = "First name is required"
    if (!lastName) formErrors.lastName = "Last name is required"
    if (!password) formErrors.password = "Password is required"
    if (!confirmPassword) formErrors.confirmPassword = "Confirm password is required"
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
    <div id="popup-container-signup">
      <h1>Sign Up</h1>
      <form
        className="form-container-signup"
        onSubmit={handleSubmit}>

        <div className="error-group">
          <input
            type="text"
            className="input-field-signup"
            value={email}
            placeholder=" Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <span className="form-error-text">{errors.email}</span>}
        </div>

        <div className="error-group">
          <input
            type="text"
            className="input-field-signup"
            value={username}
            placeholder=" Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {errors.username && <span className="form-error-text">{errors.username}</span>}
        </div>

        <div className="error-group">
          <input
            type="text"
            className="input-field-signup"
            value={firstName}
            placeholder=" First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        {errors.firstName && <span className="form-error-text">{errors.firstName}</span>}

        <div className="error-group">
          <input
            type="text"
            className="input-field-signup"
            value={lastName}
            placeholder=" Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {errors.lastName && <span className="form-error-text">{errors.lastName}</span>}
        </div>

        <div className="error-group">
          <input
            type="password"
            className="input-field-signup"
            value={password}
            placeholder=" Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <span className="form-error-text">{errors.password}</span>}
        </div>

        <div className="error-group">
          <input
            type="password"
            className="input-field-signup"
            value={confirmPassword}
            placeholder=" Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {errors.confirmPassword && <span className="form-error-text">{errors.confirmPassword}</span>}
        </div>

        <button
          type="submit"
          className={`input-field-signup ${Object.values(validations).length > 0 ? 'disabled' : ''}`}
          disabled={Object.values(validations).length > 0}
        >Sign up</button>
      </form>
    </div>
  );
}


export default SignupFormModal;
