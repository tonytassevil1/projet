import React from 'react';
import { Row, Col, Alert, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import handleResetPassword from '../../modules/reset-password';

export default class ResetPassword extends React.Component {
  componentDidMount() {
    handleResetPassword({ component: this, token: this.props.params.token });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChangePassword() {
    //oldPassword
    //Accounts.changePassword(oldPassword, newPassword, function () {

    //});
  }

  render() {
    return (
      <div className="ResetPassword">
        <Row>
          <Col xs={ 12 } sm={ 6 } md={ 4 }>
            <h4 className="page-header">Changer de mot de passe</h4>
            <Alert bsStyle="info">
              Pour changer de mot de passe, entrer un nouveau mot de passe. Vous vous connecterez avec votre nouveau mot de passe.
            </Alert>
            <form
              ref={ form => (this.resetPasswordForm = form) }
              className="reset-password"
              onSubmit={ this.handleSubmit }
            >
              <FormGroup>
                <ControlLabel>Nouveau mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  ref="newPassword"
                  name="newPassword"
                  placeholder="Nouveau mot de passe"
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Repéter le nouveau mot de passe</ControlLabel>
                <FormControl
                  type="password"
                  ref="repeatNewPassword"
                  name="repeatNewPassword"
                  placeholder="Repéter le nouveau mot de passe"
                />
              </FormGroup>
              <Button onClick={ () => this.handleChangePassword() } type="submit" bsStyle="success">Reset Password &amp; Login</Button>
            </form>
          </Col>
        </Row>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  params: React.PropTypes.object,
};
