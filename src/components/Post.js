import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


class Post extends Component {  
    render() {
    return (
        <div className="container-fluid mt-5">
        <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
              <div className="content mr-auto ml-auto">
                <p>&nbsp;</p>
                  <Form onSubmit={(event) => {
                    event.preventDefault()
                    const qn = this.qn.value
                    const reward = this.reward.value
                    this.props.postQuestion(reward, qn)
                  }}>
                  <center>
                  <h1>Post your Questions</h1>
                  <br></br>
                  <div class="form-container">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                        id="qn"
                        type="text"
                        ref={(input) => { this.qn = input }}
                        className="form-control"
                        placeholder="Whats your question?"
                        required />
                    </Form.Group>
                    <br/>
 
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control
                        id="reward"
                        type="text"
                        ref={(input) => { this.reward = input }}
                        className="form-control"
                        placeholder="Proposed reward in CELO"
                        required />
                    </Form.Group>  
                    <br/>              
                  </div>
                  <br/>
                  <button type="submit" className="btn btn-outline-info">Post your question</button>
                  </center>
                </Form>
                <br/><br/>
              </div>
            </main>
          </div>
        </div>
      );
    }
  }
  
  export default Post;