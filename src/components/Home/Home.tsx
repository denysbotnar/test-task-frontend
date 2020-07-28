import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import './Home.scss';
import { dataClass, VideoInterface } from '../../services/data.service';
import Upload from './components/Upload';

const service = new dataClass();

interface IRecipeProps {

}

interface IRecipeState {
  data: Array<VideoInterface>
}

class Home extends React.Component<IRecipeProps, IRecipeState> {

  state: IRecipeState = {
    data: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    service.list$().subscribe(
      (data: Array<VideoInterface>) => {
        console.log(data);
        this.setState({data: data})
      }
    )
  };

  save = (name: string) => {
    service.save$(name).subscribe(
      (data: VideoInterface) => {
        console.log(data);
        this.getData();
      }
    )
  };

  render () {
    return (
      <div className="Home">
        <header className="Home-header">
          <div>
            <br />
            <h2>App Wed View</h2>
            <hr />
          </div>
          <Container className="container-fluid">
            <Row className="Content">
              {/* Upload videos */}
              <Col md={6}>
                <Upload
                  onSubmit={this.save}>
                </Upload>
              </Col>
              {/* List videos */}
              <Col md={{span: 4, offset: 2}}>
                <ListGroup>
                  {
                    this.state.data.map((item, key) => {
                      return (
                        <ListGroup.Item variant="dark" key={key}>
                          <a href={'watch/' + item.id}>
                            {item.name}
                          </a>
                        </ListGroup.Item>
                      );
                    })
                  }
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    );
  };
}

export default Home;
