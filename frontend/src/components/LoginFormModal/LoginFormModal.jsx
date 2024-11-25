import { useEffect, useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';


function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validations, setValidations] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    let formErrors = {};
    if (credential.length < 4) formErrors.credential = "Username must be 4 characters or more"
    if (password.length < 6) formErrors.password = "Password must be 6 characters or more"
    setValidations(formErrors);
  }, [credential, password]);

  const handleSubmit = (e, isDemoUser = false) => {
    e.preventDefault();
    setErrors({});

    if (isDemoUser) {
      const demoCredentials = { credential: "Demo-User", password: "password" };
      return dispatch(sessionActions.login(demoCredentials))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });

    } else {
      return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
  };

  return (
    <div id="popup-container-login">
      <h1>Log In</h1>
      <form
        className="form-container-login"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder=" Username or Email"
          className="input-field-login"
        />

        <div className="error-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" Password"
            className="input-field-login"
          />
          {errors.credential && <span className="form-error-text">{errors.credential}</span>}
        </div>

        <button
          type="submit"
          className={`input-field-login ${Object.values(validations).length > 0 ? "disabled" : ""}`}
          disabled={Object.values(validations).length > 0}
        >Log In</button>

        <button
          type="submit"
          className="input-field-login"
          onClick={(e) => handleSubmit(e, true)}
        >Log in as Demo User</button>

      </form>
    </div>
  );
}


export default LoginFormModal;
