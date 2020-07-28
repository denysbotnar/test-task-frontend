import React from 'react';

import './View.scss';
import * as fromHistory from 'history';
import { dataClass, VideoInterface } from '../../services/data.service';

import ReactPlayer, {SourceProps} from 'react-player'
import { ButtonGroup, Col, Row, ToggleButton, Button } from 'react-bootstrap';

export interface RouteComponentProps<P> {
  match: match<P>;
  location: fromHistory.Location;
  history: fromHistory.History;
  staticContext?: any;
}

export interface match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

interface MatchParams {
  id: string;
}

interface PlayerInterface {
  url: string | string[] | SourceProps[] | MediaStream | undefined,
  pip: boolean,
  playing: boolean,
  controls: boolean,
  light: boolean,
  volume: number,
  muted: boolean,
  played: number,
  loaded: number,
  duration: number,
  playbackRate: number,
  loop: boolean,
  seeking: boolean
}

interface IRecipeProps extends RouteComponentProps<MatchParams> {
}

interface IRecipeState extends PlayerInterface, VideoInterface {

}

const service = new dataClass();

class View extends React.Component<IRecipeProps, IRecipeState> {

  state: IRecipeState = {
    id: '',
    name: '',
    url_240p: '',
    url_480p: '',
    url_1080p: '',
    url_4k: '',

    url: '',
    pip: false,
    playing: true,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: true,
    seeking: false
  };

  componentDidMount() {
    this.getData(this.props.match.params.id)
  }

  getData = (id: string) => {
    service.one$(id).subscribe(
      (data: VideoInterface | null) => {
        if (data !== null) {
          this.setState({...data}, () => {
            this.load(this.state.url_480p);
          })
        }
      }
    )
  };

  load = (url: string | string[] | SourceProps[] | MediaStream | undefined) => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  };

  handlePlay = () => {
    this.setState({ playing: true })
  };

  handlePause = () => {
    this.setState({ playing: false })
  };

  handleEnded = () => {
    this.setState({ playing: this.state.loop })
  };

  renderLoadButton = (url: string, label: string, key: number) => {
    return (
      <ToggleButton
        key={key}
        type="radio"
        variant="secondary"
        name="radio"
        value={url}
        checked={this.state.url === url}
        onChange={(e) => this.load(e.currentTarget.value)}>
        {label}
      </ToggleButton>
    );
  };

  handleBackButton = () => {
    this.props.history.back();
  };

  render() {

    const { url, playing, controls, light, volume, muted, loop, playbackRate, pip } = this.state;

    return (
    <div className="View">
      <header className="View-header">
        <div>
          <br />
          <h2>{this.state.name}</h2>
          <hr />
        </div>
        <Row>
          <Col>
            <Row>
              <Col md={{span: 6, offset: 3}}>
                <div className='player-wrapper'>
                  <ReactPlayer
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={url}
                    pip={pip}
                    playing={playing}
                    controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    onPlay={this.handlePlay}
                    onPause={this.handlePause}
                    onEnded={this.handleEnded}
                  />
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col md={{span: 6, offset: 3}}>
                <Row>
                  <Col>
                    <ButtonGroup toggle>
                      {this.renderLoadButton(this.state.url_240p, '240p', 1)}
                      {this.renderLoadButton(this.state.url_480p, '480p', 2)}
                      {this.renderLoadButton(this.state.url_1080p, '1080p', 3)}
                      {this.renderLoadButton(this.state.url_4k, '4k', 4)}
                    </ButtonGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr />
            <br />
            <Row>
              <Col>
                <Button variant="outline-secondary" onClick={this.handleBackButton}>
                  Back
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </header>
    </div>
    )
  }
}

export default View;