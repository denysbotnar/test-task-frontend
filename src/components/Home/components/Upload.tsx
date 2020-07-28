import React, { ChangeEvent, useState } from 'react';
import { Button, Col, Modal, Row, Form } from 'react-bootstrap';

function Upload(props: {children: never[]; onSubmit: (name: string) => void}) {

  let name: string = '';

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = (data: any) => {
    data.preventDefault();
    if (name) {
      props.onSubmit(name);
      setShow(false);
      name = '';
    }
  };

  const changeName = (event: ChangeEvent<HTMLInputElement>) => {
    name = event.target.value;
  };

  return (
    <>
      <Row className="Upload">
        <Col>
          <Button variant="primary" onClick={handleShow}>
            Upload video
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Upload video</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>

                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="baseCurrency"
                    onChange={changeName}
                    placeholder="Enter video name" />
                </Form.Group>

                <Form.File id="formFile" label="Select file" disabled />

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSave}>
                  Save File
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </>
  );
}

export default Upload;
